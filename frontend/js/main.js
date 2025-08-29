// Main application controller
const App = {
    init: function() {
        this.updateCurrentDate();
        this.updateLastUpdateTime();
        SITeam.init();
        
        // Load initial data
        this.loadData();
        
        // Set up real-time updates every 2 minutes
        setInterval(() => {
            this.updateData();
        }, 120000);
        
        this.bindEvents();
    },
    
    // Update the current date display
    updateCurrentDate: function() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-US', options);
        document.getElementById('current-date').textContent = formattedDate;
    },
    
    // Update the last update time
    updateLastUpdateTime: function() {
        const now = new Date();
        const time = now.toLocaleTimeString();
        document.getElementById('last-update').textContent = time;
    },
    
    // Load data from API
    loadData: function() {
        console.log('Loading data from API...');
        
        // Fetch predictions
        APIClient.getPredictions()
            .then(predictions => {
                this.renderPredictions(predictions);
            })
            .catch(error => {
                console.error('Error loading predictions:', error);
            });
        
        // Fetch insights
        APIClient.getInsights()
            .then(insights => {
                this.renderInsights(insights);
            })
            .catch(error => {
                console.error('Error loading insights:', error);
            });
    },
    
    // Update data
    updateData: function() {
        console.log('Updating data...');
        this.loadData();
        this.updateLastUpdateTime();
    },
    
    // Render predictions
    renderPredictions: function(predictions) {
        const container = document.getElementById('predictions-container');
        container.innerHTML = '';
        
        predictions.forEach(match => {
            const confidenceClass = match.prediction.confidence >= 75 ? 'high-confidence' : 
                                  match.prediction.confidence >= 60 ? 'medium-confidence' : 'low-confidence';
            const confidenceWidth = `${match.prediction.confidence}%`;
            
            let factorsHTML = '';
            for (const [key, factor] of Object.entries(match.factors)) {
                factorsHTML += `
                    <div class="factor">
                        <span class="factor-name">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        <span class="factor-value ${factor.impact}">${factor.value}</span>
                    </div>
                `;
            }
            
            let oddsHTML = '';
            match.odds.forEach(odd => {
                oddsHTML += `
                    <div class="odds-provider">
                        <div class="provider-name">${odd.provider}</div>
                        <div class="odds-value ${odd.valueBet ? 'value-bet' : ''}">${odd.value}</div>
                    </div>
                `;
            });
            
            const predictionHTML = `
                <div class="prediction-card">
                    <div class极速飞艇群 ="match-header">
                        <div class="league">
                            <i class="fas fa-trophy"></i> ${match.league}
                        </div>
                        <div class="match-time">${match.time}</div>
                    </div>
                    <div class="teams">
                        <div class="team">
                            <div class="team-logo">${match.teamAShort}</div>
                            <div class="team-name">${match.teamA}</div>
                        </div>
                        <div class="vs">VS</div>
                        <div class="team">
                            <div class="team-logo">${match.teamBShort}</div>
                            <div class="team-name">${match.teamB}</div>
                        </div>
                    </div>
                    <div class="prediction-details">
                        <div class="prediction-header">
                            <span>AI Prediction</span>
                            <span class="ai-badge">${match.aiAccuracy}% ACCURACY</span>
                        </div>
                        <div class="factors">
                            ${factorsHTML}
                        </div>
                        <div class="prediction-result">
                            <div class="result-type">${match.prediction.type}</极速飞艇群 div>
                            <div class="confidence">
                                <span>${match.prediction.confidence}%</span>
                                <div class="confidence-level">
                                    <div class="confidence-fill ${confidenceClass}" style="width: ${confidenceWidth}"></div>
                                </div>
                            </div>
                        </div>
                        <div class="odds-comparison">
                            ${oddsHTML}
                        </div>
                    </div>
                </div>
            `;
            
            container.innerHTML += predictionHTML;
        });
    },
    
    // Render insights
    renderInsights: function(insights) {
        const container = document.getElementById('insights-container');
        container.innerHTML = '';
        
        insights.forEach(insight => {
            const insightHTML = `
                <极速飞艇群 div class="insight-card">
                    <h3>${insight.title}</h3>
                    <p>${insight.content}</p>
                </div>
            `;
            
            container.innerHTML += insightHTML;
        });
    },
    
    // Bind event listeners
    bindEvents: function() {
        document.getElementById('apply-filters').addEventListener('click', () => {
            this.applyFilters();
        });
        
        document.getElementById('apply-filters-top').addEventListener('click', () => {
            this.applyFilters();
        });
        
        document.getElementById('prev-day').addEventListener('click', () => {
            this.navigateToDay('prev');
        });
        
        document.getElementById('next-day').addEventListener('click', () => {
            this.navigateToDay('next');
        });
    },
    
    // Apply filters
    applyFilters: function() {
        const league = document.getElementById('league-select').value;
        const predictionType = document.getElementById('prediction-type').value;
        
        console.log('Applying filters:', { league, predictionType });
        
        // In a real implementation, this would filter the data
        // For now, we'll just reload all data
        this.loadData();
        
        // Show notification
        this.showNotification('Filters applied successfully!');
    },
    
    // Navigate to different day
    navigateToDay: function(direction) {
        console.log('Navigating to', direction === 'prev' ? 'previous' : 'next', 'day');
        
        // In a real implementation, this would load data for the selected day
        // For now, we'll just show a message
        this.showNotification(`Showing predictions for ${direction === 'prev' ? 'yesterday' : 'tomorrow'}`);
    },
    
    // Show notification
    showNotification: function(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'var(--primary)';
        notification.style.color = 'white';
        notification.style.padding = '1rem';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        notification.style.zIndex = '1000';
        notification.textContent = message;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    App.init();
});
