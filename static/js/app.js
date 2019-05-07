function buildMetadata(sample) {

    // create table object to select the table body
    var metadataTable = d3.select("#sample-metadata");

    // Clear previous table data
    d3.selectAll("tr").remove();

    // Append sample to metadata route, create function to get data & append to table
    d3.json("/metadata/" + sample).then((getData) => {
      Object.entries(getData).forEach(function([key, value]) {
          metadataTable
            .append("table")
            .append("tbody")
            .append("tr")
            .property("td", [key, value])
            .text([key + ": " + value]); 
          });
          console.log("Fetch Metadata for: " + sample);
        });
}

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

function buildCharts(sample) {

        // Build Bubble Chart
        d3.json("/samples/" + sample).then(function(data) {
          otu_ids = data.otu_ids
          sample_values = data.sample_values
          otu_labels = data.otu_labels
          console.log("Fetch Bubble Chart for: "+ sample);

          var trace1 = {
            mode: "markers",
            x: otu_ids, 
            y: sample_values,
            marker: {
              size: sample_values,
              color: otu_ids
              }
            } 
          layout = {
           title: "Sample Values- Bubble Chart", 
            }

          Plotly.newPlot("bubble", [trace1], layout);
        });


        // Build a Pie Chart
        // slice() to grab the top 10 sample_values          
        d3.json("/samples/" + sample).then(function(data) {
          otu_ids = data.otu_ids.slice(0, 10)
          sample_values = data.sample_values.slice(0, 10)
          otu_labels = data.otu_labels.slice(0, 10)
          console.log("Fetch Pie Chart for: "+ sample);

          var trace1 = {
            type: "pie",
            values: sample_values,
            labels: otu_ids,
            hoverInfo: otu_labels
          }
          layout = {
            title: "Sample Values - Pie Chart", 
             }
          Plotly.newPlot("pie", [trace1], layout);
        });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
