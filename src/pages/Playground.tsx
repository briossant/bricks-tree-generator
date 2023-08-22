import {OrbitControls, useGLTF} from "@react-three/drei";
import {Vector2, Vector3} from "three";
import {useState} from "react";
import {Perf} from "r3f-perf";
import {useControls} from "leva";
import {presets} from "../treeGeneration/presets/presets";
import {Tree, TreeSettings} from "../treeGeneration/algorithm/Tree";
import {BrickPlane} from "../brickRendering/BrickPlane";

// todo :
// todo : more randomness ; presets

export default function () {
    const scale = 1;
    // @ts-ignore
    const { nodes } = useGLTF("./lego.glb");
    const [hasBeenScaled, setHasBeenScaled] = useState<boolean>(false);
    if (!hasBeenScaled){
        nodes.Lego.geometry.scale(scale,scale,scale);
        setHasBeenScaled(true);
    }

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

    const getSettings: (startPos: Vector3) => TreeSettings = (startPos) => {
        return {
            length: treeSize * presets[preset].lengthMul,
            step: scale,
            snap: new Vector3(0.79, 0.98, 0.79),
            geometry: nodes.Lego.geometry,
            startingPoint: startPos,
            functions: presets[preset].fct,
            cooConstraints: (vec) => vec.y<=0
        }
    }
    const [trees, setTrees] = useState<Array<TreeSettings>>([getSettings(new Vector3(0,0,0))])



    const eventHandler = (event) =>
    {
        setTrees([...trees, getSettings(event.point)])
    }

    return <>

        <Perf position="top-left"/>

        <OrbitControls/>

        {trees.map((set,i) => <Tree key={i} {...set}/>)}

        <mesh scale={[200,200,1]} rotation={[-Math.PI/2,0,0]} onClick={eventHandler} >
            <planeGeometry/>
        </mesh>

        <BrickPlane geometry={nodes.Lego.geometry} scale={1.58} size={new Vector2(130,130)} color={"#cbac70"}/>

        <directionalLight color={"#ffffff"} castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04}/>
        <ambientLight intensity={0.5}/>

    </>
}