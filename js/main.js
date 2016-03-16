// The main of all the chars

//execute script when window is loaded
window.onload = function(){

	//SVG dimension variables
    var w = 900, h = 500;

    var container = d3.select("body") //get the <body> element from the DOM
        .append("svg") //put a new svg in the body
        .attr("width", w) //assign the width
        .attr("height", h) //assign the height
        .attr("class", "container") //assign a class name
        .style("background-color", "rgba(0,0,0,0.2)"); //svg background color


    //innerRect block
    var innerRect = container.append("rect") //put a new rect in the svg
    	.datum(400) //rectangle width
            .attr("width", function(d){ //rectangle width
            return d * 2; //400 * 2 = 800
        }) 
        .attr("height", function(d){ //rectangle height
            return d; //400
        })
        .attr("class", "innerRect") //class name
        .attr("x", 50) //position from left on the x (horizontal) axis
        .attr("y", 50) //position from top on the y (vertical) axis
        .style("fill", "#FFFFFF"); //fill color

console.log(innerRect);

/*
*** EXAMPLE TESTING FROM MOD07
    //Example 2.3 line 1
    var dataArray = [10, 20, 30, 40, 50];

    var circles = container.selectAll(".circles") //but wait--there are no circles yet!
        .data(dataArray) //here we feed in an array
        .enter() //one of the great mysteries of the universe
        .append("circle") //add a circle for each datum
        .attr("class", "circles") //apply a class name to all circles
        .attr("r", function(d, i){ //circle radius
            console.log("d:", d, "i:", i); //let's take a look at d and i
            return d;
        })
        .attr("cx", function(d, i){ //x coordinate
            return 70 + (i * 180);
        })
        .attr("cy", function(d){ //y coordinate
            return 450 - (d * 5);
        });
*/

    var cityPop = [
        { 
            city: 'Grants Pass',
            population: 35076
        },
        {
            city: 'Portland',
            population: 609456
        },
        {
            city: 'Salem',
            population: 160614
        },
        {
            city: 'Burns',
            population: 2728
        }
    ];

    var x = d3.scale.linear() //create the scale
        .range([90, 810]) //output min and max
        .domain([0, 3]); //input min and max

    //find the minimum value of the array
    var minPop = d3.min(cityPop, function(d){
        return d.population;
    });

    //find the maximum value of the array
    var maxPop = d3.max(cityPop, function(d){
        return d.population;
    });

    //scale for circles center y coordinate
    var y = d3.scale.linear()
        .range([440, 95])
        .domain([
            minPop,
            maxPop
        ]);

    //color scale generator 
    var color = d3.scale.linear()
        .range([
            "#9E008B",
            "#D635C2"
        ])
        .domain([
            minPop, 
            maxPop
        ]);

    //Example 2.6 line 3
    var circles = container.selectAll(".circles") //create an empty selection
        .data(cityPop) //here we feed in an array
        .enter() //one of the great mysteries of the universe
        .append("circle") //inspect the HTML--holy crap, there's some circles there
        .attr("class", "circles")
        .attr("id", function(d){
            return d.city;
        })
        .attr("r", function(d){
            //calculate the radius based on population value as circle area
            var area = d.population * 0.01;
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function(d, i){
            //use the scale generator with the index to place each circle horizontally
            return x(i);
        })
        .attr("cy", function(d){
            return y(d.population);
        })
        .style("fill", function(d, i){ //add a fill based on the color scale generator
            return color(d.population);
        })
        .style("stroke", "#000"); //black circle stroke

    // create axis in the vertical direction
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")

    //create axis g element and add axis
    var axis = container.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(50, 0)")
        .call(yAxis);

};