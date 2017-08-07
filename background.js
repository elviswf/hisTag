//var sql = require('sql.js');
//document.write("<script src='sql.js'></script>");
chrome.webNavigation.onDOMContentLoaded .addListener(function( tab ){
    console.log(tab);
    var db = new SQL.Database();
    var res = db.exec("SELECT * from sqlite_master");
    console.log(res);
});

