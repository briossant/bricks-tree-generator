import {TextButton} from "./TextButton";
import {Hud} from "@react-three/drei";

export default function ({setPage}) {
    const click = (e) => {
        setPage("menu")
    }
    return <>
        <Hud>
            <TextButton position={[0,40,-80]} scale={2} rotation-y={-Math.PI/3} name={"Menu"} action={click}/>
        </Hud>
    </>
}