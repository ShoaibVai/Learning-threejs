export class Game {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private player: { x: number; y: number; vx: number; vy: number; size: number }

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas
    this.ctx = ctx

    this.player = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: 100,
      vy: 80,
      size: 20
    }

    this.setupInput()
  }

  private setupInput() {
    const keys: Record<string, boolean> = {}

    window.addEventListener('keydown', (e) => {
      keys[e.code] = true
    })

    window.addEventListener('keyup', (e) => {
      keys[e.code] = false
    })

    // Make keys accessible to update method
    ;(this as any).keys = keys
  }

  update(deltaTime: number) {
    const keys = (this as any).keys
    const speed = 200

    // Keyboard movement
    if (keys['ArrowLeft'] || keys['KeyA']) this.player.x -= speed * deltaTime
    if (keys['ArrowRight'] || keys['KeyD']) this.player.x += speed * deltaTime
    if (keys['ArrowUp'] || keys['KeyW']) this.player.y -= speed * deltaTime
    if (keys['ArrowDown'] || keys['KeyS']) this.player.y += speed * deltaTime

    // Bouncing ball movement
    this.player.x += this.player.vx * deltaTime
    this.player.y += this.player.vy * deltaTime

    // Bounce off edges
    if (this.player.x <= 0 || this.player.x >= this.canvas.width) {
      this.player.vx *= -1
    }
    if (this.player.y <= 0 || this.player.y >= this.canvas.height) {
      this.player.vy *= -1
    }

    // Keep in bounds
    this.player.x = Math.max(0, Math.min(this.canvas.width, this.player.x))
    this.player.y = Math.max(0, Math.min(this.canvas.height, this.player.y))
  }

  render() {
    // Clear canvas
    this.ctx.fillStyle = '#1a1a2e'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // Draw player
    this.ctx.fillStyle = '#00ff88'
    this.ctx.beginPath()
    this.ctx.arc(this.player.x, this.player.y, this.player.size, 0, Math.PI * 2)
    this.ctx.fill()

    // Instructions
    this.ctx.fillStyle = 'white'
    this.ctx.font = '16px Arial'
    this.ctx.fillText('Use WASD or Arrow Keys to move', 10, 30)
  }
}
