import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;
  private lastApiCall: number = 0;
  private readonly minDelayBetweenCalls = 500; // 0.5 second minimum delay for OpenRouter

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENROUTER_API_KEY'),
      baseURL: "https://openrouter.ai/api/v1",
    });
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async ensureRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastApiCall;
    
    if (timeSinceLastCall < this.minDelayBetweenCalls) {
      const delayTime = this.minDelayBetweenCalls - timeSinceLastCall;
      await this.delay(delayTime);
    }
    
    this.lastApiCall = Date.now();
  }

  async analyzeSceneKeywords(keywords: string[]): Promise<{
    enhancedKeywords: string[];
    movieSuggestions: string[];
    confidence: number;
  }> {
    const maxRetries = 3;
    let lastError: any;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        await this.ensureRateLimit();
        
        const prompt = `
          Based on these fighting scene keywords: ${keywords.join(', ')}
          
          Please provide:
          1. Enhanced keywords for better movie search
          2. Specific movie titles that likely contain such scenes
          3. Confidence score (0-1) for the analysis
          
          Respond ONLY with valid JSON, no markdown, no extra text:
          {
            "enhancedKeywords": ["keyword1", "keyword2"],
            "movieSuggestions": ["Movie Title 1", "Movie Title 2"],
            "confidence": 0.85
          }
        `;

        const completion = await this.openai.chat.completions.create({
          model: 'microsoft/wizardlm-2-8x22b',
          messages: [
            {
              role: 'system',
              content: 'You are a movie expert specializing in action and fighting scenes. Provide accurate movie suggestions based on keywords.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        });

        const response = completion.choices[0]?.message?.content;
        if (!response) {
          throw new Error('No response from OpenRouter');
        }

        console.log('Raw OpenRouter response:', response);

        // Clean the response - remove markdown code blocks if present
        let cleanedResponse = response.trim();
        if (cleanedResponse.startsWith('```json')) {
          cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (cleanedResponse.startsWith('```')) {
          cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }

        // Extract JSON from the response - find the first complete JSON object
        const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          cleanedResponse = jsonMatch[0];
        }

        console.log('Cleaned response:', cleanedResponse);

        try {
          return JSON.parse(cleanedResponse);
        } catch (parseError) {
          console.error('JSON parse error:', parseError);
          console.error('Failed to parse:', cleanedResponse);
          throw new Error(`Invalid JSON response from OpenRouter: ${parseError.message}`);
        }
      } catch (error) {
        lastError = error;
        console.error(`Error analyzing scene keywords (attempt ${attempt + 1}):`, error);
        
        // If it's a rate limit error, wait longer before retrying
        if (error.message?.includes('429') || error.message?.includes('quota')) {
          const waitTime = Math.pow(2, attempt) * 2000; // Exponential backoff: 2s, 4s, 8s
          console.log(`Rate limit hit, waiting ${waitTime}ms before retry...`);
          await this.delay(waitTime);
        } else if (attempt < maxRetries - 1) {
          // For other errors, wait a shorter time
          await this.delay(1000);
        }
      }
    }

    console.error('All retry attempts failed for analyzeSceneKeywords');
    // Fallback response
    return {
      enhancedKeywords: keywords,
      movieSuggestions: [],
      confidence: 0.5,
    };
  }
}
