import {BranchSettings} from "../algorithm/Branch";
import {Vector2, Vector3} from "three";
import {getRdmFloat, getRdmVector} from "../../utilities";
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

    const {length, depth} = params;

    if (length < 5 && depth > 5) return [{
        ...params,
        depth: depth+1,
        length: length/(1.3+Math.random()/3),
        startingDirection:  new Vector3(getRdmFloat(-1,1), Math.random(), getRdmFloat(-1,1)),
        startingPoint: lastPoint,
        curvingDirection: new Vector3(0,1,0),
    },{
        ...params,
        depth: depth+1,
        length: 0.5,
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
        startingDirection:  new Vector3(rot.x, 1/length, rot.y),
        startingPoint: lastPoint,
        curvingDirection: new Vector3(0,1,0),
    },{
        ...params,
        depth: depth+1,
        length: length/(1.3+Math.random()/3),
        startingDirection:  new Vector3(rot2.x, 1/length, rot2.y),
        startingPoint: lastPoint,
        curvingDirection: new Vector3(0,1,0),
    },{
        ...params,
        depth: depth+1,
        length: length/(1.2+Math.random()/3),
        startingDirection: new Vector3(-lastDir.x, 1/length, -lastDir.z),
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





export const saulHeritage:HeritageFunctions = (settings, lastPoint, lastDir) => {
    let {length, depth, startingDirection, startLen = length, functions} = settings;

    if (length < 2 && startLen > 0) {
        length = startLen;
        startLen = -42;
    }

    if (startLen < -1) return [{
        ...settings,
        startLen: startLen,
        depth: depth+1,
        length: length/1.4,
        startingDirection: new Vector3(lastDir.x, lastDir.y-1, lastDir.z).normalize(),
        startingPoint: lastPoint,
        curvingDirection: getRdmVector(),
        functions: {
            ...functions,
            curve: parabolique(2.3)
        }
    }]

    return [{
        ...settings,
        startLen: startLen,
        depth: depth+1,
        length: length/1.2,
        startingDirection: lastDir,
        startingPoint: lastPoint,
        curvingDirection: getRdmVector(),
    },{
        ...settings,
        startLen: startLen,
        depth: depth+1,
        length: length/1.3,
        startingDirection: lastDir.clone().applyAxisAngle(startingDirection, -Math.PI).normalize(),
        startingPoint: lastPoint,
        curvingDirection: getRdmVector(),
    }];
}
