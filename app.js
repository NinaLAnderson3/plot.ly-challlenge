// create function to get data
function getInfo(id) {
    // read the json file to get data
    d3.json("samples.json").then((data)=> {
        
        // get metadata info for the demographic panel
        var metadata = data.metadata;

        console.log(metadata)

        // filter metadata info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // select demog panel to put data
        var demographicInfo = d3.select("#sample-metadata");
        
        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0] + ": " + key[1]);
        });
    });
}

// create the function for the change event
function optionChanged(id) {
    getPlotData(id);
    getInfo(id);
}

// create the function to render data
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        // getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();

function getPlotData(id){
    d3.json("samples.json").then((data) => {
        console.log(id)

        var samples = data.samples.filter(samp=>samp.id===id)[0];
        console.log(samples);

        var topTen = samples.sample_values.slice(0,10).reverse();

        var OTUs = (samples.otu_ids.slice(0,10)).reverse();
        console.log(OTUs);

        var OTU_ids = OTUs.map(ids=>"OTU"+ids);
        console.log(OTU_ids);

        var labels = samples.otu_labels.slice(0,10);

        var trace = {
            x: topTen,
            y: OTU_ids,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        var data1 = [trace];
        console.log(data);

        var layout = {
            title: "Top 10 OTUs",
            yaxis: {
                tickmode: "linear"
            }
        };
        Plotly.newPlot("bar", data1, layout);
    });
    
}
getPlotData();


