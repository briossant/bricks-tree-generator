import {BranchSettings} from "../Branch";
import {Vector3} from "three";
import { getRdmVector} from "../utilities";
import {parabolique} from "./CurveFunctions";

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


export const pinHeritage:HeritageFunctions = (params, lastPoint, lastDir) => {

    const {length, depth, functions} = params;

    return [{
        ...params,
        depth: depth+1,
        length: length/1.2,
        startingDirection: lastDir,
        startingPoint: lastPoint,
    },{
        ...params,
        depth: depth+1,
        length: length/1.6,
        startingDirection: new Vector3(lastDir.z, 0, -lastDir.x).normalize(),
        startingPoint: lastPoint,
        curvingDirection: new Vector3(0,-1,0),
        functions: {
            ...functions,
            curve: parabolique(Math.random() + 0.3)
        }
    },{
        ...params,
        depth: depth+1,
        length: length/1.6,
        startingDirection: new Vector3(-lastDir.z, 0, lastDir.x).normalize(),
        startingPoint: lastPoint,
        curvingDirection: new Vector3(0,-1,0),
        functions: {
            ...functions,
            curve: parabolique(Math.random() + 0.3)
        }
    }];
}

