import { useCallback, useEffect, useRef, useState } from "react";
import {
  type Claim,
  type GameState,
  applyClaim,
  botClaim,
  botDiscard,
  claimsFor,
  declareWin,
  discard,
  drawTile,
  newGame,
  nextTurn,
} from "../game/engine";
import { canWin } from "../game/win";
import type { Tile } from "../game/tiles";

const SPEED = 650;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function useMahjong() {
  const stateRef = useRef<GameState>(newGame());
  const [, setTick] = useState(0);
  const runningRef = useRef(false);
  const render = useCallback(() => setTick((t) => t + 1), []);

  /** Runs bot actions until it's the human's move (or the hand ends). */
  const run = useCallback(
    async (opts: { skipDrawFor?: number } = {}) => {
      if (runningRef.current) return;
      runningRef.current = true;
      const s = stateRef.current;
      let skipDraw = opts.skipDrawFor;

      try {
        for (let guard = 0; guard < 400; guard++) {
          if (s.phase === "over") return;
          const pi = s.turn;

          if (pi === 0) {
            if (skipDraw !== 0) {
              await sleep(SPEED / 2);
              const t = drawTile(s, 0);
              if (t === null) return render();
            }
            skipDraw = undefined;
            s.humanCanWinOnDraw = canWin(s.players[0]!.hand, s.players[0]!.melds);
            s.phase = "human-turn";
            render();
            return;
          }

          if (skipDraw !== pi) {
            await sleep(SPEED);
            const t = drawTile(s, pi);
            if (t === null) return render();
            render();
            if (canWin(s.players[pi]!.hand, s.players[pi]!.melds)) {
              declareWin(s, pi, true);
              render();
              return;
            }
          }
          skipDraw = undefined;

          await sleep(SPEED);
          discard(s, pi, botDiscard(s, pi));
          render();
          await sleep(SPEED / 2);

          // Human first refusal
          const hClaims = claimsFor(s, 0);
          if (hClaims.length) {
            s.humanClaims = hClaims;
            s.phase = "human-claim";
            render();
            return;
          }

          const bc = botClaim(s);
          if (bc) {
            applyClaim(s, bc);
            render();
            if ((s.phase as string) === "over") return;
            if (bc.player === 0) {
              s.phase = "human-turn";
              render();
              return;
            }
            skipDraw = bc.player;
            continue;
          }

          s.lastDiscard = null;
          nextTurn(s);
        }
      } finally {
        runningRef.current = false;
      }
    },
    [render],
  );

  useEffect(() => {
    void run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const humanDiscard = useCallback(
    (tile: Tile) => {
      const s = stateRef.current;
      if (s.phase !== "human-turn" || runningRef.current) return;
      discard(s, 0, tile);
      s.humanCanWinOnDraw = false;
      s.phase = "ai";
      render();

      void (async () => {
        await sleep(SPEED / 2);
        const bc = botClaim(s);
        if (bc) {
          applyClaim(s, bc);
          render();
          if ((s.phase as string) === "over") return;
          void run({ skipDrawFor: bc.player });
          return;
        }
        s.lastDiscard = null;
        nextTurn(s);
        s.phase = "ai";
        render();
        void run();
      })();
    },
    [render, run],
  );

  const humanClaim = useCallback(
    (claim: Claim) => {
      const s = stateRef.current;
      if (s.phase !== "human-claim") return;
      applyClaim(s, claim);
      s.humanClaims = [];
      render();
      if ((s.phase as string) === "over") return;
      s.phase = "human-turn";
      s.humanCanWinOnDraw = canWin(s.players[0]!.hand, s.players[0]!.melds);
      render();
    },
    [render],
  );

  const humanPass = useCallback(() => {
    const s = stateRef.current;
    if (s.phase !== "human-claim") return;
    s.humanClaims = [];
    s.phase = "ai";
    render();

    void (async () => {
      const bc = botClaim(s);
      if (bc) {
        applyClaim(s, bc);
        render();
        if (s.phase === "over") return;
        void run({ skipDrawFor: bc.player });
        return;
      }
      s.lastDiscard = null;
      nextTurn(s);
      void run();
    })();
  }, [render, run]);

  const humanWin = useCallback(() => {
    const s = stateRef.current;
    if (s.phase !== "human-turn" || !s.humanCanWinOnDraw) return;
    declareWin(s, 0, true);
    render();
  }, [render]);

  const restart = useCallback(() => {
    const scores = stateRef.current.players.map((p) => p.score);
    stateRef.current = newGame(scores);
    runningRef.current = false;
    render();
    void run();
  }, [render, run]);

  return {
    state: stateRef.current,
    humanDiscard,
    humanClaim,
    humanPass,
    humanWin,
    restart,
  };
}
