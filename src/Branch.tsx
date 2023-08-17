import * as React from "react";
import {useEffect, useState} from "react";
import {Vector3} from "three";
import {LineRenderer, LineRendererConst} from "./LineRenderer";
import {CurveFunction} from "./BranchFunctions/CurveFunctions";
import {HeritageFunctions} from "./BranchFunctions/HeritageFunctions";
import {getRdmColor} from "./utilities";

export interface BranchFunctions {
    curve: CurveFunction;
    heritage: HeritageFunctions;
}

export interface BranchSettings {
    length: number;
    step: number;
    startingDirection: Vector3;
    curvingDirection: Vector3;
    startingPoint: Vector3;
    color?: string;
    depth: number; // int

    functions: BranchFunctions;
    lineRendererConst: LineRendererConst
}


export const Branch: React.FC<BranchSettings> = (params) => {
    const {length, step, lineRendererConst, color = getRdmColor(), startingDirection,curvingDirection, startingPoint, functions} = params;
    const [line, setLine] = useState<Array<Vector3>>([startingPoint]);
    const [I, setI] = useState<number>(length);

    const [subBranches, setSubBranches] = useState<Array<BranchSettings>>([]);

    useEffect(() => {
        if (I <=0 ) {
            if (length>step) setSubBranches(functions.heritage(params, line));
            return;
        }
        setI(I-step);

        const p = (functions.curve(I, length, curvingDirection).add(startingDirection).normalize()).add(line[line.length-1]);
        setLine([...line, p]);

    }, [I]);

    return <>
        <LineRenderer color={color} consts={lineRendererConst} step={step} line={line} />
        {subBranches.map((br,i) => <Branch key={i} {...br} />)}
    </>
}