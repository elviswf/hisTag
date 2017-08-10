if (localStorage["BlackListCaption"]==undefined) localStorage["BlackListCaption"] = '';
if (localStorage["BlackListUrl"]==undefined) localStorage["BlackListUrl"] = '';

$(document).ready(function() {
    localStorage["timeStart"] = 'undefined';
    
    $("#linkAllHistory").text(chrome.i18n.getMessage("linkAllHistory"));
    $("#resultCaption").text(chrome.i18n.getMessage("last10"));

    setDatepickerLang();
    
    $(function() {
		$( "#datepicker" ).datepicker({
		  changeMonth: true,
		  changeYear: true,
          showOtherMonths: true,
		  selectOtherMonths: true,
          dateFormat: 'dd.mm.yy',
          onSelect: function(dateText, inst) {
            
            var a = dateText;
            var dd,mm,yyyy;
            dd = a.substr(0,2);
            if (dd.substr(0,1)=="0") {
                dd = dd.substr(1,2)
            };
            
            mm = a.substr(3,2);
            if (mm.substr(0,1)=="0") {
                mm = mm.substr(1,2)
            };
            mm -=1;
            
            yyyy = a.substr(6,4);
            
            var timeStart = new Date(yyyy,mm,dd,0,0,0);
            var timeEnd = new Date(yyyy,mm,dd,23,59,59,999);
            
            localStorage["timeStart"] = dateText;

            openHistoryTab();
                
            }
		});
	});
    

    $("#linkAllHistory").click(function() {
        localStorage["timeStart"] = "all";
        openHistoryTab();
    });

    function openHistoryTab() {
        var prefixUrl = 'chrome://history/';
                var openUrl = 'chrome://history/';

                chrome.tabs.getAllInWindow(null, function (tabs) {
                    for (var i = 0; i < tabs.length; i++) {
                        if (tabs[i].url.length >= prefixUrl.length && tabs[i].url.substr(0, prefixUrl.length) == prefixUrl) {
                            chrome.tabs.update(tabs[i].id, { selected: true });
                            window.close();
                            return;
                        }
                    }
                    chrome.tabs.create({ url: openUrl, selected: true });
                    window.close();
                });
    };
    
    
   function showLast10() {
    var resultDiv = $("#result10").html("");;
    var startTime = new Date(1970,0,1,0,0,0);
    var endTime = new Date();
    
    endTime = endTime.getTime();
    startTime = startTime.getTime();
    
    var searchObj = {
        'text': "",
        'startTime': startTime,
        'endTime': endTime,
        'maxResults': 10
    };
    chrome.history.search(searchObj,function(results){
        var arrayBlackListCaption = options.getBlackListCaption();
        var arrayBlackListUrl = options.getBlackListUrl();
        
        for (var i=0,i_end=results.length; i<i_end; i++) {
            dontShow = false;
            
            if (arrayBlackListCaption) {
                for (var z1=0,z1_end=arrayBlackListCaption.length; z1<z1_end; z1++) {
                    if(arrayBlackListCaption[z1]!='' && results[i].title.toLocaleLowerCase().indexOf(arrayBlackListCaption[z1]) + 1) {
                        dontShow = true;
                    }
                    if (dontShow) break;
                }
            }
            
            if (!dontShow && arrayBlackListUrl) {
                for (var z2=0,z2_end=arrayBlackListUrl.length; z2<z2_end; z2++) {
                    if(arrayBlackListUrl[z2]!='' && results[i].url.toLocaleLowerCase().indexOf(arrayBlackListUrl[z2]) + 1) {
                        dontShow = true;
                    }
                    if (dontShow) break;
                }
            }
            
            if (!dontShow) {
                var title = results[i].title;
                if (title=="") {
                    title = results[i].url;
                };
                var s0= /\</;
                title = title.replace(s0,"&lt;");
                s0= /\>/;
                title = title.replace(s0,"&gt;");
            
                resultDiv.append('<a href="'+results[i].url+'" title="'+title+' ('+results[i].url+')" style="background-image: url(chrome://favicon/'+results[i].url+'); ">'+title+'</a><br/>');
            }
            
        };
        
        var noFind = chrome.i18n.getMessage("noFind");
        if (resultDiv.html()=="") {
            resultDiv.append("<div><b>"+noFind+"</b></div>");
        };
        
        setA10();
    });
   };
   
   showLast10();
   
   //Переназначение ссылок
     function setA10() {
        $("#result10 a").click(function() {
            chrome.tabs.create({ url: $(this).attr("href"), selected: true });
            
            return false;
        });
     };
     
   
});