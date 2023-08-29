import {Vector3} from "three";

export interface ParametableCurveFunction {
    (strength?: number): CurveFunction;
}

export interface CurveFunction {
    (i: number, length: number, curvingDirection: Vector3): Vector3;
}

export const parabolique: ParametableCurveFunction = (strength= 0.3) =>  (i, length, curvingDirection) => {
    const h = 0;
    const k = 0;
    const p = strength;

    const x = (1-i/length) * 5;
    const y =  Math.pow(x - h,2)/(4*p) + k;

    return new Vector3(y,y,y).multiply(curvingDirection).multiplyScalar(0.03);
}

