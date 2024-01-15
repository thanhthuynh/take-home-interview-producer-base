
export function resolveWarrantChallenge(player, game) {
    // Retrieve the challenge from the target player
    const challenge = player.round.get("challenge");
    if (!challenge?.wasChallenged) return;
  
    const challengerPlayer = game.players.find(p => p.id === challenge.challenger);
    if (!challengerPlayer) return;
  
    const adQuality = player.round.get("advertisementQuality");
    const productionQuality = player.round.get("productionQuality");
    const isWarrantTrue = adQuality === productionQuality;
  
    if (isWarrantTrue) {
      applyReward(player, challengerPlayer);
    } else {
      applyPenalty(player, challengerPlayer);
    }
}
  
  
export function applyPenalty(targetPlayer, challenger) {
    const warrantAmount = challenger.round.get("challenge")?.warrantAmount || 0; // get warrantAmount from challenge object
    targetPlayer.round.set("challengeResult", {
      result: false,
      score: -1 * warrantAmount
    });
}
  
export function applyReward(targetPlayer, challenger) {
    const warrantAmount = challenger.round.get("challenge")?.warrantAmount || 0; // get warrantAmount from challenge object
    targetPlayer.round.set("challengeResult", {
      result: true,
      score: warrantAmount
    });
}
  