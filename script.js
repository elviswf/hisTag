  var _gaq = _gaq || [];
    if (options.name=='hcb') {
        _gaq.push(['_setAccount', 'UA-23927966-1']);//History Calendar Button
    } else {
        _gaq.push(['_setAccount', 'UA-23927481-1']);//History Calendar
    }
    



if (localStorage["BlackListCaption"]==undefined) localStorage["BlackListCaption"] = '';
if (localStorage["BlackListUrl"]==undefined) localStorage["BlackListUrl"] = '';
if (localStorage["viewDateType"]==undefined) localStorage["viewDateType"] = '0';
//if (localStorage["closeStar5"]==undefined) localStorage["closeStar5"] = '';

$(document).ready(function() {
    
    setBaner();
    
    
    //Переменные
    var period = 3; //  1 - дата; 2 - диапазон; 3 - всё
    var startDate, endDate;
    var d = "none";
    var h;
    var week = new Array(7);
    var month = new Array(12);
    resultDiv = $("#result");
    var queryGlobal;
    var timeEndAll = 0;
    var noload = false;
    var noCaption = false;
    var ttt = -100500;
    var dateFromG;
    var dateG;
    var tmpHtml;
    var tmpHtml2;
    var diagM;
    var diagY;
    var tmpstr;
    var tmpstr2;
    var tmpstrarr = new Array(12);
    var tmpstrarr2 = new Array(12);
    var qG;
    var recycleded = false;
    var body = $('body');
    var needDelRecycledHint = false;
    var topSite = '';
    var chart;
    
    var datenow = new Date();
    var datepickerStart = new Date(datenow.getFullYear(),datenow.getMonth(),datenow.getDate(),0,0,0);
    var datepickerEnd = new Date(datenow.getFullYear(),datenow.getMonth(),datenow.getDate(),23,59,59,999);
    
    if (localStorage["firstRun"]!='none') {
        localStorage["timeStart"]='all'
        localStorage["firstRun"]='none'
    }
    
    //Подготовка страницы
    function resizePageBody() {
        $("#loading_bck").css({"left" : window.innerWidth/2-110+"px", "top" : window.innerHeight/2-30+"px"});
        $("#recycledResult").css('width',window.innerWidth-10-128-10-35+"px");
    };
    
    resizePageBody();

    $(window).resize(function() {
        resizePageBody();
    })

    
    $("#buttonInterval").click(function() {
        $("#term").val("");
        if ($("#dialog").dialog( "isOpen" )) {
            $("#dialog").dialog("close");
        };
        if ($("#dialog2").dialog( "isOpen" )) {
            $("#dialog2").dialog("close");
        };
        
        timeEndAll = 0;
        searchInterval();
    });
    
    $("#buttonHint").click(function() {
        $("#tabs-0").hide();
        $("#t0").hide();
        noload = true;
        $("#tabs").tabs( "select" , period );
        localStorage["noloadHint"] = true;
    });
    
    if (localStorage["noloadHint"]) {
        $("#tabs-0").hide();
        $("#t0").hide();
        $( "#tabs" ).tabs({ active: 3 });
    };
    
    $(".form").submit(function () {
        if ($("#dialog").dialog( "isOpen" )) {
            $("#dialog").dialog("close");
        };
        if ($("#dialog2").dialog( "isOpen" )) {
            $("#dialog2").dialog("close");
        };
        timeEndAll=0
        
        searchText();
        
        return false;
    });
    
    $("#submit").click(function (obj) {
        if ($("#dialog").dialog( "isOpen" )) {
            $("#dialog").dialog("close");
        };
        if ($("#dialog2").dialog( "isOpen" )) {
            $("#dialog2").dialog("close");
        };
        timeEndAll=0
        
        searchText();
        
        obj.preventDefault;
    });
    
    setDatepickerLang();
    
    $(function() {
		$( "#tabs" ).tabs({
		    collapsible: true,
			select: function(event, ui) {
			 if (ui.index!=0) {
			     period = ui.index;
			 
                 $("#term").val("");
             
                 if ($("#dialog").dialog( "isOpen" )) {
                    $("#dialog").dialog("close");
                 };
                 if ($("#dialog2").dialog( "isOpen" )) {
                    $("#dialog2").dialog("close");
                 };
             
                 if (!noload) {

                 if (period==1) {
                    loadingVisible("show")
                    
                    timeStart = datepickerStart;
                    timeEnd = datepickerEnd;
                    startDate = timeStart;
                    endDate = timeEnd;
                    resultDiv.html("");
                    body.height(79 + $('.main').height() );
                    search("",timeStart,timeEnd,0);
                 };
                 if (period==3) {
                    timeEndAll = 0;
                    searchAll();
                 };
             
                 } else {
                    noload = false;
                 };
             
             }
			}
		});
	});
    
    $(function() {
		$( "#datepicker" ).datepicker({
		  changeMonth: true,
		  changeYear: true,
          showOtherMonths: true,
		  selectOtherMonths: true,
          dateFormat: 'dd.mm.yy',
          create: function(event, ui) {
            if (ttt!=-100500) {
                $("#datepicker").datepicker( "setDate", ttt );
            };
          },
          onSelect: function(dateText, inst) {
            $("#term").val("");
            
            loadingVisible("show")
            
            if ($("#dialog").dialog( "isOpen" )) {
                $("#dialog").dialog("close");}
            if ($("#dialog2").dialog( "isOpen" )) {
                $("#dialog2").dialog("close");
            };
            
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
            datepickerStart = timeStart;
            datepickerEnd = timeEnd;
            startDate = timeStart;
            endDate = timeEnd;
            period = 1;
            resultDiv.html("");
            body.height(79 + $('.main').height() );
            search("",timeStart,timeEnd,0);
            }
		});
	});
    
	$(function() {
		var dates = $( "#from, #to" ).datepicker({
			defaultDate: "-1w",
			numberOfMonths: 1,
            dateFormat: 'dd.mm.yy',
            changeMonth: true,
		    changeYear: true,
            showOtherMonths: true,
		    selectOtherMonths: true,
			onSelect: function( selectedDate ) {
				var option = this.id == "from" ? "minDate" : "maxDate",
					instance = $( this ).data( "datepicker" ),
					date = $.datepicker.parseDate(
						instance.settings.dateFormat ||
						$.datepicker._defaults.dateFormat,
						selectedDate, instance.settings );
				dates.not( this ).datepicker( "option", option, date );
			}
		});
	});
    
    $.fx.speeds._default = 500;
	$(function() {
		$( "#dialog, #dialog2" ).dialog({
			autoOpen: false,
			show: "drop",
			hide: "drop",
            draggable: false,
            resizable: false
		});
	});
    
    
    //Подготовка локализации
    document.title = chrome.i18n.getMessage("title");
    $(".form :submit").val(chrome.i18n.getMessage("searchBoxText"));
    $("#t0 a").text(chrome.i18n.getMessage("tab0"));
    $("#t1 a").text(chrome.i18n.getMessage("tab1"));
    $("#t2 a").text(chrome.i18n.getMessage("tab2"));
    $("#t3 a").text(chrome.i18n.getMessage("tab3"));
    for (var i=0; i<12; i++) {
        month[i]=chrome.i18n.getMessage('month'+(i+1));
    };
    for (var i=0; i<7; i++) {
        week[i]=chrome.i18n.getMessage('week'+(i+1));
        //eval("week["+i+"]=chrome.i18n.getMessage('week"+(i+1)+"')")
    };
    var noFind = chrome.i18n.getMessage("noFind");
    $("#submit p").text(chrome.i18n.getMessage("search"));
    var more = chrome.i18n.getMessage("more");
    $("#hint1").text(chrome.i18n.getMessage("hint1"));
    $("#hint2").text(chrome.i18n.getMessage("hint2"));
    $("#hint3").text(chrome.i18n.getMessage("hint3"));
    $("#hint4").text(chrome.i18n.getMessage("hint4"));
    $("#hint5").html('<img src="imgs/info.png" width="16px" height="16px">'+chrome.i18n.getMessage("hint5"));
    $("#hint6").text(chrome.i18n.getMessage("hint6"));
    $("#buttonHint p").text(chrome.i18n.getMessage("buttonHint"));
    $("#buttonInterval p").text(chrome.i18n.getMessage("buttonInterval"));
    $("#intervalCaption1").text(chrome.i18n.getMessage("intervalCaption1"));
    $("#intervalCaption2").text(chrome.i18n.getMessage("intervalCaption2"));
    $("#term").prop("placeholder",chrome.i18n.getMessage("termText"));
    var hintRecycled = chrome.i18n.getMessage("delURLhint");
    $("#recycledResult").html(hintRecycled);
    $("#recycledClear").text(chrome.i18n.getMessage("delURLclear"));
    
    //Поиск query - слово для поиска, startTime - меньшая дата, endTime - большая дата,
    //mResults - максимальное кол-во результатов
    function search(query,startTime,endTime,mResults) {
    if (period==1) {
        var s = week[endTime.getDay()]+", "+endTime.getDate()+" "+month[endTime.getMonth()]+" "+endTime.getFullYear();
        
        $("#dateCaption").html("<b>"+chrome.i18n.getMessage("interval")+"</b>" + s);
    } else if (period==3 && timeEndAll==0) {
        $("#dateCaption").html("<b>"+chrome.i18n.getMessage("interval")+"</b>" + chrome.i18n.getMessage("dateCaptionDefault"));
    } else if (period==2 && timeEndAll==0) {
        var s = endTime.getDate()+" "+month[endTime.getMonth()]+" "+endTime.getFullYear();
        var s = startTime.getDate()+" "+month[startTime.getMonth()]+" "+startTime.getFullYear() + " - " + s;
        
        $("#dateCaption").html("<b>"+chrome.i18n.getMessage("interval")+"</b>" + s);
    };      
        
        
    endTime = endTime.getTime();
    startTime = startTime.getTime();
    
    
    queryGlobal = query;
    
    var searchObj = {
        'text': "",
        'startTime': startTime,
        'endTime': endTime,
        'maxResults': mResults
    };
    chrome.history.search(searchObj,function(results){
        var dateCaption = $("#dateCaption");
        
        var arrayBlackListCaption = options.getBlackListCaption();
        var arrayBlackListUrl = options.getBlackListUrl();
        
        if (period==1 && queryGlobal=="" && !arrayBlackListCaption && !arrayBlackListUrl) { 
            dateCaption.html(dateCaption.html() + ";&emsp;&emsp;&emsp;"+"<b>"+chrome.i18n.getMessage("resultCount")+"</b>"+": " + results.length)
        };
        
        h = 999;
        d = "none";
        var k = 0;
        
        
        
        
        
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
                if (queryGlobal!="") {
                    p = queryGlobal;
                    str = results[i].title + "|" + results[i].url;
                    p = p.toLocaleLowerCase();
                    str = str.toLocaleLowerCase();
                    if (str.search(p)>-1) {
                       k++
                       printResultSearch(results[i].id,results[i].lastVisitTime,results[i].title,results[i].url,results[i].visitCount);  
                    };
                } else {
                    k++;
                    printResultSearch(results[i].id,results[i].lastVisitTime,results[i].title,results[i].url,results[i].visitCount);
                };
            }

        };
            
            if (queryGlobal!="" || arrayBlackListCaption || arrayBlackListUrl) {
                if ((period!=3 && period!=2) || (queryGlobal!="" && (period==3 || period==2)))
                    dateCaption.html(dateCaption.html() + ";&emsp;&emsp;&emsp;"+"<b>"+chrome.i18n.getMessage("resultCount")+"</b>"+": " + k)
            }
            
            if ( results.length == 200) {
                 if ( period == 2 || period==3) {
                    timeEndAll = results[199].lastVisitTime-1;
                    timeEndAll = new Date(timeEndAll);
                    
                    resultDiv.append("<div id='more'><b>"+more+"</b></div>");                
                    $("#more").click(function() {
                        $("#more").remove();
                        noCaption = true;
                        searchAll();
                    })
        };};
   
        //setDeleteItems();
        
        if (resultDiv.html()=="") {
            resultDiv.append("<div class='day'><b>"+noFind+"</b></div>");
        } else {
            if (!noCaption) {
                resultDiv.prepend("<div class='entry'><div class='cap1'>"+chrome.i18n.getMessage("lastVisit")+"</div><div id='deleteAll'><img src='imgs/Delete.png' title='"+chrome.i18n.getMessage("deleteAll")+"' width='16px' height='16px'></div><div class='cap2'>URL</div></div>");
                $('#deleteAll').click(function() {
                    allToRecycle();
                });
            } else {
                noCaption = false;
            };
        };
        
        loadingVisible("hide")
    });
    };
    
    //Найти всю историю
    function searchAll() {
        loadingVisible("show")
        var timeStart = new Date(1970,0,1,0,0,0);
        var timeEnd = new Date();
        if (timeEndAll!=0) {timeEnd = timeEndAll} else {resultDiv.html("");body.height(79 + $('.main').height() );};
        startDate = timeStart;
        endDate = timeEnd;
        period = 3;
        
        search("",timeStart,timeEnd,200);
    };
    
    //Найти интервал
    function searchInterval() {
        loadingVisible("show")
        var timeStart = $("#from").datepicker("getDate");
        var timeEnd = $("#to").datepicker("getDate");
        timeEnd = timeEnd.getTime() + (1000*60*60*24)  - 1;
        timeEnd = new Date(timeEnd);
        if (timeEndAll!=0) {timeEnd = timeEndAll} else {resultDiv.html("");body.height(79 + $('.main').height() );};
        startDate = timeStart;
        endDate = timeEnd;
        period = 2;
        
        search("",timeStart,timeEnd,200);
    };

    /* ----------------------------------------------------------------------------------------- */
    
    if (options.name=='hcb') {
        //History Calendar Button
        //Обработчик Кнопки с календарём
        if (localStorage["timeStart"]=='undefined' || localStorage["timeStart"]=='all') {
            searchAll();
            localStorage["timeStart"] = 'undefined';
            $("#t1").addClass("ui-tabs-selected ui-state-active");
            $("#tabs-1").removeClass("ui-tabs-hide");
        } else {
            searchDateButton();
        };
        
        //Таймер для Кнопки с календарём
        setInterval(function() {
            if (localStorage["timeStart"]=='all') {
                localStorage["timeStart"] = 'undefined';
                timeEndAll = 0;
                period = 3;
                
                noload = true;
                $("#tabs").tabs( "select" , period );
                
                searchAll();
            } else if (localStorage["timeStart"]!='undefined') {
                searchDateButton();
        };
        },200);
    } else {
        //History Calendar
        searchAll();
        if (localStorage["noloadHint"]) {
            $("#t1").addClass("ui-tabs-selected ui-state-active");
            $("#tabs-1").removeClass("ui-tabs-hide");
        };
    }
    
    

    
    function searchDateButton() {
        loadingVisible("show")
        
        period = 1;
        
        noload = true;
        $("#tabs").tabs( "select" , period );
        $("#t2").addClass("ui-tabs-selected ui-state-active");
        $("#tabs-2").removeClass("ui-tabs-hide");
        
        var a = localStorage["timeStart"];
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
        
        $("#datepicker").datepicker( "setDate", timeStart );
        ttt = timeStart;
        
        localStorage["timeStart"] = 'undefined';

        datepickerStart = timeStart;
        datepickerEnd = timeEnd;
        startDate = timeStart;
        endDate = timeEnd;
        period = 1;
        resultDiv.html("");
        body.height(79 + $('.main').height() );
        search("",timeStart,timeEnd,0);
    };
    
    /* ----------------------------------------------------------------------------------------- */
    
    //Функция для кнопки "Найти"
    function searchText() {
        loadingVisible("show")
        
        if ($("#term").val()!="") {
         var timeStart = startDate;
         var timeEnd = endDate;
         var str = $("#term").val();
         resultDiv.html("");
         body.height(79 + $('.main').height() );
         search(str,timeStart,timeEnd,0);
        } else {
         var timeStart = startDate;
         var timeEnd = endDate;
         resultDiv.html("");
         body.height(79 + $('.main').height() );
         if (period==3) {
             timeEndAll=0;
             searchAll();
        } else {
         search("",timeStart,timeEnd,0);}
        };
    };
    
    
    
    
    //Вывод результатов
    function printResultSearch(id,lastVisitTime,title,url,visitCount) {
        var str,s1,s2;
        var dateTmp = new Date(lastVisitTime);
        var dateTmp2;
        var h2;
        
        dateTmp2 = ""+dateTmp.getFullYear()+dateTmp.getMonth()+dateTmp.getDate();
        if (h==999) {
            h=dateTmp.getHours()*60+dateTmp.getMinutes();
        };
        h2=dateTmp.getHours()*60+dateTmp.getMinutes();
        
        //разделитель дней
        /*
         if (d!=dateTmp2) {
                     str = "<div class='day'>"+week[dateTmp.getDay()]+", "+dateTmp.getDate()+" "+month[dateTmp.getMonth()]+" "+dateTmp.getFullYear()+"</div>";
                     resultDiv.append(str);
         */
        //разделитель пауз в дне
        /* } else  
        if (h-h2>=60) {
            str = "<div class='gap'></div>";
            resultDiv.append(str);
        };*/
        
        if (title=="") {
            title = url;
            try{
                title = decodeURIComponent(title);
            } catch(e) {
                
            }
        }
        
        var s;
        
        switch (localStorage["viewDateType"]){ 
        	case '0': //dd.mm.yyyy
                tmpClass = '';
                
                s0 = dateTmp.getDate()+"";
                if (s0.length==1) {s0="0"+s0};
                
                s = s0 + ".";
                
                s0 = dateTmp.getMonth()+1+"";
                if (s0.length==1) {s0="0"+s0};
                
                s = s + s0 + ".";
        	break;
        
        	case '1': //mm.dd.yyyy
                tmpClass = '';
                
                s0 = dateTmp.getMonth()+1+"";
                if (s0.length==1) {s0="0"+s0};
                
                s = s0 + ".";
                
                s0 = dateTmp.getDate()+"";
                if (s0.length==1) {s0="0"+s0};
                
                s = s + s0 + ".";
        	break;
        
        	case '2': //dd месяц yyyy
                tmpClass = 'tmpClassTime ';
                
                s0 = dateTmp.getDate()+"";
                if (s0.length==1) {s0="0"+s0};
                
                s = s0 + " ";
                
                s0 = month[dateTmp.getMonth()];
                
                s = s + s0 + " ";
        	break;
        
        	default :
        }
        
        
        
        s = s + dateTmp.getFullYear() + " ";
        
        s0 = dateTmp.getHours()+"";
        if (s0.length==1) {s0="0"+s0};
        
        s = s + s0 + ":";
        
        s0 = dateTmp.getMinutes()+"";
        if (s0.length==1) {s0="0"+s0};
        
        s = s + s0;
        
        while (title.indexOf('<') + 1) {
            title = title.replace('<',"&lt;");
        }
        while (title.indexOf('>') + 1) {
            title = title.replace('>',"&gt;");
        }
        while (title.indexOf('"') + 1) {
            title = title.replace('"',"&quot;");
        }
        
        url2 = url;
        try{
            url2 = decodeURIComponent(url);
        } catch(e) {
            
        }
        while (url2.indexOf('<') + 1) {
            url2 = url2.replace('<',"&lt;");
        }
        while (url2.indexOf('>') + 1) {
            url2 = url2.replace('>',"&gt;");
        }
        while (url2.indexOf('"') + 1) {
            url2 = url2.replace('"',"&quot;");
        }
        
        str = '<div class="entry" id="'+id+'"><div class="'+tmpClass+'time">'+s+'</div><div class="info" attr="'+url+'" attr2="'+title+'"><img src="imgs/info.png" title="'+chrome.i18n.getMessage("infURL")+'" width="16px" height="16px"/></div><div class="title"><img class="favicon" src="chrome://favicon/'+url+'" width="16px" height="16px"/><a href="'+url+'">'+title+'</a><span class="url">'+url2+'</span></div></div>';
        resultDiv.append(str);
        
        setA();
        setInfoClick();
        if (recycleded) {
            setDeleteClass()
            body.height(body.height() + 27);
        }
        
        d = dateTmp2;
        h = h2;
    };
    
     
     //Переназначение ссылок
     function setA() {
        $("#result .entry:last .title a").click(function(obj) {
            if (obj.which==1) {
                document.location.href = $(this).attr("href");
            } else if (obj.which==2) {
                chrome.tabs.create({ url: $(this).attr("href"), selected: false });
            };
            
            $(this).css({"color" : "-webkit-link"})
            
            return false;
        });
     };
     
     
     function setInfoClick() {
        $("#result .entry:last .info").click(function() {
            if ($(this).hasClass('info')) {
                var wSize = 900;//window.innerWidth / 3 * 2;
                var hSize = window.innerHeight / 3 * 2;
                var diag = $("#dialog").dialog( "option", "position", 'center' ).dialog("option", "title", chrome.i18n.getMessage("infURL")).dialog("option", "width", wSize).dialog("option", "height", hSize).dialog("option", "maxWidth", 861).dialog("option", "maxHeight", 444).dialog("option", "minWidth", 532).dialog("option", "minHeight", 250);
                
                //diag.html("<div id='resultInf'><a id='resultInfA' href='"+$(this).attr("attr")+"' title='"+$(this).attr("attr2")+" ("+$(this).attr("attr")+")'>"+$(this).attr("attr2")+"</a><div id='results-separator'></div></div>");
                diag.html("<div id='resultInf'><img class='favicon2' src='chrome://favicon/"+$(this).attr("attr")+"' width='16px' height='16px'/><a id='resultInfA' class='tooltip blue-tooltip' href='"+$(this).attr("attr")+"'>"+$(this).attr("attr2")+"<span>"+$(this).attr("attr")+"</span></a><div id='results-separator'></div></div>");
                
                $("#resultInfA span").css("width",wSize-62+"px")
                
                $("#resultInf a").click(function(obj) {
                    if (obj.which==1) {
                        document.location.href = $(this).attr("href");
                    } else if (obj.which==2) {
                        chrome.tabs.create({ url: $(this).attr("href"), selected: false });
                    };
                
                    return false;
                });
                
                var searchObj = {
                    'url': $(this).attr("attr")
                };
                chrome.history.getVisits(searchObj,function(results){
                    for (var i=0,i_end=results.length; i<i_end; i++) {
                        var s;
                        var dateTmp = new Date(results[i].visitTime);
                        var s0;
            
                        s0 = dateTmp.getHours()+"";
                        if (s0.length==1) {s0="0"+s0};
            
                        s = s0 + ":";
            
                        s0 = dateTmp.getMinutes()+"";
                        if (s0.length==1) {s0="0"+s0};
            
                        s = s + s0 + ":";
                        
                        s0 = dateTmp.getSeconds()+"";
                        if (s0.length==1) {s0="0"+s0};
            
                        s = s + s0;
                        
                        s = dateTmp.getDate()+" "+month[dateTmp.getMonth()]+" "+dateTmp.getFullYear()+ ", " + week[dateTmp.getDay()]+ ", " + s;
                        
                        //'<div class="delete" attr="'+results[i].visitTime+'"><img src="imgs/delete.png" width="16px" height="16px"/></div>' + 
                        $("#resultInf #results-separator").after("<div class='timeInf'>"+s+"</div>");
                    };
                    $("#resultInfA").before("<div id='resultCountPopup'><b>"+chrome.i18n.getMessage("resultCount")+"</b>: "+results.length+"</div>");
                    
                /*
                 $("#resultInf .delete").click(function() {
                                 var deleteObj = {
                                     'startTime': $(this).attr("attr")*1,
                                     'endTime': $(this).attr("attr")*1
                                 };
                                 chrome.history.deleteRange(deleteObj,function(){
                                     alert("1")
                                 })
                                 
                             })
                 */
                
                });
                
                
            
    			diag.dialog( "open" ).dialog( "moveToTop" );
            };
            
            if ($(this).hasClass('delete')) {
                $(this).addClass('hided').removeClass('delete');
                local_url = $(this).attr('attr');
                local_title = $(this).attr('attr2');
                
                url = decodeURIComponent(local_url);
                s0= '<';
                url = url.replace(s0,"&lt;");
                s0= '>';
                url = url.replace(s0,"&gt;");
                
                local_title = decodeURIComponent(local_title);
                s0= '<';
                local_title = local_title.replace(s0,"&lt;");
                s0= '>';
                local_title = local_title.replace(s0,"&gt;");
                
                $(this).parent().addClass('forHide')
                
                if ( !needDelRecycledHint && $('.recycledURL').length==0 ) {
                    $("#recycledResult").html('');
                    needDelRecycledHint = true;
                }
                
                str = '<img style="float: left; padding-right: 5px;" src="chrome://favicon/'+local_url+'" width="16px" height="16px"/><div class="recycledURL" style="overflow: hidden;"><a style="white-space: nowrap;" href="'+local_url+'">'+local_title+'</a><span style="white-space: nowrap; padding-left: 5px; color: gray;">'+url+'</span></div>';
                $("#recycledResult").prepend('<div style="padding-bottom: 10px;">'+str+'</div>');
                
                $("#recycledButton").addClass('recycledButton');
                
                $('#recycledRun').fadeIn(500);
                $('#recycledClear').fadeIn(500);
            }
        });
     };
     
     //Функция показывает окно с вариантами диаграмм
     function showDiagVariant() {
        $("#diagrammaButton").click(function () {
            var wSize = 700;
            var hSize = 400;
            var diag = $("#dialog").dialog( "option", "position", 'center' ).dialog("option", "title", chrome.i18n.getMessage("diag1")).dialog("option", "width", wSize).dialog("option", "height", hSize).dialog("option", "maxWidth", 700).dialog("option", "maxHeight", 400).dialog("option", "minWidth", 700).dialog("option", "minHeight", 400);
            var str2 = '<div align="center" style="margin-bottom: 5px; font-family: Arial, sans-serif;"><b>'+chrome.i18n.getMessage("diag8")+'</b></div>'
            str2 = str2 + "<div style='height: 30px;'><span class='diagspan'>"+chrome.i18n.getMessage("diag6")+"</span><input type='text' name='term2' id='term2' placeholder='example.com'/></div>"
            str2 = str2 + "<div id='results-separator' style='background-color: transparent;'></div>"
            str2 = str2 + "<div style='height: 30px;'><span class='diagspan'>"+chrome.i18n.getMessage("diag2")+"</span><select size='1' id='year'></select><div id='buttonShowDiag' class='buttonShowDiag'><p>"+chrome.i18n.getMessage("buttonInterval")+"</p></div><span class='diagcaption' id='diagcaption1'></span></div>"
            str2 = str2 + "<div id='results-separator' style='background-color: transparent;'></div>"
            str2 = str2 + "<div style='height: 30px;'><span class='diagspan'>"+chrome.i18n.getMessage("diag3")+"</span><select size='1' id='month'></select><div id='buttonShowDiag2' class='buttonShowDiag'><p>"+chrome.i18n.getMessage("buttonInterval")+"</p></div><span class='diagcaption' id='diagcaption2'></span></div>"
            str2 = str2 + "<div id='results-separator' style='background-color: transparent;'></div>"
            str2 = str2 + '<div align="center" style="margin-bottom: 5px; margin-top: 10px; font-family: Arial, sans-serif;"><b>'+chrome.i18n.getMessage("diag9")+':</b></div>'
            str2 = str2 + "<div style='height: 30px;'><div id='buttonShowDiag3' class='buttonShowDiag' style='width: 98%;'><p>"+chrome.i18n.getMessage("diag10")+"</p></div></div>"
            str2 = str2 + "<div style='height: 30px; padding-top: 10px;'><div id='buttonShowDiag4' class='buttonShowDiag' style='width: 98%;'><p>"+chrome.i18n.getMessage("top20button")+"</p></div></div>"
            str2 = str2 + "<div id='results-separator' style='background-color: transparent;'></div>"
            diag.html(str2)
            
                //Заполнение годов
                var str
                var tmpdate = new Date()
                tmpdate = tmpdate.getFullYear()
                for (var i=tmpdate - 10; i<tmpdate + 11; i++) {
                    str = str + "<option value="+i+">"+i+"</option>"
                }
                $("#year").html(str).val(tmpdate)
                //Заполнение месяцев
                if (chrome.i18n.getMessage("l")=="ru") {
                    var monthNames = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
                } else {
                    var monthNames = month
                }
                str = ""
                tmpdate = new Date()
                tmpdate = tmpdate.getMonth()
                for (var i=0; i<12; i++) {
                    str = str + "<option value="+i+">"+monthNames[i]+"</option>"
                }
                $("#month").html(str).val(tmpdate)
                
                if (chrome.i18n.getMessage("l")=="ru") {
                    var monthNames = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь']
                }
            
            
            $("#buttonShowDiag2").click(function() {
                loadingVisible("show")
                showDiagramma(1, $("#month").val(), $("#year").val(), $("#term2").val() );
            }).hover(function() {
                $("#diagcaption2").text(chrome.i18n.getMessage("diag5")+", "+monthNames[$("#month").val()]+" "+$("#year").val()).fadeIn(500)
                if (chrome.i18n.getMessage("l")=="ru") {
                    $("#diagcaption2").text( $("#diagcaption2").text() + " года")
                }
            }, function() {
                $("#diagcaption2").fadeOut(500)
            })
            
            $("#buttonShowDiag").click(function() {
                loadingVisible("show")
                showDiagramma(2, $("#month").val(), $("#year").val(), $("#term2").val() );
            }).hover(function() {
                $("#diagcaption1").text(chrome.i18n.getMessage("diag5")+", "+$("#year").val()).fadeIn(500)
                if (chrome.i18n.getMessage("l")=="ru") {
                    $("#diagcaption1").text( $("#diagcaption1").text() + " год")
                }
            }, function() {
                $("#diagcaption1").fadeOut(500)
            })
            
            $("#buttonShowDiag3").click(function() {
                loadingVisible("show")
                topSite = 'text'
                fetchHistory();
            })
            
            $("#buttonShowDiag4").click(function() {
                loadingVisible("show")
                topSite = 'pie chart'
                fetchHistory();
            })
            
            $("#dialog").dialog( "open" ).dialog( "moveToTop" );
            })
        }
        
     showDiagVariant()
            
     //Функция показывает окно с диаграммой typefunc = 1 - месяц 2 - год
     function showDiagramma(typefunc,m,y,q) {
        
                if (chrome.i18n.getMessage("l")=="ru") {
                    var monthNames = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь']
                } else {
                    var monthNames = month
                }

            var wSize = 861;
            var hSize = 400;
            var diag = $("#dialog2").dialog( "option", "position", 'center' ).dialog("option", "width", wSize).dialog("option", "height", hSize).dialog("option", "maxWidth", 861).dialog("option", "maxHeight", 400).dialog("option", "minWidth", 861).dialog("option", "minHeight", 400);
            
            diag.html("<div id='diagramma'><table id='dataDiagramm'><tfoot><tr></tr></tfoot><tbody><tr></tr></tbody></table><div id='holder'></div></div>")
        
        qG = q
        
        //Подготовка данных
        if (typefunc==1) {
            var tmp = new Date(y,m,1,0,0,0);
            tmpHtml = "";
            tmpHtml2 = "";
            diagM = " "+month[tmp.getMonth()];
            diagY = " "+tmp.getFullYear();
            localStorage["strtmp"] = diagM + diagY;
            var q2=""
            if (q!="") {
                q2 = ", "+ chrome.i18n.getMessage("diag7") + q
            }
            diag.dialog("option", "title", chrome.i18n.getMessage("diag4") + monthNames[m] + diagY + q2)
            findDateCountM(tmp);
        } else if (typefunc==2) {
            var tmp = new Date(y,0,1,0,0,0);
            tmpHtml = "";
            tmpHtml2 = "";
            tmpstr = 0;
            tmpstr2 = "";
            diagM = "";
            diagY = " "+tmp.getFullYear();
            localStorage["strtmp"] = diagM + diagY;
            var q2=""
            if (q!="") {
                q2 = ", "+ chrome.i18n.getMessage("diag7") + q
            }
            diag.dialog("option", "title", chrome.i18n.getMessage("diag4") + diagY + q2)
            findDateCountY(tmp);
        }
        //

     };
     
     //Диаграмма - месяц
     function findDateCountM(dateFrom) {
        dateTo = new Date( dateFrom.getTime() + (1000*60*60*24) );
        if (dateTo.getHours()>0) {
            dateTo = new Date( dateTo.getTime() - (1000*60*60*dateTo.getHours()) );
        }
        dateFromG = dateTo;
        dateG = dateFrom;
        
        if (dateFrom.getMonth()==dateTo.getMonth()) {
            
            var searchObj = {
                'text': "",
                'startTime': dateFrom.getTime(),
                'endTime': dateFrom.getTime() + (1000*60*60*24) - 1,
                'maxResults': 0
            };
            chrome.history.search(searchObj,function(results){
                var k = 0,p,str
                
                if (qG!='') {
                    for (var i=0,i_end=results.length; i<i_end; i++) {
                        p = qG;
                        str = results[i].title + "|" + results[i].url;
                        p = p.toLocaleLowerCase();
                        str = str.toLocaleLowerCase();
                        if (str.search(p)>-1) {
                            k++
                        }
                    }
                    tmpHtml = tmpHtml + "<th>"+dateG.getDate()+"</th>";
                    tmpHtml2 = tmpHtml2 + "<td>"+k+"</td>";
                } else {
                    tmpHtml = tmpHtml + "<th>"+dateG.getDate()+"</th>";
                    tmpHtml2 = tmpHtml2 + "<td>"+results.length+"</td>";
                }
                
                findDateCountM(dateFromG);
            });
            
        } else {
            
            var searchObj = {
                'text': "",
                'startTime': dateFrom.getTime(),
                'endTime': dateFrom.getTime() + (1000*60*60*24) - 1,
                'maxResults': 0
            };
            chrome.history.search(searchObj,function(results){
                var k = 0,p,str
                
                if (qG!='') {
                    for (var i=0,i_end=results.length; i<i_end; i++) {
                        p = qG;
                        str = results[i].title + "|" + results[i].url;
                        p = p.toLocaleLowerCase();
                        str = str.toLocaleLowerCase();
                        if (str.search(p)>-1) {
                            k++
                        }
                    }
                    tmpHtml = tmpHtml + "<th>"+dateG.getDate()+"</th>";
                    tmpHtml2 = tmpHtml2 + "<td>"+k+"</td>";
                } else {
                    tmpHtml = tmpHtml + "<th>"+dateG.getDate()+"</th>";
                    tmpHtml2 = tmpHtml2 + "<td>"+results.length+"</td>";
                }
                
                $("#dialog2 #diagramma tfoot tr").html(tmpHtml);
                $("#dialog2 #diagramma tbody tr").html(tmpHtml2);
                loadingVisible("hide")
                $("#dialog2").dialog( "open" ).dialog( "moveToTop" );
                drawDiagramm();
            });
              
        };
     };
     
     
     //Диаграмма - год
     function findDateCountY(dateFrom) {
        dateTo = new Date( dateFrom.getTime() + (1000*60*60*24) );
        if (dateTo.getHours()>0) {
            dateTo = new Date( dateTo.getTime() - (1000*60*60*dateTo.getHours()) );
        }
        dateFromG = dateTo;
        dateG = dateFrom;
        
      if (dateFrom.getFullYear()==dateTo.getFullYear()) {
        
        if (dateFrom.getMonth()==dateTo.getMonth()) {
            //Заполнение месяцев
                if (chrome.i18n.getMessage("l")=="ru") {
                    var monthNames = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
                } else {
                    var monthNames = month
                }
                
            tmpstr2 = monthNames[dateFrom.getMonth()]
            
            var searchObj = {
                'text': "",
                'startTime': dateFrom.getTime(),
                'endTime': dateFrom.getTime() + (1000*60*60*24) - 1,
                'maxResults': 0
            };
            chrome.history.search(searchObj,function(results){
                var k = 0,p,str
                
                if (qG!='') {
                    for (var i=0,i_end=results.length; i<i_end; i++) {
                        p = qG;
                        str = results[i].title + "|" + results[i].url;
                        p = p.toLocaleLowerCase();
                        str = str.toLocaleLowerCase();
                        if (str.search(p)>-1) {
                            k++
                        }
                    }
                    tmpstr = tmpstr + k;
                } else {
                    tmpstr = tmpstr + results.length;
                }
                
                findDateCountY(dateFromG);
            });
            
        } else {
            
            var searchObj = {
                'text': "",
                'startTime': dateFrom.getTime(),
                'endTime': dateFrom.getTime() + (1000*60*60*24) - 1,
                'maxResults': 0
            };
            chrome.history.search(searchObj,function(results){
                var k = 0,p,str
                
                if (qG!='') {
                    for (var i=0,i_end=results.length; i<i_end; i++) {
                        p = qG;
                        str = results[i].title + "|" + results[i].url;
                        p = p.toLocaleLowerCase();
                        str = str.toLocaleLowerCase();
                        if (str.search(p)>-1) {
                            k++
                        }
                    }
                    tmpstr = tmpstr + k;
                } else {
                    tmpstr = tmpstr + results.length;
                }
                
                
                tmpHtml = tmpHtml + "<th>"+tmpstr2+"</th>";
                tmpHtml2 = tmpHtml2 + "<td>"+tmpstr+"</td>";
                tmpstr = 0;
                findDateCountY(dateFromG);
            });
             
        };
        
      } else {
        var searchObj = {
                'text': "",
                'startTime': dateFrom.getTime(),
                'endTime': dateFrom.getTime() + (1000*60*60*24) - 1,
                'maxResults': 0
        };
        chrome.history.search(searchObj,function(results){
                var k = 0,p,str
                
                if (qG!='') {
                    for (var i=0,i_end=results.length; i<i_end; i++) {
                        p = qG;
                        str = results[i].title + "|" + results[i].url;
                        p = p.toLocaleLowerCase();
                        str = str.toLocaleLowerCase();
                        if (str.search(p)>-1) {
                            k++
                        }
                    }
                    tmpstr = tmpstr + k;
                } else {
                    tmpstr = tmpstr + results.length;
                }
                
                
                tmpHtml = tmpHtml + "<th>"+tmpstr2+"</th>";
                tmpHtml2 = tmpHtml2 + "<td>"+tmpstr+"</td>";
                $("#dialog2 #diagramma tfoot tr").html(tmpHtml);
                $("#dialog2 #diagramma tbody tr").html(tmpHtml2);
                loadingVisible("hide")
                $("#dialog2").dialog( "open" ).dialog( "moveToTop" );
                drawDiagramm();
        });
            
      }
     };
     
  
