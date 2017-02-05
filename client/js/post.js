// チェックボックスの操作がされるたびに、チェックされてるチェックボックスのvalueをpostする。画像も重ねたり消したりする。
$(function() {
    $("#form input").change(function() {
        $(".addedImage").remove()
        var images = new Array();
        $("[name='image[]']:checked").each(function() {
            images.push(this.value);
            $(".firstImage").after('<img class="absolute firstImage addedImage" src="images/layer/' + this.value + '.png"/>');
        });
        
        $.ajax({
            type: "POST",
            url: "/api/face",
            data: {
                "images": images.join(',')
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