$(function() {
    $(".filter_section").on("mouseenter", ".filter_choice_item", function() {
	if (!$(this).hasClass("filter_inactive")) 
	    $(this).addClass("highlighted");
    });

    $(".filter_section").on("mouseleave", ".filter_choice_item", function() {
	$(this).removeClass("highlighted");
    });

    $(".filter_section").on("click", ".filter_choice_item", function() {
	var id = $(this).data("url");
	if (!$(this).hasClass("filter_inactive")) 
	    $("#"+id)[0].click();
	
    });
});