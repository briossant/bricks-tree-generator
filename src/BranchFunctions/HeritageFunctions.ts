import {BranchSettings} from "../Branch";
import {Vector3} from "three";
import {getRdmColor} from "../utilities";

export interface HeritageFunctions{
    (settings: BranchSettings, line: Array<Vector3>): Array<BranchSettings>
}

export const basicHeritage:HeritageFunctions = (params, line) => {

    const {length, depth} = params;

    const endPoint = line[line.length-1];
    const st_dir = new Vector3(1.1,1,1.1).multiply(endPoint).sub(line[line.length-2]).normalize();

    return [{
        ...params,
        color: getRdmColor(),
        depth: depth+1,
        length: length/1.3,
        startingDirection: st_dir,
        startingPoint: endPoint,
        curvingDirection: new Vector3(Math.random(), 0, Math.random()),
    },{
        ...params,
        color: getRdmColor(),
        depth: depth+1,
        length: length/1.5,
        startingDirection: new Vector3(2*(Math.random()-0.5), Math.random(), 2*(Math.random()-0.5)),
        startingPoint: endPoint,
        curvingDirection: new Vector3(Math.random(), 0, Math.random()),
    }];
}
