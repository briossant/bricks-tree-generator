import Playground from "./pages/Playground";
import {useState} from "react";
import {Menu} from "./pages/Menu";
import Trees from "./pages/Trees";
import {Grid} from "./const/grid";
import {Vector3} from "three";
import MenuButton from "./meshes/MenuButton";
import Lighting from "./meshes/Lighting";
import {defaultCamPos, pagesHuds} from "./const/style";
import {useThree} from "@react-three/fiber";

// todo : changing page animation -> everything goes up/down to leave/enter the screen
// todo : welcoming screen in playground to explain its working
// todo : about page ; trees page


export default function () {
    const [page, setPage] = useState<string>("menu")
    Grid.newGrid(new Vector3(2000,2000,300));

    const {camera} = useThree();


    const onSetPage = (newPage: string) => {
        camera.position.set(...defaultCamPos);
        camera.lookAt(0,0,0);
        setPage(newPage);
    }


    return <>
        {page != "menu" && <MenuButton setPage={onSetPage} renderPriority={pagesHuds[page]+1}/>}

        {page == "menu" && <Menu setPage={onSetPage}/>}

        {page == "playground" && <Playground/>}
        {page == "trees" && <Trees/>}

        <Lighting/>
    </>
}