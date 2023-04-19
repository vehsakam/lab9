function scatterplot(){

    // Create SVG element
    const svg = d3.select("svg");

    const margin = {top: 150, right: 50, bottom: 50, left: 75};
    const width = svg.attr("width") - margin.left - margin.right;
    const height = svg.attr("height") - margin.top - margin.bottom;
    
    const g = svg.append("g")
               .attr("transform", "translate(" + margin.left +  "," + margin.top + ")");
  
    // Generate 100 random points
    const data = [];
    for (let i = 0; i < 100; i++) {
      const x = Math.floor(Math.random() * 500);
      const y = Math.floor(Math.random() * 500);
      data.push([x, y]);
    }
  
    // Create scales for x and y axis
    const xScale = d3.scaleLinear()
                   .domain([0, d3.max(data, function(d) { return d[0]; })])
                   .range([0, width]);
    
    const yScale = d3.scaleLinear()
                   .domain([0, d3.max(data, function(d) { return d[1]; })])
                   .range([height, 0]);
  
    svg.append('text')
       .attr('x', width/2)
       .attr('y', margin.top/2)
       .style('font-family', 'Times New Roman')
       .style('font-size', 23)
       . text ('Lab 9: Scatter Plot');;
  
    g.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(xScale));
          
    g.append("g")
     .call(d3.axisLeft(yScale));
  
    // Add circles for each data point
    g.selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx", function(d) { return xScale(d[0]); })
     .attr("cy", function(d) { return yScale(d[1]); })
     .attr("r", 2)
     .style("fill", "blue");

  }


  function titan() {
    console.log('ladfsfds')

    
     // Load the Titanic dataset and generate a pie chart for age distribution
     d3.csv("titanic.csv").then(function(data) {
        let pieSvg = d3.select("#pie")

        // Extract age data from the dataset
        var ages = data.map(function(d) {
          return parseInt(d.Age);
        }).filter(function(d) {
          return !isNaN(d);
        });
  
        // Generate pie chart for age distribution
        var pieData = d3.pie()(ages);
        var arcGenerator = d3.arc()
          .innerRadius(0)
          .outerRadius(200);
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        console.log(pieSvg)

        var pieChart = pieSvg.append("g")
          .attr("transform", "translate(250,250)");
        pieChart.selectAll("path")
          .data(pieData)
          .enter()
          .append("path")
          .attr("d", arcGenerator)
          .attr("fill", function(d, i) {
            return color(i);
          })
          .attr("stroke", "white")
          .attr("stroke-width", "2px")
          .on("mouseover", function(d) {
            d3.select(this).attr("fill", d3.rgb(color(d.index)).brighter(0.5));
          })
          .on("mouseout", function(d) {
            d3.select(this).attr("fill", color(d.index));
          });
  
        // Add a legend to the pie chart
        var legend = pieChart.selectAll(".legend")
          .data(pieData)
          .enter()
          .append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) {
            return "translate(-100," + (i * 20 - 80) + ")";
          });
        legend.append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 10)
          .attr("height", 10)
          .attr("fill", function(d, i) {
            return color(i);
          });
        legend.append("text")
          .attr("x", 15)
          .attr("y", 5)
          .text(function(d) {
            return d.data + " years";
          });
      });
  }

  titan();