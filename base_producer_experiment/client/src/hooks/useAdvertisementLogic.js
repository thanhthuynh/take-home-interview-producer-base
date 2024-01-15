import { usePlayer, usePlayers } from "@empirica/core/player/classic/react";

export const useAdvertisementLogic = (roundNumber) => {
    const player = usePlayer();
    const players = usePlayers();
    const roundNumberText = 'round' + roundNumber;

    function updateWarrantAmount(e) {
        player.round.set("warrantAmount", parseInt(e.target.value, 10));
        console.log("Saved warrant amount to player.round object: ", player.round.get("warrantAmount"));
    };

    // Function to handle advertisement challenges
    function initiatePlayerChallenge(e, challengedPlayerId) {
        console.log(`Challenging player ${challengedPlayerId}'s advertisement`);
        const warrantAmount = player.round.get("warrantAmount") || 0;
        console.log("here");

        // Set challenge data for the challenger
        player.round.set("challenge", {
            target: challengedPlayerId,
            challenger: player.id,
            round: roundNumber,
            warrantAmount: warrantAmount,
            wasChallenged: false
        });

        // Find the target player and set the challenge data for them as well
        const targetPlayer = players.find(p => p.id === challengedPlayerId);
        if (targetPlayer) {
            targetPlayer.round.set("challenge", {
            target: challengedPlayerId,
            challenger: player.id,
            round: roundNumber,
            warrantAmount: warrantAmount,
            wasChallenged: true 
            });
        }

        console.log("Challenger Player", player.id);
        console.log(player.round.get("challenge")?.wasChallenged)
        console.log("Target Player", challengedPlayerId);
        console.log(targetPlayer.round.get("challenge")?.wasChallenged);
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
  
    function setProductionQualityAndCost(e, productionQuality) {
        player.round.set("productionQuality",productionQuality);
        if (player.round.get("productionQuality") === "low"){player.round.set("productionCost", 5)}
        if (player.round.get("productionQuality") === "high"){player.round.set("productionCost", 9)}     
        console.log("Saved production quality to player.round object: ", productionQuality);
    };
      
    function setAdvertisementQuality(e, advertisementQuality) {
        player.round.set("advertisementQuality", advertisementQuality);
        console.log("Saved advertisement quality to player.round object: ", advertisementQuality);
    };
  
    function setProductPrice(e, priceOfProduct) {
        player.round.set("priceOfProduct", priceOfProduct);
        console.log("Saved priceOfProduct to player.round object: ", priceOfProduct);
    };

    function updatePlayerScoreDisplay() {
        console.log("Player score updated");
      }

    return {
        player,
        players,
        updateWarrantAmount,
        initiatePlayerChallenge,
        submitRoundChoices,
        setProductionQualityAndCost,
        setAdvertisementQuality,
        setProductPrice,
        updatePlayerScoreDisplay
    };
}