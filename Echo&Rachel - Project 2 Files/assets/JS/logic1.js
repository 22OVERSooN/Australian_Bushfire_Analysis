function init(){
    //select the dropdown area for bar chart
    var dropdownBar1 = d3.select("#selDataset2")

    const stationNames = []; 
    //read the json file
    d3.json("http://127.0.0.1:5000/barsnscatters").then((datas) => {  
        //render through the data set
        console.log(datas)
        datas.forEach(function(data){
            const stationName = data['State-Station']

            if (stationNames.includes(stationName))
            return false;

            //append the dropdown list to options
            stationNames.push(stationName);
            dropdownBar1.append("option").text(stationName).property("value");
        })
        console.log(stationNames)
        drawPlot("ACT-Canberra Airport")
    })

}
init();

function drawPlot(Names){
    //create a list to restore the maxtemp, rain and data
    const MaxTemp = [];
    const Rain = []
    const Date = []

    
    d3.json("http://127.0.0.1:5000/barsnscatters").then((datas) => {  
        //render through the data set
        console.log(datas)
        var fullNames = `${Names} `
        console.log(fullNames)
        datas.forEach(function(d){
            if(d['State-Station'] === fullNames){
                Date.push(d['Date'])
                MaxTemp.push(d['Max Temp'])
                Rain.push(d['Rain'])
            }
        });

        const X_AXIS = Date

        const Y1_AXIS = MaxTemp
        y1_min = Math.min(...Y1_AXIS)  
        y1_max = Math.max(...Y1_AXIS)  

        const Y2_AXIS = Rain
        y2_min = Math.min(...Y2_AXIS)  
        y2_max = Math.max(...Y2_AXIS)  

        var trace1 = {
            x:Date,
            y:MaxTemp,
            name : "Max Temp(°C)",
            type:"bar",
            mode:"bar+markers",
            hovertemplate:'<i>Date</i>: %{x|%Y-%m}'+'<br><b>Rainfall</b>: %{y}',
            marker: {
                color: '#283A4B'
              }
        };

        var trace2 = {
            x:Date,
            y:Rain,
            name : "Rainfall(mm)",
            yaxis: "y2",
            type:"scatter",
            mode:"lines+markers",
            hovertemplate:'<i>Date</i>: %{x|%Y-%m}'+'<br><b>Rainfall</b>: %{y}',
        }

        var data = [trace1,trace2];
        
    
        var layout = {
            font:{family:'Courier New'},
            title:"Average Max Temp&Rainfall Monthly 05/2019-06/2020",
            yaxis:{ title : "Max Temp",
            side: 'left',
            range: [0, y1_max]
            },
            yaxis2:{ title:"Rainfall",
            side:'right',
            overlaying:'y',
            range: [0, y2_max],
            titlefont: {color: '#ed7014'},
            tickfont: {color: '#ed7014'},
            },
                      
        }

        
        Plotly.newPlot("barplot",data,layout)
    });
};
function optionChanged1(Names){
    drawPlot(Names)
}

var granimInstance = new Granim({
    element: '#title',
    direction: 'top-bottom',
    isPausedWhenNotInView: true,
    image : {
        source: 'assets/IMG/bg-forest.jpg',
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