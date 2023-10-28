import VideoProcessor from './videoProcessor.js'
import Mp4DeMuxer from './mp4Demuxer.js'
import CanvasRender from './canvasRender.js'

const qvgaConstraints = {
  width: 320,
  height: 240,
}

const vgaConstraints = {
  width: 640,
  height: 480,
}

const hdConstraints = {
  width: 1280,
  height: 720,
}

const encoderConfig = {
  ...qvgaConstraints,
  bitrate: 10e6, //velocidade que o arquivo vai ser processado. 1mega por segundo nesse caso
  // webM
  codec: 'vp09.00.10.08',
  pt: 4,
  hardwareAcceleration: 'prefer-software',
  // //mp4
  // codec: 'avc.42002A',
  // pt: 1,
  // hardwareAcceleration: 'prefer-hardware',
  // avc: { format: 'annexb'}
}

const mp4Demuxer = new Mp4DeMuxer({})

const videoProcessor = new VideoProcessor({
  mp4Demuxer,
})

onmessage = async ({ data }) => {
  const renderFrame = CanvasRender.getRenderer(data.canvas)

  await videoProcessor.start({
    file: data.file,
    renderFrame,
    encoderConfig,
    sendMessage(message) {
      self.postMessage(message)
    },
  })

  self.postMessage({
    status: 'done',
  })

}
