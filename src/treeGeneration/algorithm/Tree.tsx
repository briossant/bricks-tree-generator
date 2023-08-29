import React, {useState} from "react";
import {Vector3} from "three";
import {Branch, BranchFunctions} from "./Branch";
import {cooConstraints, LineRenderer} from "../../brickRendering/LineRenderer";
import {getRdmVector} from "../../utilities";

export interface TreeSettings {
    length: number;
    geometry: any;
    startingPoint: Vector3;
    snap: Vector3;
    scale: number;
    doSnap?: boolean;

    cooConstraints: cooConstraints;
    functions: BranchFunctions;
}

export const Tree: React.FC<TreeSettings> = ({length, scale, doSnap=true, startingPoint,functions, cooConstraints,geometry,snap}) => {
    const [line, setLine] = useState<Array<Vector3>>([]);
    const [colors, setColors] = useState<Array<string>>([]);

    startingPoint.divide(new Vector3(scale, scale, scale));

    return <>
        <Branch
            length={length}
            startingDirection={new Vector3(0,1,0)}
            curvingDirection={getRdmVector()}
            startingPoint={startingPoint}
            setLine={setLine}
            depth={0}
            functions={functions}
            setColors={setColors}
        />
        <LineRenderer doSnap={doSnap} line={line} colors={colors} scale={scale} snap={snap} geometry={geometry}  cooConstraints={cooConstraints}/>
    </>
}