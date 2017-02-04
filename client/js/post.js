// チェックボックスの操作がされるたびに、チェックされてるチェックボックスのvalueをpostする
$(function() {
    $("#form input").change(function() {
        var images = new Array();
        $("[name='image[]']:checked").each(function() {
            images.push(this.value);
        });

        $.ajax({
            type: "POST",
            url: "/api/face",
            data: {
                "images":images
            },
            success: function(data){
                if(data != '') {
                    alert(data);
                }
            }
        });
        return false;
    });
});