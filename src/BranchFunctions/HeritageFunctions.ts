import {BranchSettings} from "../Branch";
import {Vector3} from "three";
import {getRdmColor, getRdmFloat, getRdmVector} from "../utilities";

export interface HeritageFunctions{
    (settings: BranchSettings, line: Array<Vector3>): Array<BranchSettings>
}

export const basicHeritage:HeritageFunctions = (params, line) => {

    const {length, depth, startingDirection} = params;

    const endPoint = line[line.length-1];
    const st_dir = endPoint.clone().sub(line[line.length-2]);

    return [{
        ...params,
        color: getRdmColor(),
        depth: depth+1,
        length: length/1.2,
        startingDirection: st_dir,
        startingPoint: endPoint,
        curvingDirection: getRdmVector(),
    },{
        ...params,
        color: getRdmColor(),
        depth: depth+1,
        length: length/1.3,
        startingDirection: st_dir.clone().applyAxisAngle(startingDirection, -Math.PI).normalize(),
        startingPoint: endPoint,
        curvingDirection: getRdmVector(),
    }];
}
