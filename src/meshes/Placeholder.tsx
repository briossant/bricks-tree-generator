export default function ({color = "green", ...props}) {
    return <mesh {...props}>
        <boxGeometry />
        <meshBasicMaterial color={color} wireframe/>
    </mesh>
}