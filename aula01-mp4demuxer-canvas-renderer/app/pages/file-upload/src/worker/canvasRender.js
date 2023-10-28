
/** @param {HTMLCanvasElement} canvas */
let _canvas = {}
let _ctx = {}


export default class CanvasRender {



  /** @param {VideoFrame} frame */
  static draw(frame) {
    const {displayHeight, displayWidth} = frame
    _canvas.width = displayWidth
    _canvas.height = displayHeight
    _ctx.drawImage(
      frame,
      0, 0, displayWidth, displayHeight
    )
    frame.close()
  }

  static getRenderer(canvas) {
    const renderer = this
    let pedingFrame = null
    
    _canvas = canvas
    _ctx = canvas.getContext('2d')

    return frame => {
      const renderAnimationFrame = () => {
        renderer.draw(pedingFrame)
        pedingFrame = null
      }
      if (!pedingFrame) {
        requestAnimationFrame(renderAnimationFrame)
      } else {
        pedingFrame.close()
      }
      pedingFrame = frame
    }
  }
}