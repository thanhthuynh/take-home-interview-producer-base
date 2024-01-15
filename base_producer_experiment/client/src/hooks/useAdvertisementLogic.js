import { usePlayer, usePlayers } from "@empirica/core/player/classic/react";

export const useAdvertisementLogic = (roundNumber) => {
    const player = usePlayer();
    const players = usePlayers();
    const roundNumberText = 'round' + roundNumber;

    const updateWarrantAmount = (e) => {
        player.round.set("warrantAmount", parseInt(e.target.value, 10));
    };

    // Function to handle advertisement challenges
    const initiatePlayerChallenge = (challengedPlayerId) => {
        console.log(`Challenging player ${challengedPlayerId}'s advertisement`);
        const warrantAmount = player.round.get("warrantAmount");

        // Set challenge data for the challenger
        player.round.set("challenge", {
            status: true,
            target: challengedPlayerId,
            challenger: player.id,
            round: roundNumber,
            warrantAmount: warrantAmount
        });

        // Find the target player and set the challenge data for them as well
        const targetPlayer = players.find(p => p.id === challengedPlayerId);
        if (targetPlayer) {
            targetPlayer.round.set("challenge", {
            status: true,
            target: challengedPlayerId,
            challenger: player.id,
            round: roundNumber,
            warrantAmount: warrantAmount
            });
        }
    };

    function submitRoundChoices() {
        console.log("Player.stage set to true");
  
        player.set(roundNumberText.concat("_choices"),
        [player.round.get("productionQuality"),
        player.round.get("advertisementQuality"),
        player.round.get("priceOfProduct"),
        player.round.get("productionCost"),
        player.round.get("warrantAmount"),
        player.round.get("challenge")]);
  
        player.stage.set("submit", true); //player.stage.submit();
    };
  
    function setProductionQualityAndCost(e, productionQuality, cost) {
        player.round.set("productionQuality",productionQuality);
        if (player.round.get("productionQuality") === "low"){player.round.set("productionCost", 5)}
        if (player.round.get("productionQuality") === "high"){player.round.set("productionCost", 9)}     
        console.log("Saved production quality to player.round object: ", productionQuality);
        console.log("Saved production cost to player.round object: ", player.round.get("productionCost"));
    };
      
    function setAdvertisementQuality(e, advertisementQuality) {
        player.round.set("advertisementQuality", advertisementQuality);
        console.log("Saved advertisement quality to player.round object: ", advertisementQuality);
    };
  
    function setProductPrice(e, priceOfProduct) {
        player.round.set("priceOfProduct", priceOfProduct);
        console.log("Saved priceOfProduct to player.round object: ", priceOfProduct);
    };

    return {
        player,
        players,
        updateWarrantAmount,
        initiatePlayerChallenge,
        submitRoundChoices,
        setProductionQualityAndCost,
        setAdvertisementQuality,
        setProductPrice,
    };
}