//===================Список самых посещаемых сайтов:======================
     
function hashURL(url) {
    if(typeof url != "undefined") {
        var str = url
        if (str.match(/^about:/) != null) {
            return chrome.i18n.getMessage("diag12")
        } else {
            str = url.split(/\/+/g)[1]
            //console.log(url)
            if (str.match(/^[A-Z]{1}:/) != null) {
                return chrome.i18n.getMessage("diag11")
            } else if (str.match(/^[a-z]{32}$/) != null) {
                return chrome.i18n.getMessage("diag13")
            } else if (str.match(/;base64,/) != null) {
                return 'MIME'
            } else {
                return str
            }
        }
        
        
    }
    else {
        return;
    }
}

function drawPie(dataPie) {
   chart = new Highcharts.Chart({
      chart: {
         renderTo: 'container',
         plotBackgroundColor: null,
         plotBorderWidth: null,
         plotShadow: false
      },
      title: {
         text: ''
      },
      tooltip: {
         formatter: function() {
            return '<b>'+ this.point.name +'</b>: '+ this.y +" hit's";
         }
      },
      plotOptions: {
         pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
               enabled: false
            },
            showInLegend: true
         }
      },
       series: [{
         type: 'pie',
         name: 'Browser share',
         data: dataPie
      }]
   });
};

