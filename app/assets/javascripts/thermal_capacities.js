$(document).ready(function(){
    $("#volume_slider").slider({ min: 150, max: 750 });

    $("#thermo_time_field").on("keyup", function() {
	 if ($(this).val() == "") {
	     $("#thermo_energy_calculator").text("0.0");
	     $("#thermo_energy_field").val("");
	 }
	 else {
	     var t = parseFloat($(this).val());
	     if (t != NaN) {
		  $("#thermo_energy_calculator").text((Math.round(t*0.5*10)/10).toFixed(1));
		  $("#thermo_energy_field").val(t*500);
	     }
	 }
    });

    $("#thermo_background_next").on("click",function() {
	 $(".background").slideUp();
	 $(".strategy").slideDown();
    });

    $("#thermo_strategy_previous").on("click",function() {
	 $(".background").slideDown();
	 $(".strategy").slideUp();
    });

    $("#thermo_strategy_next").on("click",function() {
	 $(".data-gathering").slideDown();
	 $(".strategy").slideUp();
    });

    $("#thermo_data-gathering_previous").on("click",function() {
	 $(".data-gathering").slideUp();
	 $(".strategy").slideDown();
    });

    $("#thermo_data-gathering_next").on("click",function() {
	 $(".data-gathering").slideUp();
	 $(".model-choice").slideDown();
    });

   $("#thermo_model-choice_next").on("click",function() {
	 $(".model-choice").slideUp();
	 $(".strategy").slideDown();
    });

    $("#thermo_model-choice_previous").on("click",function() {
	 $(".data-gathering").slideDown();
	 $(".model-choice").slideUp();
    });

});