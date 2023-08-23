import {TextButton} from "./TextButton";
import {Center, Float, Hud, OrthographicCamera, PerspectiveCamera} from "@react-three/drei";
import {useThree} from "@react-three/fiber";

export default function ({setPage}) {
    const { width, height } = useThree(state => state.viewport)

    const click = (e) => {
        setPage("menu")
    }
    return <>
        <Hud>
            <PerspectiveCamera fov={30} makeDefault/>
            <Float speed={3} rotationIntensity={0} floatingRange={[1, 2]}>
                <Center bottom right  position={[-width/4.5,height/5.5,-60]}>
                    <TextButton scale={1} rotation={[0.5,0.8,0]} name={"Menu"} action={click}/>
                </Center>
            </Float>
            <ambientLight intensity={0.5}/>
            <directionalLight color={"#ffffff"} castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04}/>
        </Hud>
    </>
}