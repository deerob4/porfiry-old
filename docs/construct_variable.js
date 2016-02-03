'use strict';

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const variables = [];

rl
  .on('line', (line) => getInfo(line))
  .on('close', () => constructTable(variables));

function getInfo(line) {
  line = line
          .replace(/_/g, '\\_')
          .split(' ')
          .filter(x => x !== '' && x.length >= 3);

  let d = {
    location: line[0].split(':')[0],
    type: line[1],
    name: line[2]
  };

  variables.push(d);
}

function constructTable(variables) {
  let tableRows = '';
  let wow = variables
              .map(v => `${v.name} & ${v.location} & ${v.type} & Purpose \\\\ \\hline `)
              .forEach(x => tableRows += x);

  let baseTable = `
\\begin{table}[]
\\centering
\\caption{My caption}
\\label{my-label}
\\begin{tabular}{|l|l|l|l|}
\\hline
\\multicolumn{1}{|c|}{\\textbf{Name}} & \\multicolumn{1}{c|}{\\textbf{Location}} & \\multicolumn{1}{c|}{\\textbf{Type}} & \\multicolumn{1}{c|}{\\textbf{Purpose}} \\\\ \\hline
${tableRows}
\\end{tabular}
\\end{table}
  `;

  console.log(baseTable);
}

