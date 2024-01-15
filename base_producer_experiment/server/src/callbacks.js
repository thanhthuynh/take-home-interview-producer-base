import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {

  const round0 = game.addRound({
    name: "Advertise",
    task: "advertise",
  });
  round0.addStage({ name: "advertiseProduct", duration: 240 });

  const round1 = game.addRound({
    name: "Results",
    task: "results",
  });
  round1.addStage({ name: "Result", duration: 140 });

  const round2 = game.addRound({
    name: "Advertise",
    task: "advertise2",
  });
  round2.addStage({ name: "advertiseProduct", duration: 240 });
  
  const round3 = game.addRound({
    name: "Results",
    task: "results2",
  });
  round3.addStage({ name: "Result", duration: 140 });

  const round4 = game.addRound({
    name: "Advertise",
    task: "advertise3",
  });
  round4.addStage({ name: "advertiseProduct", duration: 240 });
  
  const round5 = game.addRound({
    name: "Results",
    task: "results3",
  });
  round5.addStage({ name: "Result", duration: 140 });

  const round6 = game.addRound({
    name: "Advertise",
    task: "advertise4",
  });
  round6.addStage({ name: "advertiseProduct", duration: 240 });
  
  const round7 = game.addRound({
    name: "Game Results",
    task: "results4",
  });
  round7.addStage({ name: "Result", duration: 140 });

  // Initialize warrant data for each player
  game.players.forEach(player => {
    player.set("warrant", {
      amount: 0,      // Initial warrant amount
      active: false,  // Indicates if the warrant is currently active
      challenged: false // Tracks if the warrant has been challenged
    });
  });
});

Empirica.onRoundStart(({ round }) => {});

Empirica.onStageStart(({ stage }) => {});

Empirica.onStageEnded(({ stage, game }) => {
  if (stage.get("name") === "advertiseProduct") {
    calculateAdvertiserScore(stage); // Calculate scores at the end of the selection stage

    stage.currentGame.players.forEach(player => {
      const challenge = player.round.get("challenge");
      if (challenge) {
        const targetPlayer = stage.currentGame.players.find(p => p.id === challenge.target);
        if (targetPlayer) {
          resolveWarrantChallenge(targetPlayer, stage.currentGame);

        }
      }
    });
  }
});

Empirica.onRoundEnded(({ round }) => {

  round.currentGame.players.forEach(player => {
    const warrant = player.get("challengeResult");
    if (warrant.active && !warrant.challenged) {
      applyReward(player);
    }
  });

  player.set("challenge", null);
});

Empirica.onGameEnded(({ game }) => {});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function calculateAdvertiserScore(stage) {
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


function resolveWarrantChallenge(player, game) {
  // Retrieve the challenge from the target player
  const challenge = player.round.get("challenge");
  if (!challenge) return;

  const challengerPlayer = game.players.find(p => p.id === challenge.challenger);
  if (!challengerPlayer) return;

  const adQuality = player.round.get("adQuality");
  const productionQuality = player.round.get("productionQuality");
  const isWarrantTrue = adQuality === productionQuality;

  if (isWarrantTrue) {
    applyReward(player, challengerPlayer);
  } else {
    applyPenalty(player, challengerPlayer);
  }
}


function applyPenalty(targetPlayer, challenger) {
  const warrantAmount = challenger.round.get("challenge")?.warrantAmount; // get warrantAmount from challenge object
  targetPlayer.round.set("challengeResult", {
    result: false,
    score: -1 * warrantAmount
  });
}

function applyReward(targetPlayer, challenger) {
  const warrantAmount = challenger.round.get("challenge")?.warrantAmount; // get warrantAmount from challenge object
  targetPlayer.round.set("challengeResult", {
    result: true,
    score: warrantAmount
  });
}
