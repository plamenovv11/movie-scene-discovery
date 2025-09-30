# Movie Scene Discovery Backend

A NestJS backend application that uses AI to search for movies with specific fighting scenes and provides YouTube trailer links.

## Features

- AI-powered scene analysis using OpenAI
- Integration with The Movie Database (TMDB) API
- YouTube trailer integration
- PostgreSQL database with TypeORM
- Swagger API documentation
- CORS enabled for frontend integration

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- OpenAI API key
- TMDB API key
- YouTube API key (optional, for enhanced trailer search)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `env.example`:
```bash
cp env.example .env
```

3. Update the `.env` file with your API keys and database credentials:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=movie_scene_db

# API Keys
OPENAI_API_KEY=your_openai_api_key_here
TMDB_API_KEY=your_tmdb_api_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here

# Application
NODE_ENV=development
PORT=3000
```

4. Create the PostgreSQL database:
```sql
CREATE DATABASE movie_scene_db;
```

## Running the Application

1. Start the development server:
```bash
npm run start:dev
```

2. The API will be available at `http://localhost:3000`
3. Swagger documentation will be available at `http://localhost:3000/api`

## API Endpoints

### Movies
- `POST /movies/search` - Search for movies with specific scene keywords
- `GET /movies` - Get all movies
- `GET /movies/:id` - Get movie by ID

### Scenes
- `GET /scenes` - Get all scenes
- `GET /scenes/search?keywords=keyword1,keyword2` - Search scenes by keywords
- `GET /scenes/movie/:movieId` - Get scenes by movie ID
- `GET /scenes/:id` - Get scene by ID

## Database Schema

### Movies Table
- `id` (UUID) - Primary key
- `tmdbId` (Number) - TMDB movie ID
- `title` (String) - Movie title
- `overview` (Text) - Movie description
- `releaseDate` (String) - Release date
- `posterPath` (String) - Poster image path
- `backdropPath` (String) - Backdrop image path
- `voteAverage` (Decimal) - Average rating
- `voteCount` (Number) - Number of votes
- `genres` (String[]) - Array of genres
- `youtubeTrailerId` (String) - YouTube trailer ID
- `youtubeTrailerUrl` (String) - YouTube trailer URL

### Scenes Table
- `id` (UUID) - Primary key
- `movieId` (UUID) - Foreign key to movies table
- `description` (Text) - Scene description
- `keywords` (String[]) - Search keywords
- `tags` (String[]) - Scene tags
- `confidence` (Decimal) - AI confidence score
- `timestamp` (String) - Scene timestamp
- `youtubeClipId` (String) - YouTube clip ID (future feature)
- `youtubeClipUrl` (String) - YouTube clip URL (future feature)

## API Keys Setup

### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account and get your API key
3. Add it to your `.env` file

### TMDB API Key
1. Go to [The Movie Database](https://www.themoviedb.org/)
2. Create an account and request an API key
3. Add it to your `.env` file

### YouTube API Key (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable YouTube Data API v3
3. Create credentials and get your API key
4. Add it to your `.env` file

## Development

### Available Scripts
- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:debug` - Start in debug mode
- `npm run build` - Build the application
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

### Project Structure
```
src/
├── config/          # Configuration files
├── dto/            # Data Transfer Objects
├── entities/       # Database entities
├── modules/        # Feature modules
│   ├── ai/         # AI service module
│   ├── movie/      # Movie service module
│   └── scene/      # Scene service module
├── app.module.ts   # Main application module
└── main.ts         # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.





