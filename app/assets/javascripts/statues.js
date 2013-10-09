$(function() {

    //SPECIFIC CODE
    var model, 
    prediction=60000, 
    linear_m = 120, linear_b = 0, 
    quadratic_k = 1, quadratic_h= 0, quadratic_b =0, 
    cubic_k = 1, cubic_h= 0, cubic_b =0, 
    measurable = 500, 
    data_loaded=false, 
    user_data, plot_data,
    default_x = 60;

    // slider limits
    $("#statue_linear_m_slider").slider({value: 100, min: 0, max: 1000, step: 10});
    $("#statue_linear_b_slider").slider({value: 0, min: -10000, max: 10000, step: 500});
    $("#statue_quadratic_k_slider").slider({value: 15000, min: 0, max: 200000, step: 1000});
    $("#statue_quadratic_h_slider").slider({value: 0, min: 0, max: 0.8, step: 0.01});
    $("#statue_quadratic_b_slider").slider({value: 0, min: -20000, max: 20000});
    $("#statue_cubic_k_slider").slider({value: 20000, min: 0, max: 200000, step: 1000});
    $("#statue_cubic_h_slider").slider({value: 0, min: 0, max: 0.8, step: 0.01});
    $("#statue_cubic_b_slider").slider({value: 0, min: -20000, max: 20000});



    // GENERAL CODE


    $(".model_data_form").on("click",".model_add_data_point_button", function() {
	 data_loaded = false;
    });
    $(".model_data_collection").on("click",".model_remove_data_point_button", function() {
	 data_loaded = false;
    });

    // axis units
    var x_unit = $(".x_axis_unit").html();
    var y_unit = $(".y_axis_unit").html();
    
    
    // navigation buttons
    $(".background").on("click", ".background_next", function() {
	 $(".background").slideUp();
	 $(".strategy").slideDown();
    });

    $(".strategy").on("click", ".strategy_previous", function() {
	 $(".strategy").slideUp();
	 $(".background").slideDown();
    });

    $(".strategy").on("click", ".strategy_next", function() {
	 $(".strategy").slideUp();
	 $(".data-gathering").slideDown();
    });

    $(".data-gathering").on("click", ".data-gathering_previous", function() {
	 $(".data-gathering").slideUp();
	 $(".strategy").slideDown();
    });

    $(".data-gathering").on("click", ".data-gathering_next", function() {
	 $(".data-gathering").slideUp();
	 $(".model-choice").slideDown();
    });


    $(".model-choice").on("click", ".model-choice_previous", function() {
	 $(".model-choice").slideUp();
	 $(".data-gathering").slideDown();
    });


    // slider action
    $(".model_linear_m_slider").on("slide", function(evt, ui) {
	 $(".model_linear_m").html(ui.value);
	 linear_m = ui.value;

	 prediction = linear_b + measurable*linear_m;
	 write_linear_formula();
	 plot_linear();
    });

    $(".model_linear_b_slider").on("slide", function(evt, ui) {
	 $(".model_linear_b").html(ui.value);
	 linear_b = ui.value;

	 prediction = linear_b + measurable*linear_m;
	 write_linear_formula();
	 plot_linear();
    });
    
    $(".model_quadratic_k_slider").on("slide", function(evt, ui) {
	 $(".model_quadratic_k").html(ui.value);
	 quadratic_k = ui.value;

	 prediction = quadratic_b + Math.pow(measurable-quadratic_h, 2)*quadratic_k;
	 write_quadratic_formula();
    });
    $(".model_quadratic_h_slider").on("slide", function(evt, ui) {
	 $(".model_quadratic_h").html(ui.value);
	 quadratic_h = ui.value;

	 prediction = quadratic_b + Math.pow(measurable-quadratic_h, 2)*quadratic_k;
	 write_quadratic_formula();
    });
    $(".model_quadratic_b_slider").on("slide", function(evt, ui) {
	 $(".model_quadratic_b").html(ui.value);
	 quadratic_b = ui.value;

	 prediction = quadratic_b + Math.pow(measurable-quadratic_h, 2)*quadratic_k;
	 write_quadratic_formula();
    });
    $(".model_cubic_k_slider").on("slide", function(evt, ui) {
	 $(".model_cubic_k").html(ui.value);
	 cubic_k = ui.value;

	 prediction = cubic_b + Math.pow(measurable-cubic_h, 3)*cubic_k;
	 write_cubic_formula();
    });
    $(".model_cubic_h_slider").on("slide", function(evt, ui) {
	 $(".model_cubic_h").html(ui.value);
	 cubic_h = ui.value;

	 prediction = cubic_b + Math.pow(measurable-cubic_h, 3)*cubic_k;
	 write_cubic_formula();
    });
    $(".model_cubic_b_slider").on("slide", function(evt, ui) {
	 $(".model_cubic_b").html(ui.value);
	 cubic_b = ui.value;

	 prediction = cubic_b + Math.pow(measurable-cubic_h, 3)*cubic_k;
	 write_cubic_formula();
    });



    // select model buttons
    $(".model_choice_buttons").on("click", ".linear_model_button", function() {
	 $(".model-choice_buttons_explanation").hide();
	 $(".model_function_controls").hide();
	 $(".linear_function_controls").show();
	 $(".model_choice_model_information_div").show();

	 model = 1;
	 
	 write_linear_formula();
	 loadsPlot(plot_linear);

    });

    $(".model_choice_buttons").on("click", ".quadratic_model_button", function() {
	 $(".model-choice_buttons_explanation").hide();
	 $(".model_function_controls").hide();
	 $(".quadratic_function_controls").show();
	 $(".model_choice_model_information_div").show();
	 model = 2;
	 
	 write_quadratic_formula();
    });

    $(".model_choice_buttons").on("click", ".cubic_model_button", function() {
	 $(".model-choice_buttons_explanation").hide();
	 $(".model_function_controls").hide();
	 $(".cubic_function_controls").show();
	 $(".model_choice_model_information_div").show();
	 model = 3;
	 
	 write_cubic_formula();
    });



    // AUXILIARY FUNCTIONS

    var write_linear_formula = function() {
	 if (linear_m) {
	     if (linear_b > 0)
		  $(".model_choice_model_formula").html(y_unit+" = "+linear_m+" "+x_unit +" + "+linear_b);
	     else if (linear_b < 0)
		  $(".model_choice_model_formula").html(y_unit+" = "+linear_m+" "+x_unit +" - "+linear_b*(-1));
	     else
		  $(".model_choice_model_formula").html(y_unit+" = "+linear_m+" "+x_unit);
	 }
	 else 
	     $(".model_choice_model_formula").html(y_unit+" = "+linear_b);

    }


    var write_quadratic_formula = function() {
	 if (quadratic_k) {
	     if (quadratic_h > 0) {
		  if (quadratic_b > 0) {
		      $(".model_choice_model_formula").html(y_unit+" = "+quadratic_k+" ("+x_unit+"-"+quadratic_h+")<sup>2</sup> + "+quadratic_b);
		  }
		  else if (quadratic_b < 0) {
		      $(".model_choice_model_formula").html(y_unit+" = "+quadratic_k+" ("+x_unit+"-"+quadratic_h+")<sup>2</sup> - "+quadratic_b*(-1));
		  }
		  else {
		      $(".model_choice_model_formula").html(y_unit+" = "+quadratic_k+" ("+x_unit+"-"+quadratic_h+")<sup>2</sup>");
		  }
	     }
	     else if (quadratic_h < 0) {
		  if (quadratic_b > 0) {
		      $(".model_choice_model_formula").html(y_unit+" = "+quadratic_k+" ("+x_unit+"+"+quadratic_h*(-1)+")<sup>2</sup> + "+quadratic_b);
		  }
		  else if (quadratic_b < 0) {
		      $(".model_choice_model_formula").html(y_unit+" = "+quadratic_k+" ("+x_unit+"+"+quadratic_h*(-1)+")<sup>2</sup> - "+quadratic_b*(-1));
		  }
		  else {
		      $(".model_choice_model_formula").html(y_unit+" = "+quadratic_k+" ("+x_unit+"+"+quadratic_h*(-1)+")<sup>2</sup>");
		  }
	     }
	     else {
		  if (quadratic_b > 0) {
		      $(".model_choice_model_formula").html(y_unit+" = "+quadratic_k+" "+x_unit+"<sup>2</sup> + "+quadratic_b);
		  }
		  else if (quadratic_b < 0) {
		      $(".model_choice_model_formula").html(y_unit+" = "+quadratic_k+" "+x_unit+"<sup>2</sup> - "+(-1)*quadratic_b);
		  }
		  else {
		      $(".model_choice_model_formula").html(y_unit+" = "+quadratic_k+" "+x_unit+"<sup>2</sup>");
		  }
	     }

	 }
	 else  {
	     if (quadratic_b) {
		  $(".model_choice_model_formula").html(y_unit+" = "+quadratic_b);
	     }
	     else {
		  $(".model_choice_model_formula").html(y_unit+" = 0");
	     }
	 }
    }


    var write_cubic_formula = function() {
	 if (cubic_k) {
	     if (cubic_h > 0) {
		  if (cubic_b > 0) {
		      $(".model_choice_model_formula").html(y_unit+" = "+cubic_k+" ("+x_unit+"-"+cubic_h+")<sup>3</sup> + "+cubic_b);
		  }
		  else if (cubic_b < 0) {
		      $(".model_choice_model_formula").html(y_unit+" = "+cubic_k+" ("+x_unit+"-"+cubic_h+")<sup>3</sup> - "+cubic_b*(-1));
		  }
		  else {
		      $(".model_choice_model_formula").html(y_unit+" = "+cubic_k+" ("+x_unit+"-"+cubic_h+")<sup>3</sup>");
		  }
	     }
	     else if (cubic_h < 0) {
		  if (cubic_b > 0) {
		      $(".model_choice_model_formula").html(y_unit+" = "+cubic_k+" ("+x_unit+"+"+cubic_h*(-1)+")<sup>3</sup> + "+cubic_b);
		  }
		  else if (cubic_b < 0) {
		      $(".model_choice_model_formula").html(y_unit+" = "+cubic_k+" ("+x_unit+"+"+cubic_h*(-1)+")<sup>3</sup> - "+cubic_b*(-1));
		  }
		  else {
		      $(".model_choice_model_formula").html(y_unit+" = "+cubic_k+" ("+x_unit+"+"+cubic_h*(-1)+")<sup>3</sup>");
		  }
	     }
	     else {
		  if (cubic_b > 0) {
		      $(".model_choice_model_formula").html(y_unit+" = "+cubic_k+" "+x_unit+"<sup>3</sup> + "+cubic_b);
		  }
		  else if (cubic_b < 0) {
		      $(".model_choice_model_formula").html(y_unit+" = "+cubic_k+" "+x_unit+"<sup>3</sup> - "+(-1)*cubic_b);
		  }
		  else {
		      $(".model_choice_model_formula").html(y_unit+" = "+cubic_k+" "+x_unit+"<sup>3</sup>");
		  }
	     }

	 }
	 else  {
	     if (cubic_b) {
		  $(".model_choice_model_formula").html(y_unit+" = "+cubic_b);
	     }
	     else {
		  $(".model_choice_model_formula").html(y_unit+" = 0");
	     }
	 }
    }


    var loadsPlot = function(f, arg, xmax, ymax) {
	 
	 if (!data_loaded) {
	     $.ajax("data_points/updateGraph", {
		  method: "get",
		  success: function(json) {      
		      user_data = json.user_data;
		      plot_data = json.plot_data;
		      
		      var xmax = (typeof xmax) === "undefined" ? default_x : xmax;
		      var ymax = (typeof ymax) === "undefined" ? setYMax() : ymax;
		      
		      if (model === 1)
			   f(xmax, ymax);
		      else 
			   f(arg,xmax, ymax);
		  }
	     });
	     data_loaded = true;
	 }
	 else {
	     var xmax = (typeof xmax) === "undefined" ? default_x : xmax;
	     var ymax = (typeof ymax) === "undefined" ? setYMax() : ymax;
	     
	     if (model === 1)
		  f(xmax, ymax);
	     else 
		  f(arg,xmax, ymax);
	 }
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



    var plot_linear = function(xmax, ymax) {
	 var xmax = (typeof xmax) == "undefined" ? default_x : xmax;
	 var ymax = (typeof ymax) == "undefined" ? setYMax() : ymax;
	 
	 
	 $.plot($(".graph_div"), [{
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
                    data: [[-measurable,linear_b-(prediction-linear_b)],[measurable, prediction], [measurable*2,prediction+linear_m*measurable]],
		          
		  },
		  {
		      data: [[measurable,prediction]],
		      points: { show: true },
		      
     
		  },
					], 
		 {
		     xaxis: { min:0, max: xmax,
			     tickFormatter: function (v) {
				  return scientific(v,1);
			     }},
		     yaxis: { min:0, max: ymax, 
			     tickFormatter: function (v) {
				  return scientific(v,1);
			     }},
		     legend: { position: "se", backgroundOpacity: 0},
		     
		 });
	 $(".flot-x-axis").css({left: "10px"});
    }

    var scientific = function(v,d) {
	 var d = typeof d == "undefined" ? 0 : d;

	 if (v < 1) return v.toFixed(1);
	 if (v < 10000)
	     return v;
	 var e = 0, tmp = v;
	 while (tmp >= 10) {
	     tmp /= 10;
	     e += 1;
	 }
	 return (v/Math.pow(10,e)).toFixed(d)+" x 10<sup>"+e+"</sup>";
    }
});