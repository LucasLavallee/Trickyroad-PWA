import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  // BoxBufferGeometry,
  // MeshBasicMaterial,
  // Mesh,
  AmbientLight,
  // Color,
  LoadingManager,
  MeshPhongMaterial,
  PointLight
} from 'three'

import { OBJLoader } from '../loader/OBJLoader.js'

export default class ThreeJsController {
  constructor(canvas) {
    this.w = 598
    this.h = 455
    this.scene = new Scene()

    this.renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: canvas
    })
    this.t = 0
    this.renderer.setClearColor( 0x000000, 0 );
    this.camera = new PerspectiveCamera(50, this.w / this.h, 0.1, 1000)
    this.renderer.setSize(this.w, this.h)

    // this.geometry = new BoxBufferGeometry(1, 0.1, 1)
    // this.material = new MeshBasicMaterial({ color: 0xf533e3, wireframe: false})
    // this.map = new Mesh(this.geometry, this.material)
    // this.scene.add(this.map)
    this.scene.add(new AmbientLight(0xffffff, 0.7))
    this.light = new PointLight(0xffffcc, 1, 50)
    this.light.position.set(5,7,-1)
    this.scene.add(this.light)
    // this.scene.background = new Color(0xff000000)
    this.camera.position.set(-1, 1.2, 3)
    this.camera.rotation.set(-Math.PI / 12, -Math.PI / 10, 0)

    this.mouse = {x:0, y: 0}
    this.gyro = {x: 0, y: 0, z: 0}
    const self = this

    window.addEventListener('mousemove', (e) => {
      self.mouse.x = e.clientX
      self.mouse.y = e.clientY
    })
    window.addEventListener("devicemotion", (e) => {
      self.gyro.x = e.alpha
      self.gyro.y = e.beta
      self.gyro.z = e.gamma
    })
    window.addEventListener("touchmove", (e) => {
      self.mouse.x = e.changedTouches[0].pageX
      self.mouse.y = e.changedTouches[0].pageY
      e.preventDefault()
    })
    /* window.addEventListener("touchdown", (e) => {
      self.mouse.x = e.changedTouches[0].pageX
      self.mouse.y = e.changedTouches[0].pageY
    }) */
  }
  init(callback) {
    const self = this
    const loadModel = () => {}
    const manager = new LoadingManager(loadModel)
    const loader = new OBJLoader(manager)

    const onError = () => {console.log('error loading OBJ')}
    const onProgress = () => {}

    loader.load('./models/plateau3DTrickyRoad.obj', function (obj) {
      self.map = obj
      self.scene.add(self.map)
      self.computeMap()
      self.render()
      callback()
    }, onProgress, onError)
  }
  computeMap() {
    const geo = this.map.children[0]
    const mat = geo.material
    for(let i = 0; i < mat.length; i++) {
      switch(mat[i].name) {
        case 'BarreDrapeau':
          mat[i] = new MeshPhongMaterial({color: 0x333333, shininess: 0, flatShading: true})
          break;
        case 'Drapeau':
          mat[i] = new MeshPhongMaterial({color: 0xbb2030, shininess: 0, flatShading: true})
          break;
        case 'Herbe':
          mat[i] = new MeshPhongMaterial({color: 0x44AA77, shininess: 0, flatShading: true})
          break;
        case 'TerreProfonde':
          mat[i] = new MeshPhongMaterial({color: 0xffa050, shininess: 0, flatShading: true})
          break;
        case 'TerreSurface':
          mat[i] = new MeshPhongMaterial({color: 0x442010, shininess: 0, flatShading: true})
          break;
      }
    }
  }
  render () {
    this.t++
    this.renderer.render(this.scene, this.camera)
    const self = this

    if(this.gyro.x != 0 || this.gyro.y != 0 || this.gyro.z != 0) {
      this.map.rotation.set(-Math.PI / 12 +  (this.gyro.y) * Math.PI / 4,  -Math.PI / 10 + (this.gyro.x) * Math.PI / 4 + this.t / 200, 0)
    } else if (this.mouse.x != 0 || this.mouse.y != 0) {
      this.map.rotation.set((this.mouse.y / this.h - 1) * Math.PI / 4,  -Math.PI / 10 + (this.mouse.x / this.w - 0.5) * Math.PI / 4 + this.t / 200, 0)
    } else {
      this.map.rotation.set(0,  -Math.PI / 10 + this.t / 200, 0)
    }
    setTimeout(() => {
      self.render()
    }, 50)

    // const painted = Painted(this.renderer);
    // painted.render(this.scene, this.camera);
  }
}