function showTopHistory(dict) {
    var wSize = window.innerWidth / 100 * 90
    if (wSize>900) {wSize=900}
    var hSize = window.innerHeight / 100 *90
    var diag = $("#dialog2").dialog( "option", "position", 'center' )
    var str2 = ""
    
    if (topSite == 'pie chart') {
        diag.dialog("option", "title", chrome.i18n.getMessage("top20button")).dialog("option", "width", 650).dialog("option", "height", 500).dialog("option", "maxWidth", 650).dialog("option", "maxHeight", 500).dialog("option", "minWidth", 650).dialog("option", "minHeight", 500)
        
        diag.html('<div id="container"></div>')
        
        j=0;
        var dataArray = new Array(0);
        for (var i=dict.data.length-1,i_end=dict.data.length-21; i>i_end; i--) {
            dataArray[j] = new Array(0);
            dataArray[j][0] = dict.data[i][0]
            dataArray[j][1] = dict.data[i][1]
            j++
        }
        
        drawPie(dataArray)
    }
    
    
    if (topSite == 'text') {
        diag.dialog("option", "title", chrome.i18n.getMessage("diag9")).dialog("option", "width", wSize).dialog("option", "height", hSize).dialog("option", "maxWidth", 900).dialog("option", "maxHeight", hSize).dialog("option", "minWidth", 861).dialog("option", "minHeight", 400)
        
        for (var i=0,i_end=dict.data.length; i<i_end; i++) {
            str2 = "<div class='entry' style='overflow: hidden;'><div class='cap3'>"+dict.data[i][0]+"</div><div class='cap4'>"+dict.data[i][1]+"</div></div>" + str2
        }
        
        str2 = "<div id='static_head'>"+chrome.i18n.getMessage("diag14")+dict.total+"</div>" + str2
        
        diag.html(str2)
    }
    
    
    
    loadingVisible("hide")
    diag.dialog( "open" ).dialog( "moveToTop" )
}

