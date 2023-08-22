import {Vector3} from "three";
import React, {useState} from "react";
import {cooConstraints} from "./LineRenderer";
import {Tree} from "../treeGeneration/algorithm/Tree";
import {Preset} from "../treeGeneration/presets/presets";
import {useGLTF} from "@react-three/drei";

export interface LegoTreeSettings {
    length: number;
    startingPoint: Vector3;
    preset: Preset;

    cooConstraints?: cooConstraints;
}

export const LegoTree: React.FC<LegoTreeSettings> = ({length, startingPoint, preset, cooConstraints = () => false}) => {
    const { nodes } = useGLTF("./lego.glb");

    return <Tree
        length={length *  preset.lengthMul}
        geometry={nodes.Lego.geometry}
        startingPoint={startingPoint}
        snap={new Vector3(0.79, 0.98, 0.79)}
        scale={1}
        cooConstraints={cooConstraints}
        functions={preset.fct}
    />
}