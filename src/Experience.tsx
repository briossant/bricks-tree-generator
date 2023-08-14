import {OrbitControls} from "@react-three/drei";
import Placeholder from "./meshes/Placeholder";
import {Branch, BranchFunctions} from "./Branch";
import {Vector3} from "three";
import {parabolique} from "./BranchFunctions/CurveFunctions";
import {midSplit} from "./BranchFunctions/SplittingFunctions";
import {basicHeritage} from "./BranchFunctions/HeritageFunctions";

export default function () {

    const fcts: BranchFunctions = {
        curve: parabolique,
        heritage: basicHeritage
    }


    return <>

        <OrbitControls/>

        <Branch length={2} depth={0} startingDirection={new Vector3(0.1,1,0.05)} curvingDirection={new Vector3(0.1,0,0.5)} startingPoint={new Vector3(0,0,0)} functions={fcts}  step={0.2}/>

        <Placeholder scale={0.5} color={"red"}/>

    </>
}