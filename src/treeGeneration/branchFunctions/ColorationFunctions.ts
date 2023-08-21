import {getRdmInt} from "../../utilities";

export interface ColorationFunctions {
    (length: number, step: number): string
}

export const classicColors: ColorationFunctions = (length, step) => {
    const greens = ["#55b00a", "#3b7907", "#0ab034", "#5f7c24", "#247c3a"];
    const browns = ["#4f322b", "#482118", "#4f402b"];

    return length < 2*step ? greens[getRdmInt(0,greens.length-1)] : browns[getRdmInt(0,browns.length-1)]
}


export const darkColors: ColorationFunctions = (length, step) => {
    const greens = ["#2f6007", "#3b7907", "#16622a", "#4c641b"];
    const browns = ["#4f322b", "#482118", "#4f402b"];

    return length < 2*step ? greens[getRdmInt(0,greens.length-1)] : browns[getRdmInt(0,browns.length-1)]
}

export const savannaColors: ColorationFunctions = (length, step) => {
    const greens = ["#b09f0a", "#795d07", "#9ab00a", "#a8964c"];
    const browns = ["#4f322b", "#482118", "#4f402b"];

    return length < 2*step ? greens[getRdmInt(0,greens.length-1)] : browns[getRdmInt(0,browns.length-1)]
}

