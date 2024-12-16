/**
 * Basic CSInterface implementation
 */
function CSInterface() {
    this.hostEnvironment = {
        appName: 'PPRO',
        appVersion: '23.0.0'
    };
}

CSInterface.prototype.evalScript = function(script, callback) {
    // Implementation for ExtendScript evaluation
    if (callback) {
        callback(null, "success");
    }
};

CSInterface.prototype.addEventListener = function(event, callback) {
    // Event listener implementation
};

CSInterface.prototype.removeEventListener = function(event, callback) {
    // Event removal implementation
};