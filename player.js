class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 5;
        this.color = '#8B4513'; // Marrom para o fazendeiro
        this.hatColor = '#FFD700'; // Dourado para o chapéu
    }

    update(keys) {
        // Movimento horizontal
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
            this.x -= this.speed;
        }
        if (keys['ArrowRight'] || keys['d'] || keys['D']) {
            this.x += this.speed;
        }

        // Limitar movimento dentro da tela
        const canvas = document.getElementById('gameCanvas');
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width;
        }
    }

    draw(ctx) {
        // Corpo do fazendeiro (retângulo)
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Chapéu (retângulo menor no topo)
        ctx.fillStyle = this.hatColor;
        ctx.fillRect(this.x - 5, this.y - 10, this.width + 10, 15);

        // Detalhes do chapéu (linha)
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x - 5, this.y - 10, this.width + 10, 15);

        // Olhos (dois pontos)
        ctx.fillStyle = '#000';
        ctx.fillRect(this.x + 5, this.y + 5, 3, 3);
        ctx.fillRect(this.x + this.width - 8, this.y + 5, 3, 3);

        // Borda do corpo
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}
