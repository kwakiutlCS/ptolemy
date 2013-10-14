$(function() {
    
    $("#ptolemy_dashboard").on("click", ".ptolemy_dashboard_cell", function() {
	 $(this).children(".ptolemy_student_dashboard_body").toggle();
    });

    $(".fancybox").fancybox({
	 'hideOnOverlayClick': false
    });

    $("#fancydiv").on("click", "#fancy_close", function(e) {
	 e.preventDefault();
	 $.fancybox.close();
	 
    });


    $("#fancy_trigger").on("click", function() {
	 $(this).remove();
    });


    $(".datepicker").datepicker({format:"dd-mm-yyyy", language:"pt-BR"});


    var mouse_over_template_img = false;
    $("#template_index").on("mouseenter",".template_image_description_index", function() {
	mouse_over_template_img = true;
	var img1 = $(this).children(".template_image_index"); 
	img1.hide( "slide", { direction: "up" }, 1000, function() {
	    if (!mouse_over_template_img) {
		img1.mouseleave();
	    }
	});
    });
    $("#template_index").on("mouseleave",".template_image_description_index", function() {
	mouse_over_template_img = false;
	var img2 = $(this).children(".template_image_index"); 
	img2.show( "slide", { direction: "up" }, 1000, function() {
	    if (mouse_over_template_img) {
		img2.mouseenter();
	    }
	});
    });
});