function onHistoryResult(results) {
    var dict = { discards: 0, total: 0, items: {} };
    for(var i = 0;  i < results.length; ++i) {
        //console.log(i)
        var hash = hashURL( results[i].url );
        //console.log("Hash is: " hash);
        if(typeof hash != "undefined") {
            var count = results[i].visitCount;
            if (count==0) {count++}
            dict.total += count;
            if(typeof dict.items[hash] == "undefined") {
                dict.items[hash] = count;
                //console.log("Added hash: " + hash);
            }
            else {
                dict.items[hash] += count;
                //console.log("Increment hash: " + hash);
            }
        }
        else {
            dict.discards++;
        }
    }
    
    dict.data = [];
    for(var prop in dict.items) {
        if(dict.items.hasOwnProperty(prop)) {
            dict.data.push( [prop, dict.items[prop]] );
        }
    }
    dict.data.sort( function(a,b) { return a[1] - b[1] } );
    
    showTopHistory(dict) 
}

function fetchHistory() {
    var timeStart = new Date(1970,0,1,0,0,0);
    var timeEnd = new Date();
    
    timeEnd = timeEnd.getTime();
    timeStart = timeStart.getTime();
        
    var searchObj = {
        'text': "",
        'startTime': timeStart,
        'endTime': timeEnd,
        'maxResults': 0
    };
    
    chrome.history.search(searchObj, onHistoryResult);
}



