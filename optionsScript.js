$(document).ready(function() {
    options.onLoadPage();
    
    setInterval(function() {
        options.updateButton()
    }, 200)
    
    
});

function getLocalesFile() {
    options.getLocalesFile($('#selectLng :selected').val());
}

function saveDateType() {
    options.saveDateType($('#selectDateType :selected').val());
}