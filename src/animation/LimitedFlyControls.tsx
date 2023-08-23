import {FlyControls} from "@react-three/drei";
import {useMemo, useRef} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import {MathUtils, Vector2, Vector3} from "three";

interface LimitedFlyControls {
    initPos: Vector3,
    amplitude?:Vector2;
    speed?:number;
}
export default function ({initPos, amplitude = new Vector2(6,8), speed= 0.02}: LimitedFlyControls) {
    const {camera} = useThree();

    useMemo(() => {
        camera.position.set(initPos.x,initPos.y,initPos.z);
        camera.lookAt(0,0,0);
    },[])

    useFrame((state,delta) => {
        camera.position.y += (initPos.y + state.mouse.y * amplitude.y - camera.position.y) * speed;
        camera.position.z += (initPos.z + state.mouse.x * amplitude.x - camera.position.z) * speed;
    });

    return <></>
}