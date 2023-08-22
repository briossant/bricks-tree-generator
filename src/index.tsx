import './style.css'

import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from "./Experience";

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        shadows
        camera={ {
            fov: 45,
            near: 1,
            far: 400,
            position: [ - 100, 30, 48 ]
        } }
    >
        <Experience/>
    </Canvas>
)