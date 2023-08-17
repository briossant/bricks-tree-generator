export default function ({color = "green", ...props}) {
    return <group {...props}>
        <mesh>
            <boxGeometry/>
            <meshToonMaterial  depthWrite={false} color={color}/>
        </mesh>
    </group>;
}