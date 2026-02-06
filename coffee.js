class Coffee {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = 2;
        this.color = '#6F4E37'; // Marrom café
        this.collected = false;
        this.hitGround = false;
    }

    update() {
        // Café cai para baixo
        this.y += this.speed;

        // Verificar se tocou o chão
        const canvas = document.getElementById('gameCanvas');
        if (this.y + this.radius >= canvas.height) {
            this.hitGround = true;
        }
    }

    draw(ctx) {
        // Desenhar grão de café como círculo
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Borda
        ctx.strokeStyle = '#3E2723';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Detalhe (linha no meio para parecer um grão)
        ctx.strokeStyle = '#4E342E';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x - this.radius * 0.6, this.y);
        ctx.lineTo(this.x + this.radius * 0.6, this.y);
        ctx.stroke();
    }

    getBounds() {
        return {
            x: this.x - this.radius,
            y: this.y - this.radius,
            width: this.radius * 2,
            height: this.radius * 2
        };
    }

    checkCollision(playerBounds) {
        const coffeeBounds = this.getBounds();
        
        return (
            coffeeBounds.x < playerBounds.x + playerBounds.width &&
            coffeeBounds.x + coffeeBounds.width > playerBounds.x &&
            coffeeBounds.y < playerBounds.y + playerBounds.height &&
            coffeeBounds.y + coffeeBounds.height > playerBounds.y
        );
    }
}
