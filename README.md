# Project2_Austrlian_Bushfire_Analysis

An interactive dashboard about Australia Bushfire 2019-2020
![1-gif](bushfire.gif)

# Inspiration

Due to the hot weather in the central region of Australia, bushfires often break out in summer, especially at the end of 2019, Australia has a well-known bushfire season, so tracking the situation of bushfires can help us have a better prediction and analysis. In addition, by acquiring weather & AQI data, including rainfall，temperature, PM2.5 and SO2, we can analyze the relationship between weather and bushfires.


# Data sources:
1.BushFire data: https://firms.modaps.eosdis.nasa.gov/country/ 

2.Weatherdata: https://www.kaggle.com/gaurav896/weather-in-australia/version/1 

3.Weather station location data:
http://www.bom.gov.au/climate/data/stations/

4.Air-quality data:
https://www.dpie.nsw.gov.au/air-quality/air-quality-data-services/data-download-facility


# Dashboard:
Interactive Map with fire spot layer and brightness of heatmap layer.

Bar & Scatter plot with monthly average Max Temp and rainfall based on different station.

Bubble chart with slicing bar shows the PM 2.5 and SO2 conditions.

# Coding approach & Data munging techniques:

Python -to clean the dataset, and import the data into MongoDB
MongoDB - to store the data set the analysis is based on
Flask - to call the data from MongoDB and return the filtered data in Json format
HTML - to setup the structure of the dashboard webpage
JavaScript - to add interactive behavior to web pages
CSS- To set the style of the webpage
JS library- Granim.js
