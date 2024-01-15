import React from "react";
import { Avatar } from "./Avatar"

export default function PlayerScore(player, onChange, isResultStage) {
    return (
      <div key={player.id} className="py-4">
        <div className="flex items-center space-x-6">
          <div className="h-12 w-12 shrink-0">
            <Avatar player={player} />
          </div>

          {isResultStage ? (
            <div className="flex flex-col items-center space-y-0.5">
              <div className="text-2xl font-semibold leading-none font-mono">
                {player.round.get("score") || 0}
              </div>
              <h1 className="text-xs font-semibold uppercase tracking-wider leading-none text-gray-400">
                Score
              </h1>
            </div>
          ) : null}
        </div>
      </div>
    );
}