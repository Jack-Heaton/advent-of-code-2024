import {data} from "./data.mjs";

const sample = `3   4
4   3
2   5
1   3
3   9
3   3`

// const data = sample;

const lines = data.split("\n");

const lists = [[],[]];

for ( const line of lines ) {

  const values = line.trim().split("   ").map(Number);
  
  values.forEach( ( value, index ) => {
    const position = lists[index].findIndex((v) => v > value);

    
    if( position === -1 ) {
      lists[index].push(value);
    } else {
      lists[index].splice(position, 0, value);
    }


  });

}

const part1 = lists[0].reduce((acc, value, index) => {
  return (Math.abs(value - lists[1][index]) + acc);
}, 0);

console.log(part1);

//Part 2

//Aggregate right list

const rightListLookup = {};

for (const value of lists[1]) {
  rightListLookup[value] = (rightListLookup[value] || 0) + 1;
}

const part2 = lists[0].reduce((acc, value, index) => {
  return acc + (value * (rightListLookup[value] || 0));
}, 0);

console.log(part2);