import React, {useState} from "react";
import {Vector3} from "three";
import {Branch, BranchFunctions} from "./Branch";
import {LineRenderer} from "./LineRenderer";

export interface TreeSettings {
    length: number;
    step: number;
    geometry: any;
    startingDirection: Vector3;
    curvingDirection: Vector3;
    startingPoint: Vector3;
    snap: Vector3;

    functions: BranchFunctions;
}

export const Tree: React.FC<TreeSettings> = ({length, step,curvingDirection,
                 startingDirection,startingPoint,functions,geometry,snap}) => {
    const [line, setLine] = useState<Array<Vector3>>([]);
    const [colors, setColors] = useState<Array<string>>([]);

    startingPoint.divide(new Vector3(step, step, step));

    return <>
        <Branch
            length={length}
            step={step}
            startingDirection={startingDirection}
            curvingDirection={curvingDirection}
            startingPoint={startingPoint}
            setLine={setLine}
            depth={0}
            functions={functions}
            setColors={setColors}
        />
        <LineRenderer line={line} colors={colors} step={step} snap={snap} geometry={geometry} />
    </>
}