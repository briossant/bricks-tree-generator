import {BranchFunctions} from "../algorithm/Branch";
import {parabolique} from "../branchFunctions/CurveFunctions";
import {basicHeritage, pinHeritage, upHeritage} from "../branchFunctions/HeritageFunctions";
import {classicColors, darkColors, savannaColors} from "../branchFunctions/ColorationFunctions";

export const presets: { [name: string]: { lengthMul: number, fct: BranchFunctions }; } = {
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
