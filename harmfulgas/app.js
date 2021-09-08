// d3.csv('windspeed.csv', function(err, rows){
//       function unpack(rows, key) {
//           return rows.map(function(row) { return row[key]; });
//         }
//         var trace1 = {
//             x: unpack(rows, 'latitude'),
//             y: unpack(rows, 'longitude'),
//             z: unpack(rows, 'max-wind-spd'),
//             marker: {
//               size: 2,
//               color: unpack(rows, 'max-wind-spd'),
//             //   colorscale:'Earth',
//               line: {color: 'transparent'},
//               showscale:true
//             },
//             mode: 'markers',
//             type: 'scatter3d',
//             text: unpack(rows, 'State-Station'),
//             hoverinfo: 'x+y+z+text',
//             showlegend: false
//           };
        
//         var data = [trace1]

//         var layout = {
//             // paper_bgcolor: 'black',
//             // plot_bgcolor: 'black',
//             title: 'test',
//             // font: {color: 'white'},
//             colorbar: true,
//             colorscale:{
//                 diverging:'Default'
//             },
//             xaxis: {title:{
//                  text:'Status'},
//                        showticklabels: true,
//                        showgrid: true,
//                        gridcolor: 'white'},
//             yaxis: {title: 'Type',
//                        showticklabels: true,
//                        showgrid: true,
//                        gridcolor: 'white'},
//             zaxis: {title: 'Elev',
//                        showgrid: true,
//                        gridcolor: 'white'}
//                    }
       
      
//       Plotly.newPlot("myDiv", data, layout);
      
//       });



// d3.csv('all.csv', function(err, rows){
//       function unpack(rows, key) {
//           return rows.map(function(row) { return row[key]; });
//         }
//         var trace1 = {
//             x: unpack(rows, 'latitude'),
//             y: unpack(rows, 'longitude'),
//             z: unpack(rows, 'brightness'),
            
//             type: 'surface',
//             showlegend:false,
            
            
//           };
        
//         var data = [trace1]

//         var layout = {
//             title:'test2',

//             xaxis: {title: 'Status',
//                        showticklabels: false,
//                        showgrid: true,
//                        gridcolor: 'white'},
//             yaxis: {title: 'Type',
//                        showticklabels: false,
//                        showgrid: true,
//                        gridcolor: 'white'},
//             zaxis: {title: 'Elev',
//                        showgrid: true,
//                        gridcolor: 'white'}
//                    }
       
      
//       Plotly.newPlot("myDiv", data, layout, {showLink: false});
      
//       });

// // Select chartholder
// var chartHolder = d3.select("#chartholder");

// // Declare the chart component
// var myChart = d3.x3d.chart.scatterPlot()
//   .mappings({ x: 'x', y: 'y', z: 'z', size: 'size', color: 'color' })
//   .colors(d3.schemeRdYlGn[8])
//   .sizeRange([0.1, 1.5]);

// var refreshChart = function() {
//   // Generate some data
//   var myData = d3.x3d.randomData.dataset6(200);

//   chartHolder.datum(myData).call(myChart);
// };

// d3.select("#refresh").attr("onclick", "refreshChart()");

// refreshChart();

