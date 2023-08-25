
import {TreePresentation} from "./TreePresentation";
import {getRdmPresetName, presets} from "../treeGeneration/presets/presets";
import {useState} from "react";

export default function () {

    const [preset, setPreset] = useState();

    return <>
        <TreePresentation preset={presets[getRdmPresetName()]}/>
    </>
}