// let data = [];


// document.addEventListener('DOMContentLoaded', async () => {
//   await loadData();
// });


// let commits = [];

// function processCommits() {
//   commits = d3
//     .groups(data, (d) => d.commit)
//     .map(([commit, lines]) => {
//       let first = lines[0];
//       let { author, date, time, timezone, datetime } = first;
//       let ret = {
//         id: commit,
//         url: 'https://github.com/vis-society/lab-7/commit/' + commit,
//         author,
//         date,
//         time,
//         timezone,
//         datetime,
//         hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
//         totalLines: lines.length,
//       };

//       // Add the 'lines' property as a hidden property
//       Object.defineProperty(ret, 'lines', {
//         value: lines,
//         writable: false,       
//         configurable: false,  
//         enumerable: false,     
//       });
//       return ret;
//     });
// }

// async function loadData() {
//   data = await d3.csv('loc.csv', (row) => ({
//     ...row,
//     line: Number(row.line), // or just +row.line
//     depth: Number(row.depth),
//     length: Number(row.length),
//     date: new Date(row.date + 'T00:00' + row.timezone),
//     datetime: new Date(row.datetime),
//   }));

//   function displayStats() {
//     // Process commits first
//     processCommits();
  
//     // Create the dl element
//     const dl = d3.select('#stats').append('dl').attr('class', 'stats');
  
//     // Add total LOC
//     dl.append('dt').html('Total <abbr title="Lines of code">LOC</abbr>');
//     dl.append('dd').text(data.length);
  
//     // Add total commits
//     dl.append('dt').text('Total commits');
//     dl.append('dd').text(commits.length);
  
//     // Add avg file length
//     dl.append('dt').text('Average file length (in lines)');
//     dl.append('dd').text(d3.mean(data, (d) => d.length).toFixed(2));
    
//     // Add number of files
//     dl.append('dt').text('Number of files');
//     dl.append('dd').text(d3.group(data, (d) => d.file).size);

//     // most productive time period of the week
//     const workByPeriod = d3.rollups(
//       data,
//       (v) => v.length,
//       (d) => new Date(d.datetime).toLocaleString('en', { dayPeriod: 'short' })
//     );
//     const maxPeriod = d3.greatest(workByPeriod, (d) => d[1])?.[0];
//     dl.append('dt').text('Most productive period');
//     dl.append('dd').text(maxPeriod);

//   }
//   console.log(commits);
// }

// function createScatterplot() {
//   const width = 1000;
//   const height = 600;

// const svg = d3
//     .select('#chart')
//     .append('svg')
//     .attr('viewBox', `0 0 ${width} ${height}`)
//     .style('overflow', 'visible');

// // Create scales
// const xScale = d3
//     .scaleTime()
//     .domain(d3.extent(commits, (d) => d.datetime))
//     .range([0, width])
//     .nice();

// const yScale = d3.scaleLinear().domain([0, 24]).range([height, 0]);

// // Adding axes
// const margin = { top: 10, right: 10, bottom: 30, left: 20 };
// const usableArea = {
//   top: margin.top,
//   right: width - margin.right,
//   bottom: height - margin.bottom,
//   left: margin.left,
//   width: width - margin.left - margin.right,
//   height: height - margin.top - margin.bottom,
// };

// // // Add gridlines
// // const gridlines = svg
// //   .append('g')
// //   .attr('class', 'gridlines')
// //   .attr('transform', `translate(${usableArea.left}, 0)`);

// // // Create gridlines as an axis with no labels and full-width ticks
// // gridlines.call(d3.axisLeft(yScale).tickFormat('').tickSize(-usableArea.width));


// // Create the axes
// const xAxis = d3.axisBottom(xScale);
// const yAxis = d3
//   .axisLeft(yScale)
//   .tickFormat((d) => String(d % 24).padStart(2, '0') + ':00');

// // Add X axis
// svg
//   .append('g')
//   .attr('transform', `translate(0, ${usableArea.bottom})`)
//   .call(xAxis);

