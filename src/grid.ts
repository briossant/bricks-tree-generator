import {Vector3} from "three";

export class Grid {
    private static size: Vector3 = new Vector3(0,0,0);
    private static offset: Vector3 = new Vector3(0,0,0);
    private static grid: Array<boolean> = []


    static newGrid: (size: Vector3) => void = (size) => {
        Grid.size = size;
        Grid.grid = Array(size.x*size.y*size.z);
        Grid.offset = new Vector3(Math.floor(size.x/2),Math.floor(size.y/2),Math.floor(size.z/2))
    }

    private static offsetVector: (vec: Vector3) => void = (vec) =>{
        vec.add(Grid.offset);
    }


    private static vectorToNumber: (vec: Vector3) => number = (vec) => {
        return (vec.x*Grid.size.y+vec.y)*Grid.size.z+vec.z;
    }

    static at: (coo: Vector3) => boolean | undefined = (coo) => {
        Grid.offsetVector(coo);
        const num = Grid.vectorToNumber(coo);
        return Grid.grid[num];
    }

    static set: (coo: Vector3) => void = (coo) => {
        Grid.offsetVector(coo);
        const num = Grid.vectorToNumber(coo);
        Grid.grid[num] = true;
    }
}