//Управление анимацией загрузки
function loadingVisible(doit) {
    if (doit=="show") {
        $("#loading_bck").show()
        $("#loading").show()
    } else if (doit=="hide") {
        $("#loading_bck").hide()
        $("#loading").hide()
    }
}


//Функция показывает корзину
    $("#recycledButton").click(function () {
        recycleded = true;
        
        var recycled = $("#recycled").fadeIn(500);
        $("#deleteAll").show();
        
        body.height(79 + $('.main').height() +200);
        
        setDeleteClass();
    })

     function setDeleteClass() {
        $('.info').addClass('delete').removeClass('info')
        $('.delete img').attr('title',chrome.i18n.getMessage("delURL"))
        
        $('.delete img').attr('src','imgs/Delete.png')
     }
     
//Функция прячет корзину
     $('#recycledClose').click(function() {
        closeRecycled()
     })
     
     function closeRecycled() {
        recycleded = false;
        
        var recycled = $("#recycled").fadeOut(500);
        $("#deleteAll").hide();
        
        
        body.height(79 + $('.main').height() );
        
        $('.delete, .hided').addClass('info').removeClass('delete hided')
        //$('.hided').addClass('info').removeClass('hided');
        $('.info img').attr('title',chrome.i18n.getMessage("infURL"))
        $('.info img').attr('src','imgs/info.png')
     }
     
     //Функция удаляет все урл в корзине
     $('#recycledRun').click(function() {
        loadingVisible('show')
        
        var arrayURL = new Array(0);
        $('div.recycledURL a').each(function() {
            arrayURL.push($(this).attr('href'));
        })
        arrayURL = jQuery.unique(arrayURL);
        
        delURLs(arrayURL)
     })
     
     function delURLs(arrayURL) {
        for (var i=0; i<arrayURL.length; i++) {
            var deleteObj = {
             'url': arrayURL[i]
            };
         
            chrome.history.deleteUrl(deleteObj);
        }
        
        var searchObj = {
        'text': "",
        'startTime': 0,
        'endTime': 100,
        'maxResults': 1
        };
        chrome.history.search(searchObj,function(results){
            loadingVisible('hide')
        
            closeRecycled()
            
            $('.forHide').fadeOut(500, function() {
                $(this).remove()
            })
            
            $("#recycledButton").removeClass('recycledButton');
            
            $('#recycledRun').hide();
            $('#recycledClear').hide();
            
            needDelRecycledHint = false;
            $("#recycledResult").html(hintRecycled);
            
            body.height(79 + $('.main').height() );
        })
        
     }
     
     //Функция очищает все урл в корзине
     $('#recycledClear').click(function() {
        $('.forHide').removeClass('forHide');
        $('.hided').addClass('delete').removeClass('hided');
        
        $("#recycledResult").html(hintRecycled);
        
        $("#recycledButton").removeClass('recycledButton');
        
        $('#recycledRun').hide();
        $('#recycledClear').hide();
        needDelRecycledHint = false;
     })
     
    //Отправляет все URL в корзину
    function allToRecycle() {
        if ( !needDelRecycledHint && $('.recycledURL').length==0 ) {
            $("#recycledResult").html('');
            needDelRecycledHint = true;
        }
        
        $('.delete').each(function() {
        $(this).addClass('hided').removeClass('delete');
            local_url = $(this).attr('attr');
            local_title = $(this).attr('attr2');
            
            try{
                local_title = decodeURIComponent(local_title);
            } catch(e) {
                
            }
            while (local_title.indexOf('<') + 1) {
                local_title = local_title.replace('<',"&lt;");
            }
            while (local_title.indexOf('>') + 1) {
                local_title = local_title.replace('>',"&gt;");
            }
            while (local_title.indexOf('"') + 1) {
                local_title = local_title.replace('"',"&quot;");
            }
            
            url = local_url;
            try{
                url = decodeURIComponent(url);
            } catch(e) {
                
            }
            while (url.indexOf('<') + 1) {
                url = url.replace('<',"&lt;");
            }
            while (url.indexOf('>') + 1) {
                url = url.replace('>',"&gt;");
            }
            while (url.indexOf('"') + 1) {
                url = url.replace('"',"&quot;");
            }
            
            $(this).parent().addClass('forHide')
            
            str = '<img style="float: left; padding-right: 5px;" src="chrome://favicon/'+local_url+'" width="16px" height="16px"/><div class="recycledURL" style="overflow: hidden;"><a style="white-space: nowrap;" href="'+local_url+'">'+local_title+'</a><span style="white-space: nowrap; padding-left: 5px; color: gray;">'+url+'</span></div>';
            $("#recycledResult").prepend('<div style="padding-bottom: 10px;">'+str+'</div>');
        })
              
        $("#recycledButton").addClass('recycledButton');
        
        $('#recycledRun').fadeIn(500);
        $('#recycledClear').fadeIn(500);
    }
     
     
     
     
     /*Настройки*/
     $('#optionsButton').click(function() {
        chrome.tabs.create({ url: 'options.html', selected: true });
     })
     
     //Банер
     /*setTimeout(function() {
        if (!localStorage.getItem('baner1')) {
            var baner = $("#dialog").dialog( "option", "position", 'center' ).dialog("option", "title", 'Реклама').dialog("option", "width", 550).dialog("option", "height", 220).dialog("option", "maxWidth", 550).dialog("option", "maxHeight", 220).dialog("option", "minWidth", 550).dialog("option", "minHeight", 220);
            var banerstr = '<a hint="gif-master.ru" href="http://gif-master.ru" target="_blank"><img src="baner/baner1.gif" width="337" height="144" /><img src="baner/ico_128.png" width="128" height="128" style="vertical-align: top;margin-left: 20px;"></a>';
            baner.html(banerstr);
            baner.dialog( "open" ).dialog( "moveToTop" );
            //$("#dialog").dialog( "open" ).dialog( "moveToTop" );
            localStorage.setItem('baner1',true)
        }
     }, 1000)*/
    //******банер
});