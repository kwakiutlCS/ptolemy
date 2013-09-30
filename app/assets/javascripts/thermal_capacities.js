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
    var prediction = 350000000;
    var x_maximum = 800;
    var y_maximum = 30000;
    var intervalId;
    var model;



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
	 
	 model = 1;

	 $(".thermo_function_controls").hide();
	 $("#thermo_linear_controls").show();
	 $("#thermo_chosen_model_div").show();
	 $("#thermo_chosen_model").html("E = 10 V");

	
	 prediction = linear_b + 90000000*linear_m;
	 loadsPlot(plot_linear, prediction);
	 
    });

    $("#thermo_quadratic_button").on("click", function() {
	 model = 2;

	 $(".thermo_function_controls").hide();
	 $("#thermo_quadratic_controls").show();
	 $("#thermo_chosen_model_div").show();
	 $("#thermo_chosen_model").html("E = 0.250 V<sup>2</sup>");

	 var quadratic_data = getQuadraticData();
	 
	 prediction = quadratic_b + quadratic_k*Math.pow(90000000-quadratic_h,2);

	 loadsPlot(plot_polynomial, quadratic_data);
	 
    });



    $("#thermo_cubic_button").on("click", function() {
	 model = 3;

	 $(".thermo_function_controls").hide();
	 $("#thermo_cubic_controls").show();
	 $("#thermo_chosen_model_div").show();
	 $("#thermo_chosen_model").html("E = 0.00100 V<sup>3</sup>");

	 var cubic_data = getCubicData();

	 prediction = cubic_b + cubic_k*Math.pow(90000000-cubic_h,3);

	 loadsPlot(plot_polynomial, cubic_data);

	 
    });


    $("#thermo_confirm_model_button").on("click", function() {
	 intervalId = setInterval(animatePlot,30);
	 
    });


    $("#thermo_linear_m_slider").on("slide", function(evt, ui) {
	 linear_m = ui.value;
	 prediction = linear_b + 90000000*linear_m;
	 
	 plot_linear(prediction);
		  
	 write_linear_formula();

	 $("#thermo_confirm_model_button_div").show();
	 
    });

    $("#thermo_linear_b_slider").on("slide", function(evt, ui) {
	 linear_b = ui.value;
	 prediction = linear_b + 90000000*linear_m;
	 
	 plot_linear(prediction);
	 	  
	 write_linear_formula();
	 
	 $("#thermo_confirm_model_button_div").show();
    });

    $("#thermo_quadratic_h_slider").on("slide", function(evt, ui) {
	 quadratic_h = ui.value;

	 var quadratic_data = getQuadraticData();
	 prediction = quadratic_b + quadratic_k*Math.pow(90000000-quadratic_h,2);

	 plot_polynomial(quadratic_data);
		  
	 write_quadratic_formula(); 
	 $("#thermo_confirm_model_button_div").show();
    });

    $("#thermo_quadratic_k_slider").on("slide", function(evt, ui) {
	 quadratic_k = ui.value;

	 var quadratic_data = getQuadraticData();
	 prediction = quadratic_b + quadratic_k*Math.pow(90000000-quadratic_h,2);

	 plot_polynomial(quadratic_data);
		  
	 write_quadratic_formula(); 
	 $("#thermo_confirm_model_button_div").show();
    });

    $("#thermo_quadratic_b_slider").on("slide", function(evt, ui) {
	 quadratic_b = ui.value;

	 var quadratic_data = getQuadraticData();
	 prediction = quadratic_b + quadratic_k*Math.pow(90000000-quadratic_h,2);

	 plot_polynomial(quadratic_data);
		  
	 write_quadratic_formula(); 
	 $("#thermo_confirm_model_button_div").show();
    });


    $("#thermo_cubic_h_slider").on("slide", function(evt, ui) {
	 cubic_h = ui.value;

	 var cubic_data = getCubicData();
	 prediction = cubic_b + cubic_k*Math.pow(90000000-cubic_h,3);

	 plot_polynomial(cubic_data);
		  
	 write_cubic_formula(); 	
	 $("#thermo_confirm_model_button_div").show();
    });

    $("#thermo_cubic_k_slider").on("slide", function(evt, ui) {
	 cubic_k = ui.value;

	 var cubic_data = getCubicData();
        prediction = cubic_b + cubic_k*Math.pow(90000000-cubic_h,3);

	 plot_polynomial(cubic_data);
		  
	 write_cubic_formula(); 	 
	 $("#thermo_confirm_model_button_div").show();
    });

    $("#thermo_cubic_b_slider").on("slide", function(evt, ui) {
	 cubic_b = ui.value;

	 var cubic_data = getCubicData();
	 prediction = cubic_b + cubic_k*Math.pow(90000000-cubic_h,3);

	 plot_polynomial(cubic_data);
		  
	 write_cubic_formula(); 	 
	 $("#thermo_confirm_model_button_div").show();
    });




    var plot_linear = function(y, xmax, ymax) {
	 var xmax = (typeof xmax) == "undefined" ? 800 : xmax;
	 var ymax = (typeof ymax) == "undefined" ? setYMax() : ymax;
	 
	 
	 $.plot($("#thermo_graph"), [{
		      data: plot_data,
		      points: { show: true },
		      label: "dados dos seus colegas"
     
		  },
		  {
		      data: user_data,
		      points: { show: true },
		      label: "os seus dados"
     
		  },
	         {
                    data: [[-90000000,linear_b-(y-linear_b)],[90000000,y], [180000000,y+linear_m*90000000]],
		          
		  },
		  {
		      data: [[90000000,y]],
		      points: { show: true },
		      
     
		  },
					], 
		 {
		     xaxis: { min:0, max: xmax},
		     yaxis: { min:0, max: ymax, 
			     tickFormatter: function (v) {
				  if (v === 0)
				      return "0";
				  var e = 0, tmp = v;
				  while (tmp >= 10) {
				      tmp /= 10;
				      e += 1;
				  }
				  return (v/Math.pow(10,e)).toFixed(1)+" x 10<sup>"+e+"</sup>";
			     }},
		     
		 });
	 $(".flot-x-axis").css({left: "50px"});
    }

    var plot_polynomial = function(data, xmax, ymax) {
	 var xmax = (typeof xmax) == "undefined" ? 800 : xmax;
	 var ymax = (typeof ymax) == "undefined" ? setYMax() : ymax;
	 
	 $.plot($("#thermo_graph"), [{
		      data: plot_data,
		      points: { show: true },
		      label: "dados dos seus colegas"
     
		  },
		  {
		      data: user_data,
		      points: { show: true },
		      label: "os seus dados"
     
		  },
	         {
                    data: data
		  },
		  
		  {
		      data: [[90000000,prediction]],
		      points: { show: true },
		  }
					], 
		 {
		     xaxis: { min:0, max: xmax},
		     yaxis: { min:0, max: ymax, 
			     tickFormatter: function (v) {
				  if (v === 0)
				      return "0";
				  var e = 0, tmp = v;
				  while (tmp > 10) {
				      tmp /= 10;
				      e += 1;
				  }
				  return (v/Math.pow(10,e)).toFixed(1)+" x 10<sup>"+e+"</sup>";
			     }}
		 });
	 $(".flot-x-axis").css({left: "50px"});
    }


    var getQuadraticData = function() {
	 var step = x_maximum/30;
	 var x = 0;
	 var quadratic_data = [];

	 while (x < x_maximum) {
	     var y = quadratic_k *(x-quadratic_h) * (x-quadratic_h) + quadratic_b;
	     quadratic_data.push([x, y]);
	     x += step;
	     
	 }
	 return quadratic_data;
    }

    var getCubicData = function() {
	 var step = x_maximum/40;
	 var x = 0;
	 var cubic_data = [];

	 while (x < x_maximum) {
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

    var loadsPlot = function(f, arg, xmax, ymax) {
	 
	 if (!data_loaded) {
	     $.ajax("data_points/updateGraph", {
		  method: "get",
		  success: function(json) {      
		      user_data = json.user_data;
		      plot_data = json.plot_data;
		      var xmax = (typeof xmax) == "undefined" ? 800 : xmax;
		      var ymax = (typeof ymax) == "undefined" ? setYMax() : ymax;
	 
		      f(arg, xmax, ymax);

		  }
	     });
	     data_loaded = true;
	 }
	 else {
	     f(arg, xmax, ymax);
	 }
    }

    var write_linear_formula = function() {
	 if (linear_b > 0) {
	     if (linear_m)
		  $("#thermo_chosen_model").html("E = "+linear_m+" V + "+linear_b);
	     else
		  $("#thermo_chosen_model").html("E = "+linear_b);
	 }
	 else if (linear_b < 0) {
	     if (linear_m)
		  $("#thermo_chosen_model").html("E = "+linear_m+" V - "+linear_b*-1);
	     else
		  $("#thermo_chosen_model").html("E = "+linear_b);
	 }
	 else {
	     if (linear_m)
		  $("#thermo_chosen_model").html("E = "+linear_m+" V");
	     else
		  $("#thermo_chosen_model").html("E = 0");
	 }
    }

    var write_quadratic_formula = function() {
	 if (quadratic_b > 0) {
	     if (quadratic_h) {
		  if (quadratic_k) {
		      $("#thermo_chosen_model").html("E = "+quadratic_k+" (V-"+quadratic_h+")<sup>2</sup> + "+quadratic_b);
		  }
		  else {
		      $("#thermo_chosen_model").html("E = "+quadratic_b);
		  }
	     }
	     else {
		  if (quadratic_k) {
		      $("#thermo_chosen_model").html("E = "+quadratic_k+" V<sup>2</sup> +"+quadratic_b);
		  }
		  else {
		      $("#thermo_chosen_model").html("E = "+quadratic_b);
		  }
	     }
	 }
	 else if (quadratic_b < 0) {
	     if (quadratic_h) {
		  if (quadratic_k) {
		      $("#thermo_chosen_model").html("E = "+quadratic_k+" (V-"+quadratic_h+")<sup>2</sup> - "+-1*quadratic_b);
		  }
		  else {
		      $("#thermo_chosen_model").html("E = "+quadratic_b);
		  }
	     }
	     else {
		  if (quadratic_k) {
		      $("#thermo_chosen_model").html("E = "+quadratic_k+" V<sup>2</sup> - "+-1*quadratic_b);
		  }
		  else {
		      $("#thermo_chosen_model").html("E = "+quadratic_b);
		  }
	     }
	 }
	 else {
	     if (quadratic_h) {
		  if (quadratic_k) {
		      $("#thermo_chosen_model").html("E = "+quadratic_k+" (V-"+quadratic_h+")<sup>2</sup>");
		  }
		  else {
		      $("#thermo_chosen_model").html("E = 0");
		  }
	     }
	     else {
		  if (quadratic_k) {
		      $("#thermo_chosen_model").html("E = "+quadratic_k+" V<sup>2</sup>");
		  }
		  else {
		      $("#thermo_chosen_model").html("E = 0");
		  }
	     }
	 }
    }

    var write_cubic_formula = function() {
	 if (cubic_b > 0) {
	     if (cubic_h) {
		  if (cubic_k) {
		      $("#thermo_chosen_model").html("E = "+cubic_k+" (V-"+cubic_h+")<sup>3</sup> + "+cubic_b);
		  }
		  else {
		      $("#thermo_chosen_model").html("E = "+cubic_b);
		  }
	     }
	     else {
		  if (cubic_k) {
		      $("#thermo_chosen_model").html("E = "+cubic_k+" V<sup>3</sup> +"+cubic_b);
		  }
		  else {
		      $("#thermo_chosen_model").html("E = "+cubic_b);
		  }
	     }
	 }
	 else if (cubic_b < 0) {
	     if (cubic_h) {
		  if (cubic_k) {
		      $("#thermo_chosen_model").html("E = "+cubic_k+" (V-"+cubic_h+")<sup>3</sup> - "+-1*cubic_b);
		  }
		  else {
		      $("#thermo_chosen_model").html("E = "+cubic_b);
		  }
	     }
	     else {
		  if (cubic_k) {
		      $("#thermo_chosen_model").html("E = "+cubic_k+" V<sup>3</sup> - "+-1*cubic_b);
		  }
		  else {
		      $("#thermo_chosen_model").html("E = "+cubic_b);
		  }
	     }
	 }
	 else {
	     if (cubic_h) {
		  if (cubic_k) {
		      $("#thermo_chosen_model").html("E = "+cubic_k+" (V-"+cubic_h+")<sup>3</sup>");
		  }
		  else {
		      $("#thermo_chosen_model").html("E = 0");
		  }
	     }
	     else {
		  if (cubic_k) {
		      $("#thermo_chosen_model").html("E = "+cubic_k+" V<sup>3</sup>");
		  }
		  else {
		      $("#thermo_chosen_model").html("E = 0");
		  }
	     }
	 }
    }

    var animatePlot = function() {
	 
	 
	 if (model === 1) {
	     x_maximum *= 1.2;
	     y_maximum *= 1.2;
	     plot_linear(prediction, x_maximum, y_maximum);
	 }
	 else if (model === 2) {
	     x_maximum *= 1.1;
	     y_maximum *= Math.pow(1.1,2);
	     var quadratic_data = getQuadraticData();
	     plot_polynomial(quadratic_data, x_maximum, y_maximum);
	 }
	 else if (model === 3) {
	     x_maximum *= 1.1;
	     y_maximum *= Math.pow(1.1,3);
	     var cubic_data = getCubicData();
	     plot_polynomial(cubic_data, x_maximum, y_maximum);
	 }
	 if (y_maximum > 1.2*prediction) {
	     clearInterval(intervalId);
	     x_maximum = 800;
	     y_maximum = setYMax();
	 }
    }

    
    

});