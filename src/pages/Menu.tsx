import React, {Dispatch, SetStateAction} from "react";
import {Html, PresentationControls} from "@react-three/drei";
import {Tree} from "../treeGeneration/algorithm/Tree";
import {LegoTree} from "../brickRendering/LegoTree";
import {Vector3} from "three"
import {presets} from "../treeGeneration/presets/presets";

interface Menu {
    setPage: Dispatch<SetStateAction<string>>;
}

export const Menu: React.FC<Menu> = ({setPage}) => {

    const click = (value) => (event) => {
        setPage(value)
    }

    return <>
        <PresentationControls>
            <LegoTree length={7} startingPoint={new Vector3(0,0,0)} preset={presets["Abies"]}/>
            <Html>
                <button className="rounded-full bg-" onClick={click("trees")}>
                    Trees
                </button>
                <button className="rounded-full bg-" onClick={click("playground")}>
                    Playground
                </button>
            </Html>
        </PresentationControls>



    </>
}