import {Color, MeshLambertMaterial, Object3D, Vector2} from "three";
import React, {useRef} from "react";
import {useGLTF} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import Brick2x2 from "../const/Brick2x2";
import {getRdmColor} from "../utilities";

interface BrickWall {
    size: Vector2;
    randomColor?: boolean
    color?: string;
    align?: "center" | "center-left" | "bottom-left";
}

const tempBoxes = new Object3D();

export const BrickWall: React.FC<BrickWall> = ({size, randomColor = true,color , align= "center"}) => {
    const material = randomColor? new MeshLambertMaterial() : new MeshLambertMaterial({color:color});
    const ref = useRef();
    const { nodes } = useGLTF("./lego.glb");

    let offset: Vector2;
    switch (align) {
        case "center":
            offset = new Vector2(-size.x/2, -size.y/2);
            break;
        case "center-left":
            offset = new Vector2(0, -(size.y-1)/2);
            break;
        case "bottom-left":
            offset = new Vector2(0, 0);
            break;
    }
    const colors = [];
    if (randomColor){
        for (let i = 0; i <size.x*size.y; i++) {
            colors.push(new Color(getRdmColor()));
        }
    }

    useFrame(( ) => {
        for (let i = 0; i < size.x*size.y; i++) {
            const y = Math.floor(i/size.x);
            const x = i%size.x + (y%2 == 0 ? 1/2 : 0);
            // @ts-ignore
            tempBoxes.position.set((x+offset.x)*Brick2x2.x, (y+offset.y)*Brick2x2.y, 0);
            tempBoxes.updateMatrix();
            // @ts-ignore
            ref.current.setMatrixAt(i, tempBoxes.matrix);
            if (randomColor) ref.current.setColorAt(i, colors[i]);
        }
        // @ts-ignore
        ref.current.instanceMatrix.needsUpdate = true;
    });

    return <instancedMesh ref={ref} args={[nodes.Lego.geometry, material, size.x*size.y]} />;
}