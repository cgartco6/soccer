import json
from .si_agents import SIAgents

class PredictionModel:
    def __init__(self):
        self.si_agents = SIAgents()
        self.predictions = []
        
    def update_predictions(self):
        # Load latest match data
        with open('../data/matches.json', 'r') as f:
            matches = json.load(f)
            
        # Generate predictions using SI agents
        self.predictions = self.si_agents.generate_predictions(matches)
        
        # Save predictions to file
        with open('../data/predictions.json', 'w') as f:
            json.dump(self.predictions, f, indent=2)
            
    def get_today_predictions(self, league="all"):
        if league.lower() == "all":
            return self.predictions
        else:
            return [p for p in self.predictions if p['league'].lower() == league.lower()]
