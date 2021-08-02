// FUNCTION #1 of 5
function buildCharts(selectedPatientID) {
    d3.json("samples.json").then(data => {
        console.log(data)

        // filtering; Metadata is for gauge 
        // Samples is for bar&bubble
        let metadata = data.metadata
        let samples = data.samples
        
        // one line for loop. list with one object in it
        let filteredMetadata = metadata.filter(patient=>patient.id==selectedPatientID)
        let selectedPatientMetadata = filteredMetadata[0]
        console.log(selectedPatientMetadata)

        let filteredSamples = samples.filter(patient=>patient.id==selectedPatientID)
        let selectedPatientSamples = filteredSamples[0]
        console.log(selectedPatientSamples)

        // Plotly.newPlot("barDiv", barData, barLayout)

        let trace1 = {
            x: ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'],
            y: [20, 14, 23, 25, 22],
            marker: {
                color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)']
            },
            type: 'bar'
        };

        let data = [trace1];

        let layout = {
            title: 'Least Used Feature'
        };

        Plotly.newPlot('barDiv', data, layout);


        // Plotly.newPlot("bubbleDiv", bubbleData, bubbleLayout)

        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
                size: [40, 60, 80, 100]
            }
        };

        let data = [trace1];

        let layout = {
            title: 'Bubble Chart Hover Text',
            showlegend: false,
            height: 600,
            width: 600
        };

        Plotly.newPlot('bubbleDiv', data, layout);

        // Plotly.newPlot("gaugeDiv", gaugeData, gaugeLayout)

        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: 450,
                title: { text: "Speed" },
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 400 },
                gauge: { axis: { range: [null, 500] } }
            }
        ];

        var layout = { width: 600, height: 400 };
        Plotly.newPlot('gaugeDiv', data, layout);

    })
};

// FUNCTION #2 of 5
function populateDemographicInfo(selectedPatientID) {
    var demographicInfoBox = d3.select("#sample-metadata");
    d3.json("samples.json").then(data => {
        console.log(data)
        // ADD APPROXIMATELY 3-6 LINE OF CODE
    })
}

// FUNCTION #3 of 5; connected to the drop down
function optionChanged(selectedPatientID) {
    console.log(selectedPatientID);
    buildCharts(selectedPatientID);
    populateDemographicInfo(selectedPatientID);
}

// FUNCTION #4 of 5
function populateDropdown() {
    let dropdown = d3.select("#selDataset")
    d3.json("samples.json").then(data => {
        let patientIDs = data.names;
        patientIDs.forEach(patientID => {
            dropdown.append("option").text(patientID).property("value", patientID)
        })
    })
}

// FUNCTION #5 of 5
function buildWebsiteOnStartup() {
    populateDropdown();
    d3.json("samples.json").then(data => {
        buildCharts(data.names[0]);
        populateDemographicInfo(data.names[0]);
    })
};

buildWebsiteOnStartup();