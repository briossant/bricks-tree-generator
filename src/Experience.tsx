import Playground from "./pages/Playground";
import {useState} from "react";
import {Menu} from "./pages/Menu";
import Trees from "./pages/Trees";
import {Grid} from "./brickRendering/grid";
import {Vector3} from "three";

export default function () {
    const [page, setPage] = useState<string>("menu")
    Grid.newGrid(new Vector3(2000,2000,300));


    return <>
        {page == "menu" && <Menu setPage={setPage}/>}

        {page == "playground" && <Playground/>}
        {page == "trees" && <Trees/>}

        <directionalLight color={"#ffffff"} castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04}/>
        <ambientLight intensity={0.5}/>
    </>
}