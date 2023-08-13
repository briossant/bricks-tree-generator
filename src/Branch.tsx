import * as React from "react";
import {useEffect, useState} from "react";
import {Vector3} from "three";
import {LineRenderer} from "./LineRenderer";
import {CurveFunction} from "./BranchFunctions/CurveFunctions";
import {SplittingFunctions} from "./BranchFunctions/SplittingFunctions";
import {HeritageFunctions} from "./BranchFunctions/HeritageFunctions";

export interface BranchFunctions {
    curve: CurveFunction;
    splitting : SplittingFunctions;
    heritage: HeritageFunctions;
}

export interface BranchSettings {
    length: number;
    startingDirection: Vector3;
    curvingDirection: Vector3;
    startingPoint: Vector3;

    functions: BranchFunctions;
}

export const Branch: React.FC<BranchSettings> = (params) => {
    const {length, startingDirection,curvingDirection, startingPoint, functions} = params;
    const [line, setLine] = useState<Array<Vector3>>([startingPoint]);
    const [I, setI] = useState<number>(length);

    const [subBranches, setSubBranches] = useState<Array<BranchSettings>>([]);

    useEffect(() => {
        if (I <=0 ) return;
        setI(I-1);

        const p = (functions.curve(I, length, curvingDirection).add(startingDirection).normalize()).add(line[line.length-1]);
        setLine([...line, p]);

        if (functions.splitting(I, length)){
            setSubBranches([...subBranches, functions.heritage(params)])
        }
    }, [I])

    return <>
        <LineRenderer line={line}/>
        {subBranches.map(br => <Branch key={Math.random()} {...br} />)}
    </>
}