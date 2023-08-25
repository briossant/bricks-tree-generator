export default function ({pos = [1, 2, 3]}) {
    return <>
        <ambientLight intensity={0.5}/>
        <directionalLight color={"#ffffff"} castShadow position={pos} intensity={1.8} shadow-normalBias={0.04}/>
    </>
}