import * as React from "react";
import {useEffect, useState} from "react";
import {Vector3} from "three";
import {LineRenderer} from "./LineRenderer";

interface BranchSettings {
    length: number;
    curvature: number;
    direction: Vector3;
    curvatureAngle: number;
    startingPoint: Vector3;
}

export const Branch: React.FC<BranchSettings> = ({length, curvature, startingPoint}) => {
    const [line, setLine] = useState<Array<Vector3>>([startingPoint]);
    const [i, seti] = useState<number>(length)

    useEffect(() => {
        if (i <=0 ) return;
        const p = new Vector3(0,1,0).add(line[line.length-1]);
        setLine([...line, p]);
        seti(i-1);
    }, [i])

    return <>
        <LineRenderer line={line}/>
    </>
}