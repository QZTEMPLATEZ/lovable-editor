/**
 * Versão simplificada do CSInterface.js
 * Este é apenas um exemplo básico. Na implementação real,
 * você deve usar o CSInterface.js completo fornecido pelo Adobe CEP SDK
 */
function CSInterface() {
    this.hostEnvironment = {
        appName: "PPRO",
        appVersion: "23.0"
    };
}

CSInterface.prototype.evalScript = function(script, callback) {
    // Implementação simplificada
    if (callback) {
        callback("success");
    }
};

CSInterface.prototype.addEventListener = function(type, callback) {
    document.addEventListener(type, callback);
};

CSInterface.prototype.removeEventListener = function(type, callback) {
    document.removeEventListener(type, callback);
};