const csInterface = new CSInterface();
let isProcessing = false;

// Inicializa a interface
function init() {
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', toggleProcessing);
    
    // Registra evento para receber atualizações do ExtendScript
    csInterface.addEventListener('com.weddingai.updateProgress', handleProgress);
}

// Alterna entre iniciar e parar o processamento
function toggleProcessing() {
    const startButton = document.getElementById('startButton');
    const statusElement = document.getElementById('status');
    
    if (!isProcessing) {
        isProcessing = true;
        startButton.textContent = 'Parar Edição';
        startButton.classList.add('processing');
        statusElement.textContent = 'Processando...';
        
        // Chama o script ExtendScript
        csInterface.evalScript('startProcessing()', function(result) {
            console.log('Processo iniciado:', result);
        });
    } else {
        isProcessing = false;
        startButton.textContent = 'Iniciar Edição';
        startButton.classList.remove('processing');
        statusElement.textContent = 'Processo interrompido';
        
        // Para o processamento
        csInterface.evalScript('stopProcessing()', function(result) {
            console.log('Processo parado:', result);
        });
    }
}

// Manipula as atualizações de progresso
function handleProgress(event) {
    const data = JSON.parse(event.data);
    const progressBar = document.querySelector('.progress');
    const progressText = document.getElementById('progressText');
    const statusElement = document.getElementById('status');
    
    progressBar.style.width = `${data.progress}%`;
    progressText.textContent = `${data.progress}%`;
    
    if (data.status) {
        statusElement.textContent = data.status;
    }
    
    if (data.progress >= 100) {
        completeProcess();
    }
}

// Finaliza o processo
function completeProcess() {
    isProcessing = false;
    const startButton = document.getElementById('startButton');
    const statusElement = document.getElementById('status');
    
    startButton.textContent = 'Iniciar Edição';
    startButton.classList.remove('processing');
    statusElement.textContent = 'Processo concluído!';
}

// Inicializa quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', init);