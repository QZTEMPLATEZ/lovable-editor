document.addEventListener('DOMContentLoaded', function() {
    const csInterface = new CSInterface();
    
    // Initialize communication with ExtendScript
    function initializeExtendScript() {
        console.log('Initializing ExtendScript communication');
        csInterface.evalScript('typeof JSON !== "undefined"', function(result) {
            if (result === 'true') {
                console.log('ExtendScript environment ready');
                // Dispatch ready event
                csInterface.dispatchEvent({ type: 'com.wedding.editor.ready' });
            } else {
                console.error('ExtendScript environment not ready');
            }
        });
    }
    
    // Handle sequence creation
    window.createPremiereSequence = function(config) {
        console.log('Creating sequence with config:', config);
        return new Promise((resolve, reject) => {
            const jsx = `createSequence("${config.name}", ${JSON.stringify(config)})`;
            csInterface.evalScript(jsx, function(result) {
                if (result && result.startsWith('Success')) {
                    console.log('Sequence created:', result);
                    resolve(result);
                } else {
                    console.error('Sequence creation failed:', result);
                    reject(new Error(result));
                }
            });
        });
    };
    
    // Handle footage import and organization
    window.importAndOrganizeFootage = function(files, bins) {
        console.log('Importing footage:', files, 'bins:', bins);
        return new Promise((resolve, reject) => {
            const jsx = `importAndOrganizeFootage(${JSON.stringify(files)}, ${JSON.stringify(bins)})`;
            csInterface.evalScript(jsx, function(result) {
                if (result && result.startsWith('Success')) {
                    console.log('Footage imported:', result);
                    resolve(result);
                } else {
                    console.error('Footage import failed:', result);
                    reject(new Error(result));
                }
            });
        });
    };
    
    // Handle edit generation
    window.generatePremiereEdit = function(settings) {
        console.log('Generating edit with settings:', settings);
        return new Promise((resolve, reject) => {
            const jsx = `generateEdit(${JSON.stringify(settings)})`;
            csInterface.evalScript(jsx, function(result) {
                if (result && result.startsWith('Success')) {
                    console.log('Edit generated:', result);
                    resolve(result);
                } else {
                    console.error('Edit generation failed:', result);
                    reject(new Error(result));
                }
            });
        });
    };
    
    // Initialize the extension
    initializeExtendScript();
    
    // Add development mode indicator
    if (process.env.NODE_ENV === 'development') {
        console.log('Running in development mode');
        const devIndicator = document.createElement('div');
        devIndicator.style.position = 'fixed';
        devIndicator.style.bottom = '10px';
        devIndicator.style.right = '10px';
        devIndicator.style.padding = '5px';
        devIndicator.style.background = '#4CAF50';
        devIndicator.style.color = 'white';
        devIndicator.style.borderRadius = '3px';
        devIndicator.style.fontSize = '12px';
        devIndicator.textContent = 'DEV MODE';
        document.body.appendChild(devIndicator);
    }
});