// // Add Y axis
// svg
//   .append('g')
//   .attr('transform', `translate(${usableArea.left}, 0)`)
//   .call(yAxis);

// // Update scales with new ranges
// xScale.range([usableArea.left, usableArea.right]);
// yScale.range([usableArea.bottom, usableArea.top]);


// // Draw dots
//   const dots = svg.append('g').attr('class', 'dots');

//   dots
//     .selectAll('circle')
//     .data(commits)
//     .join('circle')
//     .attr('cx', (d) => xScale(d.datetime))
//     .attr('cy', (d) => yScale(d.hourFrac))
//     .attr('r', 5)
//     .attr('fill', 'steelblue');
// // }


let data = [];
let commits = [];

document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  processCommits(); 
  displayStats();
  createScatterplot();
});

async function loadData() {
  data = await d3.csv('loc.csv', (row) => ({
    ...row,
    line: +row.line,
    depth: +row.depth,
    length: +row.length,
    date: new Date(row.date + 'T00:00' + row.timezone),
    datetime: new Date(row.datetime),
  }));
}

function processCommits() {
  commits = d3
    .groups(data, (d) => d.commit)
    .map(([commit, lines]) => {
      let first = lines[0];
      let { author, date, time, timezone, datetime } = first;
      let ret = {
        id: commit,
        url: 'https://github.com/vis-society/lab-7/commit/' + commit,
        author,
        date,
        time,
        timezone,
        datetime,
        hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
        totalLines: lines.length,
      };

      Object.defineProperty(ret, 'lines', {
        value: lines,
        writable: false,
        configurable: false,
        enumerable: false,
      });

      return ret;
    });
}

function displayStats() {
  const statsDiv = d3.select('#stats');
  statsDiv.html('');  
  const dl = statsDiv.append('dl').attr('class', 'stats');

  dl.append('dt').html('Total <abbr title="Lines of code">LOC</abbr>');
  dl.append('dd').text(data.length);

  dl.append('dt').text('Total commits');
  dl.append('dd').text(commits.length);

  dl.append('dt').text('Average file length (in lines)');
  dl.append('dd').text(d3.mean(data, (d) => d.length).toFixed(2));

  dl.append('dt').text('Number of files');
  dl.append('dd').text(d3.group(data, (d) => d.file).size);

  const workByPeriod = d3.rollups(
    data,
    (v) => v.length,
    (d) => new Date(d.datetime).toLocaleString('en', { dayPeriod: 'short' })
  );
  const maxPeriod = d3.greatest(workByPeriod, (d) => d[1])?.[0];
  dl.append('dt').text('Most productive period');
  dl.append('dd').text(maxPeriod);
}

let xScale, yScale; 
let brushSelection = null; 
function createScatterplot() {
  const width = 1000;
  const height = 600;
  const margin = { top: 10, right: 10, bottom: 30, left: 40 };

  const svg = d3.select('#chart').append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .style('overflow', 'visible');

  // Initialize global scales
  xScale = d3.scaleTime()
    .domain(d3.extent(commits, (d) => d.datetime))
    .range([margin.left, width - margin.right])
    .nice();

  yScale = d3.scaleLinear()
    .domain([0, 24])
    .range([height - margin.bottom, margin.top]);

  const rScale = d3.scaleSqrt()
    .domain(d3.extent(commits, (d) => d.totalLines))
    .range([5, 30]);

  // Add axes
  svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));

  svg.append('g')
    .attr('class', 'y-axis')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale).tickFormat((d) => `${String(d % 24).padStart(2, '0')}:00`));

  // Add dots
  const dots = svg.append('g').attr('class', 'dots');
  dots.selectAll('circle')
    .data(commits)
    .join('circle')
    .attr('cx', (d) => xScale(d.datetime))
    .attr('cy', (d) => yScale(d.hourFrac))
    .attr('r', (d) => rScale(d.totalLines))
    .attr('fill', 'steelblue')
    .style('fill-opacity', 0.7)
    .on('mouseenter', function (event, d) {
      d3.select(event.currentTarget).style('fill-opacity', 1);
      updateTooltipContent(d);
      updateTooltipVisibility(true);
      updateTooltipPosition(event);
    })
    .on('mouseleave', function () {
      d3.select(event.currentTarget).style('fill-opacity', 0.7);
      updateTooltipContent({});
      updateTooltipVisibility(false);
    });

  // Add brush selector
  brushSelector(svg);
}


