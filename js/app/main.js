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

function get_history_list() {
	var data = [];
	var tmp = {};
	tmp.date = new Date();
	tmp.url = 'www.baidu.com';
	tmp.urlid = 12586;
	tmp.tags = ['tag1', 'tag2'];
	data.push(tmp);
	var tmp2 = {};
	tmp2.date = new Date();
	tmp2.date.setDate(tmp2.date.getDate() - 7);
	tmp2.url = 'www.baidu.com';
	tmp2.urlid = 12580;
	tmp2.tags = ['tag3', 'tag2'];
	data.push(tmp2)
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
