import * as React from "react";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Vector3} from "three";
import {CurveFunction} from "./BranchFunctions/CurveFunctions";
import {HeritageFunctions} from "./BranchFunctions/HeritageFunctions";

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

    setLine: Dispatch<SetStateAction<Array<Vector3>>>;

    depth: number;
    functions: BranchFunctions;
}


export const Branch: React.FC<BranchSettings> = (params) => {
    const {length, step, startingDirection,curvingDirection, startingPoint, setLine, functions} = params;
    const [I, setI] = useState<number>(length);
    const [lastPoint, setLastPoint] = useState<Vector3>(startingPoint);

    const [subBranches, setSubBranches] = useState<Array<BranchSettings>>([]);

    useEffect(() => {
        if (I <=0 ) {
            if (length>step) setSubBranches(functions.heritage(params, lastPoint,
                (functions.curve(I+step, length, curvingDirection).add(startingDirection).normalize())));
            return;
        }
        setI(I-step);

        const p = (functions.curve(I, length, curvingDirection).add(startingDirection).normalize()).add(lastPoint);
        setLastPoint(p);
        setLine((line) => [...line, p]);

    }, [I]);

    return <>
        {subBranches.map((br,i) => <Branch key={i} {...br} />)}
    </>
}