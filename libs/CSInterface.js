/**
 * Enhanced CSInterface implementation for development
 */
function CSInterface() {
    this.hostEnvironment = {
        appName: 'PPRO',
        appVersion: '23.0.0'
    };
    
    // Initialize event listeners array
    this._eventListeners = {};
    
    console.log('CSInterface initialized');
}

CSInterface.prototype.evalScript = function(script, callback) {
    console.log('Evaluating ExtendScript:', script);
    
    // Simulate ExtendScript evaluation in development
    setTimeout(() => {
        if (callback) {
            // For development, return success
            if (script.includes('createSequence')) {
                callback('Success: Development sequence created');
            } else if (script.includes('importAndOrganizeFootage')) {
                callback('Success: Development footage imported');
            } else if (script.includes('generateEdit')) {
                callback('Success: Development edit generated');
            } else {
                callback('Success: Script executed');
            }
        }
    }, 100);
};

CSInterface.prototype.addEventListener = function(event, callback) {
    console.log('Adding event listener for:', event);
    if (!this._eventListeners[event]) {
        this._eventListeners[event] = [];
    }
    this._eventListeners[event].push(callback);
};

CSInterface.prototype.removeEventListener = function(event, callback) {
    console.log('Removing event listener for:', event);
    if (this._eventListeners[event]) {
        const index = this._eventListeners[event].indexOf(callback);
        if (index > -1) {
            this._eventListeners[event].splice(index, 1);
        }
    }
};

CSInterface.prototype.dispatchEvent = function(event) {
    console.log('Dispatching event:', event);
    if (this._eventListeners[event.type]) {
        this._eventListeners[event.type].forEach(callback => {
            callback(event);
        });
    }
};