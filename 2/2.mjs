import {data} from "./data.mjs";

function isSafe(values) {
  if(values.length === 1) {
    return false;
  }
  
  let errorAtPosition = null;

  let i = 0;

  if(values[0] === values[1]) {
    errorAtPosition = 0;
  }

  const direction = values[0] - values[1] > 0 ? -1 : 1;;

  for (const value of values) {

    if(values[i + 1]) {

      const delta = value - values[i + 1];

      if(delta === 0 || delta * direction > 0 || Math.abs(delta * direction) > 3) {
        errorAtPosition = i + 1;
        break;
      }
    }

    i++;
  };

  return errorAtPosition === null;
}

function processReports(reports, log = false) {

  let safeReportCount = 0;
  let unsafeReports = [];

  for (const values of reports) {

    if(isSafe(values)) {
      safeReportCount++;
    } else {
      unsafeReports.push(values);
    }
  }

  return [safeReportCount, unsafeReports];
}

function reprocess(reports) {

  let safeCount = 0;

  for (const values of reports) {

    const len = values.length;

    let i = 0;

    while(i < len) {

      const subArray = [...values.slice(0, i), ...values.slice(i + 1)];

      if(isSafe(subArray)) {

        safeCount++;
        break;
      }

      i++;
    }
  }

  return safeCount;

}

const sample = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

// const reports = sample.split("\n").map(report => report.split(" ").map(Number));
const reports = data.split("\n").map(report => report.split(" ").map(Number));


const [safePart1, unsafeReports] = processReports(reports);

const safePart2 = reprocess(unsafeReports);

console.log(safePart1, safePart1 + safePart2);