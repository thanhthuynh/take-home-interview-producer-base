import React from "react";

export default function renderOtherPlayersAds(players, player, initiatePlayerChallenge) {
    return players.filter(p => p.id !== player.id).map(otherPlayer => (
      <div key={otherPlayer.id} className="other-player-ad">
          <div>
              <p>Player {otherPlayer.id}'s Advertisement:</p>
              <p>Production Quality: {otherPlayer.round.get("productionQuality")}</p>
              <p>Advertisement Quality: {otherPlayer.round.get("advertisementQuality")}</p>
              <p>Price: ${otherPlayer.round.get("priceOfProduct")}</p>
              <p>Warrant: {otherPlayer.round.get("warrantAmount")}</p>
              <p>Challenged: {player.round.get("challenge")?.status ? "Yes" : "No"}</p>
              <Button text="Challenge" handleClick={(e) => initiatePlayerChallenge(e, player.id)}>Challenge</Button>
          </div>
      </div>
    ));
  }