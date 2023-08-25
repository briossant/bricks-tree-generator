
import {TreePresentation} from "./TreePresentation";
import {getRdmPresetName, presets} from "../treeGeneration/presets/presets";
import {useState} from "react";
import LimitedFlyControls from "../animation/LimitedFlyControls";

export default function () {

    const [preset, setPreset] = useState();

    return <>
        <LimitedFlyControls/>
        <TreePresentation preset={presets[getRdmPresetName()]}/>
    </>
}