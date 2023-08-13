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
        splitting: midSplit,
        heritage: basicHeritage
    }


    return <>

        <OrbitControls/>

        <Branch length={50} startingDirection={new Vector3(0,1,0)} curvingDirection={new Vector3(0.1,0,0.5)} startingPoint={new Vector3(0,0,0)} functions={fcts} />

        <Placeholder scale={0.5} color={"red"}/>

    </>
}