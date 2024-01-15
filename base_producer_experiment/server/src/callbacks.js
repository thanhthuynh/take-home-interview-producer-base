import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();
import { calculateAdvertiserScore } from "./utils/calculateScore";
import { resolveWarrantChallenge } from "./utils/warrantUtils";

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

Empirica.onStageStart(({ stage }) => {
  if (stage.get("name") === "Results") {
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

Empirica.onStageEnded(({ stage, game }) => {});

Empirica.onRoundEnded(({ round }) => {
  round.currentGame.players.forEach(player => {
    const challengeResult = player.get("challengeResult");
    const challenge = player.round.get("challenge");
    if (challenge?.wasChallenged && challengeResult?.result) {
      applyReward(player);
    }
  });
});

Empirica.onGameEnded(({ game }) => {});