import {BranchFunctions} from "../algorithm/Branch";
import {parabolique} from "../branchFunctions/CurveFunctions";
import {basicHeritage, pinHeritage, saulHeritage, upHeritage} from "../branchFunctions/HeritageFunctions";
import {classicColors, darkColors, saulColors, savannaColors} from "../branchFunctions/ColorationFunctions";
import {getRdmInt} from "../../utilities";


interface TreeDesc {
    latinName: string;
    engName: string;
    desc: string;
}
export interface Preset {
    lengthMul: number,
    fct: BranchFunctions;
    desc: TreeDesc;
    colors: Array<string>;
}
export const presets: { [name: string]: Preset} = {
    "Quercus": {
        lengthMul: 1,
        fct: {
            curve: parabolique(0.3),
            heritage: basicHeritage,
            coloration: classicColors
        },
        colors: ["#7e695d", "#8a7a62", "#918269"],
        desc: {
            desc: "",
            engName: "Oak",
            latinName: "Quercus"
        }
    },
    "Abies": {
        lengthMul: 0.9,
        fct: {
            curve: parabolique(2),
            heritage: pinHeritage,
            coloration: darkColors
        },
        colors: ["#c25252", "#b95454", "#b43d3d"],
        desc: {
            desc: "",
            engName: "Fir",
            latinName: "Abies"
        }
    },
    "Vachellia tortilis": {
        lengthMul: 1.6,
        fct: {
            curve: parabolique(0.3),
            heritage: upHeritage,
            coloration: savannaColors
        },
        colors: ["#989151", "#97a15a", "#a49763"],
        desc: {
            desc: "",
            engName: "Umbrella thorn acacia",
            latinName: "Vachellia tortilis"
        }
    },
    "Salix babylonica": {
        lengthMul: 1,
        fct: {
            curve: parabolique(0.3),
            heritage: saulHeritage,
            coloration: saulColors
        },
        colors: ["#4ebe68", "#61b671", "#468056", "#44b955",
            "#247c60", "#b4a893", "#b09d81", "#ad9a7d"],
        desc: {
            desc: "",
            engName: "Babylon willow",
            latinName: "Salix babylonica"
        }
    }
};
const presetsName = Object.keys(presets);
export const getRdmPresetName = () => presetsName[getRdmInt(0,presetsName.length)];