import {OrbitControls} from "@react-three/drei";
import Placeholder from "./meshes/Placeholder";
import {Branch, BranchFunctions, BranchSettings} from "./Branch";
import {Vector3} from "three";
import {parabolique} from "./BranchFunctions/CurveFunctions";
import {basicHeritage} from "./BranchFunctions/HeritageFunctions";
import {LineRendererConst} from "./LineRenderer";
import {useState} from "react";

export default function () {

    const fcts: BranchFunctions = {
        curve: parabolique,
        heritage: basicHeritage
    }

    const consts: LineRendererConst = {
        snap: new Vector3(0.1, 0.2, 0.1),
        scale: 0.4
    }

    const seti: BranchSettings = {
        length:2,
        depth:0,
        step:0.4,
        startingDirection:new Vector3(0.1,1,0.05),
        curvingDirection:new Vector3(0.1,0,0.5),
        startingPoint:new Vector3(0,0,0),
        functions:fcts,
        lineRendererConst:consts
    }

    const [branches, setBranches] = useState<Array<BranchSettings>>([{...seti}])

    const eventHandler = (event) =>
    {
        console.log(event)
        setBranches([...branches, {...seti, startingPoint: event.point}])
    }

    return <>

        <OrbitControls/>

        {branches.map(set => <Branch key={Math.random()} {...set}/>)}

        <mesh scale={[20,20,1]} rotation={[-Math.PI/2,0,0]} onClick={eventHandler} >
            <planeGeometry/>
            <meshToonMaterial/>
        </mesh>

        <Placeholder scale={0.5} color={"red"}/>
        <directionalLight color={"#ffffff"} castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04}/>
        <ambientLight intensity={0.5}/>

    </>
}