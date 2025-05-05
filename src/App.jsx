import {useRef,useState, useEffect} from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'


function App() {
  const mountRef = useRef(null)
  const outerMeshRef = useRef(null)
  const [outerColor, setOuterColor] = useState('')

  useEffect(() => {
    const mount = mountRef.current

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#ffffff')

    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.set(40, 50, 50)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)

    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(5, 10, 7.5)
    scene.add(light)

    const loader = new GLTFLoader()
    loader.load(
      '/models/SheenHighHeel/glTF/SheenHighHeel.gltf',
      gltf => {
        const model = gltf.scene;
        
        model.traverse((child) => {
          if (child.isMesh && child.name === 'Outer') {
            outerMeshRef.current = child
          }
        });

        scene.add(model);
      },
      undefined,
      error => {
        console.error('GLTF load error:', error);
      }
    )

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate()

    return () => {
      mount.removeChild(renderer.domElement)
    };
  }, [])

  useEffect(() => {
    outerMeshRef.current?.material.color.set(outerColor)
  }, [outerColor])

  return (
    <div className='container'>
      <div ref={mountRef} className='model-wrapper' />

      <div className='color-button-container'>
        <p className='color-button-title'>색상 변경하기</p>
        
        <div className='color-button-wrapper'>
          <button className='color-button' style={{background: 'red'}} onClick={() => setOuterColor('red')}/>
          <button className='color-button' style={{background: 'orange'}} onClick={() => setOuterColor('orange')}/>
          <button className='color-button' style={{background: 'yellow'}} onClick={() => setOuterColor('yellow')}/>
          <button className='color-button' style={{background: 'green'}} onClick={() => setOuterColor('green')}/>
          <button className='color-button' style={{background: 'blue'}} onClick={() => setOuterColor('blue')}/>
          <button className='color-button' style={{background: 'indigo'}} onClick={() => setOuterColor('indigo')}/>
          <button className='color-button' style={{background: 'purple'}} onClick={() => setOuterColor('purple')}/>
      </div>
      </div>
    </div>
  )
}

export default App
