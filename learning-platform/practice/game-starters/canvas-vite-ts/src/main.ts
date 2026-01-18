import './style.css'
import { Game } from './game'

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d')!

const game = new Game(canvas, ctx)

let lastTime = 0
let fps = 0
let frameCount = 0
let lastFpsUpdate = 0

function gameLoop(timestamp: number) {
  const deltaTime = (timestamp - lastTime) / 1000
  lastTime = timestamp

  // FPS calculation
  frameCount++
  if (timestamp >= lastFpsUpdate + 1000) {
    fps = frameCount
    frameCount = 0
    lastFpsUpdate = timestamp
    const fpsElement = document.getElementById('fps')
    if (fpsElement) fpsElement.textContent = `FPS: ${fps}`
  }

  game.update(deltaTime)
  game.render()

  requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)
