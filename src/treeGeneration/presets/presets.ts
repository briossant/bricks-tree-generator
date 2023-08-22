import {BranchFunctions} from "../algorithm/Branch";
import {parabolique} from "../branchFunctions/CurveFunctions";
import {basicHeritage, pinHeritage, upHeritage} from "../branchFunctions/HeritageFunctions";
import {classicColors, darkColors, savannaColors} from "../branchFunctions/ColorationFunctions";

export interface Preset {
    lengthMul: number, fct: BranchFunctions
}
export const presets: { [name: string]: Preset} = {
    "Quercus": {
        lengthMul: 1,
        fct: {
            curve: parabolique(0.3),
            heritage: basicHeritage,
            coloration: classicColors
        }
    },
    "Abies": {
        lengthMul: 0.9,
        fct: {
            curve: parabolique(2),
            heritage: pinHeritage,
            coloration: darkColors
        }
    },
    "Vachellia tortilis": {
        lengthMul: 1.6,
        fct: {
            curve: parabolique(0.3),
            heritage: upHeritage,
            coloration: savannaColors
        }
    }
};
