// FUNCTION #1 of 5
function buildCharts(selectedPatientID) {
    d3.json("samples.json").then(data => {
        // console.log(data)

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
        // console.log(selectedPatientSamples)

        // BAR

        let barTrace = {
            // Reverse the array order
            x: selectedPatientSamples.sample_values.slice(0,10).reverse(),
            y: selectedPatientSamples.otu_ids.slice(0,10).map(otu_id => `OTU #${otu_id}`).reverse(),
            text: selectedPatientSamples.otu_labels.slice(0,10).reverse(),
            marker: {
            },
            type: 'bar',
            orientation: 'h',
        };

        let barData = [barTrace];

        let barLayout = {
            title: "Top 10 Most Common Bacteria in Belly-Button",
            // margin: {
            //     l: 90,
            //     r: 90,
            //     t: 90,
            //     b: 90
            //   }
        };

        Plotly.newPlot('barDiv', barData, barLayout);


        // BUBBLE

        let bubbleTrace = {
            x: selectedPatientSamples.otu_ids,
            y: selectedPatientSamples.sample_values,
            text:selectedPatientSamples.otu_labels,
            mode: 'markers',
            marker: {
                color: selectedPatientSamples.otu_ids,
                size: selectedPatientSamples.sample_values,
            }
        };

        let bubbleData = [bubbleTrace];

        let bubbleLayout = {
            title: 'Belly Button Bubble Chart',
            showlegend: false,
            height: 600,
            width: 1200
        };

        Plotly.newPlot('bubbleDiv', bubbleData, bubbleLayout);

        // GAUGE

        let gaugeData = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: selectedPatientMetadata.wfreq,
                title: { text: "Patient Washing Frequency per Week" },
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 400 },
                gauge: { axis: { range: [null, 10] } }
            }
        ];

        var gaugeLayout = { width: 600, height: 400 };
        Plotly.newPlot('gaugeDiv', gaugeData, gaugeLayout);

    })
};

// FUNCTION #2 of 5
function populateDemographicInfo(selectedPatientID) {
    var demographicInfoBox = d3.select("#sample-metadata");
    d3.json("samples.json").then(data => {
        // console.log(data)
        demographicInfoBox.html("")
        let metadata = data.metadata
        // one line for loop. list with one object in it
        let filteredMetadata = metadata.filter(patient=>patient.id==selectedPatientID)
        let selectedPatientMetadata = filteredMetadata[0]
        console.log(selectedPatientMetadata)
        Object.entries(selectedPatientMetadata).forEach(([key, value]) => {
            demographicInfoBox.append('li').text(`${key}: ${value}`);
        })
        
    })
}

// FUNCTION #3 of 5; connected to the drop down
function optionChanged(selectedPatientID) {
    // console.log(selectedPatientID);
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