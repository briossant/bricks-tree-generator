import React from "react";
import {Vector3} from "three";
import Placeholder from "./meshes/Placeholder";

interface LineRendererSettings {
    line: Array<Vector3>,
    step: number,
    color: string
}

export const LineRenderer: React.FC<LineRendererSettings> = ({line, step, color}) => {


    return <>
        {line.map(p => <Placeholder key={Math.random()+p.y} color={color} position={[p.x*step, p.y*step, p.z*step]} scale={step} />)}
    </>
}