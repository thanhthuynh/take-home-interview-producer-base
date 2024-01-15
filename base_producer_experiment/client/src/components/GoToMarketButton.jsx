import React from "react";
import { Button } from "./Button";

export default function GoToMarketButton({on_button_click}){
    return (
    <Button handleClick={on_button_click}> Go to market (next round) </Button>
    )
}