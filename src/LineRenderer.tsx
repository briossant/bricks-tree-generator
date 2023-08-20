import React, {useEffect, useRef, useState} from "react";
import { BoxGeometry, Vector3, Object3D, MeshToonMaterial, Color} from "three";
import {useFrame} from "@react-three/fiber";
import {Grid} from "./grid";
import {useGLTF} from "@react-three/drei";

interface LineRendererSettings {
    line: Array<Vector3>,
    step: number,
    geometry: any,
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
    const colors = ["#ff891f", "#1fc0ff", "#ff1ff0"];
    return colors[Math.floor(Math.abs(((x*133 + (y+12)*41 + z)) % colors.length))];
}

const tempBoxes = new Object3D();

export const LineRenderer: React.FC<LineRendererSettings> = ({line, geometry, step, snap}) => {
    const material = new MeshToonMaterial();

    const [pos, setPos] = useState<Array<[number,number,number]>>([]);
    const [color, setColor] = useState<Array<string>>([]);

    useEffect(() => {
        const p = [];
        const c = [];
        for (let i = 0; i < line.length; i++) {
            const coo = snapCoordinates(line[i], step, snap);
            if(Grid.at(new Vector3(...coo)) || Grid.at(new Vector3(coo[0] + snap.x, coo[1], coo[2]))
                || Grid.at(new Vector3(coo[0] , coo[1], coo[2] + snap.z))
                || Grid.at(new Vector3(coo[0] + snap.x, coo[1], coo[2]+ snap.z))) continue;
            Grid.set(new Vector3(...coo));
            Grid.set(new Vector3(coo[0] + snap.x, coo[1], coo[2]));
            Grid.set(new Vector3(coo[0] , coo[1], coo[2] + snap.z));
            Grid.set(new Vector3(coo[0] + snap.x, coo[1], coo[2]+ snap.z));
            p.push(coo);
            // @ts-ignore
            c.push(new Color(getColor(...p[p.length-1])));
        }
        setPos([...pos, ...p]);
        setColor([...color, ...c]);
    }, [line]);

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
    });

    return <instancedMesh ref={ref} args={[geometry, material, pos.length]} />;
}