// @include "json2.js"

// Utility function for logging
function log(message) {
    $.writeln(message);
}

function createSequence(name, settings) {
    try {
        log("Creating sequence: " + name);
        var project = app.project;
        var sequence = project.createNewSequence(name, name);
        
        // Apply sequence settings
        var seqSettings = sequence.getSettings();
        for (var key in settings) {
            if (settings.hasOwnProperty(key)) {
                seqSettings[key] = settings[key];
            }
        }
        sequence.setSettings(seqSettings);
        
        log("Sequence created successfully");
        return "Success: Sequence created - " + name;
    } catch (error) {
        log("Error creating sequence: " + error.toString());
        return "Error: " + error.toString();
    }
}

function importAndOrganizeFootage(files, bins) {
    try {
        log("Starting footage import");
        var project = app.project;
        
        // Create main bin for the project
        var mainBin = project.rootItem.createBin("Wedding Project");
        log("Created main bin: Wedding Project");
        
        // Create category bins
        var categoryBins = {};
        for (var category in bins) {
            categoryBins[category] = mainBin.createBin(category);
            log("Created category bin: " + category);
        }
        
        // Import and organize files
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            log("Importing file: " + file.path);
            var importedItem = project.importFile(new ImportOptions(File(file.path)));
            
            if (file.category && categoryBins[file.category]) {
                importedItem.moveBin(categoryBins[file.category]);
                log("Moved file to category: " + file.category);
            }
        }
        
        log("Import completed successfully");
        return "Success: Files imported and organized";
    } catch (error) {
        log("Error importing footage: " + error.toString());
        return "Error: " + error.toString();
    }
}

function generateEdit(settings) {
    try {
        log("Starting edit generation with settings: " + JSON.stringify(settings));
        // Implementation of automatic edit generation
        // This will be expanded based on the existing React app's logic
        log("Edit generation completed");
        return "Success: Edit generated";
    } catch (error) {
        log("Error generating edit: " + error.toString());
        return "Error: " + error.toString();
    }
}