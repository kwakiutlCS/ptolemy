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
});
