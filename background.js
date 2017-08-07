
var db;
window.onload = function() {
	try {
		db = window.openDatabase("mydb", '1.0', "Test", "16 * 1024");
	} catch (err) {
		console.log(err.message);
	}
	if (!db) {
		console.log("can not open db");
	} else {
		console.log("Creating table if not exists");
		db.transaction(function (context) {
			context.executeSql('CREATE TABLE IF NOT EXISTS TagHistory (url text, tags text, timestamp text)');
		});

	}

}
chrome.webNavigation.onCompleted.addListener(function(tab){
	// TODO： remove duplicate urls in one process
	if (tab.url.search("baidu") == -1 && tab.url.search("google") == -1 && tab.url.search("about:blank") == -1) {
		var tags = "test";
		console.log("insert for" + tab.url);
		db.transaction(function (context) {
			context.executeSql("INSERT INTO TagHistory (url, tags, timestamp) VALUES ('" + tab.url + "','" + tags + "','" + tab.timeStamp + "');");
		});

		/*db.readTransaction(function(t){
			t.executeSql('SELECT * FROM TagHistory', [], function(t, r){
			console.log(r.rows);//'test_ok'
				
		});
		}, function(e){}); */
	}
});

