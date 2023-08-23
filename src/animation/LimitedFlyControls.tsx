import {FlyControls} from "@react-three/drei";
import {useMemo, useRef} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import {MathUtils} from "three";

export default function ({amplitude = 6, speed= 0.02}) {
    const {camera} = useThree();


    const initPos = useMemo(()=>camera.position.clone(), []);


    useFrame((state,delta) => {
        camera.position.y += (initPos.y + state.mouse.y * amplitude - camera.position.y) * speed;
        camera.position.z += (initPos.z + state.mouse.x * amplitude - camera.position.z) * speed;
    });

    return <></>
}