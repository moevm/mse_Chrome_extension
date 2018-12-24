

$( document ).ready(function() {




    chrome.storage.sync.get(['key'], function(result) {

        if (result.key === "off")
        {
            $('#UsePopup').prop('checked', false);
        }
        else
        {
            $('#UsePopup').prop('checked', true);
        }
    });
    $(".switch").on("click",function(){
        if ($("#UsePopup").prop('checked') === true)
        {
            value = "on";
        }
        else
        {
            value = "off";
        }
        chrome.storage.sync.set({'key': value}, function() {
            console.log('Value is set to ' + value);
        });
    });
});
