$(document).ready(function () {

	$('.star').on('click', function () {
      $(this).toggleClass('star-checked');
    });

    $('.ckbox label').on('click', function () {
      $(this).parents('tr').toggleClass('selected');
    });

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
    $( "#AddHistory" ).click(function() {
        loadHistory();
    });
    $('.tags').click(function() {
        tagSearch(this);
    })
 });
function getHistoryItemHTML(dataItem){
  var template = '<div class="media"><div class="media-body"><span class="media-meta pull-right">/%dateTime%/</span><h4 class="title">/%historyUrl%/</h4><p class="summary">';
  var html = template.replace("/%dateTime%/", dataItem.dates).replace("/%historyUrl%/", dataItem.url);
  
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
function loadHistory() {
   // Insert data into html to show the history and tag
   // data is a dictory which contains data.url, data.urlid, data.tags, data.dates
    //
    // var data = [];
   for(var i = 0 ;i <10; ++i){
      var dataItem = {};
      dataItem.url = 'test'+i;
      dataItem.dates = getUserFriendDate(new Date(Date.now()));
      dataItem.tags = ['tag'+i];
      var table = document.getElementById('historyTable');
      var row = table.insertRow(0);
      var cell1 = row.insertCell(0);
      cell1.innerHTML = '<div class="ckbox"><input type="checkbox" id="checkbox1"></input><label for="checkbox1"></label></div>';
      var cell2 = row.insertCell(1);
      cell2.innerHTML = '<a href="javascript:;" class="star"><i class="glyphicon glyphicon-star"></i></a>';
      var cell3 = row.insertCell(2);
      cell3.innerHTML = getHistoryItemHTML(dataItem);
   }
    $('.tags').click(function() {
        tagSearch(this);
    })
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