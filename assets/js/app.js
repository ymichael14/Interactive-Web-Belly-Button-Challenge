const optionChanged = () => renderGraph();

const renderGraph = () => {
    let option = d3.select('select').node().value;

    d3.json("assets/data/samples.json").then(({metadata, samples}) => {
        let meta = metadata.filter(obj => obj.id == option)[0];
        let sample = samples.filter(obj => obj.id == option)[0];

        let panel = d3.select('.panel-body');
        
        panel.html('');
        
        Object.entries(meta).forEach(([key,val]) => {
            panel.append('p').text(key.toUpperCase()+': '+val);
        });
        let otu_id=sample.otu_ids.slice(0,10)
        var data = [
            {
              x: sample.sample_values.slice(0,10).reverse(),
              y: sample.otu_ids.slice(0,10).map(item => `OTU ${item.toString()}`).reverse(),
              type: 'bar',
              text: sample.otu_labels.slice(0,10),
              orientation: 'h'
            }
          ];
          
          Plotly.newPlot('bar', data);

          var trace1 = {
            x: sample.otu_ids,
            y: sample.sample_values,
            mode: 'markers',
            text: sample.otu_labels,
            marker: {
              size: sample.sample_values,
              color: sample.otu_ids
            }
          };
          
          var data = [trace1];
          
          var layout = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 600
          };
          
          Plotly.newPlot('bubble', data);

          var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: meta.wfreq,
                title: { text: "Number of Scrubs" },
                type: "indicator",
                mode: "gauge+number"
            }
        ];
        
        var layout = { width: 700, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);
        
    });
    
}

d3.json("assets/data/samples.json").then(({names}) => {
    names.forEach(name => {
        d3.select('select').append('option').text(name);
    });
    renderGraph()
});

