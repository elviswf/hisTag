$(document).ready(function () {

    $('.ckbox label').on('click', function () {
      $(this).parents('tr').toggleClass('selected');
    });

    $("#goToIndexPage").click(function(){
    	location.href = 'index.html';
    })

    $('.btn-filter').on('click', function () {
      var $target = $(this).data('target');
      if ($target != 'all') {
        $('.table tr').css('display', 'none');
        $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
      } else {
        $('.table tr').css('display', 'none').fadeIn('slow');
      }
    });

    $( "#myInput" ).keyup(function() {
      mySearch();
    });

    $('.tags').click(function() {
        tagSearch(this);
    })
    loadHistory();
    onStarClick();
    fillInput();
 });

function fillInput(){
  var searchTag = sessionStorage.getItem("searchTag");
  input = document.getElementById("myInput");
  input.value = searchTag;
  mySearch();
};

function onStarClick(){
  $('.star').click(function () {
    $(this).toggleClass('star-checked');
  });
}
function getHistoryItemHTML(dataItem){
  var template = '<div class="media"><div class="media-body"><span class="media-meta pull-right">/%dateTime%/</span><h4 class="title"><a href="/%historyUrl%/" title="">/%historyTitle%/</a></h4><p class="summary">';
  var html = template.replace("/%dateTime%/", getUserFriendDate(new Date(dataItem.dates))).replace("/%historyUrl%/", dataItem.url).replace("/%historyTitle%/", dataItem.title);
  var tagLen = dataItem.tags.length;
  for(var i = 0; i<tagLen; ++i){
    var tag = dataItem.tags[i];
    var buttonTemp = '<button type="button" class="btn btn-primary btn-xs tags">/%tagName%/</button>';
    var buttonHTML = buttonTemp.replace("/%tagName%/", tag);
    html += buttonHTML;
  }
  html += '</p></div></div>';
  return html;
};

function getUserFriendDate(date){
   var options = {  
    weekday: "long", year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"  
  };
  return date.toLocaleDateString("en-US", options);
};

function loadJsonFile(){
  $.getJSON("model/history.json", function (historyData){
    sessionStorage.setItem("historyData", JSON.stringify(historyData.data));
  });
};

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


function get_by_tag(tag){
  result = [];
  var dataString = sessionStorage.getItem("historyData");
  var historyData = JSON.parse(dataString);
  for(var i = 0; i< historyData.length; ++i){
    var item = historyData[i];
    var tags = item.tags;
    if(tags){
      var found = false;
      for(var j =0; j< tags.length; ++j){
        if(tags[j] == tag){
          found = true;
          break;
        }
      } 
      if(found){
        result.push(item);
      }
    }
  }
  console.log(result);
  return result;
};

function get_by_date(beginDate, endDate){
  result = [];
  var dataString = sessionStorage.getItem("historyData");
  var historyData = JSON.parse(dataString);
  for(var i = 0; i< historyData.length; ++i){
    var item = historyData[i];
    var date  = item.dates;
    if(date <= endDate && date >= beginDate){
      result.push(item);
    }
  }
  console.log(result);
  return result;
}

function loadHistory() {
   // Insert data into html to show the history and tag
   // data is a dictory which contains data.url, data.urlId, data.tags, data.dates
   
  loadJsonFile();// Load from history.json
  for(var i = 0 ;i <40; ++i){
      var dataItem = get_by_url_id(i)[0];
      var table = document.getElementById('historyTable');
      var row = table.insertRow(0);
      var cell1 = row.insertCell(0);
      var template = '<div class="ckbox"><input type="checkbox" id="checkbox/%itemId%/"></input><label for="checkbox/%itemId%/"></label></div>'
      cell1.innerHTML = template.replace("/%itemId%/", dataItem.urlid).replace("/%itemId%/", dataItem.urlid);
      var cell2 = row.insertCell(1);
      cell2.innerHTML = '<a href="javascript:;" class="star"><i class="glyphicon glyphicon-star"></i></a>';
      var cell3 = row.insertCell(2);
      cell3.innerHTML = getHistoryItemHTML(dataItem);
  }
  $('.tags').click(function() {
      tagSearch(this);
  })
  onStarClick();
};

function mySearch(){
  // only support search by tag name
  var table = document.getElementById('historyTable');
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  tr = table.getElementsByTagName("tr");
  for(var i = 0; i< tr.length; ++i){
    buttons = tr[i].getElementsByTagName("button");
    if(buttons){
      var found = false;
      for(var j = 0; j< buttons.length; ++j){
        var tag = buttons[j];
        if(tag.innerHTML.toUpperCase().indexOf(filter) > -1){
          found = true;
          break;
        }
      }
      
      if(found){
        tr[i].style.display = "";
      }
      else{
        tr[i].style.display = "none";
      }
    }
    else{
      //no tag
      tr[i].style.display = "none";
    }
  }
};

function tagSearch(btu){
    var table = document.getElementById('historyTable');
    input = btu.innerHTML;
    filter = input.toUpperCase();
    tr = table.getElementsByTagName("tr");
    for(var i = 0; i< tr.length; ++i){
        buttons = tr[i].getElementsByTagName("button");
        if(buttons){
            var found = false;
            for(var j = 0; j< buttons.length; ++j){
                var tag = buttons[j];
                if(tag.innerHTML.toUpperCase().indexOf(filter) > -1){
                    found = true;
                    break;
                }
                console.log(tag.value);
            }

            if(found){
                tr[i].style.display = "";
            }
            else{
                tr[i].style.display = "none";
            }
        }
        else{
            //no tag
            tr[i].style.display = "none";
        }
    }
}