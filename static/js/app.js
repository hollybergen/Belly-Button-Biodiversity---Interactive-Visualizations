function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // Display the sample metadata from the route /metadata/<sample>
    // Display each key/value pair from the metadata JSON object somewhere on the page
    // Update all of the plots any time that a new sample is selected.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);



    var metadataTable = d3.select("#sample-metadata");
  
    var metadataURL = "/metadata/<sample>";

    d3.json(metadataURL).then(function(data, index) {
      var data = [data];
      console.log(data);
      console.log(index);

      Object.entries(data).forEach(function([key, value]) {
        console.log(key, value);

        var cell = metadataTable.append();
        cell.text(value);
    });


firstSample = sampleNames[0];







}

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
