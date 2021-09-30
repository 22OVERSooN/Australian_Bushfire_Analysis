function mattdraw(){
  d3.json('http://127.0.0.1:5000/letitgo').then((data)=>{
  // Create a lookup table to sort and regroup the columns of data,
  // first by month, then by region areas:
  console.log(data)

  var lookup = {};
  function getData(period, region) {
    var byMonth, trace;
    if (!(byMonth = lookup[period])) {;
      byMonth = lookup[period] = {};
    }
	 // If a container for this month + region doesn't exist yet,
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
    trace.x.push(datum.pm25_avg);
    trace.y.push(datum.so2_avg);
    trace.marker.size.push(datum.pm25_avg*5);
  }

  // Get the group names:
  var months = Object.keys(lookup);
  // In this case, every month includes every region, so we
  // can just infer the regions from the *first* month:
  var firstMonth = lookup[months[0]];
  var regions = Object.keys(firstMonth);

  // Create the main traces, one for each region:
  var traces = [];
  for (i = 0; i < regions.length; i++) {
    var data = firstMonth[regions[i]];
	 // One small note. We're creating a single trace here, to which
	 // the frames will pass data for the different months. It's
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

  // Create a frame for each month. Frames are effectively just
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
    font:{
      family:"'Courier New', Courier, monospace"
    },
    xaxis: {
      title: 'Average PM2.5 Monthly (µg/m3)',
      range: [0, 100]
    },
    yaxis: {
      title: 'Average SO2 Monthly (pphm)',
      range:[-0.5,1]
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
  Plotly.newPlot('slidingbar', {
    data: traces,
    layout: layout,
    frames: frames,
  });
});
}

mattdraw()

var granimInstance = new Granim({
  element: '#title',
  direction: 'top-bottom',
  isPausedWhenNotInView: true,
  image : {
      source: '../assets/IMG/bg-forest.jpg',
      blendingMode: 'multiply',
  },
  states : {
      "default-state": {
          gradients: [
              ['#29323c', '#485563'],
              ['#FF6B6B', '#556270'],
              ['#80d3fe', '#7ea0c4'],
              ['#f0ab51', '#eceba3']
          ],
          transitionSpeed: 7000
      }
  }
});