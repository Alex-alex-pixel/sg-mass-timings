# Kaki Mahjong

A browser mahjong table that plays by **Singapore rules** — you sit East against three computer players.

Built as a learning project: no backend, no hosting, no accounts. Everything runs in the browser.

![screenshot](public/screenshot.png)

## What's implemented

- **148-tile Singapore set** — characters, bamboo, dots, winds, dragons, 8 flowers and 4 animals (cat, mouse, rooster, centipede), with automatic replacement draws from the back of the wall.
- **Full turn loop** — draw, discard, and claiming: pung and kong from anyone, chow only from the player on your left, win from anyone, with correct claim priority.
- **Win detection** — four sets plus a pair, solved with a recursive decomposition of the concealed hand plus exposed melds.
- **Tai scoring (core set)** — dragon triplets, seat and round wind, all triplets, half and full flush, ping hu, concealed hand, self-draw, animals, own flowers, no-flower bonus; capped at 5 tai with 2^tai payouts.
- **Simple bots** — heuristic tile valuation (duplicates, neighbours, distance from terminals) for discards, probabilistic claiming behaviour.

Deliberately left out to keep the rules learnable: kong robbing, hidden treasure, three/four animal bonuses, thirteen wonders, dealer streaks.

## Tech stack

- **Framework:** TanStack Start (React 19)
- **Language:** TypeScript (strict, `noUncheckedIndexedAccess`)
- **Styling:** Tailwind CSS v4 with semantic design tokens
- **Build:** Vite

## Project structure

```
src/
  game/       # Pure rules engine — tiles, win detection, tai scoring, bot logic
  hooks/      # useMahjong: turn loop and human interaction
  components/ # Tile faces and seats
  routes/     # / (the table) and /rules
```

The rules engine in `src/game/` has no React dependency, so it can be simulated headlessly — a 200-hand bot-vs-bot run finishes ~95% of hands with a legal win.

## Running locally

```bash
bun install
bun run dev
```

Then open `http://localhost:8080`.

## License

MIT.
