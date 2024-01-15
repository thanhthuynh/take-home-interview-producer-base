function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
  
export function calculateAdvertiserScore(stage) {
    if (
      stage.get("name") !== "Advertise" ||
      stage.round.get("task") !== "advertise" ||
      stage.get("name") !== "Advertise Again" ||
      stage.round.get("task") !== "advertiseAgain"
    ) {
      return;
    }
  
    for (const player of stage.currentGame.players) {
      const challenge = player.round.get("challengeResult");
      if (!challenge || challenge?.result) {
        // Only update score if no challenge or challenge upheld
        let adQuality = player.get("adQuality");
        let salesCount = 0;
        let randomDraw = getRandomInt(100);
        salesCount = randomDraw * (adQuality === "extraordinary" ? 15 : 10);
        
        player.set("numBuyers", randomDraw);
        let totalScore = player.get("score") || 0;
        player.set("salesCount", salesCount);
        player.set("score", totalScore + salesCount);
      }
    }
}