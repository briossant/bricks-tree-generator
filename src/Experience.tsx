import Playground from "./pages/Playground";
import {useRef, useState} from "react";
import {Menu} from "./pages/Menu";
import Trees from "./pages/Trees";
import {Grid} from "./const/grid";
import {Vector3} from "three";
import MenuButton from "./meshes/MenuButton";
import Lighting from "./meshes/Lighting";
import {defaultCamPos, pagesHuds} from "./const/style";
import {useThree} from "@react-three/fiber";
import gsap from "gsap"
import About from "./pages/About";

// todo : social card
// todo : trees page : tree desc ; about page


export default function () {
    const [page, setPage] = useState<string>("menu")
    Grid.newGrid();

    const {camera} = useThree();


    const onSetPage = (newPage: string) => {

        const animStrength = 200;
        const animDuration = 4;

        const tl = gsap.timeline();
        tl.to(camera.position, {
            x: defaultCamPos[0],
            y: defaultCamPos[1],
            z: defaultCamPos[2],
            duration: page == "playground" ? 0.8 : 0,
            onUpdate: () => {camera.lookAt(0,0,0);}
        })
        tl.to(camera.position, {
            y: animStrength+defaultCamPos[1],
            duration: animDuration/2,
            onComplete: () => {setPage(newPage);camera.position.y = -animStrength+defaultCamPos[1];camera.lookAt(0, -animStrength,0)}
        });
        tl.to(camera.position, {
            y: defaultCamPos[1],
            duration: animDuration/2,
        });
    }


    return <>
            {page != "menu" && <MenuButton setPage={onSetPage} renderPriority={pagesHuds[page]+1}/>}

            {page == "menu" && <Menu setPage={onSetPage}/>}

            {page == "playground" && <Playground/>}
            {page == "trees" && <Trees/>}
            {page == "about" && <About/>}

        <Lighting/>
    </>
}