// Update data in the tooltip
function updateTooltipContent(commit) {
  const link = document.getElementById('commit-link');
  const date = document.getElementById('commit-date');
  const time = document.getElementById('commit-time');
  const author = document.getElementById('commit-author');
  const linesEdited = document.getElementById('commit-lines-edited');

  if (Object.keys(commit).length === 0) return;

  document.getElementById('commit-tooltip').style.display = 'block';
  link.href = commit.url;
  link.textContent = commit.id;
  date.textContent = commit.datetime?.toLocaleDateString('en', { dateStyle: 'full' });
  time.textContent = commit.time;
  author.textContent = commit.author;
  linesEdited.textContent = commit.totalLines;
}


// Hover Effect
function updateTooltipVisibility(isVisible) {
  const tooltip = document.getElementById('commit-tooltip');
  tooltip.hidden = !isVisible;
}


function updateTooltipPosition(event) {
  const tooltip = document.getElementById('commit-tooltip');
  tooltip.style.left = `${event.clientX}px`;
  tooltip.style.top = `${event.clientY}px`;
}


// set up brush
function brushSelector() {
  const svg = document.querySelector('svg');

  const brush = d3.brush()
    .extent([[0, 0], [1000, 600]])  // Set brushable area
    .on('start brush end', brushed); // Attach event listeners for the brush

  // Apply the brush to the SVG element
  d3.select(svg).call(brush);

  // Raise the dots above the brush overlay to keep them interactive
  d3.select(svg).selectAll('.dots, .overlay ~ *').raise();
}

function brushed(event) {
  brushSelection = event.selection;
  updateSelection();
  updateSelectionCount();
  updateLanguageBreakdown()
}
function isCommitSelected(commit) {
  if (!brushSelection) return false;

  // Selection bounds in pixel coordinates
  const min = { x: brushSelection[0][0], y: brushSelection[0][1] };
  const max = { x: brushSelection[1][0], y: brushSelection[1][1] };

  // Convert commit data to pixel coordinates
  const x = xScale(commit.datetime);
  const y = yScale(commit.hourFrac);

  // Check if the commit's coordinates fall within the brush selection bounds
  return x >= min.x && x <= max.x && y >= min.y && y <= max.y;
}

function updateSelection() {
  d3.selectAll('circle')
    .classed('selected', (d) => isCommitSelected(d));  // Mark selected dots
}

function updateSelectionCount() {
  const selectedCommits = brushSelection
    ? commits.filter(isCommitSelected)
    : [];

  const countElement = document.getElementById('selection-count');
  countElement.textContent = `${
    selectedCommits.length || 'No'
  } commits selected`;

  return selectedCommits;
}

// Update the language breakdown based on the selected commits
function updateLanguageBreakdown() {
  const selectedCommits = brushSelection
    ? commits.filter(isCommitSelected)
    : [];
  const container = document.getElementById('language-breakdown');

  if (selectedCommits.length === 0) {
    container.innerHTML = '';
    return;
  }
  const requiredCommits = selectedCommits.length ? selectedCommits : commits;
  const lines = requiredCommits.flatMap((d) => d.lines);

  // Use d3.rollup to count lines per language
  const breakdown = d3.rollup(
    lines,
    (v) => v.length,
    (d) => d.type
  );

  // Update DOM with breakdown
  container.innerHTML = '';

  for (const [language, count] of breakdown) {
    const proportion = count / lines.length;
    const formatted = d3.format('.1~%')(proportion);

    container.innerHTML += `
            <dt>${language}</dt>
            <dd>${count} lines (${formatted})</dd>
        `;
  }

  return breakdown;
}
