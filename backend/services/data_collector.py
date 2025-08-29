import requests
import json
from datetime import datetime
from config.api_keys import BETWAY_API_KEY, HOLLYWOOD_BETS_API_KEY

class DataCollector:
    def __init__(self):
        self.betway_api_key = BETWAY_API_KEY
        self.hollywood_bets_api_key = HOLLYWOOD_BETS_API_KEY
        
    def collect_latest_data(self):
        try:
            # Collect data from various APIs
            betway_data = self._fetch_betway_data()
            hollywood_bets_data = self._fetch_hollywood_bets_data()
            
            # Process and store the data
            processed_data = self._process_data(betway_data, hollywood_bets_data)
            
            # Update matches.json with latest data
            with open('../data/matches.json', 'w') as f:
                json.dump(processed_data, f, indent=2)
                
            return True
        except Exception as e:
            print(f"Error collecting data: {e}")
            return False
            
    def _fetch_betway_data(self):
        # Simulated API call to Betway
        # In a real implementation, this would be an actual API call
        return {
            "matches": [
                {
                    "id": "BW001",
                    "league": "Premier League",
                    "teamA": "Arsenal",
                    "teamB": "Man City",
                    "time": "19:45 GMT",
                    "odds": {
                        "home_win": 2.10,
                        "draw": 3.25,
                        "away_win": 3.50,
                        "btts_yes": 1.80,
                        "btts_no": 1.95,
                        "over_2.5": 2.05,
                        "under_2.5": 1.75
                    }
                }
                # More matches...
            ]
        }
    
    def _fetch_hollywood_bets_data(self):
        # Simulated API call to Hollywood Bets
        return {
            "matches": [
                {
                    "id": "HB001",
                    "league": "Premier League",
                    "teamA": "Arsenal",
                    "teamB": "Man City",
                    "time": "19:45 GMT",
                    "odds": {
                        "home_win": 2.15,
                        "draw": 3.30,
                        "away_win": 3.40,
                        "btts_yes": 1.85,
                        "btts_no": 1.90,
                        "over_2.5": 2.10,
                        "under_2.5": 1.70
                    }
                }
                # More matches...
            ]
        }
    
    def _process_data(self, betway_data, hollywood_bets_data):
        # Process and combine data from different sources
        processed_matches = []
        
        # This is a simplified example - real implementation would be more complex
        for betway_match in betway_data['matches']:
            match_id = betway_match['id']
            
            # Find corresponding match in Hollywood Bets data
            hb_match = next((m for m in hollywood_bets_data['matches'] if m['id'] == match_id), None)
            
            if hb_match:
                processed_match = {
                    "id": match_id,
                    "league": betway_match['league'],
                    "teamA": betway_match['teamA'],
                    "teamB": betway_match['teamB'],
                    "time": betway_match['time'],
                    "odds": {
                        "betway": betway_match['odds'],
                        "hollywood_bets": hb_match['odds']
                    }
                }
                processed_matches.append(processed_match)
                
        return processed_matches
    
    def get_odds_comparison(self, match_id):
        # Get odds comparison for a specific match
        with open('../data/matches.json', 'r') as f:
            matches = json.load(f)
            
        match = next((m for m in matches if m['id'] == match_id), None)
        return match['odds'] if match else {}
