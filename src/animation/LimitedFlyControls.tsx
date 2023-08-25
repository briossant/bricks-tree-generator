import {FlyControls} from "@react-three/drei";
import {useMemo, useRef} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import {MathUtils, Vector2, Vector3} from "three";
import {defaultCamPos} from "../const/style";

interface LimitedFlyControls {
    initPos?: [number, number, number],
    amplitude?:Vector2;
    speed?:number;
}
export default function ({initPos = defaultCamPos, amplitude = new Vector2(6,8), speed= 0.02}: LimitedFlyControls) {
    const {camera} = useThree();

    /*setMemo(() => {
        camera.position.set(...initPos);
        camera.lookAt(0,0,0);
    },[]);*/

    useFrame((state,delta) => {
        camera.position.y += (initPos[1] + state.mouse.y * amplitude.y - camera.position.y) * speed;
        camera.position.z += (initPos[2] + state.mouse.x * amplitude.x - camera.position.z) * speed;
    });

    return <></>
}