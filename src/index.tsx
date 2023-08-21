import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from "./Experience";
import {Grid} from "./treeGeneration/algorithm/grid";
import {Vector3} from "three";

const root = ReactDOM.createRoot(document.querySelector('#root'))
Grid.newGrid(new Vector3(5000,5000,100));

root.render(
    <Canvas
        gl={{logarithmicDepthBuffer: true}}
        shadows
        camera={ {
            fov: 45,
            near: 1,
            far: 400,
            position: [ - 40, 40, 48 ]
        } }
    >
        <Experience/>
    </Canvas>
)