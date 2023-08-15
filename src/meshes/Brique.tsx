export default function ({color = "green", ...props}) {
    return <group {...props}>
        <mesh>
            <boxGeometry/>
            <meshToonMaterial color={color}/>
        </mesh>
        <mesh scale={0.2} position={[0.25, 0.25, 0.25]}>
            <cylinderGeometry/>
            <meshToonMaterial color={color}/>
        </mesh>
    </group>;
}