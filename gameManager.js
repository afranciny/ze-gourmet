class GameManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.state = 'menu'; // menu, playing, gameOver
        
        // Configurações do jogo
        this.score = 0;
        this.coffeeSpawnTimer = 0;
        this.coffeeSpawnInterval = 120; // Frames até spawnar próximo café (aproximadamente 2 segundos a 60fps)
        
        // Inicializar player
        this.player = new Player(
            canvas.width / 2 - 25,
            canvas.height - 80,
            50,
            60
        );
        
        // Array de grãos de café
        this.coffees = [];
        
        // Controles
        this.keys = {};
        this.setupControls();
        
        // Game loop
        this.lastTime = 0;
        this.gameLoop = this.gameLoop.bind(this);
    }

    setupControls() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        };
    }

    start() {
        this.state = 'playing';
        this.score = 0;
        this.coffees = [];
        this.coffeeSpawnTimer = 0;
        this.coffeeSpawnInterval = 120; // Resetar intervalo
        this.player.x = this.canvas.width / 2 - 25;
        document.getElementById('menu').classList.add('hidden');
        document.getElementById('gameOver').classList.add('hidden');
        this.lastTime = performance.now();
        requestAnimationFrame(this.gameLoop);
    }

    gameOver() {
        this.state = 'gameOver';
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('gameOver').classList.remove('hidden');
    }

    spawnCoffee() {
        const radius = 12;
        const x = Math.random() * (this.canvas.width - radius * 2) + radius;
        const y = -radius;
        this.coffees.push(new Coffee(x, y, radius));
    }

    update() {
        if (this.state !== 'playing') return;

        // Atualizar player
        this.player.update(this.keys);

        // Spawn de café
        this.coffeeSpawnTimer++;
        if (this.coffeeSpawnTimer >= this.coffeeSpawnInterval) {
            this.spawnCoffee();
            this.coffeeSpawnTimer = 0;
            // Reduzir intervalo gradualmente para aumentar dificuldade
            this.coffeeSpawnInterval = Math.max(60, this.coffeeSpawnInterval - 1);
        }

        // Atualizar café
        const playerBounds = this.player.getBounds();
        for (let i = this.coffees.length - 1; i >= 0; i--) {
            const coffee = this.coffees[i];
            coffee.update();

            // Verificar colisão com player
            if (coffee.checkCollision(playerBounds) && !coffee.collected) {
                coffee.collected = true;
                this.score += 10;
                this.coffees.splice(i, 1);
                continue;
            }

            // Verificar se tocou o chão
            if (coffee.hitGround) {
                this.gameOver();
                return;
            }
        }
    }

    draw() {
        // Limpar canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.state === 'playing') {
            // Desenhar chão
            this.ctx.fillStyle = '#8B7355';
            this.ctx.fillRect(0, this.canvas.height - 20, this.canvas.width, 20);
            this.ctx.strokeStyle = '#654321';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(0, this.canvas.height - 20, this.canvas.width, 20);

            // Desenhar player
            this.player.draw(this.ctx);

            // Desenhar café
            this.coffees.forEach(coffee => {
                coffee.draw(this.ctx);
            });

            // Desenhar pontuação
            this.ctx.fillStyle = '#000';
            this.ctx.font = 'bold 24px Courier New';
            this.ctx.fillText(`Pontuação: ${this.score}`, 10, 30);
        }
    }

    gameLoop(currentTime) {
        if (this.state !== 'playing') return;

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.update();
        this.draw();

        requestAnimationFrame(this.gameLoop);
    }
}
