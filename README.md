# Advent of Code 2024

My solutions to [Advent of Code 2024](https://adventofcode.com/2024), the yearly December run of daily programming puzzles. I do it as a fun warm-up exercise, usually until the puzzles start eating my evenings.

**Language:** JavaScript (Node.js, ES modules)
**Progress:** Days 1–7

## Layout

Each day has its own folder (`1/` through `7/`) with a single `N.mjs` script that solves both parts and prints the answers.

## Running

Puzzle inputs are personal to each Advent of Code account, so they aren't committed. To run a day, add your input:

- Most days import it from `data.mjs` in the day's folder:

  ```js
  export const data = `...paste your puzzle input here...`;
  ```

- Day 3 reads `data.txt` from the current directory.

Then run it from the day's folder:

```bash
cd 1
node 1.mjs
```

Each script also has the puzzle's sample input inline, which you can swap in to check the example answers.
