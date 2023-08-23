import {MeshLambertMaterial, Object3D, Vector2} from "three";
import React, {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {useGLTF} from "@react-three/drei";
import Brick2x2 from "../const/Brick2x2";

interface BrickPlane {
    size: Vector2;
    color: string;
}

const tempBoxes = new Object3D();

export const BrickPlane: React.FC<BrickPlane> = ({ size,color}) => {
    const material = new MeshLambertMaterial({color:color});
    const ref = useRef();
    const { nodes } = useGLTF("./lego.glb");

    useFrame(( ) => {
        for (let x = 0; x < size.x*size.y; x++) {
            // @ts-ignore
            tempBoxes.position.set((Math.floor(x/size.x)-size.x/2)*Brick2x2.x, 0, ((x%size.x)-size.y/2)*Brick2x2.z);
            tempBoxes.updateMatrix();
            // @ts-ignore
            ref.current.setMatrixAt(x, tempBoxes.matrix);
        }
        // @ts-ignore
        ref.current.instanceMatrix.needsUpdate = true;
    });

    return <instancedMesh ref={ref} args={[nodes.Lego.geometry, material, size.x*size.y]} />;
}