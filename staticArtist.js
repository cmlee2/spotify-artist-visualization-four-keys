// artist = "Paramore" // "Tyler the Creator"
// // popularity = 90
// // url = `http://127.0.0.1:5501/api/v1.0/${artist}/${popularity}`

// artistUrl=`http://192.168.0.29:5501/api/v1.0/${artist}`

// d3.json(artistUrl).then(function(data){
//     console.log(data)
// })

let submitButton = document.querySelector("#myButton");
let artistInput = document.querySelector("#artistInput");
//let artist = artistInput.value;
// let popInput = document.querySelector("#popInput");
//let popularity = popInput.value;
let message = document.querySelector("#message");

function myFunction() {
    message.innerHTML = " You got good taste with " + artistInput.value;
    init()
}

function init() {
    url = `http://127.0.0.1:5501/api/v1.0/${artistInput.value}`
    d3.json(url).then(function(data){
        console.log(data)
        plotPopularityBarGraph(data)
        plotDurationBarGraph(data)
        plotGaugeChart(data)
        plotRadarChart(data)
        plotTempoHistogram(data)
        plotBubbleChart(data)
    })
console.log(url)
}


// function init() {
//     url = `http://127.0.0.1:5501/api/v1.0/${artist}/${popularity}`
//     d3.json(url).then(function(data){
//         console.log(data[0])
//     })
// console.log(url)
// }



// $(document).ready(function() {
//     var musicList = "<ul><li>Song1</li><li>Song another</li></ul>";

    // $("#music").append(musicList);
//     init();
// });

function plotDurationBarGraph(jsonData) {
    // Extract the second array from the JSON data
    var Array = jsonData;

    // Extract the duration values from the second array
    var durationData = Array.map(function(song) {
        return song.duration/60;
    });

    // Extract the song names from the second array
    var songNames = Array.map(function(song) {
        return song.song;
    });

    // Create the trace for the bar graph
    var trace = {
        x: songNames,
        y: durationData,
        type: 'bar'
    };

    // Create the layout for the bar graph
    var layout = {
        title: 'Duration of Recommended Songs Based on ' + artistInput.value,
        xaxis: {
            title: 'Song'
        },
        yaxis: {
            title: 'Duration (Minutes)'
        }
    };

    // Combine the trace and layout and plot the graph
    Plotly.newPlot('bar', [trace], layout);
};
// need to make a plot of the artist only to show case difference between artist and recommendations
// also make it into ascending order

// // Fetch data from the API and plot the graph
// d3.json(artistUrl).then(function(data) {
//     console.log(data); // This will log the fetched JSON data
//     plotDurationBarGraph(data); // Plot the bar graph using the fetched data
// });

function plotPopularityBarGraph(jsonData) {
    // Extract the first array from the JSON data
    var Array = jsonData;

    // Extract the popularity values from the first array
    var popularityData = Array.map(function(song) {
        return song.popularity;
    });

    // Extract the song names from the first array
    var songNames = Array.map(function(song) {
        return song.song;
    });

    // Create the trace for the bar graph
    var trace = {
        x: songNames,
        y: popularityData,
        type: 'bar'
    };

    // Create the layout for the bar graph
    var layout = {
        title: `Popularity of Song Recommendations based on ` + artistInput.value,
        xaxis: {
            title: 'Song'
        },
        yaxis: {
            title: 'Popularity'
        }
    };

    // Combine the trace and layout and plot the graph
    Plotly.newPlot('popularity-chart', [trace], layout);
}
// make a specific bar for recommendations and for artist and then combine them
// use different colors for both

// // Fetch data from the API and plot the graph
// d3.json(artistUrl).then(function(data) {
//     console.log(data); // This will log the fetched JSON data
//     plotPopularityBarGraph(data); // Plot the bar graph using the fetched data
// });

