import Playground from "./treeGeneration/rendering/Playground";
import {useState} from "react";
import {Menu} from "./pages/Menu";

export default function () {
    const [page, setPage] = useState<string>("menu")


    return <>
        {page == "menu" && <Menu setPage={setPage}/>}

        {page == "playground" && <Playground/>}

    </>
}