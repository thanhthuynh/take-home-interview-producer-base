function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
  
export function calculateAdvertiserScore(stage) {
  console.log("calculateAdvertiserScore");
    if (
      stage.get("name") !== "Advertise" ||
      stage.round.get("task") !== "advertise" ||
      stage.get("name") !== "Advertise" ||
      stage.round.get("task") !== "advertise2" ||
      stage.get("name") !== "Advertise" ||
      stage.round.get("task") !== "advertise3" ||
      stage.get("name") !== "Advertise" ||
      stage.round.get("task") !== "advertise4" ||
      stage.get("name") !== "Advertise" ||
      stage.round.get("task") !== "advertise5"
    ) {
      return;
    }
  
    for (const player of stage.currentGame.players) {
        let adQuality = player.round.get("adQuality");
        let salesCount = 0;
        let randomDraw = getRandomInt(100);
        salesCount = randomDraw * (adQuality === "extraordinary" ? 15 : 10);
        
        player.round.set("numBuyers", randomDraw);
        let totalScore = player.get("score") || 0;
        player.round.set("salesCount", salesCount);
        player.round.set("score", totalScore + salesCount);
    }
}