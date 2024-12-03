import {readFileSync} from 'fs';

const fileData = readFileSync('data.txt', 'utf8');

const sample = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const sample2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;


function runProgram(data) {

  let i = 0;
  let j = 0;
  let k = 0;

  let executeFlag = true;

  let part1Total = 0;
  let part2Total = 0;

  while(i < data.length) {

    //open start sequence
    if(data.substring(i, i + 4) === 'mul(') {
      j = i + 4;

      let number1 = '';
      let number2 = '';

      while(j < data.length) {

        if(data[j] === ',') {
          number1 = data.substring(i + 4, j);
          k = j + 1;
          break;
        }

        j++;

      }

      while(k < data.length) {

        if(data[k] === ')') {
          number2 = data.substring(j + 1, k);
          break;
        }

        k++;
      }

      if(number1 && number2 && !isNaN(number1) && !isNaN(number2)) {
        part1Total += parseInt(number1) * parseInt(number2);
        if(executeFlag) {
          part2Total += parseInt(number1) * parseInt(number2);
        }
      }
    }



    if(data.substring(i,i+4) === 'do()') {
      executeFlag = true;
    }

    if(data.substring(i,i+7) === "don't()") {
      executeFlag = false;
    }


    i++;
    
  }

  return {part1Total, part2Total};
}

console.log(runProgram(sample));
console.log(runProgram(sample2));
console.log(runProgram(fileData));
