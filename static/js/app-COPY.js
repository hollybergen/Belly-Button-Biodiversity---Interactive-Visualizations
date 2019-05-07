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
        });
}

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data
      // Create a Bubble Chart that uses data from your samples route (/samples/<sample>) 
      //to display each sample.

        // Use otu_ids for the x values
        // Use sample_values for the y values
        // Use sample_values for the marker size
        // Use otu_ids for the marker colors
        // Use otu_labels for the text values

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

        // Use sample_values as the values for the PIE chart
        // Use otu_ids as the labels for the pie chart
        // Use otu_labels as the hovertext for the chart
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
