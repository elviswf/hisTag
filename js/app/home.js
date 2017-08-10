define(["app/utils", "moment"], function(utils, moment, history) {
	var visualization = {};
	var seStored = JSON.parse(sessionStorage.getItem('se'));
	if (seStored) {
		var sd = seStored[0].start;
		var ed = seStored[0].end;
		var endDate = new Date (ed);
		var startDate = new Date (sd); 
	}
	else {
		var endDate = new Date ();
		var startDate = new Date (  
				endDate.getFullYear(),  
				endDate.getMonth(),  
				(endDate.getDate()-7)  
				);//start with most recent week
	}

	function goSearchWords(history){
		$("#cards").html("<br/><br/><h1>One moment please. Loading Search Words.</h1><br/><br/><br/><br/>");
		requirejs(["app/search-terms"], function(search_words) {
			search_words.display(history);
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		});
	}

	$('[data-toggle="tooltip"]').tooltip();

	visualization.display = function(history) {
		utils.clearVisualization();
		var filteredData = utils.filterByDates(history, startDate, endDate);
		goSearchWords(history);
	};
	return visualization;
});
