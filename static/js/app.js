
function getData() {
var dropdown = d3.select("#selDataset");

//read dataset
d3.json("samples.json").then((data)=>{
    console.log(data);

    var name = data.names;

name.forEach(function(name) {
    dropdown.append("option").text(name).property("value");
});

var firstData = name[0];
Metadata(firstData);
})
};

getData();

// function Metadata(id) {
//     //read json
//     d3.json("samples.json").then((data)=> {
        
        
//         var Metadata = data.metadata;

//         console.log(Metadata);

//         var dataArray = Metadata.filter(sampleobject =>sampleobject.id === id)[0];
//         var result = dataArray;
//         var display = d3.select("sample-metadata");
//         display.html("");
//         Object.entries(result).forEach((key)=>{
//             display.append("h5").text(`${key}:${value}`);
        
//         });
//     });
// }

// function optionChange(id){
//     Metadata(id);
    
// }