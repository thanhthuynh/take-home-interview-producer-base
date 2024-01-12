import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { usePlayer } from "@empirica/core/player/classic/react";
import { useRef } from "react";

export function SalesResults({ roundNumber }) {
  const player = usePlayer();
  const roundNumberText = 'round' + roundNumber;
  
  const choices = player.get(roundNumberText.concat("_choices"));
  const productionQuality = choices ? choices[0] : "Not set";
  const advertisementQuality = choices ? choices[1] : "Not set";
  const priceOfProduct = choices ? choices[2] : 0;
  const productionCost = choices ? choices[3] : 0;
  const warrantAmount = choices ? choices[4] : 0;
  const wasChallenged = choices ? choices[5] : false;

  // Get challenge result and warrant status
  const challengeResult = player.round.get("challengeResult")?.result
  const challengeScore = player.round.get("challengeResult")?.score || 0

  console.log("wasChallenged", wasChallenged);
  
  let imageUrl = "";
  //console.log('roundNumberText', roundNumberText)
  if (advertisementQuality === "high") {
    imageUrl = "/images/toothpaseamazing.jpg"; // Replace with the actual URL for high quality
  } else if (advertisementQuality === "low") {
    imageUrl = "/images/toothpastestandard.jpg"; // Replace with the actual URL for low quality
  }

  const currentScore = player.get("score") || 0; // , adQuality, points, salesCount, numBuyers
  
  //let points = 10;
  let points = priceOfProduct

  const min = 10;
  const max = 90;
  
  //  switch (advertisementQuality){
  //    case "high":
  //      switch (priceOfProduct) {case "high": min = 50; break; case "low": min = 70; break;
  //      };
  //    case "low":
  //      switch (priceOfProduct) {case "high": min =10, max=20; break; case "low": min = 50, max = 80; break;}
  //  }
  const numBuyers = Math.floor((Math.random() * (max - min ) + min)) ;


  const salesCount = numBuyers * (priceOfProduct - productionCost);
  const finalScore = currentScore + salesCount + challengeScore;

  console.log("salesCount", salesCount, "challengeScore", challengeScore, "finalScore", finalScore);

  function handleSubmit() {
    console.log('Moving on from results round');
    player.stage.set("submit", true);
    player.set("score", finalScore);
  }
  
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h1 className="text-lg leading-6 font-medium text-gray-900">
        Sales
      </h1>
      <div className="text-lg mt-2 mb-6">
        {/* <p className="text-sm text-gray-500"> */}
        <p>
          You chose to produce a <b>{productionQuality}</b> quality product.
        </p>
        <p>
          You chose to advertise it as a <b>{advertisementQuality}</b> quality product.
        You sold it at a price of <b>${priceOfProduct}</b>.
        <br /> <br />
        </p>

        <img src={imageUrl} alt="Toothpaste Standard" width="250" height="250"/>
        
        <p>
          It was advertised to an audience of 100 users, and {numBuyers} users bought your product.
        </p>

        <p> 
          You earned ${priceOfProduct - productionCost}  per product x {numBuyers} units sold = {salesCount} points in sales.
        </p><br/>

        {/* Challenge Result Section */}
        {wasChallenged && (
          <div className="challenge-result-section">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Challenge Result
            </h2>
            <p>
              However, another player challenged your warrant and your warrant was {challengeResult ? "upheld and you gained " : "invalidated and you lost"} ${warrantAmount}.<br/>
            </p>
          </div>
        )}

        <p> Your score for this round is: {salesCount} + {challengeScore} </p>
        <p> Your total score is: {currentScore + salesCount + challengeScore} </p><br/>
        <p> 
          Click to proceed to the next round to sell products in this marketplace.
        </p>
      </div>
      <Button handleClick={handleSubmit} primary>
        I'm done!
      </Button>
    </div>
  );
}