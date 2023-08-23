import React, {Dispatch, SetStateAction, useState} from "react";
import {BrickTree} from "../brickRendering/BrickTree";
import {Vector3} from "three"
import {getRdmPresetName, presets} from "../treeGeneration/presets/presets";
import {TextButton} from "../meshes/TextButton";
import {Kebab} from "../animation/Kebab";
import {useFrame, useThree} from "@react-three/fiber";
import {Grid} from "../brickRendering/grid";
import {FlyControls} from "@react-three/drei";
import LimitedFlyControls from "../animation/LimitedFlyControls";


interface Menu {
    setPage: Dispatch<SetStateAction<string>>;
}

const changeTree = 10;
export const Menu: React.FC<Menu> = ({setPage}) => {

    const [reloadTree,setReloadTree] = useState(1)

    const click = (value) => (event) => {
        setPage(value)
    }

    let time = 0;
    useFrame((state, delta) => {
        time += delta;
        if (time >= changeTree) {
            time = 0;
            Grid.newGrid(new Vector3(2000,2000,300));
            setReloadTree(reloadTree+1)
        }
    });

    return <>
        <LimitedFlyControls/>

        <Kebab speed={10}>
            <BrickTree key={reloadTree} length={9} startingPoint={new Vector3(0,-20,0)} preset={presets[getRdmPresetName()]}/>
        </Kebab>


        <group position={[100,0,-120]} scale={5} rotation-y={-Math.PI/3}>
            <TextButton name={"The Trees"} action={click("tree")} position={[0,0,0]}/>
            <TextButton name={"Playground"} action={click("playground")} position={[0,-4,0]}/>
        </group>
        <ambientLight intensity={0.5}/>
        <directionalLight color={"#ffffff"} castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04}/>

    </>
}