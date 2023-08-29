import React, {useRef} from "react";
import {useFrame} from "@react-three/fiber";

interface Kebab {
    speed?: number;
}


export const Kebab: React.FC<Kebab> = ({speed = 1, children}) => {
    const ref = useRef();

    useFrame((state, delta) => {
        ref.current.rotation.y += 0.01 * speed * delta;
    });

    return <group ref={ref}>
        {children}
    </group>
}
