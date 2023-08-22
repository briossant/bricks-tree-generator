import {MeshLambertMaterial, Object3D, Vector2} from "three";
import React, {useRef} from "react";
import {useFrame} from "@react-three/fiber";

interface BrickPlane {
    geometry: any;
    scale: number;
    size: Vector2;
    color: string;
}

const tempBoxes = new Object3D();

export const BrickPlane: React.FC<BrickPlane> = ({geometry, scale, size,color}) => {
    const material = new MeshLambertMaterial({color:color});
    const ref = useRef();

    useFrame(( ) => {
        for (let x = 0; x < size.x*size.y; x++) {
            // @ts-ignore
            tempBoxes.position.set((Math.floor(x/size.x)-size.x/2)*scale, 0, ((x%size.y)-size.y/2)*scale);
            tempBoxes.updateMatrix();
            // @ts-ignore
            ref.current.setMatrixAt(x, tempBoxes.matrix);
        }
        // @ts-ignore
        ref.current.instanceMatrix.needsUpdate = true;
    });

    return <instancedMesh ref={ref} args={[geometry, material, size.x*size.y]} />;
}