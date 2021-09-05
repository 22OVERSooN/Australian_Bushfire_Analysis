function init() {
    // select the dropdown area for bar chart
    var dropdownBar = d3.select("#selDataset2");

    //read the json data file
    const stationNames = [];
    d3.json("../../Resources/Json/test.json").then((data) => {

        const stationName = data[0];

        if (stationNames.includes(stationName))
        return false;

        stationNames.push(stationName);
        dropdownBar+='<option value="' + stationName + '">' + stationName + '</option>';

    })
}
init();

