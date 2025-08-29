# FootPredict AI - Soccer Prediction Platform

A comprehensive soccer prediction platform that uses synthetic intelligence to predict outcomes for today's games.

## Features

- Real-time data updates from multiple bookmakers (Hollywood Bets, Betway, etc.)
- AI-powered predictions with confidence levels
- Value bet identification
- Responsive design for all devices
- Synthetic Intelligence team simulation

## Setup

1. Clone the repository
2. Ensure the backend server is running on http://localhost:5000
3. Open index.html in a web browser
4. The platform will automatically load predictions for today's games

## File Structure

- `index.html` - Main HTML file
- `css/` - Stylesheets
  - `style.css` - Main styles
  - `responsive.css` - Responsive styles for mobile devices
- `js/` - JavaScript files
  - `main.js` - Main application logic
  - `si-team.js` - Synthetic Intelligence team simulation
  - `data-processor.js` - Data processing functions
  - `prediction-engine.js` - Prediction generation logic
  - `api-client.js` - API communication functions
- `assets/` - Images and icons
- `README.md` - This file

## How It Works

The platform uses a team of synthetic intelligence assistants to:
1. Collect data from multiple sources
2. Analyze player and team performance
3. Calculate probabilities for various outcomes
4. Compare with bookmaker odds to identify value bets
5. Generate predictions with confidence levels

## API Integration

The frontend communicates with a backend API to get real-time data. The expected API endpoints are:

- `GET /api/predictions/today` - Get today's predictions
- `GET /api/odds/comparison?match_id=<id>` - Get odds comparison for a specific match
- `GET /api/insights` - Get AI insights and analysis

## Disclaimer

Predictions are based on AI algorithms analyzing historical and current data. There is no guarantee of accuracy. Betting involves risk, and we encourage responsible gambling. Users must be of legal gambling age in their jurisdiction.
