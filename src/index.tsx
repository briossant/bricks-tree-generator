import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from "./Experience";

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        gl={{logarithmicDepthBuffer: true}}
        shadows
        camera={ {
            fov: 45,
            near: 1,
            far: 400,
            position: [ - 20, 10, 24 ]
        } }
    >
        <Experience/>
    </Canvas>
)