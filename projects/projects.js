// import { fetchJSON, renderProjects } from "../global.js";
// import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

// async function loadProjects() {
//     const projects = await fetchJSON("../lib/projects.json");

//     const projectsContainer = document.querySelector(".projects");
//     renderProjects(projects, projectsContainer, "h2");

//     // Update the project count in the header
//     const projectCountElement = document.querySelector("#project-count");
//     if (projectCountElement) {
//         projectCountElement.textContent = projects.length; 
//     }
// }

// // Draw a pie chart with D3.js
// let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
// let data = rolledData.map(([year, count]) => {
//     return { value: count, label: year };
//   });
// let sliceGenerator = d3.pie().value((d) => d.value);
// let arcData = sliceGenerator(data);

// let colors = d3.scaleOrdinal(d3.schemeTableau10);


// arcData.forEach((d, idx) => {
//     d3.select('#projects-pie-plot')
//       .append('path')
//       .attr('d', arcGenerator(d))  // Generate the path
//       .attr('fill', colors(idx))   // Set the fill color
//   });

// // Create a legend 
// let legend = d3.select('.legend');
// data.forEach((d, idx) => {
//     legend.append('li')
//           .attr('style', `--color:${colors(idx)}`) // set the style attribute while passing in parameters
//           .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`); // set the inner html of <li>
// })

// loadProjects();

// //Adding actual data
// let projects = await fetchJSON('../lib/projects.json'); // fetch your project data
// let rolledData = d3.rollups(
//   projects,
//   (v) => v.length,
//   (d) => d.year,
// );


import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";
import { fetchJSON, renderProjects } from "../global.js";
const projects = await fetchJSON("../lib/projects.json");
const projectsContainer = document.querySelector(".projects");
renderProjects(projects, projectsContainer, "h2");


async function loadProjects() {
    const projects = await fetchJSON("../lib/projects.json");

    const projectsContainer = document.querySelector(".projects");
    renderProjects(projects, projectsContainer, "h2");

    // Update the project count in the header
    const projectCountElement = document.querySelector("#project-count");
    if (projectCountElement) {
        projectCountElement.textContent = projects.length; 
    }
}
loadProjects();


// Define color scale
const colors = d3.scaleOrdinal(d3.schemeTableau10);

// Arc generator
const arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

// Initialize selected index
let selectedIndex = -1;

// Render Pie Chart and Legend
function renderPieChart(data) {
  const svg = d3.select("svg");
  svg.selectAll("path").remove();

  const legend = d3.select(".legend");
  legend.selectAll("li").remove();

  // Generate pie slices
  const arcs = d3.pie().value((d) => d.value)(data);

  arcs.forEach((arc, idx) => {
    // Append slices to SVG
    svg
      .append("path")
      .attr("d", arcGenerator(arc))
      .attr("fill", colors(idx))
      .attr("class", idx === selectedIndex ? "selected" : "")
      .on("click", () => {
        // Toggle selected index
        selectedIndex = selectedIndex === idx ? -1 : idx;

        // Update styles for highlighting
        svg.selectAll("path").attr("class", (d, i) =>
          i === selectedIndex ? "selected" : ""
        );

        legend.selectAll("li").attr("class", (d, i) =>
          i === selectedIndex ? "selected" : ""
        );

        // Optionally filter projects based on selection
        const filteredProjects =
          selectedIndex === -1
            ? projects
            : projects.filter(
                (project) => project.year === data[selectedIndex].label
              );

        renderProjects(filteredProjects, projectsContainer, "h2");
      });
  });

  // Generate legend
  data.forEach((d, idx) => {
    legend
      .append("li")
      .attr("class", idx === selectedIndex ? "selected" : "")
      .attr("style", `--color:${colors(idx)}`)
      .html(`<span class="swatch"></span> ${d.label} (${d.value})`)
      .on("click", () => {
        // Toggle selected index
        selectedIndex = selectedIndex === idx ? -1 : idx;

        // Update styles for highlighting
        svg.selectAll("path").attr("class", (d, i) =>
          i === selectedIndex ? "selected" : ""
        );

        legend.selectAll("li").attr("class", (d, i) =>
          i === selectedIndex ? "selected" : ""
        );

        // Optionally filter projects based on selection
        const filteredProjects =
          selectedIndex === -1
            ? projects
            : projects.filter(
                (project) => project.year === data[selectedIndex].label
              );

        renderProjects(filteredProjects, projectsContainer, "h2");
      });
  });
}

// Prepare data
const rolledData = d3.rollups(
  projects,
  (v) => v.length,
  (d) => d.year
);

const data = rolledData.map(([year, count]) => ({
  label: year,
  value: count,
}));

// Initial render
renderPieChart(data);

// Search Bar Functionality
const searchInput = document.querySelector(".searchBar");

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase();
  const filteredProjects = projects.filter((project) =>
    Object.values(project).join(" ").toLowerCase().includes(query)
  );

  renderProjects(filteredProjects, projectsContainer, "h2");

  // Recalculate pie chart based on filtered projects
  const filteredData = d3.rollups(
    filteredProjects,
    (v) => v.length,
    (d) => d.year
  ).map(([year, count]) => ({
    label: year,
    value: count,
  }));

  renderPieChart(filteredData);
});



