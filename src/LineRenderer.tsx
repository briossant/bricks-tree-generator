import React, {useEffect, useRef} from "react";
import { BoxGeometry, Vector3, Object3D, MeshToonMaterial} from "three";
import Brique from "./meshes/Brique";
import {useFrame} from "@react-three/fiber";
import {getRdmFloat} from "./utilities";

interface LineRendererSettings {
    line: Array<Vector3>,
    step: number,
    scale: number,
    snap: Vector3
}

const snapNumber: (x:number, snap:number) => number = (x, snap) => {
    const rest = x%snap;
    return (rest >= snap/2 ? x+snap-rest : x-rest) //+ getRdmFloat(0, snap/100);
}

const snapCoordinates: (coo: Vector3, step: number, snap: Vector3) => [number, number, number] = (coo, step, snap) =>  {
    return [snapNumber(coo.x*step, snap.x), snapNumber(coo.y*step,snap.y), snapNumber(coo.z*step, snap.z)];
}

const tempBoxes = new Object3D();

export const LineRenderer: React.FC<LineRendererSettings> = ({line, scale, step, snap}) => {
    const material = new MeshToonMaterial({ color: "green" });
    const boxesGeometry = new BoxGeometry(scale, scale, scale);

    const ref = useRef();

    useFrame(( ) => {
        for (let x = 0; x < line.length; x++) {
            const pos = snapCoordinates(line[x], step, snap);
            tempBoxes.position.set(...pos)
            tempBoxes.updateMatrix();
            // @ts-ignore
            ref.current.setMatrixAt(x, tempBoxes.matrix);
        }
        // @ts-ignore
        ref.current.instanceMatrix.needsUpdate = true;
    });

    return <instancedMesh ref={ref} args={[boxesGeometry, material, line.length]} />;
}