import React from "react";
import {Vector3} from "three";
import Placeholder from "./meshes/Placeholder";
import Brique from "./meshes/Brique";

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
    return rest >= snap/2 ? x+snap-rest : x-rest;
}

const snapCoordinates: (coo: Vector3, step: number, snap: Vector3) => [number, number, number] = (coo, step, snap) =>  {
    return [snapNumber(coo.x*step, snap.x), snapNumber(coo.y*step,snap.y), snapNumber(coo.z*step, snap.z)];
}

export const LineRenderer: React.FC<LineRendererSettings> = ({line, color, step, consts}) => {

    return <>
        {line.map(p => <Brique key={Math.random()+p.y} color={color} position={snapCoordinates(p, step, consts.snap)} scale={consts.scale} />)}
    </>
}