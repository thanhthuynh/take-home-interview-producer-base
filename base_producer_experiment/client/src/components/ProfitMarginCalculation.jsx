import React from "react";

export default function ProfitMarginCalculation({producerPlayer}){
    let profit = producerPlayer.round.get("priceOfProduct") - producerPlayer.round.get("productionCost")
    return(
      <div>
        
        <p>You have chosen to produce <b>{producerPlayer.round.get("productionQuality")}</b> quality toothpaste and advertise it as <b>{producerPlayer.round.get("advertisementQuality")}</b> quality toothpase at a <b>price of ${producerPlayer.round.get("priceOfProduct")}</b>.</p>
        <h1><p>This gives a <b>profit of  ${profit}</b> per product sold.</p></h1>

      </div>
    )
}