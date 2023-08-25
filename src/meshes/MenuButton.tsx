import {TextButton} from "./TextButton";
import {Center, Float, Hud, OrthographicCamera, PerspectiveCamera} from "@react-three/drei";
import {useThree} from "@react-three/fiber";
import Lighting from "./Lighting";

export default function ({setPage, renderPriority}) {
    const { width, height } = useThree(state => state.viewport)

    const click = (e) => {
        setPage("menu")
    }
    return <>
        <Hud renderPriority={renderPriority}>
            <PerspectiveCamera fov={30} makeDefault/>
            <Float speed={3} rotationIntensity={0} floatingRange={[1, 2]}>
                <Center bottom right  position={[-width/4.5,height/5.5,-60]}>
                    <TextButton scale={1} rotation={[0.5,0.8,0]} name={"Menu"} action={click}/>
                </Center>
            </Float>
            <Lighting/>
        </Hud>
    </>
}