
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

        const X_AXIS = Date

        const Y1_AXIS = MaxTemp
        y1_min = Math.min(...Y1_AXIS)  
        y1_max = Math.max(...Y1_AXIS)  

        const Y2_AXIS = Rain
        y2_min = Math.min(...Y2_AXIS)  
        y2_max = Math.max(...Y2_AXIS)  

        var trace1 = {
            x:X_AXIS,
            y:Y1_AXIS,
            name : "Max Temp(°C)",
            type:"bar",
        };

        var trace2 = {
            x:X_AXIS,
            y:Y2_AXIS,
            name : "Rainfall(mm)",
            yaxis: "y2",
            type:"scatter"
        }

        var data = [trace1,trace2];
        
    
        var layout = {
            toolTip: {valueFormatString: "MM/YYYY"},
            font:{family:"Arial Rounded MT Bold"},
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

