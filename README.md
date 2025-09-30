# Movie Scene Discovery

An AI-powered application that helps users find movies with specific fighting scenes based on keywords. The app uses OpenAI to analyze scene content and integrates with The Movie Database (TMDB) to provide comprehensive movie information and YouTube trailers.

## 🎬 Features

- **AI-Powered Search**: Uses OpenAI to analyze and match scene keywords with movie content
- **Movie Database Integration**: Connects to TMDB for comprehensive movie information
- **YouTube Trailers**: Displays embedded movie trailers
- **Scene Analysis**: Provides detailed descriptions of fighting scenes with confidence scores
- **Modern UI**: Beautiful, responsive interface built with Angular Material
- **Real-time Search**: Instant search results with loading states

## 🏗️ Architecture

The application consists of two main parts:

### Backend (NestJS + TypeScript + PostgreSQL)
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **AI Integration**: OpenAI API for scene analysis
- **Movie API**: TMDB integration for movie data
- **Documentation**: Swagger API documentation

### Frontend (Angular + TypeScript + Angular Material)
- **Framework**: Angular 17 with TypeScript
- **UI Library**: Angular Material
- **Styling**: Custom SCSS with responsive design
- **State Management**: Component-based state management
- **HTTP Client**: Angular HttpClient for API communication

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- OpenAI API key
- TMDB API key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd back-end
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
```

4. Update `.env` with your API keys and database credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=movie_scene_db

OPENAI_API_KEY=your_openai_api_key
TMDB_API_KEY=your_tmdb_api_key
```

5. Create PostgreSQL database:
```sql
CREATE DATABASE movie_scene_db;
```

6. Start the backend:
```bash
npm run start:dev
```

The backend will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd front-end/movie-scene-discovery
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend:
```bash
ng serve
```

The frontend will be available at `http://localhost:4200`

## 🔧 API Keys Setup

### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account and generate an API key
3. Add the key to your backend `.env` file

### TMDB API Key
1. Visit [The Movie Database](https://www.themoviedb.org/)
2. Create an account and request an API key
3. Add the key to your backend `.env` file

## 📱 Usage

1. **Search**: Enter keywords related to fighting scenes (e.g., "karate", "martial arts", "combat")
2. **Browse**: View the search results with movie posters and ratings
3. **Explore**: Click on any movie to see detailed information, trailer, and scene descriptions
4. **Discover**: Read AI-generated scene descriptions with confidence scores

## 🎯 Example Searches

- **Karate & Martial Arts**: "karate, martial arts, kung fu"
- **Combat & War**: "combat, war, action, military"
- **Boxing & Fighting**: "boxing, fighting, rings, championship"
- **Ninja & Samurai**: "ninja, samurai, swords, ancient"

## 🗄️ Database Schema

### Movies Table
- Movie information from TMDB
- YouTube trailer integration
- Genre classification
- Ratings and metadata

### Scenes Table
- AI-generated scene descriptions
- Keyword matching
- Confidence scores
- Movie relationships

## 🛠️ Development

### Backend Development
```bash
cd back-end
npm run start:dev    # Development mode with hot reload
npm run build        # Build for production
npm run test         # Run tests
npm run lint         # Run linting
```

### Frontend Development
```bash
cd front-end/movie-scene-discovery
ng serve             # Development server
ng build             # Build for production
ng test              # Run tests
ng lint              # Run linting
```

## 📊 API Documentation

Once the backend is running, visit `http://localhost:3000/api` to access the Swagger API documentation.

### Main Endpoints
- `POST /movies/search` - Search movies by scene keywords
- `GET /movies` - Get all movies
- `GET /movies/:id` - Get movie details
- `GET /scenes/search` - Search scenes by keywords

## 🎨 UI Components

- **Search Component**: Keyword input with validation and examples
- **Results Component**: Movie grid with cards and detailed modals
- **Movie Cards**: Posters, ratings, and quick info
- **Movie Modal**: Detailed view with trailers and scene descriptions

## 🔒 Security

- CORS enabled for frontend integration
- Input validation and sanitization
- Environment variable protection
- API rate limiting (recommended for production)

## 🚀 Deployment

### Backend Deployment
1. Build the application: `npm run build`
2. Set up production environment variables
3. Configure PostgreSQL database
4. Deploy to your preferred hosting service

### Frontend Deployment
1. Build for production: `ng build --prod`
2. Deploy the `dist/` folder to your hosting service
3. Update API URLs for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for AI scene analysis
- [The Movie Database](https://www.themoviedb.org/) for movie data
- [Angular](https://angular.io/) and [NestJS](https://nestjs.com/) frameworks
- [Angular Material](https://material.angular.io/) for UI components





