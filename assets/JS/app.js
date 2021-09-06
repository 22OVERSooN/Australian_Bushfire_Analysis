
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
        
    })
    //drawPlot(datas[0]['State-Station'])
}
init();

function drawPlot(Names){
    //create a list to restore the maxtemp, rain and data
    const MaxTemp = [];
    const Rain = []
    const Date = []

    
    d3.json("../../Resources/Json/aus_weather_barchart.json").then((datas) => {  
        //render through the data set
        datas.forEach(function(d){
            if(d['State-Station'] === Names){
                Date.push(d['Date'])
                MaxTemp.push(d['Max Temp'])
            }
            // if(data['State-Station'] === Names)
            //     Date.push(data)
            //     MaxTemp.push(data['Max Temp'])
        });
        console.log(MaxTemp)
        console.log(Date)

        var trace = {
            x:Date,
            y:MaxTemp,
            type:"bar",
        };
        var data = [trace];
    
        var layout = {
            font:{family:"Arial Rounded MT Bold"},
            title:"Max Temp Monthly 05/2019-06/2020",
            yaxis:{ title : "Max Temp"},
            xaxis:{ title : "Date"},
          
        }
        Plotly.newPlot("barplot",data,layout)
    });
};
drawPlot("ACT-Canberra Airport ")


