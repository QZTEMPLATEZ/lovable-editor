// Variáveis globais
var isProcessing = false;

// Função principal para iniciar o processamento
function startProcessing() {
    if (isProcessing) return "Já está em processamento";
    
    isProcessing = true;
    var progress = 0;
    
    // Simula um processo em etapas
    processNextStep(progress);
    
    return "Processamento iniciado";
}

// Processa a próxima etapa
function processNextStep(progress) {
    if (!isProcessing || progress >= 100) {
        isProcessing = false;
        return;
    }
    
    // Incrementa o progresso
    progress += 10;
    
    // Envia atualização para o painel HTML
    var eventObj = {
        progress: progress,
        status: "Processando etapa " + (progress/10) + " de 10"
    };
    
    dispatchEvent(eventObj);
    
    // Agenda a próxima etapa
    if (progress < 100) {
        $.sleep(1000); // Espera 1 segundo
        processNextStep(progress);
    }
}

// Para o processamento
function stopProcessing() {
    isProcessing = false;
    return "Processamento interrompido";
}

// Função auxiliar para disparar eventos
function dispatchEvent(obj) {
    var xLib = new ExternalObject("lib:\PlugPlugExternalObject");
    var eventObj = new CSXSEvent();
    
    eventObj.type = "com.weddingai.updateProgress";
    eventObj.data = JSON.stringify(obj);
    
    eventObj.dispatch();
}