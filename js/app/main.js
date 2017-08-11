requirejs.config({
	shim: {
		"jquery": {
			exports: "$"
		},
		"bootstrap": {
			deps: ["jquery"]
		},
		"bootstrap-datepicker": {
			deps: ["bootstrap"]
		},
		"bootstrap-table": {
			deps: ["bootstrap"]
		},
		"d3": {
			exports: "d3"
		},
		"d3.layout.cloud": {
			deps: ["d3"]
		},
		"crypto-js-md5": {
			exports: "CryptoJS"
		},
		"historian": {
			deps: ["jquery"]
		}
	},
	baseUrl: "js/lib",
	paths: {
		app: '../app'
	}
});

function get_by_url_id(url_id){
  result = [];
  var dataString = sessionStorage.getItem("historyData");
  var historyData = JSON.parse(dataString);
  for(var i = 0; i< historyData.length; ++i){
    var item = historyData[i];
    if(item.urlid === url_id){
      result.push(item);
    }
  }
  return result;
};

function get_history_list() {
	
	var data = [];
	for(var i = 0 ;i <40; ++i){
		var dataItem = get_by_url_id(i)[0];
		dataItem.date = new Date(dataItem.dates*1000);
		data.push(dataItem);
	}
	return data;
}

main.page = function() {
	requirejs(["app/home", "app/utils"], function(home, utils) {
		data = get_history_list();
		console.log(data);
		utils.storeStartEnd(data);
		//home.goSearchWords(history)
		home.display(data);
	});
};
$(document).ready(function() {
    $("#backToHomePage").click(function(){
    	location.href = 'history.html'
    })
})

// Start the main app logic.
requirejs(["bootstrap", "bootstrap-datepicker", "bootstrap-table", "d3.layout.cloud"], function(bs, bsdp, bst, d3lc, moment) {
	main.page();
});
