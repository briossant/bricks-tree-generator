import {OrbitControls} from "@react-three/drei";
import Placeholder from "./meshes/Placeholder";
import {Branch, BranchFunctions, BranchSettings} from "./Branch";
import {Vector3} from "three";
import {parabolique} from "./BranchFunctions/CurveFunctions";
import {basicHeritage} from "./BranchFunctions/HeritageFunctions";
import {LineRendererConst} from "./LineRenderer";
import {useState} from "react";
import {getRdmVector} from "./utilities";


const fcts: BranchFunctions = {
    curve: parabolique,
    heritage: basicHeritage
}

const consts: LineRendererConst = {
    snap: new Vector3(0.1, 0.2, 0.1),
    scale: 0.4
}

const getSettings: (Vector3) => BranchSettings = (startPos) => {
    const step = 0.4
    return {
        length:2,
        depth:0,
        step:step,
        startingDirection:new Vector3(0,1,0),
        curvingDirection:getRdmVector(),
        startingPoint: startPos.divide(new Vector3(step,step,step)),
        functions:fcts,
        lineRendererConst:consts
    }
}

// todo: stop recalculating all trees when adding a new one ; add model for the bricks ; stop rendering brick in one an other
// todo : maybe voxel grid or coordinate list ; more randomness ; presets

export default function () {
    const [branches, setBranches] = useState<Array<BranchSettings>>([getSettings(new Vector3(0,0,0))])

    const eventHandler = (event) =>
    {
        setBranches([...branches, getSettings(event.point)])
    }

    return <>

        <OrbitControls/>

        {branches.map(set => <Branch key={Math.random()} {...set}/>)}

        <mesh scale={[200,200,1]} rotation={[-Math.PI/2,0,0]} onClick={eventHandler} >
            <planeGeometry/>
            <meshToonMaterial/>
        </mesh>

        <Placeholder scale={0.5} color={"red"}/>
        <directionalLight color={"#ffffff"} castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04}/>
        <ambientLight intensity={0.5}/>

    </>
}