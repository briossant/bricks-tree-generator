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
        colors: ["#55b00a", "#3b7907", "#0ab034", "#5f7c24", "#247c3a"],
        desc: {
            desc: "An oak is a tree or shrub in the genus Quercus (/ˈkwɜːrkəs/;[1] Latin \"oak tree\") of the beech family, Fagaceae. There are approximately 500 extant species of oaks.[2] The common name \"oak\" also appears in the names of species in related genera, notably Lithocarpus (stone oaks), as well as in those of unrelated species such as Grevillea robusta (silky oaks) and the Casuarinaceae (she-oaks). The genus Quercus is native to the Northern Hemisphere and includes deciduous and evergreen species extending from cool temperate to tropical latitudes in the Americas, Asia, Europe, and North Africa. North America has the largest number of oak species, with approximately 160 species in Mexico, of which 109 are endemic and about 90 in the United States. The second greatest area of oak diversity is China, with approximately 100 species.",
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
        colors: ["#2f6007", "#3b7907", "#16622a", "#4c641b"],
        desc: {
            desc: "",
            engName: "",
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
        colors: ["#b09f0a", "#795d07", "#9ab00a", "#a8964c"],
        desc: {
            desc: "",
            engName: "",
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
        colors: ["#4ebe68", "#61b671", "#468056", "#44b955", "#247c60", "#6e675a", "#796c59", "#796c58"],
        desc: {
            desc: "",
            engName: "",
            latinName: "Salix babylonica"
        }
    }
};
const presetsName = Object.keys(presets);
export const getRdmPresetName = () => presetsName[getRdmInt(0,presetsName.length)];