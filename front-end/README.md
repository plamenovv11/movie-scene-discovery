# Movie Scene Discovery Frontend

An Angular frontend application for discovering movies with specific fighting scenes using AI-powered search.

## Features

- Modern, responsive UI with Angular Material
- AI-powered movie scene search
- Movie cards with posters and ratings
- YouTube trailer integration
- Detailed movie modal with scene descriptions
- Real-time search with loading states
- Mobile-responsive design

## Prerequisites

- Node.js (v16 or higher)
- Angular CLI
- Backend API running on port 3000

## Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure the backend API is running on `http://localhost:3000`

## Running the Application

1. Start the development server:
```bash
ng serve
```

2. Open your browser and navigate to `http://localhost:4200`

## Usage

1. Enter keywords related to fighting scenes (e.g., "karate", "martial arts", "combat")
2. Click "Search Movies" to find movies with relevant scenes
3. Browse the results and click on any movie card to see details
4. View the movie trailer and detailed scene descriptions

## Project Structure

```
src/app/
├── components/          # UI components
│   ├── home/           # Home page component
│   ├── search/         # Search form component
│   └── results/        # Results display component
├── interfaces/         # TypeScript interfaces
├── services/           # Angular services
├── app.component.*     # Main app component
├── app.config.ts       # App configuration
└── app.routes.ts       # Routing configuration
```

## Components

### Search Component
- Keyword input with validation
- Example search suggestions
- Loading states and error handling
- Real-time form validation

### Results Component
- Movie grid display
- Movie cards with posters and ratings
- Detailed movie modal
- YouTube trailer integration
- Scene descriptions with confidence scores

## Styling

The application uses:
- Angular Material components
- Custom SCSS styling
- Responsive design
- Modern gradient backgrounds
- Smooth animations and transitions

## API Integration

The frontend communicates with the backend API through the `MovieService`:
- Search movies by keywords
- Get movie details
- Fetch scene information
- Error handling and loading states

## Development

### Available Scripts
- `ng serve` - Start development server
- `ng build` - Build for production
- `ng test` - Run unit tests
- `ng lint` - Run linting

### Adding New Features

1. Create new components using Angular CLI:
```bash
ng generate component components/feature-name
```

2. Add services for API calls:
```bash
ng generate service services/feature-name
```

3. Update routing in `app.routes.ts`
4. Add interfaces for new data models

## Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on multiple devices/browsers
5. Submit a pull request

## License

This project is licensed under the MIT License.