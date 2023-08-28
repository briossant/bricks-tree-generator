import {BrickWall} from "../brickRendering/BrickWall";
import {Vector2} from "three";
import BlackText from "../meshes/BlackText";
import {Center, Html, Plane} from "@react-three/drei";
import LimitedFlyControls from "../animation/LimitedFlyControls";
import Lighting from "../meshes/Lighting";
import React from "react";

// idea : change color on mouse position + fade to the original one after

export default function () {
    const colors = []//["#e0c3ca", "#97b2b6", "#d5c8ac"];
    return <>
        <LimitedFlyControls amplitude={new Vector2(5,3)} speed={0.01}/>
        <group rotation-y={-Math.PI / 2} scale={2}>
            <BrickWall position-x={-8} rotation-y={0.2} size={new Vector2(14, 28)} colors={colors}>
                <Html transform scale={2.7}>
                    <h3>About</h3>
                    <p>This website was made for 2nd <a href={"https://threejs-journey.com/"}>Threejs-journey</a>,<br/> the
                        theme was "Lego".</p>
                    <p>All the 3d models, except for the text, <br/> are generated live  when you load the pages, <br/> using a single 2 by 2 brick model.</p>

                </Html>
            </BrickWall>
            <BrickWall position={[12,6,0]} rotation-y={-0.2} size={new Vector2(6, 12)} colors={colors}>
                <Html transform scale={3}>
                    <h3>Links:</h3>
                    <a href="https://github.com/briossant/bricks-tree-generator">Project github</a><br/><br/>
                    <a href="https://twitter.com/BriossantC">My twitter</a><br/><br/>
                    <a href="https://briossant.com/">Other projects</a><br/><br/>
                </Html>
            </BrickWall>
        </group>
        <Lighting pos={[-1,2,3]} />

    </>;
}