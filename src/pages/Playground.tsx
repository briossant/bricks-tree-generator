import {OrbitControls, useGLTF} from "@react-three/drei";
import {MOUSE, Vector2, Vector3} from "three";
import {useState} from "react";
import {useControls} from "leva";
import {presets} from "../treeGeneration/presets/presets";
import {BrickPlane} from "../brickRendering/BrickPlane";
import {BrickTree, LegoTreeSettings} from "../brickRendering/BrickTree";


export default function () {
    const {treeSize, preset, alignBricks} = useControls( {
        treeSize: {
            label: "Tree size",
            value: 7,
            min: 3,
            max: 18,
            step: 0.01
        },
        preset: {
            label: "Tree type",
            options: Object.keys(presets)
        },
        alignBricks: {
            label: "Align Bricks",
            value: true
        },
        controls: {
            value: "Left-click on the plane to spawn a tree.\nRight-click+drag to move around.\nScroll to zoom in.\nReload the page to reset.\nEnjoy :)",
            editable:false
        }
    })

    const getSettings: (startPos: Vector3) => LegoTreeSettings = (startPos) => {
        return {
            length: treeSize,
            startingPoint: startPos,
            preset: presets[preset],
            dontAlignBricks: !alignBricks,
            cooConstraints: (vec) => vec.y<=0
        }
    }
    const [trees, setTrees] = useState<Array<LegoTreeSettings>>([])



    const eventHandler = (event) =>
    {
        setTrees([...trees, getSettings(event.point)])
    }

    return <>

        <OrbitControls mouseButtons={{
            LEFT: MOUSE.PAN,
            MIDDLE: MOUSE.DOLLY,
            RIGHT: MOUSE.ROTATE
        }} enablePan={false} maxPolarAngle={2.2} />

        {trees.map((set,i) => <BrickTree key={i} {...set}/>)}

        <mesh scale={[200,200,1]} rotation={[-Math.PI/2,0,0]} onClick={eventHandler} >
            <planeGeometry/>
        </mesh>

        <BrickPlane size={new Vector2(130,130)} color={"#cbac70"}/>


    </>
}