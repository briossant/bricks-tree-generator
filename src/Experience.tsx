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

// todo : welcoming screen in playground to explain its working
// todo : about page ; trees page


export default function () {
    const [page, setPage] = useState<string>("menu")
    Grid.newGrid(new Vector3(2000,2000,300));

    const {camera} = useThree();
    const animRef = useRef();


    const onSetPage = (newPage: string) => {
        camera.position.set(...defaultCamPos);
        camera.lookAt(0,0,0);

        const animStrength = 200;
        const animDuration = 4;

        const tl = gsap.timeline();
        tl.to(camera.position, {
            y: animStrength+defaultCamPos[1],
            duration: animDuration/2,
            onComplete: () => {camera.position.y = -animStrength-defaultCamPos[1];setPage(newPage)}
        });
        tl.to(camera.position, {
            y: defaultCamPos[1],
            duration: animDuration/2,
        });
    }
1

    return <>
            {page != "menu" && <MenuButton setPage={onSetPage} renderPriority={pagesHuds[page]+1}/>}

            {page == "menu" && <Menu setPage={onSetPage}/>}

            {page == "playground" && <Playground/>}
            {page == "trees" && <Trees/>}
        <Lighting/>
    </>
}