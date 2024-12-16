document.addEventListener('DOMContentLoaded', function() {
    const csInterface = new CSInterface();
    
    // Initialize communication with ExtendScript
    function initializeExtendScript() {
        csInterface.evalScript('typeof JSON !== "undefined"', function(result) {
            if (result === 'true') {
                console.log('ExtendScript environment ready');
            } else {
                console.error('ExtendScript environment not ready');
            }
        });
    }
    
    // Handle sequence creation
    window.createPremiereSequence = function(config) {
        return new Promise((resolve, reject) => {
            const jsx = `createSequence("${config.name}", ${JSON.stringify(config)})`;
            csInterface.evalScript(jsx, function(result) {
                if (result && result.startsWith('Success')) {
                    resolve(result);
                } else {
                    reject(new Error(result));
                }
            });
        });
    };
    
    // Handle footage import and organization
    window.importAndOrganizeFootage = function(files, bins) {
        return new Promise((resolve, reject) => {
            const jsx = `importAndOrganizeFootage(${JSON.stringify(files)}, ${JSON.stringify(bins)})`;
            csInterface.evalScript(jsx, function(result) {
                if (result && result.startsWith('Success')) {
                    resolve(result);
                } else {
                    reject(new Error(result));
                }
            });
        });
    };
    
    // Handle edit generation
    window.generatePremiereEdit = function(settings) {
        return new Promise((resolve, reject) => {
            const jsx = `generateEdit(${JSON.stringify(settings)})`;
            csInterface.evalScript(jsx, function(result) {
                if (result && result.startsWith('Success')) {
                    resolve(result);
                } else {
                    reject(new Error(result));
                }
            });
        });
    };
    
    // Initialize the extension
    initializeExtendScript();
});