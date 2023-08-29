import {BrickWall} from "../brickRendering/BrickWall";
import {Vector2} from "three";
import BlackText from "../meshes/BlackText";
import {Center, Float, Html, Plane} from "@react-three/drei";
import LimitedFlyControls from "../animation/LimitedFlyControls";
import Lighting from "../meshes/Lighting";
import React from "react";

// idea : change color on mouse position + fade to the original one after

export default function () {
    const colors = []//["#e0c3ca", "#97b2b6", "#d5c8ac"];
    return <>
        <LimitedFlyControls amplitude={new Vector2(5, 3)} speed={0.01}/>
        <group rotation-y={-Math.PI / 2} scale={2}>
            <Float speed={1} rotationIntensity={0} floatingRange={[1, 2]}>
                <BrickWall position-x={-8} rotation-y={0.2} size={new Vector2(14, 18)} colors={colors}>
                    <Html transform position-y={4.5} scale={2.7}>
                        <h3>About</h3>
                        <p>This site was made for 2nd <a
                            href={"https://threejs-journey.com/"}>Threejs-journey</a> <br/>contest,
                            the theme was "Lego".</p>
                    </Html>
                    <Html transform position-y={-3.5} scale={2.7}>
                        <p>The goal of the project was to recreate my <br/>old <a
                            href="https://briossant.com/3d-demo/006-tree-generator/">tree generator </a>
                            with more features, better <br/>performances and, of course, bricks instead <br/>of pipes.
                        </p>
                        <p>All the 3d models are generated live using a <br/> single 2x2 brick model (except for the
                            text).</p>
                    </Html>
                </BrickWall>
            </Float>
            <Float speed={2} rotationIntensity={0} floatingRange={[1, 1.5]}>
                <BrickWall position={[12, 2, 0]} rotation-y={-0.2} size={new Vector2(6, 12)} colors={colors}>
                    <Html transform scale={3}>
                        <h3>Links:</h3>
                        <a href="https://github.com/briossant/bricks-tree-generator">Project github</a><br/><br/>
                        <a href="https://twitter.com/BriossantC">My twitter</a><br/><br/>
                        <a href="https://briossant.com/">Other projects</a><br/><br/>
                    </Html>
                </BrickWall>
            </Float>
        </group>
        <Lighting pos={[-1, 2, 3]}/>

    </>;
}