$(document).ready(function(){
    var user_data;
    var plot_data;
    var linear_m = 10;
    var linear_b = 0;
    var quadratic_h = 0;
    var quadratic_k = 0.25;
    var quadratic_b = 0;
    var cubic_h = 0;
    var cubic_k = 0.001;
    var cubic_b = 0;
    var max_y = 0;
    var data_loaded = false;


    $("#thermo_add_data_point_button").on("click", function() {
	 data_loaded = false;
    });
    $("#thermo_data_collection").on("click",".thermo_remove_data_point_button", function() {
	 data_loaded = false;
    });

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
    $("#thermo_linear_m_slider").slider({value: 10, min: 0, max: 100});
    $("#thermo_quadratic_k_slider").slider({value: 1, min: 0, max: 0.25, step: 0.001});
    $("#thermo_quadratic_h_slider").slider({value: 0, min: 0, max: 800});
    $("#thermo_quadratic_b_slider").slider({value: 0, min: -20000, max: 20000});
    $("#thermo_cubic_k_slider").slider({value: 1, min: 0, max: 0.001, step: 0.00001});
    $("#thermo_cubic_h_slider").slider({value: 0, min: 0, max: 800});
    $("#thermo_cubic_b_slider").slider({value: 0, min: -20000, max: 20000});

    $("#thermo_linear_m_slider").on("slide", function(evt, ui) {
	 $("#thermo_linear_m").html(ui.value);
        
    });
    $("#thermo_linear_b_slider").on("slide", function(evt, ui) {
	 $("#thermo_linear_b").html(ui.value);
        
    });

    $("#thermo_quadratic_h_slider").on("slide", function(evt, ui) {
	 $("#thermo_quadratic_h").html(ui.value);
        
    });
    $("#thermo_quadratic_k_slider").on("slide", function(evt, ui) {
	 $("#thermo_quadratic_k").html(ui.value.toFixed(3));
        
    });

    $("#thermo_quadratic_b_slider").on("slide", function(evt, ui) {
	 $("#thermo_quadratic_b").html(ui.value);
        
    });
    
    $("#thermo_cubic_h_slider").on("slide", function(evt, ui) {
	 $("#thermo_cubic_h").html(ui.value);
        
    });
    $("#thermo_cubic_k_slider").on("slide", function(evt, ui) {
	 $("#thermo_cubic_k").html(ui.value.toFixed(5));
        
    });

    $("#thermo_cubic_b_slider").on("slide", function(evt, ui) {
	 $("#thermo_cubic_b").html(ui.value);
        
    });


    $("#thermo_linear_button").on("click", function() {
	 
	 $(".thermo_function_controls").hide();
	 $("#thermo_linear_controls").show();
	 
	 loadsPlot(plot_linear, 8000);
	 
    });

    $("#thermo_quadratic_button").on("click", function() {
	 $(".thermo_function_controls").hide();
	 $("#thermo_quadratic_controls").show();

	 var quadratic_data = getQuadraticData();

	 loadsPlot(plot_polynomial, quadratic_data);
	 
    });



    $("#thermo_cubic_button").on("click", function() {
	 $(".thermo_function_controls").hide();
	 $("#thermo_cubic_controls").show();

	 var cubic_data = getCubicData();

	 loadsPlot(plot_polynomial, cubic_data);

	 
    });


    $("#thermo_linear_m_slider").on("slide", function(evt, ui) {
	 linear_m = ui.value;
	 var y = linear_b + 800*ui.value;
	 
	 plot_linear(y);
		  
	 
	 
    });

    $("#thermo_linear_b_slider").on("slide", function(evt, ui) {
	 linear_b = ui.value;
	 var y = linear_b + 800*linear_m;
	 
	 plot_linear(y);
	 	  
	 
	 
    });

    $("#thermo_quadratic_h_slider").on("slide", function(evt, ui) {
	 quadratic_h = ui.value;

	 var quadratic_data = getQuadraticData();

	 plot_polynomial(quadratic_data);
		  
	 	 
    });

    $("#thermo_quadratic_k_slider").on("slide", function(evt, ui) {
	 quadratic_k = ui.value;

	 var quadratic_data = getQuadraticData();

	 plot_polynomial(quadratic_data);
		  
	 	 
    });

    $("#thermo_quadratic_b_slider").on("slide", function(evt, ui) {
	 quadratic_b = ui.value;

	 var quadratic_data = getQuadraticData();

	 plot_polynomial(quadratic_data);
		  
	 	 
    });


    $("#thermo_cubic_h_slider").on("slide", function(evt, ui) {
	 cubic_h = ui.value;

	 var cubic_data = getCubicData();

	 plot_polynomial(cubic_data);
		  
	 	 
    });

    $("#thermo_cubic_k_slider").on("slide", function(evt, ui) {
	 cubic_k = ui.value;

	 var cubic_data = getCubicData();

	 plot_polynomial(cubic_data);
		  
	 	 
    });

    $("#thermo_cubic_b_slider").on("slide", function(evt, ui) {
	 cubic_b = ui.value;

	 var cubic_data = getCubicData();

	 plot_polynomial(cubic_data);
		  
	 	 
    });




    var plot_linear = function(y) {
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
					], 
		 {
		     xaxis: { min:0, max: 800},
		     yaxis: { min:0, max: max_y}
		 });
	 $(".flot-x-axis").css({left: "50px"});
    }

    var plot_polynomial = function(data) {
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
                    data: data}
					], 
		 {
		     xaxis: { min:0, max: 800},
		     yaxis: { min:0, max: max_y}
		 });
	 $(".flot-x-axis").css({left: "50px"});
    }


    var getQuadraticData = function() {
	 var step = 20;
	 var x = 0;
	 var quadratic_data = [];

	 while (x < 800) {
	     var y = quadratic_k *(x-quadratic_h) * (x-quadratic_h) + quadratic_b;
	     quadratic_data.push([x, y]);
	     x += step;
	     
	 }
	 return quadratic_data;
    }

    var getCubicData = function() {
	 var step = 10;
	 var x = 0;
	 var cubic_data = [];

	 while (x < 800) {
	     var y = cubic_k *(x-cubic_h) * (x-cubic_h) * (x-cubic_h) + cubic_b;
	     cubic_data.push([x, y]);
	     x += step;
	     
	 }
	 return cubic_data;
    }

    var setYMax = function() {
	 var max_y = 0;

	 for (var i in plot_data) {
	     if (plot_data[i][1] > max_y)
		  max_y = plot_data[i][1];
	 }
	 for (var i in user_data) {
	     if (user_data[i][1] > max_y)
		  max_y = user_data[i][1];
	 }
	 max_y = parseInt(max_y/5000+1)*5000;

	 return max_y;
    }

    var loadsPlot = function(f, arg) {
	 if (!data_loaded) {
	     $.ajax("data_points/updateGraph", {
		  method: "get",
		  success: function(json) {
		  
		      user_data = json.user_data;
		      plot_data = json.plot_data;
		      
		      max_y = setYMax();		 
		      
		      f(arg);

		  }
	     });
	     data_loaded = true;
	 }
	 else {
	     f(arg);
	 }
    }
});