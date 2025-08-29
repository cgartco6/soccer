from flask import Flask, jsonify, request
from flask_cors import CORS
from services.data_collector import DataCollector
from models.si_agents import SIAgents
from models.prediction_model import PredictionModel
import threading
import time

app = Flask(__name__)
CORS(app)

# Initialize components
data_collector = DataCollector()
si_agents = SIAgents()
prediction_model = PredictionModel()

@app.route('/api/predictions/today', methods=['GET'])
def get_today_predictions():
    league = request.args.get('league', 'all')
    predictions = prediction_model.get_today_predictions(league)
    return jsonify(predictions)

@app.route('/api/odds/comparison', methods=['GET'])
def get_odds_comparison():
    match_id = request.args.get('match_id')
    odds = data_collector.get_odds_comparison(match_id)
    return jsonify(odds)

@app.route('/api/insights', methods=['GET'])
def get_insights():
    insights = si_agents.generate_insights()
    return jsonify(insights)

def update_data_periodically():
    while True:
        try:
            data_collector.collect_latest_data()
            prediction_model.update_predictions()
            time.sleep(120)  # Update every 2 minutes
        except Exception as e:
            print(f"Error in periodic update: {e}")
            time.sleep(60)

if __name__ == '__main__':
    # Start background thread for data updates
    update_thread = threading.Thread(target=update_data_periodically)
    update_thread.daemon = True
    update_thread.start()
    
    app.run(debug=True, port=5000)