function plotTempoHistogram(jsonData) {
    // Extract the tempo values from the first array
    var Array = jsonData;
    var ArrayPopularity = Array.map(function(song) {
        return song.popularity;
    });
    var ArrayDanceability = Array.map(function(song){
        return song.danceability
    });

    var Artist = Array.map(function(song){
        return song.artist
    })
    var Song = Array.map(function(song){
        return song.song
    })

    
    // Extract the tempo values from the second array
    // var secondArray = jsonData[1];
    // var secondArrayTempo = secondArray.map(function(song) {
    //     return song.tempo;
    // });

    // Create the traces for the histogram
    var trace1 = {
        x: ArrayDanceability,
        y:ArrayPopularity,
        mode:'markers',
        type: 'scatter',
        name: 'Artist & Songs',
        text: Artist
    };

    // var trace2 = {
    //     x: secondArrayTempo,
    //     type: 'histogram',
    //     name: 'Second Array'
    // };

    // Create the layout for the histogram
    var layout = {
        title: 'Correlaton of Popularity and Danceability of Song Recs based on '+ artistInput.value,
        xaxis: {
            title: 'Dancibility '
        },
        yaxis: {
            title: 'Popularity'
        }
    };

    // Combine the traces and layout and plot the graph
    Plotly.newPlot('tempo-histogram', [trace1], layout);
}
// need to add popout for information on the html for each of the scatterplots

// // Fetch data from the API and plot the histogram
// d3.json(artistUrl).then(function(data) {
//     console.log(data); // This will log the fetched JSON data
//     plotTempoHistogram(data); // Plot the histogram using the fetched data
// });

function plotBubbleChart(jsonData) {
    var Array = jsonData;
    var ArrayPopularity = Array.map(function(song) {
        return song.popularity
    });
    var ArrayEnergy = Array.map(function(song){
        return song.energy
    })
    var ArrayTempo = Array.map(function(song){
        return song.tempo
    })
    var Artist = Array.map(function(song){
        return song.artist
    })
    // var size = ArrayPopularity
    var TraceB ={    
        x: ArrayTempo,
        y: ArrayEnergy,
        text: Artist,
        mode: 'markers',
        marker: {
            size:ArrayPopularity,
            color:ArrayTempo,
            colorscale:'delta'
            // sizeref:1
        }
    
    };

    var layout = {
        title: "Energy & Tempo Measured by Popularity",
        showlegend: false,
        height: 600,
        width: 600
    }

    Plotly.newPlot('bubble-chart', [TraceB], layout)

};
// change this for correlation for better understanding of energy and tempo.

// create function to initialize all of the plots at the same time with no repeats

d3.json(artistUrl).then(function(data){
    plotBubbleChart(data);
});


function plotRadarChart(jsonData){
    var Array = jsonData
    var ArrayPopularity = Array.map(function(song) {
        return song.popularity
    });

    data = {
        type: "scatterpolar",
        r: ArrayPopularity,
        theta: ['Most Popular','Popular','Ok', 'Fine', 'Its There', 'Most Popular'],
        fill: 'toself'
    }

    layout = {
        polar: {
            radialaxis: {
                visible: true,
                range:[0, 100]
            }
        },
        showlegend:false
    }
    Plotly.newPlot('radar-chart', [data], layout)
}

d3.json(artistUrl).then(function(data){
    console.log(data)
    plotRadarChart(data);
});


function plotGaugeChart(jsonData){
    var Array = jsonData;
    var ArrayEnergy = Array.map(function(song){
        return song.popularity
    })
    function getAverage(array) {
        const sum = array.reduce((acc, val) => acc + val, 0);
        return sum / array.length ;
    }

    var averageEnergy = getAverage(ArrayEnergy);

    var trace = {
        domain: {x:[0, 100], y:[0,100]},
        value: averageEnergy,
        title: {text: "Average Popularity for " + artistInput.value, font: {size:20}},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {range: [null, 100]},
            bar: {color: "Greens(68,166,198)"},
            steps: [
                {range: [0,10], color: "rgb(233,245,248)"},
                {range: [10,20], color: "rgb(218,237,244)"},
                {range: [20,30], color: "rgb(203,230,239)"},
                {range: [30,40], color: "rgb(188,223,235)"},
                {range: [40,50], color: "rgb(173,216,230)"},
                {range: [50,60], color: "rgb(158,209,225)"},
                {range: [60,70], color: "rgb(143,202,221)"},
                {range: [70,80], color: "rgb(128,195,216)"},
                {range: [80,90], color: "rgb(113,187,212)"},
                {range: [90,100], color: "rgb(98,180,207)"},

            ]
        }
    }
    Plotly.newPlot("gauge", [trace]);
}
// d3.json(artistUrl).then(function(data){
//     console.log(data)
//     plotGaugeChart(data);
// });

// // can be used for recommendations too. needs to be added to html for its own plot and its own function
// d3.json(url).then(function(data){
//     console.log(data)
//     plotGaugeChart(data);
// });