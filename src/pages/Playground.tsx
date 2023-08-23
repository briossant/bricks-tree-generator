import {OrbitControls, useGLTF} from "@react-three/drei";
import {Vector2, Vector3} from "three";
import {useState} from "react";
import {useControls} from "leva";
import {presets} from "../treeGeneration/presets/presets";
import {BrickPlane} from "../brickRendering/BrickPlane";
import {BrickTree, LegoTreeSettings} from "../brickRendering/BrickTree";

// todo :
// todo : more randomness ; presets

export default function () {
    const {treeSize, preset} = useControls( {
        treeSize: {
            value: 7,
            min: 3,
            max: 20,
            step: 0.01
        },
        preset: {
            options: Object.keys(presets)
        }
    })

    const getSettings: (startPos: Vector3) => LegoTreeSettings = (startPos) => {
        return {
            length: treeSize,
            startingPoint: startPos,
            preset: presets[preset],
            cooConstraints: (vec) => vec.y<=0
        }
    }
    const [trees, setTrees] = useState<Array<LegoTreeSettings>>([getSettings(new Vector3(0,0,0))])



    const eventHandler = (event) =>
    {
        setTrees([...trees, getSettings(event.point)])
    }

    return <>

        <OrbitControls  />

        {trees.map((set,i) => <BrickTree key={i} {...set}/>)}

        <mesh scale={[200,200,1]} rotation={[-Math.PI/2,0,0]} onClick={eventHandler} >
            <planeGeometry/>
        </mesh>

        <BrickPlane size={new Vector2(130,130)} color={"#cbac70"}/>


    </>
}