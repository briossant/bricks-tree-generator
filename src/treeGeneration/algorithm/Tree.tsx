import React, {useState} from "react";
import {Vector3} from "three";
import {Branch, BranchFunctions} from "./Branch";
import {cooConstraints, LineRenderer} from "../../brickRendering/LineRenderer";
import {getRdmVector} from "../../utilities";

export interface TreeSettings {
    length: number;
    step: number;
    geometry: any;
    startingPoint: Vector3;
    snap: Vector3;

    cooConstraints: cooConstraints;
    functions: BranchFunctions;
}

export const Tree: React.FC<TreeSettings> = ({length, step, startingPoint,functions, cooConstraints,geometry,snap}) => {
    const [line, setLine] = useState<Array<Vector3>>([]);
    const [colors, setColors] = useState<Array<string>>([]);

    startingPoint.divide(new Vector3(step, step, step));

    return <>
        <Branch
            length={length}
            step={step}
            startingDirection={new Vector3(0,1,0)}
            curvingDirection={getRdmVector()}
            startingPoint={startingPoint}
            setLine={setLine}
            depth={0}
            functions={functions}
            setColors={setColors}
        />
        <LineRenderer line={line} colors={colors} step={step} snap={snap} geometry={geometry}  cooConstraints={cooConstraints}/>
    </>
}