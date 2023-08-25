import React from "react";
import {BrickWall} from "../brickRendering/BrickWall";
import {Vector2, Vector3} from "three";
import {Center, Float, Html, Hud, Text3D} from "@react-three/drei";
import {Preset, presets} from "../treeGeneration/presets/presets";
import {BrickTree} from "../brickRendering/BrickTree";
import {useThree} from "@react-three/fiber";
import {BrickPlane} from "../brickRendering/BrickPlane";
import {Kebab} from "../animation/Kebab";
import Lighting from "../meshes/Lighting";
import BlackText from "../meshes/BlackText";
import {Grid} from "../const/grid";

interface TreePresentation {
    preset: Preset;
}

export const TreePresentation: React.FC<TreePresentation> = ({preset, ...props}) => {
    const { width } = useThree(state => state.viewport)
    Grid.newGrid(new Vector3(2000,2000,300));
    const lineMaxChar = 26;

    return <group {...props}>
        <Hud renderPriority={1}>
            <group {...props}>
            <Center right position={[100,-10,-width/1.8]} scale={2.2}>
                <Float speed={3} rotationIntensity={0} floatingRange={[1, 2]}>
                    <BrickWall colors={preset.colors} scale={2} rotation-y={-Math.PI / 2 + 0.2} size={new Vector2(12, 30)}>
                        <BlackText position={[-8, 12, 0.75]}>
                            {preset.desc.latinName}
                        </BlackText>
                        <BlackText position={[-8, 10, 0.75]}>
                            ({preset.desc.engName})
                        </BlackText>
                        {[...Array(Math.ceil(preset.desc.desc.length/lineMaxChar))].map((_,i)=> <BlackText position={[-9, 8-i, 0.75]}>
                            {preset.desc.desc.slice(i*lineMaxChar,(i+1)*lineMaxChar)}
                        </BlackText>)}
                    </BrickWall>
                </Float>
            </Center>
            <Lighting pos={[-1,2,3]} />
            </group>
        </Hud>

        <Center left position={[0, -20, width / 5]}>
            <Kebab speed={10}>
                <BrickPlane size={new Vector2(5, 5)} color={"#b29e5d"}/>
                <BrickTree key={Math.random()} length={8} startingPoint={new Vector3(0, 0, 0)} preset={preset}/>
            </Kebab>
        </Center>

    </group>;
}
