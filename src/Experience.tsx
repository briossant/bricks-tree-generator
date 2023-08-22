import Playground from "./pages/Playground";
import {useState} from "react";
import {Menu} from "./pages/Menu";
import Trees from "./pages/Trees";

export default function () {
    const [page, setPage] = useState<string>("menu")


    return <>
        {page == "menu" && <Menu setPage={setPage}/>}

        {page == "playground" && <Playground/>}
        {page == "trees" && <Trees/>}

    </>
}