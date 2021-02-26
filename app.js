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
//get sample data
        var samples = data.samples.filter(samp=>samp.id===id)[0];
        console.log(samples);
//get values of top 10 sample values
        var topTen = samples.sample_values.slice(0,10).reverse();
//get top 10 sample OTU_ids
        var OTUs = (samples.otu_ids.slice(0,10)).reverse();
        console.log(OTUs);
//put OTU_ids into format for the graph
        var OTU_ids = OTUs.map(ids=>"OTU"+ids);
        console.log(OTU_ids);
//create name variable for the top OTU labels
        var labels = samples.otu_labels.slice(0,10);
//create trace data for bar graph
        var trace = {
            x: topTen,
            y: OTU_ids,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        var data1 = [trace];
        console.log(data);
//create layout variable for line graph
        var layout = {
            title: "Top 10 OTUs",
            yaxis: {
                tickmode: "linear"
            }
        };
        Plotly.newPlot("bar", data1, layout);
//create trace of data for bubble graph
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            }
        };

        //create layout variable for bubble graph
        var layout2 = {
            xaxis:{title: "OTU ID"},
            height: 500,
            width: 1200
        };

        var data1 = [trace1];
    
        Plotly.newPlot("bubble", data1, layout2)

        //washing frequency gauge data

        d3.json("samples.json").then((data)=>{
            var washingFreq = data.metadata.map(d=>d.wfreq)
            console.log(washingFreq);

            var gaugeData = [
                {domain: {x:[0,1], y:[0,1]},
                value: parseFloat(washingFreq),
                title: {text: "Washing Frequency"},
                type: "indicator",
                mode: "gauge + number"
            }
            ];
            var gaugeLayout = {width: 300, height:200, margin:{t:0, b:0}};
            Plotly.newPlot('.gauge',washingFreq, gaugeLayout);
        });

    });
    
}
getPlotData();
