import {Vector3} from "three";

export class Grid {
    private static size: Vector3 = new Vector3(0,0,0);
    private static grid: Array<boolean> = []


    static newGrid: (size: Vector3) => void = (size) => {
        Grid.size = size;
        Grid.grid = Array(size.x*size.y*size.z);
    }


    private static vectorToNumber: (vec: Vector3) => number = (vec) => {
        return (vec.x*Grid.size.y+vec.y)*Grid.size.z+vec.z;
    }

    static at: (coo: Vector3) => boolean | undefined = (coo) => {
        const num = Grid.vectorToNumber(coo);
        return Grid.grid[num];
    }

    static atBox: (coo: Vector3) => boolean = (coo) => {
        return Grid.at(coo)
            || Grid.at(new Vector3(coo.x + 1, coo.y, coo.z))
            || Grid.at(new Vector3(coo.x , coo.y, coo.z + 1))
            || Grid.at(new Vector3(coo.x + 1, coo.y, coo.z + 1));
    }

    static set: (coo: Vector3) => void = (coo) => {
        const num = Grid.vectorToNumber(coo);
        Grid.grid[num] = true;
    }

    static setBox: (coo: Vector3) => void = (coo) => {
        Grid.set(coo);
        Grid.set(new Vector3(coo.x + 1, coo.y, coo.z));
        Grid.set(new Vector3(coo.x , coo.y, coo.z + 1));
        Grid.set(new Vector3(coo.x + 1, coo.y, coo.z + 1));
    }
}
