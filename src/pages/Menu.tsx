import React, {Dispatch, SetStateAction} from "react";
import {BrickTree} from "../brickRendering/BrickTree";
import {Vector3} from "three"
import {presets} from "../treeGeneration/presets/presets";
import {TextButton} from "../meshes/TextButton";
import {Kebab} from "../animation/Kebab";


interface Menu {
    setPage: Dispatch<SetStateAction<string>>;
}



export const Menu: React.FC<Menu> = ({setPage}) => {

    const click = (value) => (event) => {
        setPage(value)
    }

    return <>
        <Kebab speed={10}>
            <BrickTree length={9} startingPoint={new Vector3(0,-20,0)} preset={presets["Abies"]}/>
        </Kebab>


        <group position={[0,0,-40]} scale={2} rotation-y={-Math.PI/3}>
            <TextButton name={"Playground"} action={click("playground")} position={[0,0,0]}/>
            <TextButton name={"Trees"} action={click("tree")} position={[0,-4,0]}/>
        </group>
        <ambientLight intensity={0.5}/>
        <directionalLight color={"#ffffff"} castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04}/>

    </>
}