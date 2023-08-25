import React, {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import Brick2x2 from "../const/Brick2x2";
import {useGLTF} from "@react-three/drei";
import {getRdmColor} from "../utilities";
import gsap from "gsap"

interface ArrowButton {
    dir: "left" | "right";
    action: (event: any) => void;
}

export const ArrowButton: React.FC<ArrowButton> = ({dir, action, ...props}) => {
    const { nodes } = useGLTF("./lego.glb");
    const ref = useRef();

    const d = dir == "left" ? 1 : -1;

    const click = (event) => {
        const tl = gsap.timeline();
        tl.to(ref.current.position, {
            x: 2,
            duration: 0.3,
        });
        tl.to(ref.current.position, {
            x: 0,
            duration: 0.3,
            onComplete: () => {action(event)}
        });
    }

    const hover = (enter) => () => {
        gsap.to(ref.current.position, {
            x: enter ? -1.5 : 0,
            duration: 0.2,
        });
    }

    return <group {...props}>
        <group ref={ref} onClick={click} onPointerEnter={hover(true)} onPointerLeave={hover(false)}>
            <mesh position={[0, Brick2x2.y, d*Brick2x2.z/2]} geometry={nodes.Lego.geometry}><meshLambertMaterial color={getRdmColor()}/></mesh>
            <mesh geometry={nodes.Lego.geometry}><meshLambertMaterial color={getRdmColor()}/></mesh>
            <mesh position={[0, -Brick2x2.y, d*Brick2x2.z/2]}  geometry={nodes.Lego.geometry}><meshLambertMaterial color={getRdmColor()}/></mesh>
        </group>
    </group>
}
