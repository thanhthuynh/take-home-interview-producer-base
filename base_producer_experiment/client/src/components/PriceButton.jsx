import React from "react";
import { Button } from "./Button";

export default function PriceButton({text, price, on_button_click}){
    return(
      <Button handleClick={on_button_click} >
          🏷️ Sell my product for {text} {price}
            </Button>
    )
}