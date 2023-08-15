
export const getRdmInt: (min: number, max: number) => number = (min, max) => Math.floor(Math.random() * (max-min)) + min;
export const getRdmFloat: (min: number, max: number) => number = (min, max) => Math.random() * (max-min) + min;
export const getRdmColor: () => string = () => {
    const colors = ["green", "orange", "red", "blue", "lightblue", "yellow"]
    return colors[getRdmInt(0, colors.length)]
}
