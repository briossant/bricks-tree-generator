import React, {Dispatch, SetStateAction} from "react";
import {Html} from "@react-three/drei";

interface Menu {
    setPage: Dispatch<SetStateAction<string>>;
}

export const Menu: React.FC<Menu> = ({setPage}) => {

    const click = (value) => (event) => {
        setPage(value)
    }

    return <>
        <Html>
            <button className="rounded-full bg-" onClick={click("trees")}>
                Trees
            </button>
            <button className="rounded-full bg-" onClick={click("playground")}>
                Playground
            </button>
        </Html>

    </>
}