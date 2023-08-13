import {BranchSettings} from "../Branch";
import {Vector3} from "three";

export interface HeritageFunctions{
    (settings: BranchSettings): BranchSettings
}

export const basicHeritage:HeritageFunctions = ({length, startingDirection, startingPoint, functions, curvingDirection}) => {

    return {
        length: Math.floor(length/1.5),
        startingDirection: new Vector3(0,1,0),
        startingPoint: startingPoint,
        functions: functions,
        curvingDirection: new Vector3(Math.random(), 0, Math.random())
    }
}
