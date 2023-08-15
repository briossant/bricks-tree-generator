import {OrbitControls} from "@react-three/drei";
import Placeholder from "./meshes/Placeholder";
import {Branch, BranchFunctions} from "./Branch";
import {Vector3} from "three";
import {parabolique} from "./BranchFunctions/CurveFunctions";
import {midSplit} from "./BranchFunctions/SplittingFunctions";
import {basicHeritage} from "./BranchFunctions/HeritageFunctions";
import {LineRendererConst} from "./LineRenderer";

export default function () {

    const fcts: BranchFunctions = {
        curve: parabolique,
        heritage: basicHeritage
    }

    const consts: LineRendererConst = {
        snap: new Vector3(0.1, 0.2, 0.1),
        scale: 0.2
    }

    return <>

        <OrbitControls/>

        <Branch
            length={2}
            depth={0}
            step={0.4}
            startingDirection={new Vector3(0.1,1,0.05)}
            curvingDirection={new Vector3(0.1,0,0.5)}
            startingPoint={new Vector3(0,0,0)}
            functions={fcts}
            lineRendererConst={consts}
        />

        <Placeholder scale={0.5} color={"red"}/>

        <directionalLight color={"#ffffff"} castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04}/>
        <ambientLight intensity={0.5}/>

    </>
}