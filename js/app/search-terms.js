define(["app/utils", "moment", "d3-context-menu", "ion.rangeSlider"], function(utils, moment, context, rangeSlide) {
        function go_to_tag_page(tag) {
            // TODO: turn to tag page herer!
            console.log("Plz add tag page here!", tag);
        }
        var visualization = {};
        var startDate = null;
        var endDate = null;
        var sd = null;
        var ed = null;

        function datesOrig(){
            var seStored = JSON.parse(sessionStorage.getItem('se'));
            if (seStored) {
                sd = seStored[0].start;
                ed = seStored[0].end;
                endDate = new Date (ed);
                startDate = new Date (  
                    endDate.getFullYear(),  
                    endDate.getMonth(),  
                    (endDate.getDate()-7)  
                );//start with most recent week
            }
        }

        visualization.display = function(history) {
            utils.clearVisualization();

            if(startDate===null){
                datesOrig();
            }
            var filteredData = utils.filterByDates(history, startDate, endDate);
            var termArray = utils.generateTerms(filteredData);
            var sortedTerms = utils.sortByProperty(termArray, "term");
            var uniqueTerms = utils.uniqueCountST(sortedTerms, "term");

            var searchWords = utils.searchWordsFun(uniqueTerms);
            var searchDict = {}
            for (var i = 0; i < searchWords.length; ++i) {
                searchDict[searchWords[i].text] = searchWords[i].size;
            }

            var maxCount = Math.max.apply(Math, searchWords.map(function(searchWords) {
                        return searchWords.size;
            }));

            d3.select("#all").classed("active", true);

            d3.select("#title").append("h2").text("What are you focusing on?").attr("id", "viz_title");
            $("#title").append("<h4><font color='red'><b><i>" + uniqueTerms.length + "</i></b></font> focusing tags in resent.</h4>");
            $("#above_visual").html("<p><br/> <input type='text' id='slider' name='slider_name' value=''/>");

            $("#slider").ionRangeSlider({
                    type: "double",
                    min: +moment(sd).format("X"),
                    max: +moment(ed).format("X"),
                    from: +moment(startDate).format("X"),
                    to: +moment(endDate).format("X"),
                    prettify: function (num) {
                        return moment(num, "X").format("ll");
                    },
                    grid: false,
                    grid_snap: true,
                    keyboard: true,
                    force_edges: true,
                    onFinish: function (d) {
                        var epochFrom = new Date(0);
                        startDate = new Date (epochFrom.setUTCSeconds(d.from));
                        var epochTo = new Date(0);
                        endDate = new Date (epochTo.setUTCSeconds(d.to));
                        visualization.display(history);
                    }
            });

            var width = $("#visual_div").width();
            var height = 500;
            var tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("color", "white")
            .style("padding", "8px")
            .style("background-color", "rgba(0, 0, 0, 0.75)")
            .style("border-radius", "6px")
            .style("font", "12px sans-serif")
            .text("tooltip")
            .attr("class", "wh-tooltip");
            var fill = d3.scale.category20();
            d3.layout.cloud().size([width, height])
            .words(searchWords)
            .padding(5)
            .rotate(function() {
                    return 0;
            })
            .font("Impact")
            .fontSize(function(d) {
                    var fontSizeCalc = d.size / maxCount;
                    return utils.log10(fontSizeCalc * 140) * 2;
            })
            //.fontSize(function(d) { return d.size * 20 })
            .on("end", draw)
            .start();

            function draw(words) {
                d3.select("#visual_div").append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("id", "visualization")
                .append("g")
                .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) {
                        return d.size + "px";
                })
                .style("font-family", "Impact")
                .style("fill", function(d, i) {
                        return fill(i);
                })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) {
                        return d.text;
                })
                .on("mouseover", function(d) {
                        tooltip.text("Search tag indluding " + searchDict[d.text] + "urls, -- Left-click for more options");
                        tooltip.style("visibility", "visible");
                })
                .on("click", function(d){
                        go_to_tag_page(d.text);
                })
                .on("mousemove", function() {
                        return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
                })
                .on("mouseout", function() {
                        return tooltip.style("visibility", "hidden");
                });
            }
        };

        return visualization;
});
