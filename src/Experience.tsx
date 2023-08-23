import Playground from "./pages/Playground";
import {useState} from "react";
import {Menu} from "./pages/Menu";
import Trees from "./pages/Trees";
import {Grid} from "./brickRendering/grid";
import {Vector3} from "three";
import MenuButton from "./meshes/MenuButton";
import Lighting from "./meshes/Lighting";

export default function () {
    const [page, setPage] = useState<string>("menu")
    Grid.newGrid(new Vector3(2000,2000,300));


    return <>
        {page != "menu" && <MenuButton setPage={setPage}/>}

        {page == "menu" && <Menu setPage={setPage}/>}

        {page == "playground" && <Playground/>}
        {page == "trees" && <Trees/>}

        <Lighting/>
    </>
}