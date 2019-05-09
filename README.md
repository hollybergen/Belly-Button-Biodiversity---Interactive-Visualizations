# Belly-Button-Biodiversity - Interactive-Visualizations
Interactive visualizations using JavaScript/D3, Flask, HTML, and Heroku

## Step 1 - Plotly.js ##

Using [app.py](https://github.com/hollybergen/Belly-Button-Biodiversity-Interactive-Visualizations/blob/master/app.py) file:
* Used Plotly.js to build interactive charts for the dashboard.
* Displays the sample metadata from the route /metadata/<sample> (from [app.js](https://github.com/hollybergen/Belly-Button-Biodiversity-Interactive-Visualizations/blob/master/static/js/app.js))
* Created a PIE chart that uses data from samples route (/samples/<sample>) to display the top 10 samples.
* Created a Bubble Chart that uses data from samples route (/samples/<sample>) to display each sample.
* Updates all of the plots any time that a new sample is selected.

## Step 2 - Heroku ##

Deployed Flask app to Heroku. <br>
[Published Site](https://belly-button-div-app.herokuapp.com/)
