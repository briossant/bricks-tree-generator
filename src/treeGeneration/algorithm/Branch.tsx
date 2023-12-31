import * as React from "react";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Vector3} from "three";
import {CurveFunction} from "../branchFunctions/CurveFunctions";
import {HeritageFunctions} from "../branchFunctions/HeritageFunctions";
import {ColorationFunctions} from "../branchFunctions/ColorationFunctions";

export interface BranchFunctions {
    curve: CurveFunction;
    heritage: HeritageFunctions;
    coloration: ColorationFunctions;
}

export interface BranchSettings {
    length: number;
    startingDirection: Vector3;
    curvingDirection: Vector3;
    startingPoint: Vector3;

    setLine: Dispatch<SetStateAction<Array<Vector3>>>;
    setColors: Dispatch<SetStateAction<Array<string>>>;

    depth: number;
    functions: BranchFunctions;
}

const step = 1;

export const Branch: React.FC<BranchSettings> = (params) => {
    const {length, startingDirection, setColors, curvingDirection, startingPoint, setLine, functions} = params;
    const [I, setI] = useState<number>(length);
    const [lastPoint, setLastPoint] = useState<Vector3>(startingPoint);

    const [subBranches, setSubBranches] = useState<Array<BranchSettings>>([]);

    useEffect(() => {
        if (I <= step/10 ) {
            if (length>step) setSubBranches(functions.heritage(params, lastPoint,
                (functions.curve(I+step, length, curvingDirection).add(startingDirection).normalize())));
            return;
        }
        setI(I-step);

        const dir = (functions.curve(I, length, curvingDirection).add(startingDirection).normalize());
        const p = dir.clone().add(lastPoint)
        setLastPoint(p);
        setLine((line) => [...line, p]);
        setColors((colors) => [...colors, functions.coloration({length, step, dir})]);
    }, [I]);

    return <>
        {subBranches.map((br,i) => <Branch key={i} {...br} />)}
    </>
}