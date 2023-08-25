import React, {useRef} from "react";
import {Text3D} from "@react-three/drei";
import {BrickWall} from "../brickRendering/BrickWall";
import {Vector2} from "three"
import gsap from 'gsap'
import BlackText from "./BlackText";

interface TextButton {
    name: string;
    action: (event: any) => void;
}

export const TextButton: React.FC<TextButton> = ({name, action, ...props}) => {

    const ref = useRef();
    const click = (event) => {
        gsap.to(ref.current.position, {
            z: -2,
            duration: 0.3,
            onComplete: () => action(event)
        });
    }

    const enter = () => {
        gsap.to(ref.current.rotation, {
            x: Math.PI*2,
            duration: 0.6,
            onComplete: () => {ref.current.rotation.x = 0},
        });
    }


    return <group {...props} onClick={click} onPointerEnter={enter}>
        <group ref={ref}>
            <BlackText position={[0.1,-0.3,0.7]}>
                {name}
            </BlackText>
            <BrickWall size={new Vector2(Math.floor(name.length/2+1), 3)} align={"center-left"}/>
        </group>
    </group>
}
