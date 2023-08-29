import {BranchFunctions} from "../algorithm/Branch";
import {parabolique} from "../branchFunctions/CurveFunctions";
import {basicHeritage, pinHeritage, saulHeritage, upHeritage} from "../branchFunctions/HeritageFunctions";
import {classicColors, darkColors, saulColors, savannaColors} from "../branchFunctions/ColorationFunctions";
import {getRdmInt} from "../../utilities";


interface TreeDesc {
    latinName: string;
    engName: string;
    size: string;
    origins: string;
    notes: Array<string>;
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
            origins: "northern hemisphere",
            size: "20 to 50 meters",
            engName: "Oak",
            latinName: "Quercus",
            notes: ["Highly appreciated for its",
                "robustness, the oak is a tree", "capable of living for several",
                "centuries, the oldest of them ","being at least 1500 years old."]
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
            engName: "Fir",
            latinName: "Abies",
            notes: ["The fir tree comes in 46 species,","varying greatly in size and",
            "appearance. It is very popular,","especially for its use at","Christmas festivities."],
            size: "1 to 100 meters",
            origins: "everywhere"
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
            engName: "Umbrella thorn acacia",
            latinName: "Vachellia tortilis",
            notes: ["This tree members of the acacia", "family only grows in certain",
                "desert regions of Africa. It's a", "thorny tree, known for its",
                "unique umbrella-like appearance,", "hence the name \"Umbrella thorn ", "acacia\"."],
            size: "5 to 21 meters",
            origins: "Sahara and South Africa"
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
            engName: "Weeping willow",
            latinName: "Salix babylonica",
            notes: ["Salix babylonica is a tree with", "graceful, drooping branches that" ,
                "give it a fountain-like appearance.", "It is often found planted in parks",
                "around ponds, which are ideal", "for it."],
            size: "10 to 30 meters",
            origins: "China"
        }
    }
};
const presetsName = Object.keys(presets);
export const getRdmPresetName = () => presetsName[getRdmInt(0,presetsName.length)];