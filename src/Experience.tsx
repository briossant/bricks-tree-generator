import {OrbitControls} from "@react-three/drei";
import Placeholder from "./meshes/Placeholder";
import {Branch, BranchFunctions, BranchSettings} from "./Branch";
import {Vector3} from "three";
import {parabolique} from "./BranchFunctions/CurveFunctions";
import {basicHeritage} from "./BranchFunctions/HeritageFunctions";
import {useState} from "react";
import {getRdmVector} from "./utilities";
import {Grid} from "./grid";
import {Tree, TreeSettings} from "./Tree";
import {Perf} from "r3f-perf";


const fcts: BranchFunctions = {
    curve: parabolique,
    heritage: basicHeritage
}

const getSettings: (startPos: Vector3) => TreeSettings = (startPos) => {
    return {
        length:2,
        step: 0.4,
        snap: new Vector3(0.1, 0.2, 0.1),
        scale: 0.4,
        startingDirection:new Vector3(0,1,0),
        curvingDirection:getRdmVector(),
        startingPoint: startPos,
        functions:fcts,
    }
}

// todo: add model for the bricks ; stop rendering brick in one an other
// todo : maybe voxel grid or coordinate list ; more randomness ; presets

export default function () {
    const [trees, setTrees] = useState<Array<TreeSettings>>([getSettings(new Vector3(0,0,0))])

    Grid.newGrid(new Vector3(5000,5000,100));

    const eventHandler = (event) =>
    {
        setTrees([...trees, getSettings(event.point)])
    }

    return <>

        <Perf/>

        <OrbitControls/>

        {trees.map((set,i) => <Tree key={i} {...set}/>)}

        <mesh scale={[200,200,1]} rotation={[-Math.PI/2,0,0]} onClick={eventHandler} >
            <planeGeometry/>
            <meshToonMaterial/>
        </mesh>

        <Placeholder scale={0.5} color={"red"}/>
        <directionalLight color={"#ffffff"} castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04}/>
        <ambientLight intensity={0.5}/>

    </>
}