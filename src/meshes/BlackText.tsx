import {Text3D} from "@react-three/drei";
import React from "react";

export default function ({children, ...props}) {
    return <Text3D {...props} font={"./Alice_Regular.json"}>
        {children}
        <meshLambertMaterial color={"black"}/>
    </Text3D>
}