export default function (props) {
    return <mesh {...props}>
        <boxGeometry />
        <meshBasicMaterial color={"green"} wireframe/>
    </mesh>
}