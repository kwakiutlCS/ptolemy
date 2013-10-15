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
	var desc = $(this);
	var number = desc.data("number");
	mouse_over_template_img = number;
	var img1 = desc.children(".template_image_index"); 
	img1.hide( "slide", { direction: "up" }, 800, function() {
	    if (mouse_over_template_img != number) {
		img1.mouseleave();
	    }
	});
    });
    $("#template_index").on("mouseleave",".template_image_description_index", function() {
	var number = $(this).data("number");
	if (mouse_over_template_img === number)
	    mouse_over_template_img = false;
	var img2 = $(this).children(".template_image_index"); 
	img2.show( "slide", { direction: "up" }, 800, function() {
	    if (mouse_over_template_img == number) {
		img2.mouseenter();
	    }
	});
    });

    $("#template_index").on("mouseenter", ".template_cell_index", function() {
	$(this).addClass("template_cell_highlight_index");
    });
    $("#template_index").on("mouseleave", ".template_cell_index", function() {
	$(this).removeClass("template_cell_highlight_index");
    });

    $("#template_index").on("click", ".template_cell_index", function() {
	$.get("templates/"+$(this).data("url"));
    });

    $("#template_specific_navbar").on("click", "a", function() {
	$("#template_general_navbar").show();
	$("#template_specific_navbar").hide();

    });
    
});
