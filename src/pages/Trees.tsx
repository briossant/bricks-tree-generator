import gsap from "gsap"
import {TreePresentation} from "./TreePresentation";
import {getRdmPresetName, presets} from "../treeGeneration/presets/presets";
import React, {useRef, useState} from "react";
import LimitedFlyControls from "../animation/LimitedFlyControls";
import {Center, Hud} from "@react-three/drei";
import {ArrowButton} from "../brickRendering/ArrowButton";
import Lighting from "../meshes/Lighting";
import {useThree} from "@react-three/fiber";
import {Grid} from "../const/grid";
import {Vector3} from "three";

export default function () {
    const { width } = useThree(state => state.viewport)
    const presetList = Object.keys(presets);
    const [preset, setPreset] = useState(presetList[0]);
    const ref = useRef();
    const {camera} = useThree();

    const next = (reversed: boolean = false) => (event) => {
        const d = reversed ? -1 : 1;
        const tl = gsap.timeline();
        const tl2 = gsap.timeline();

        const animIntensity = 1000;
        const animDuration = 1;

        tl2.to(camera.position, {
            z: animIntensity*d,
            duration: animDuration/2,
            onComplete: () => {
                camera.position.z = -animIntensity*d;
            }
        });
        tl2.to(camera.position, {
            z: 0,
            duration: animDuration/2,
        });

        tl.to(ref.current.position, {
            z: animIntensity*d,
            duration: animDuration/2,
            onComplete: () => {
                setPreset(presetList[(presetList.indexOf(preset)+d+presetList.length) % presetList.length]);
                ref.current.position.z = -animIntensity*d;
            }
        });
        tl.to(ref.current.position, {
            z: 0,
            duration: animDuration/2,
        });
    }

    return <>
        <LimitedFlyControls/>
        <TreePresentation preset={presets[preset]}/>
        <Hud renderPriority={2}>
            <group ref={ref}>
                <Center left position={[50, -15, width / 1.5]} scale={5} rotation-y={-0.3}>
                    <ArrowButton dir={"right"} action={next()}/>
                </Center>
                <Center right position={[50, -15, -width / 1.5]} scale={5} rotation-y={0.3}>
                    <ArrowButton dir={"left"} action={next(true)}/>
                </Center>
            </group>
            <Lighting/>
        </Hud>
    </>
}