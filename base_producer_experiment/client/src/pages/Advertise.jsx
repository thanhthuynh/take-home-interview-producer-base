import React from "react";
import { useStage } from "@empirica/core/player/classic/react";
import { Button } from "../components/Button";
import ProductionQualityOption from "../components/ProductionQualityOption";
import AdvertisementQualityOption from "../components/AdvertisementQualityOption";
import PriceButton from "../components/PriceButton";
import PlayerScore from "../components/PlayerScore";
import ProfitMarginCalculation from "../components/ProfitMarginCalculation";
import GoToMarketButton from "../components/GoToMarketButton";
import { useAdvertisementLogic } from "../hooks/useAdvertisementLogic";
  
  export function Advertisement({ roundNumber }) {
    const {
      player,
      players,
      updateWarrantAmount,
      initiatePlayerChallenge,
      submitRoundChoices,
      setProductionQualityAndCost,
      setAdvertisementQuality,
      setProductPrice,
    } = useAdvertisementLogic(roundNumber);
  
    const stage = useStage();
    const isResultStage = stage.get("name") === "result";
      
    function updatePlayerScoreDisplay() {
      console.log("Player score updated");
    }

    let product = null
  
    if (players.length > 1) {
      product = (
        <div className="grid grid-cols-2 items-center">
          {product}
          <div>
            {isResultStage ? (
              <>
                <div className="text-gray-500 text-2xl">You</div>
                <div className="border-b-3 border-blue-500/50 pb-2 mb-8">
                  {PlayerScore(player, () => {}, isResultStage)}
                </div>
              </>
            ) : null}
            {players
              .filter((p) => p.id !== player.id)
              .map((p) => PlayerScore(p, updatePlayerScoreDisplay, isResultStage))}
          </div>
        </div>
      );
    } else if (players.length == 1 && isResultStage) {
      product = (
        <div className="grid grid-cols-2 items-center">
          {product}
          <div>
            {isResultStage ? PlayerScore(player, () => {}, isResultStage) : null}
          </div>
        </div>
      );
    }

    const otherPlayersAds = players.filter(p => p.id !== player.id).map(otherPlayer => (
      <div key={otherPlayer.id} className="other-player-ad">
          <div>
              {/* Display other player details */}
              <p>Player {otherPlayer.id}'s Advertisement:</p>
              <p>Production Quality: {otherPlayer.round.get("productionQuality")}</p>
              <p>Advertisement Quality: {otherPlayer.round.get("advertisementQuality")}</p>
              <p>Price: ${otherPlayer.round.get("priceOfProduct")}</p>
              <p>Warrant: {otherPlayer.round.get("warrantAmount")}</p>
              <p>Challenged: {player.round.get("challenge")?.status ? "Yes" : "No"}</p>
              <Button text="Challenge" handleClick={() => initiatePlayerChallenge(otherPlayer.id)}>Challenge</Button>
          </div>
      </div>
    ));


    return (
      <div className="md:min-w-96 lg:min-w-128 xl:min-w-192 flex flex-col items-center space-y-10">
        {}
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <div>
        <h1><b>You are a producer of toothpaste.</b> </h1>
        <h1>You will now decide what to produce, how to advertise it and the price.</h1>

        </div>

        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <h1><b>You are a producer of toothpaste</b></h1>
          <h1><b>Choose what to produce.</b> All your products this round will be the quality you select. <br/> Your current choice is to produce: <b>{player.round.get("productionQuality")} </b> quality toothspaste.</h1>
          <div className="flex justify-center space-x-4"> {/* This flex container will lay out its children (products) in a row */}
          <ProductionQualityOption title="Standard Toothpaste" cost="5" quality="low" imageUrl={"url(/images/toothpastestandard.jpg)"} on_button_click={(e) => setProductionQualityAndCost(e, "low")}/>
          <ProductionQualityOption title="Amazing Toothpaste" cost="9" quality="high" imageUrl={"url(/images/toothpaseamazing.jpg)"} on_button_click={(e) => setProductionQualityAndCost(e, "high")}/> {/*Here we need to pass what kind of advertisement option the player chose*/ }
        </div>
        <br/><br/><br/><br/><br/><br/><br/>
          <h1><b>Choose how you want to advertise it.</b> All your products will be advertised this way.</h1>
          <p>When people are buying, they will only know the price and the advertised quality.
            They will not know the true quality until they have bought the product.</p> <br/>
          <p><strong>Note: </strong>You have the ability to make any kind of advertisement<br/> about your product in order to maximize your sales.</p>
          <p>Your current choice is to advertise your product as: <b>{player.round.get("advertisementQuality")} </b> quality toothspaste.</p>
          <div className="flex justify-center space-x-4"> {/* This flex container will lay out its children (products) in a row */}
          <AdvertisementQualityOption title="Standard Toothpaste (low quality)"  quality="low" imageUrl={"url(/images/toothpastestandard.jpg)"} on_button_click={(e) => setAdvertisementQuality(e, "low")}/>
          <AdvertisementQualityOption title="Amazing Toothpaste (high quality)"  quality="high" imageUrl={"url(/images/toothpaseamazing.jpg)"} on_button_click={(e) => setAdvertisementQuality(e, "high")}/>
        </div>
        <br/><br/><br/><br/><br/>
          <h1><b>Choose the price for your product</b></h1>

          <p> A typical price for <b>low </b> quality toothpaste is : $10 </p>
          <p> A typical price for <b>high</b> quality toothpaste is : $15 </p>
          <p><strong>Note: </strong>You have the ability to set any kind of price<br/> for your product in order to maximize your sales.</p>

          <p>Your current choice is to sell at a price of: <b>$ {player.round.get("priceOfProduct")} </b></p>
          <div className="flex justify-center space-x-4"> 
          <PriceButton text={'$10'} on_button_click={(e) => setProductPrice(e, 10)}></PriceButton>
          <PriceButton text={'$15'} on_button_click={(e) => setProductPrice(e, 15)}></PriceButton>
          </div>
          <ProfitMarginCalculation producerPlayer = {player}/>

          <div className="warrant-feature">
            <label>
                Warrant Amount: $
                <input
                    type="number"
                    value={player.round.get("warrantAmount") || 0}
                    onChange={updateWarrantAmount}
                    min="0"
                />
            </label>
          </div>

          {/* Display other players' advertisements */}
          <div className="other-players-ads-container">
                {otherPlayersAds}
            </div>

          <br/><br/>
            <GoToMarketButton on_button_click={(e) => submitRoundChoices(e)}/>
            <br/>
      </div>
    );

  }