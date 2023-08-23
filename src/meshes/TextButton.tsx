import React from "react";
import {Text3D} from "@react-three/drei";
import {BrickWall} from "../brickRendering/BrickWall";
import {Vector2} from "three"
import {getRdmColor} from "../utilities";

interface TextButton {
    name: string;
    action: (event: any) => void;
}

export const TextButton: React.FC<TextButton> = ({name, action, ...props}) => {

    const color = getRdmColor();
    const textColor = getRdmColor([color]);

    const click = (event) => {
        action(event);
    }

    return <group {...props} onClick={click}>
        <Text3D font={"./Alice_Regular.json"} position={[0.1,-0.2,1]}>{name}
            <meshLambertMaterial color={textColor}/>
        </Text3D>
        <BrickWall size={new Vector2(Math.floor(name.length/2+1), 3)} color={color} align={"center-left"}/>
    </group>
}
