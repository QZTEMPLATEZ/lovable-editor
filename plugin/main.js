
const app = require('./dist/index.js');

function init() {
    try {
        app.initializePlugin();
        console.log('Wedding Video AI Plugin initialized successfully');
    } catch (error) {
        console.error('Failed to initialize plugin:', error);
    }
}

init();
