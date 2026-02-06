// Inicialização do jogo
let gameManager;

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    
    // Configurar tamanho do canvas
    canvas.width = 800;
    canvas.height = 600;
    
    // Criar gerenciador do jogo
    gameManager = new GameManager(canvas);
    
    // Botão de iniciar
    document.getElementById('startButton').addEventListener('click', () => {
        gameManager.start();
    });
    
    // Botão de reiniciar
    document.getElementById('restartButton').addEventListener('click', () => {
        gameManager.start();
    });
    
    // Permitir iniciar com Enter
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && gameManager.state === 'menu') {
            gameManager.start();
        }
        if (e.key === 'Enter' && gameManager.state === 'gameOver') {
            gameManager.start();
        }
    });
});
