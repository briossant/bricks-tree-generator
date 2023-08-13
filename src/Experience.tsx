import {OrbitControls} from "@react-three/drei";
import Placeholder from "./meshes/Placeholder";
import {Branch} from "./Branch";
import {Vector3} from "three";

export default function () {


    return <>

        <OrbitControls/>

        <Branch length={3} curvature={1} direction={new Vector3(0,0,0)} curvatureAngle={1} startingPoint={new Vector3(0,0,0)}/>

        <Placeholder/>

    </>
}