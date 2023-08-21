import {OrbitControls, useGLTF} from "@react-three/drei";
import {BranchFunctions} from "./Branch";
import {Vector3} from "three";
import {parabolique} from "./BranchFunctions/CurveFunctions";
import {basicHeritage, pinHeritage} from "./BranchFunctions/HeritageFunctions";
import {useState} from "react";
import {Grid} from "./grid";
import {Tree, TreeSettings} from "./Tree";
import {Perf} from "r3f-perf";
import {useControls} from "leva";
import {classicColors} from "./BranchFunctions/ColorationFunctions";


const fcts: { [name: string]: BranchFunctions } = {
    "basic": {
        curve: parabolique(0.3),
        heritage: basicHeritage,
        coloration: classicColors
    },
    "pin": {
        curve: parabolique(2),
        heritage: pinHeritage,
        coloration: classicColors
    }
}



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

    const {length, preset} = useControls( {
        length: {
            value: 4,
            min: 3,
            max: 20,
            step: 0.01
        },
        preset: {
            options: Object.keys(fcts)
        }
    })

    const getSettings: (startPos: Vector3) => TreeSettings = (startPos) => {
        return {
            length: length,
            step: scale,
            snap: new Vector3(0.79, 0.98, 0.79),
            geometry: nodes.Lego.geometry,
            startingPoint: startPos,
            functions:fcts[preset],
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
            <meshToonMaterial/>
        </mesh>

        <directionalLight color={"#ffffff"} castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04}/>
        <ambientLight intensity={0.5}/>

    </>
}