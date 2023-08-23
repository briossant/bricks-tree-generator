import {Vector3} from "three";

export const getRdmInt: (min: number, max: number) => number = (min, max) => Math.floor(Math.random() * (max-min)) + min;
export const getRdmFloat: (min: number, max: number) => number = (min, max) => Math.random() * (max-min) + min;
export const getRdmColor: (exclude?: Array<string>) => string = (exclude = []) => {
    const colors = ["#FC97AC", "#F3C305", "#3bcb3b",
        "#039CBD", "#ce7373", "#9C9C9C"];
    if (exclude.length >= colors.length) return "black";
    let choice = colors[getRdmInt(0, colors.length)];
    while (exclude.includes(choice)){
        choice = colors[getRdmInt(0, colors.length)];
    }
    return choice;
}

export const getRdmVector: () => Vector3 = () => new Vector3(getRdmFloat(-1,1), getRdmFloat(-1,1), getRdmFloat(-1,1)).normalize();

