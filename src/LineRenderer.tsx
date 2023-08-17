import React, {useEffect, useRef} from "react";
import { BoxGeometry, Vector3, Object3D, MeshToonMaterial} from "three";
import Brique from "./meshes/Brique";
import {useFrame} from "@react-three/fiber";
import {getRdmFloat} from "./utilities";

export interface LineRendererConst {
    snap: Vector3,
    scale: number
}

interface LineRendererSettings {
    line: Array<Vector3>,
    color: string,
    step: number,
    consts: LineRendererConst
}

const snapNumber: (x:number, snap:number) => number = (x, snap) => {
    const rest = x%snap;
    return (rest >= snap/2 ? x+snap-rest : x-rest) + getRdmFloat(0, snap/100);
}

const snapCoordinates: (coo: Vector3, step: number, snap: Vector3) => [number, number, number] = (coo, step, snap) =>  {
    return [snapNumber(coo.x*step, snap.x), snapNumber(coo.y*step,snap.y), snapNumber(coo.z*step, snap.z)];
}

const tempBoxes = new Object3D();

export const LineRenderer: React.FC<LineRendererSettings> = ({line, color, step, consts}) => {
    const material = new MeshToonMaterial({ color: color });
    const boxesGeometry = new BoxGeometry(consts.scale, consts.scale, consts.scale);

    const ref = useRef();

    useEffect(( ) => {
        for (let x = 0; x < line.length; x++) {
            const pos = snapCoordinates(line[x], step, consts.snap);
            tempBoxes.position.set(...pos)
            tempBoxes.updateMatrix();
            // @ts-ignore
            ref.current.setMatrixAt(x, tempBoxes.matrix);
        }
        // @ts-ignore
        ref.current.instanceMatrix.needsUpdate = true;
    }, []);

    return <instancedMesh ref={ref} args={[boxesGeometry, material, line.length]} />;
}