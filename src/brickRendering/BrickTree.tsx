import {Vector3} from "three";
import React, {useState} from "react";
import {cooConstraints} from "./LineRenderer";
import {Tree} from "../treeGeneration/algorithm/Tree";
import {Preset} from "../treeGeneration/presets/presets";
import {useGLTF} from "@react-three/drei";
import Brick2x2 from "../const/Brick2x2";

export interface LegoTreeSettings {
    length: number;
    startingPoint: Vector3;
    preset: Preset;

    dontAlignBricks?: boolean;

    cooConstraints?: cooConstraints;
}

export const BrickTree: React.FC<LegoTreeSettings> = ({length, startingPoint, dontAlignBricks = false, preset, cooConstraints = () => false, ...props}) => {
    const { nodes } = useGLTF("./lego.glb");

    return <group {...props}><Tree
        length={length *  preset.lengthMul}
        geometry={nodes.Lego.geometry}
        startingPoint={startingPoint}
        snap={dontAlignBricks ? new Vector3(0.001,0.001,0.001) :
            new Vector3(Brick2x2.x/2, Brick2x2.y, Brick2x2.z/2)}
        scale={1}
        cooConstraints={cooConstraints}
        functions={preset.fct}
    /></group>
}