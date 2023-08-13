import {BranchSettings} from "../Branch";
import {Vector3} from "three";

export interface HeritageFunctions{
    (settings: BranchSettings, line: Array<Vector3>): Array<BranchSettings>
}

export const basicHeritage:HeritageFunctions = ({length, startingDirection, startingPoint, functions, curvingDirection}, line) => {

    const endPoint = line[line.length-1];
    const st_dir = new Vector3(0,0,0).add(endPoint).normalize();

    return [{
        length: length/1.7,
        startingDirection: st_dir,
        startingPoint: endPoint,
        functions: functions,
        curvingDirection: new Vector3(Math.random(), 0, Math.random())
    },{
        length: length/1.3,
        startingDirection: startingDirection,
        startingPoint: endPoint,
        functions: functions,
        curvingDirection: new Vector3(Math.random(), 0, Math.random())
    }];
}
