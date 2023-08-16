import {Vector3} from "three";

export const getRdmInt: (min: number, max: number) => number = (min, max) => Math.floor(Math.random() * (max-min)) + min;
export const getRdmFloat: (min: number, max: number) => number = (min, max) => Math.random() * (max-min) + min;
export const getRdmColor: () => string = () => {
    const colors = ["green", "orange", "red", "blue", "lightblue", "yellow"]
    return colors[getRdmInt(0, colors.length)]
}

export const getRdmVector: () => Vector3 = () => new Vector3(getRdmFloat(-1,1), getRdmFloat(-1,1), getRdmFloat(-1,1)).normalize();

