import React, {useEffect, useRef, useState} from "react";
import {Vector3, Object3D, Color, MeshLambertMaterial} from "three";
import {useFrame} from "@react-three/fiber";
import {Grid} from "../const/grid";

export interface cooConstraints{
    (vec: Vector3): boolean
}

interface LineRendererSettings {
    line: Array<Vector3>;
    colors: Array<string>;
    scale: number;
    geometry: any;
    snap: Vector3;
    cooConstraints: cooConstraints;
    doSnap?: boolean;
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

const cooParseForGrid = (coo, snap) => {
    return new Vector3(Math.round(coo[0]/snap.x),Math.round(coo[1]/snap.y),Math.round(coo[2]/snap.z));
}

const tempBoxes = new Object3D();

export const LineRenderer: React.FC<LineRendererSettings> = ({line, colors, geometry, scale, doSnap=true, snap, cooConstraints}) => {
    const material = new MeshLambertMaterial();

    const [pos, setPos] = useState<Array<[number,number,number]>>([]);
    const [color, setColor] = useState<Array<string>>([]);

    useEffect(() => {
        const p = [];
        const c = [];
        for (let i = 0; i < line.length; i++) {
            let coo = [line[i].x,line[i].y,line[i].z];
            if (doSnap) {
                coo = snapCoordinates(line[i], scale, snap);
                const gridCoo = cooParseForGrid(coo, snap);
                if (cooConstraints(gridCoo) || Grid.atBox(gridCoo)) {
                    continue;
                }
                Grid.setBox(gridCoo);
            }

            p.push(coo);
            // @ts-ignore
            c.push(new Color(colors[i]));
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