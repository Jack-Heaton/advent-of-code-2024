import {data} from "./data.mjs";

const sample = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

// const raw = sample;
const raw = data;

const operations = raw.split("\n").map(line => {
  const [solution, args] = line.split(": ");
  const startPattern = args.split(" ").flatMap((e) => [Number(e), ' ']);
  startPattern.pop();
  return {
    solution: Number(solution),
    patterns: [startPattern]
  };
});

function evaluatePattern(pattern, allowConcat = false) {

  let mode = '+';

  const result = pattern.reduce((acc, curr, i) => {
    if(allowConcat && curr === '||') {
      mode = '||';
    } else if(curr === '*') {
      mode = '*';
    } else if(curr === '+') {
      mode = '+';
    } else if(typeof curr === 'number') {
      return mode === '||' ? Number([acc, curr].join('')) : mode === '*' ? acc * curr : acc + curr;
    }
    return acc;
  }, 0);

  return result;
  
}

function buildPatterns(patterns, allowConcat = false) {
  const patternsToCheck = [];

  while(patterns.length > 0) {
    const pattern = patterns.shift();

    const index = pattern.indexOf(' ');

    if(index > -1) {
      patterns.push([...pattern.slice(0, index),'*', ...pattern.slice(index + 1)]);
      patterns.push([...pattern.slice(0, index),'+', ...pattern.slice(index + 1)]);


      if(allowConcat) {
        patterns.push([...pattern.slice(0, index),'||', ...pattern.slice(index + 1)]);
      } 
      
    } else {
      patternsToCheck.push(pattern);
    }
    
  }

  return patternsToCheck;
}

function runPart(operationSet,allowConcat = false) {
  let trueSum = 0;
  

  let failures = [];


  for(const operation of operationSet) {
    const patterns = buildPatterns(structuredClone(operation.patterns), allowConcat);

    let solved = false;
  
    for(const pattern of patterns) {

      if(evaluatePattern(pattern, allowConcat) === operation.solution) {
        trueSum += operation.solution;
        solved = true;
        break;
      };

    }

    if(!solved) {
      failures.push(operation);
    }
  }
  
  return {
    trueSum,
    failures
  };
}

const result = runPart(operations, false);
console.log(result.trueSum, result.failures.length);


const result2 = runPart(result.failures, true);
console.log(result2.trueSum, result2.failures.length);

console.log(result.trueSum + result2.trueSum);