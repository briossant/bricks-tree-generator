import {BranchSettings} from "../Branch";
import {Vector2, Vector3} from "three";
import {getRdmFloat, getRdmVector} from "../utilities";
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


export const upHeritage:HeritageFunctions = (params, lastPoint, lastDir) => {

    const {length, depth, step} = params;

    if (length < 5*step && depth > 5) return [{
        ...params,
        depth: depth+1,
        length: length/(1.3+Math.random()/3),
        startingDirection:  new Vector3(getRdmFloat(-1,1), Math.random(), getRdmFloat(-1,1)),
        startingPoint: lastPoint,
        curvingDirection: new Vector3(0,1,0),
    },{
        ...params,
        depth: depth+1,
        length: step/2,
        startingDirection: new Vector3(getRdmFloat(-1,1), Math.random(), getRdmFloat(-1,1)),
        startingPoint: lastPoint,
        curvingDirection: new Vector3(0,1,0),
    }];

    const rot = new Vector2(lastDir.x, lastDir.z).rotateAround(new Vector2(0,0), Math.PI/3)
    const rot2 = new Vector2(lastDir.x, lastDir.z).rotateAround(new Vector2(0,0), -Math.PI/3)

    return [{
        ...params,
        depth: depth+1,
        length: length/(1.3+Math.random()/3),
        startingDirection:  new Vector3(rot.x, step/length, rot.y),
        startingPoint: lastPoint,
        curvingDirection: new Vector3(0,1,0),
    },{
        ...params,
        depth: depth+1,
        length: length/(1.3+Math.random()/3),
        startingDirection:  new Vector3(rot2.x, step/length, rot2.y),
        startingPoint: lastPoint,
        curvingDirection: new Vector3(0,1,0),
    },{
        ...params,
        depth: depth+1,
        length: length/(1.2+Math.random()/3),
        startingDirection: new Vector3(-lastDir.x, step/length, -lastDir.z),
        startingPoint: lastPoint,
        curvingDirection: new Vector3(0,1,0),
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

