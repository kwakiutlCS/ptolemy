$(document).ready(function(){
    var user_data;
    var plot_data;
    var linear_m = 10;
    var linear_b = 0;

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


    $(".thermo_slider_controls").slider({ min: -10000, max: 10000});
    $("#thermo_linear_m_slider").slider({value: 10, min: -200, max: 200});
    $("#thermo_linear_m_slider").on("slide", function(evt, ui) {
	 $("#thermo_linear_m").html(ui.value);
        
    });
    $("#thermo_linear_b_slider").on("slide", function(evt, ui) {
	 $("#thermo_linear_b").html(ui.value);
        
    });


    $("#thermo_linear_button").on("click", function() {
	 
	 $(".thermo_function_controls").hide();
	 $("#thermo_linear_controls").show();
	 
	 $.ajax("data_points/updateGraph", {
	     method: "get",
	     success: function(json) {
		  
		  user_data = json.user_data;
		  plot_data = json.plot_data;
		  
		  $.plot($("#thermo_graph"), [{
		      data: plot_data,
		      points: { show: true },
		      label: "Dados obtidos pelos seus colegas"
     
		  },
		  {
		      data: user_data,
		      points: { show: true },
		      label: "Dados obtidos por si"
     
		  },
	         {
                    data: [[0,0],[800,8000]]}
						 ], {
						     xaxis: { min:0, max: 800},
						     yaxis: { min:0}
						 });
		  
		  $(".flot-x-axis").css({left: "50px"});
		  
		  
	     }
	   });
	 
    });

    $("#thermo_quadratic_button").on("click", function() {
	 $(".thermo_function_controls").hide();
	 $("#thermo_quadratic_controls").show();
    });
    $("#thermo_cubic_button").on("click", function() {
	 $(".thermo_function_controls").hide();
	 $("#thermo_cubic_controls").show();
    });


    $("#thermo_linear_m_slider").on("slide", function(evt, ui) {
	 linear_m = ui.value;
	 var y = linear_b + 800*ui.value;
	 
	 $.plot($("#thermo_graph"), [{
		      data: plot_data,
		      points: { show: true },
		      label: "Dados obtidos pelos seus colegas"
     
		  },
		  {
		      data: user_data,
		      points: { show: true },
		      label: "Dados obtidos por si"
     
		  },
	         {
                    data: [[0,linear_b],[800,y]]}
						 ], {
						     xaxis: { min:0, max: 800},
						     yaxis: { min:0, max: 35000}
						 });
		  
		  $(".flot-x-axis").css({left: "50px"});
	 
    });

    $("#thermo_linear_b_slider").on("slide", function(evt, ui) {
	 linear_b = ui.value;
	 var y = linear_b + 800*linear_m;
	 
	 $.plot($("#thermo_graph"), [{
		      data: plot_data,
		      points: { show: true },
		      label: "Dados obtidos pelos seus colegas"
     
		  },
		  {
		      data: user_data,
		      points: { show: true },
		      label: "Dados obtidos por si"
     
		  },
	         {
                    data: [[0,linear_b],[800,y]]}
						 ], {
						     xaxis: { min:0, max: 800},
						     yaxis: { min:0, max: 35000}
						 });
		  
		  $(".flot-x-axis").css({left: "50px"});
	 
    });
});