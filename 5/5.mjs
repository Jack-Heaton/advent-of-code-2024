import {data} from "./data.mjs";

const sample = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

//const raw = sample;
const raw = data;

const [rules, updateSets] = raw.split("\n\n");

const rulesMap =  new Map();

rules.split("\n").forEach(rule => {
  const [key, value] = rule.split("|");
  
  rulesMap.set(key, [...rulesMap.get(key) || [], parseInt(value)]);
})

function checkUpdate(update, initialFailure = false) {
  let reprocess = false;
  const pages = [];
  const pageMap = new Map();
  const failedRules = [];

  let j = 0;

  const rulesToCheck = [];

  update.forEach( (pageNumber, i) => {

    pages.push(pageNumber);

    pageMap.set(String(pageNumber), [...(pageMap.get(String(pageNumber)) || []), i]);

    const rule = rulesMap.get(String(pageNumber));

    if (rule) {
      rulesToCheck.push({pageNumber,rule, ruleIndex: i});
    }
  });   

  for (const {pageNumber, rule, ruleIndex} of rulesToCheck) {
    for (const pageRule of rule) {
      const pageLocations = pageMap.get(String(pageRule));

      if(pageLocations) {
        for (const pageLocation of pageLocations) {
          if (pageLocation <= ruleIndex) {
            const newUpdate = [...pages.slice(0, pageLocation), ...pages.slice(pageLocation + 1), ...pages.slice(pageLocation, pageLocation + 1)];
            return checkUpdate(newUpdate, true);

          }
        }
      }
    }
  }

  return {
    mid: pages[Math.floor(pages.length / 2)],
    pass: !initialFailure
  }
}


const solutions = updateSets.split("\n").map(update => checkUpdate(update.split(",").map(Number)));

console.log(solutions.reduce((acc, curr) => {
  if(curr.pass) {
    acc.ok += curr.mid;
  } else {
    acc.corrected += curr.mid;
  }

  return acc;
}, {
  ok: 0,
  corrected: 0
}));
