import { data } from "./data.mjs";

const sample = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`

// const raw = sample;
const raw = data;
  

//Setup
let x = 0;
let y = 0;
let i = 0;
let currentX = 0;
let currentY = 0;
let currentDirection = "";

const positionList = new Map();

while(i < raw.length) {
  
  if(raw[i] === "\n") {
    x = 0;
    y++;
  } else {
    let start = false;

    if(['^', '>', 'v', '<'].includes(raw[i])) {
      currentX = x;
      currentY = y;
      currentDirection = raw[i];
      start = true;
    }
    positionList.set(`${x},${y}`, {
      obstacle: raw[i] === "#",
      "^": false,
      ">": false,
      "v": false,
      "<": false,
      visited: false
    });
    x++;
  }

  i++;
}

//Part 1

function walkPath(x, y, dir, positionList, steps = 0, unique = 0) {

  const currentPosition = positionList.get(`${x},${y}`);

  //Guard left
  if(!currentPosition) {
    return {x, y, dir, positionList, steps, unique,action: "left perimeter"};
  }

  if(currentPosition[dir]) {
    return {x, y, dir, positionList, steps, unique, action: "in loop"};
  }

  if(!currentPosition.visited) {
   unique++;
   currentPosition.visited = true;
  }

  currentPosition[dir] = true;

  //Get next position
  let nextX = x;
  let nextY = y;
  let nextDirection = dir;

  if(dir === "^") {
    nextY--;
  } else if(dir === ">") {
    nextX++;
  } else if(dir === "v") {
    nextY++;
  } else if(dir === "<") {
    nextX--;
  }

  const nextPosition = positionList.get(`${nextX},${nextY}`);

  //If no next position, turn.
  if(nextPosition?.obstacle) {
    // console.log(!nextPosition ? "no next position" : "hit obstacle");
    if(dir === "^") {
      nextDirection = ">";
    } else if(dir === ">") {
      nextDirection = "v";
    } else if(dir === "v") {
      nextDirection = "<";
    } else if(dir === "<") {
      nextDirection = "^";
    }

    return {x, y, dir: nextDirection, positionList, steps, unique};
  }

  return {x: nextX, y: nextY, dir: nextDirection, positionList, steps: steps + 1, unique};

}

function runFullPath(x,y, dir, positionList, log = false) {
  let action;
  let steps = 0;
  let unique = 0;
  let visitedSpaces = new Set();

  let start = true;

  while(!action) {
    const result = walkPath(x,y, dir, positionList, steps, unique);
    if(log) console.log({
      x: result.x,
      y: result.y,
      dir: result.dir,
      action: result.action
    });
    if(!start && !result.action) {
      visitedSpaces.add(`${x},${y}`);
    }
    start = false;
    unique = result.unique;
    steps = result.steps;
    x = result.x;
    y = result.y;
    dir = result.dir;
    action = result.action;
    positionList = result.positionList;
  }

  return {
    unique,
    visitedSpaces,
    action
  };
}

const {unique, visitedSpaces} = runFullPath(currentX, currentY, currentDirection, structuredClone(positionList));

//Part 1
console.log(unique);

function findPathBlockers(x, y, dir, positionList, visitedSpaces) {

  let blockerCount = 0;
  let cycle = 0;

  for(const space of visitedSpaces.entries()) {


    const alternatePositionsList = structuredClone(positionList);
    alternatePositionsList.set(space[0], {
      obstacle: true,
      "^": false,
      ">": false,
      "v": false,
      "<": false,
      visited: false
    });

    const {action } = runFullPath(x, y, dir, alternatePositionsList);

    if(action === "in loop") {
      blockerCount++;
    }

    cycle++;

  }

  return blockerCount;
}

//Part 2
console.log(findPathBlockers(currentX, currentY, currentDirection, structuredClone(positionList), visitedSpaces));