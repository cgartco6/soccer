// API Client for communicating with the backend
const APIClient = {
    baseURL: 'http://localhost:5000/api',
    
    // Get predictions from API
    getPredictions: function() {
        return fetch(`${this.baseURL}/predictions/today`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching predictions:', error);
                // Fallback to sample data if API is not available
                return this.getSamplePredictions();
            });
    },
    
    // Get insights from API
    getInsights: function() {
        return fetch(`${this.baseURL}/insights`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching insights:', error);
                // Fallback to sample insights if API is not available
                return this.getSampleInsights();
            });
    },
    
    // Get odds comparison for a specific match
    getOddsComparison: function(matchId) {
        return fetch(`${this.baseURL}/odds/comparison?match_id=${matchId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching odds comparison:', error);
                return {};
            });
    },
    
    // Sample predictions data (fallback)
    getSamplePredictions: function() {
        return [
            {
                id: 1,
                league: "Premier League",
                time: "19:45 GMT",
                teamA: "Arsenal",
                teamB: "Man City",
                teamAShort: "ARS",
                teamBShort: "MCI",
                factors: {
                    form: { value: "Arsenal (WWLWW) vs Man City (WLWWW)", impact: "positive" },
                    injuries: { value: "Man City: 3 key players", impact: "negative" },
                    btts: { value: "75% Probability", impact: "positive" },
                    weather: { value: "Clear, 12°C", impact: "neutral" }
                },
                prediction: { type: "Both Teams to Score - YES", confidence: 82 },
                odds: [
                    { provider: "Hollywood Bets", value: 1.85 },
                    { provider: "Betway", value: 1.80 },
                    { provider: "Pinnacle", value: 1.92, valueBet: true }
                ],
                aiAccuracy: 87
            },
            {
                id: 2,
                league: "La Liga",
                time: "20:00 GMT",
                teamA: "Real Madrid",
                teamB: "Barcelona",
                teamAShort: "RMA",
                teamBShort: "BAR",
                factors: {
                    homeAdvantage: { value: "Real Madrid at Santiago Bernabéu", impact: "positive" },
                    cards: { value: "Over 4.5 cards", impact: "positive" },
                    transfers: { value: "Barcelona new striker adapting", impact: "neutral" },
                    referee: { value: "Strict referee, high cards", impact: "negative" }
                },
                prediction: { type: "Real Madrid Win", confidence: 68 },
                odds: [
                    { provider: "Hollywood Bets", value: 2.10 },
                    { provider: "Betway", value: 2.15 },
                    { provider: "Pinnacle", value: 2.25, valueBet: true }
                ],
                aiAccuracy: 79
            }
        ];
    },
    
    // Sample insights data (fallback)
    getSampleInsights: function() {
        return [
            {
                title: "Top Value Bet",
                content: "Based on our AI analysis, the highest value bet today is BTTS in Arsenal vs Man City with an expected value of 18%."
            },
            {
                title: "Biggest Mismatch",
                content: "Real Madrid vs Barcelona shows the largest performance gap in midfield control (63% vs 37%)."
            },
            {
                title: "Weather Impact",
                content: "Clear conditions across all major matches today - minimal weather impact expected."
            },
            {
                title: "Injury Alert",
                content: "Man City missing 3 key defenders increases likelihood of both teams scoring."
            }
        ];
    }
};