d3.csv('test1.csv', function (err, data) {
  // Create a lookup table to sort and regroup the columns of data,
  // first by year, then by continent:
  var lookup = {};
  function getData(period, region) {
    var byMonth, trace;
    if (!(byMonth = lookup[period])) {;
      byMonth = lookup[period] = {};
    }
	 // If a container for this year + continent doesn't exist yet,
	 // then create one:
    if (!(trace = byMonth[region])) {
      trace = byMonth[region] = {
        x: [],
        y: [],
        id: [],
        text: [],
        marker: {size: []}
      };
    }
    return trace;
  }

  // Go through each row, get the right trace, and append the data:
  for (var i = 0; i < data.length; i++) {
    var datum = data[i];
    var trace = getData(datum.period, datum.region);
    trace.text.push(datum.station);
    trace.id.push(datum.station);
    trace.x.push(datum.so2_avg);
    trace.y.push(datum['pm2.5_avg']);
    trace.marker.size.push(datum['pm2.5_avg']*5);
  }

  // Get the group names:
  var months = Object.keys(lookup);
  // In this case, every year includes every continent, so we
  // can just infer the continents from the *first* year:
  var firstMonth = lookup[months[0]];
  var regions = Object.keys(firstMonth);

  // Create the main traces, one for each continent:
  var traces = [];
  for (i = 0; i < regions.length; i++) {
    var data = firstMonth[regions[i]];
	 // One small note. We're creating a single trace here, to which
	 // the frames will pass data for the different years. It's
	 // subtle, but to avoid data reference problems, we'll slice
	 // the arrays to ensure we never write any new data into our
	 // lookup table:
    traces.push({
      name: regions[i],
      x: data.x.slice(),
      y: data.y.slice(),
      id: data.id.slice(),
      text: data.text.slice(),
      mode: 'markers',
      marker: {
        size: data.marker.size.slice(),
        sizemode: 'area',
        sizeref: 0.1
      }
    });
  }

  // Create a frame for each year. Frames are effectively just
  // traces, except they don't need to contain the *full* trace
  // definition (for example, appearance). The frames just need
  // the parts the traces that change (here, the data).
  var frames = [];
  for (i = 0; i < months.length; i++) {
    frames.push({
      name: months[i],
      data: regions.map(function (region) {
        return getData(months[i], region);
      })
    })
  }

  // Now create slider steps, one for each frame. The slider
  // executes a plotly.js API command (here, Plotly.animate).
  // In this example, we'll animate to one of the named frames
  // created in the above loop.
  var sliderSteps = [];
  for (i = 0; i < months.length; i++) {
    sliderSteps.push({
      method: 'animate',
      label: months[i],
      args: [[months[i]], {
        mode: 'immediate',
        transition: {duration: 300},
        frame: {duration: 300, redraw: false},
      }]
    });
  }

  var layout = {
    xaxis: {
      title: 'Average SO2 Monthly',
      range: [0, 0.6]
    },
    yaxis: {
      title: 'Average PM2.5 Monthly',
      range:[4,100]
    //   type: 'log'
    },
    hovermode: 'closest',
	 // We'll use updatemenus (whose functionality includes menus as
	 // well as buttons) to create a play button and a pause button.
	 // The play button works by passing `null`, which indicates that
	 // Plotly should animate all frames. The pause button works by
	 // passing `[null]`, which indicates we'd like to interrupt any
	 // currently running animations with a new list of frames. Here
	 // The new list of frames is empty, so it halts the animation.
    updatemenus: [{
      x: 0,
      y: 0,
      yanchor: 'top',
      xanchor: 'left',
      showactive: false,
      direction: 'left',
      type: 'buttons',
      pad: {t: 87, r: 10},
      buttons: [{
        method: 'animate',
        args: [null, {
          mode: 'immediate',
          fromcurrent: true,
          transition: {duration: 300},
          frame: {duration: 500, redraw: false}
        }],
        label: 'Play'
      }, {
        method: 'animate',
        args: [[null], {
          mode: 'immediate',
          transition: {duration: 0},
          frame: {duration: 0, redraw: false}
        }],
        label: 'Pause'
      }]
    }],
	 // Finally, add the slider and use `pad` to position it
	 // nicely next to the buttons.
    sliders: [{
      pad: {l: 130, t: 55},
      currentvalue: {
        visible: true,
        prefix: 'Month:',
        xanchor: 'right',
        font: {size: 20, color: '#666'}
      },
      steps: sliderSteps
    }]
  };

  // Create the plot:
  Plotly.newPlot('myDiv', {
    data: traces,
    layout: layout,
    frames: frames,
  });
});