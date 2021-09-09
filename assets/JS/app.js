
function init(){
    //select the dropdown area for bar chart
    var dropdownBar1 = d3.select("#selDataset2")

    const stationNames = []; 
    //read the json file
    d3.json("../../Resources/Json/aus_weather_barchart.json").then((datas) => {  
        //render through the data set
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

    
    d3.json("../../Resources/Json/aus_weather_barchart.json").then((datas) => {  
        //render through the data set
        var fullNames = `${Names} `
        console.log(fullNames)
        datas.forEach(function(d){
            if(d['State-Station'] === fullNames){
                Date.push(d['Date'])
                MaxTemp.push(d['Max Temp'])
                Rain.push(d['Rain'])
            }
        });


        var trace1 = {
            x:Date,
            y:MaxTemp,
            name : "Max Temp(°C)",
            type:"bar",
            mode:"bar+markers",
            hovertemplate:'<i>Date</i>: %{x|%Y-%m}'+'<br><b>Rainfall</b>: %{y}',
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
            font:{family:"Arial Rounded MT Bold"},
            title:"Average Max Temp&Rainfall Monthly 05/2019-06/2020",
            yaxis:{ title : "Max Temp",},
            yaxis2:{ title:"Rainfall",
            'side':'right',
            'overlaying':'y',
            titlefont: {color: '#ed7014'},
            tickfont: {color: '#ed7014'},
            },
            xaxis:{ title : "Date"},
          
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