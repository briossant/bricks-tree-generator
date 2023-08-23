export default function () {
    return <>
        <ambientLight intensity={0.5}/>
        <directionalLight color={"#ffffff"} castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04}/>
    </>
}