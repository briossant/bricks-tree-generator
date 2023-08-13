import React from "react";
import {Vector3} from "three";
import Placeholder from "./meshes/Placeholder";

interface LineRendererSettings {
    line: Array<Vector3>
}

export const LineRenderer: React.FC<LineRendererSettings> = ({line}) => {


    return <>
        {line.map(p => <Placeholder key={Math.random()+p.y} position={p} />)}
    </>
}