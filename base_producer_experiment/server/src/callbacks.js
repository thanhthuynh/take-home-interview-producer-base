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

Empirica.onRoundStart(({ round }) => {
  // Reset warrant status at the start of each round
  round.currentGame.players.forEach(player => {
    const warrant = player.get("warrant");
    player.set("warrant", { ...warrant, active: true, challenged: false });
  });
});

Empirica.onStageStart(({ stage }) => {
  calculateAdvertiserScore(stage);
});

Empirica.onStageEnded(({ stage, game }) => {
  if (stage.get("name") === "advertiseProduct") {
    stage.currentGame.players.forEach(player => {
      const challenge = player.get("challenge");
      if (challenge) {
        const targetPlayer = stage.currentGame.players.find(p => p.id === challenge.target);
        if (targetPlayer) {
          // Implement logic to handle the challenge
          resolveWarrantChallenge(targetPlayer, stage.currentGame);

          // Reset the challenge state
          player.set("challenge", null);
        }
      }
    });
  }
});

Empirica.onRoundEnded(({ round }) => {
  // Apply rewards for unchallenged warrants
  round.currentGame.players.forEach(player => {
    const warrant = player.get("warrant");
    if (warrant.active && !warrant.challenged) {
      applyReward(player);
    }
  });

  // ... other round end logic
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
    console.log('calculating advertiser score')
    let adQuality = player.get("adQuality")
    let salesCount = 0
    let randomDraw = 0
    if (adQuality == "extraordinary") {
      randomDraw = getRandomInt(100)
      salesCount = randomDraw * 15;
    } {
      let randomDraw = getRandomInt(100)
      salesCount = randomDraw * 10;
    }

    player.set("numBuyers", randomDraw);

    let totalScore = player.get("score") || 0;
    player.set("salesCount", salesCount);
    player.set("score", totalScore + salesCount);
    player.set("scoreUpdated", true)
  }
}

// Handle the resolution of a warrant challenge
function resolveWarrantChallenge(player, game) {
  const adQuality = player.get("adQuality");
  const productionQuality = player.get("productionQuality");
  // Logic to determine if the warrant is true
  const isWarrantTrue = adQuality === productionQuality;

  if (isWarrantTrue) {
    applyReward(player); // Apply reward if the warrant is true
  } else {
    applyPenalty(player); // Apply penalty if the warrant is false
  }
}

// Apply penalty to a player
function applyPenalty(player) {
  // Logic to reduce the player's customers or points
  let score = player.get("challenge")?.score || 0;
  player.set("challenge", {
    result: null,
    challenged: false,
    score: score * 0.8
  });
}

// Apply reward to a player
function applyReward(player) {
  // Logic to increase the player's customers or points
  let score = player.get("challenge")?.score || 0;
  player.set("challenge", {
    result: null,
    challenged: false,
    score: score * 1.2
  });
}