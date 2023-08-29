import React, {useRef} from "react";
import gsap from "gsap";
import {Center, Text3D} from "@react-three/drei";
import {BrickWall} from "../brickRendering/BrickWall";
import {Vector2} from "three";
import {getRdmColor} from "../utilities";

interface TextButton {
    name: string;
    randomColor?: boolean;
    color?: string;
}

const Lettre = ({color, x, lettre}) => {
    const ref = useRef();

    const enter = () => {
        gsap.to(ref.current.rotation, {
            y: Math.PI*2,
            duration: 0.6,
            onComplete: () => {ref.current.rotation.y = 0},
        });
    }

    return <>
        <Center ref={ref} onPointerEnter={enter} top position-x={x}>
            <Text3D  font={"./Kievit_Bold Italic.json"} >{lettre}
                <meshLambertMaterial color={color}/>
            </Text3D>
        </Center>

    </>
}

export const Title: React.FC<TextButton> = ({name, randomColor= true, color, ...props}) => {

    return <group {...props}>
        {name.split("").map((lettre, i) =>
            <Lettre key={i} lettre={lettre} color={randomColor ? getRdmColor() : color} x={i/1.3}/>
        )}
    </group>
}
