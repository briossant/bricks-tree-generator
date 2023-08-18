import {BranchSettings} from "../Branch";
import {Vector3} from "three";
import {getRdmColor, getRdmFloat, getRdmVector} from "../utilities";

export interface HeritageFunctions{
    (settings: BranchSettings, lastPoint: Vector3, lastDir:Vector3): Array<BranchSettings>
}

export const basicHeritage:HeritageFunctions = (params, lastPoint, lastDir) => {

    const {length, depth, startingDirection} = params;

    return [{
        ...params,
        depth: depth+1,
        length: length/1.2,
        startingDirection: lastDir,
        startingPoint: lastPoint,
        curvingDirection: getRdmVector(),
    },{
        ...params,
        depth: depth+1,
        length: length/1.3,
        startingDirection: lastDir.clone().applyAxisAngle(startingDirection, -Math.PI).normalize(),
        startingPoint: lastPoint,
        curvingDirection: getRdmVector(),
    }];
}
