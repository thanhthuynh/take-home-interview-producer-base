
export function resolveWarrantChallenge(player, game) {
    // Retrieve the challenge from the target player
    const challenge = player.get("challenge");
    if (!challenge) return;
  
    const challengerPlayer = game.players.find(p => p.id === challenge.challenger);
    if (!challengerPlayer) return;
  
    const adQuality = player.get("adQuality");
    const productionQuality = player.get("productionQuality");
    const isWarrantTrue = adQuality === productionQuality;
  
    if (isWarrantTrue) {
      applyReward(player, challengerPlayer);
    } else {
      applyPenalty(player, challengerPlayer);
    }
}
  
  
export function applyPenalty(targetPlayer, challenger) {
    const warrantAmount = challenger.get("challenge").warrantAmount; // get warrantAmount from challenge object
    targetPlayer.set("challengeResult", {
      result: false,
      score: -1 * warrantAmount
    });
}
  
export function applyReward(targetPlayer, challenger) {
    const warrantAmount = challenger.get("challenge").warrantAmount; // get warrantAmount from challenge object
    targetPlayer.set("challengeResult", {
      result: true,
      score: warrantAmount
    });
}
  