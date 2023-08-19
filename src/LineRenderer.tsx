import React, {useEffect, useRef, useState} from "react";
import { BoxGeometry, Vector3, Object3D, MeshToonMaterial, Color} from "three";
import {useFrame} from "@react-three/fiber";

interface LineRendererSettings {
    line: Array<Vector3>,
    step: number,
    scale: number,
    snap: Vector3
}

const snapNumber: (x:number, snap:number) => number = (x, snap) => {
    const rest = x%snap;
    return (rest >= snap/2 ? x+snap-rest : x-rest) //+ getRdmFloat(0, snap/100);
}

const snapCoordinates: (coo: Vector3, step: number, snap: Vector3) => [number, number, number] = (coo, step, snap) =>  {
    return [snapNumber(coo.x*step, snap.x), snapNumber(coo.y*step,snap.y), snapNumber(coo.z*step, snap.z)];
}

const getColor: (x: number, y: number, z: number) => string = (x, y, z) => {
    const colors = ["#ff891f", "#1fc0ff", "#ff1ff0"]
    return colors[Math.floor(Math.abs(((x*133 + (y+12)*41 + z)) % colors.length))]
}

const tempBoxes = new Object3D();

export const LineRenderer: React.FC<LineRendererSettings> = ({line, scale, step, snap}) => {
    const material = new MeshToonMaterial({ color: "white" });
    const boxesGeometry = new BoxGeometry(scale, scale, scale);
    const [pos, setPos] = useState<Array<[number,number,number]>>([]);
    const [color, setColor] = useState<Array<string>>([]);

    useEffect(() => {
        const p = [];
        const c = [];
        for (let i = 0; i < line.length; i++) {
            p.push(snapCoordinates(line[i], step, snap));
            // @ts-ignore
            c.push(new Color(getColor(...p[i])));
        }
        setPos(p);
        setColor(c);
    }, [line])

    const ref = useRef();

    useFrame(( ) => {
        for (let x = 0; x < pos.length; x++) {
            // @ts-ignore
            tempBoxes.position.set(...pos[x])
            tempBoxes.updateMatrix();
            // @ts-ignore
            ref.current.setColorAt(x, color[x]);
            // @ts-ignore
            ref.current.setMatrixAt(x, tempBoxes.matrix);
        }
        // @ts-ignore
        ref.current.instanceMatrix.needsUpdate = true;
        // @ts-ignore
        ref.current.instanceColor.needsUpdate = true;
    });

    return <instancedMesh ref={ref} args={[boxesGeometry, material, pos.length]} />;
}