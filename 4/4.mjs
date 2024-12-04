import { data } from './data.mjs';

const sample = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

// const points = sample.split('\n').map(row => row.split(''));

const points = data.split('\n').map(row => row.split(''));

const search = 'XMAS'.split('');

const directions = [[0,1], [1,1], [1,0], [1,-1], [0,-1], [-1,-1], [-1,0], [-1,1]];

function evaluatePoint(x,y) {

  if(points[y][x] === search[0]) {
    const score = [1,1,1,1,1,1,1,1];

    let steps = 1;

    while(steps < search.length) {

      directions.forEach((direction, i) => {
        if(score[i] === 1) {
          if(points[y + direction[1] * steps]?.[x + direction[0] * steps] === search[steps]) {
            score[i] = 1;
          } else {
            score[i] = 0;
          }
        }

      });


      steps++;
    }

    return score.reduce((a,b) => a + b, 0);

  } else {
    return 0;
  }

}

function evaluatePart2(x,y) {

    const string = [
      points[y + 1]?.[x + 1],
      points[y + 1]?.[x - 1],
      points[y][x],
      points[y - 1]?.[x - 1],
      points[y - 1]?.[x + 1]
    ].join('');

    if(['SMAMS', 'SSAMM', 'MSASM', 'MMASS'].includes(string)) {
      return 1;
    } else {
      return 0;
    }

}

console.log(points.map((row, y) => row.map((point, x) => evaluatePoint(x,y))).flat().reduce((a,b) => a + b, 0));

console.log(points.map((row, y) => row.map((point, x) => evaluatePart2(x,y))).flat().reduce((a,b) => a + b, 0));