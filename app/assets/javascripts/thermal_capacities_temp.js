
$(function() {

    $("#thermo3_kJ_field").on("keyup", function() {
	var kJ = parseFloat($(this).val());
	$("#thermo3_energy_field").val(kJ*1000);

    });

    $("#thermo3_temperature_field").on("keyup", function() {
	
	var time = $(this).val();
	if (time)
	    var delta = parseFloat(time)-15;
	else
	    delta = 0;

	$("#thermo3_delta_calculator").html(delta.toFixed(1));
	$("#thermo3_delta_field").val(delta);
    });


    var model=false, 
    prediction, initial_prediction, 
    linear_m, linear_b, 
    quadratic_k, quadratic_h, quadratic_b, 
    cubic_k, cubic_h, cubic_b, 
    measurable, 
    data_loaded, 
    user_data, plot_data,
    default_x, x_maximum, y_maximum, x_step, x_lower_bound, x_higher_bound;
    var intervalId =false;


    // creates initial parameters
    $(".data-gathering").on("click", "#thermo3_data-gathering_next", function() {
	 $(".data-gathering").slideUp();
	 $(".model-choice").slideDown();

	prediction = 600;
	linear_m = typeof linear_m === "undefined" ? 250 : linear_m;
	linear_b = typeof linear_b === "undefined" ? 0 : linear_b;
	quadratic_k = typeof quadratic_k === "undefined" ? 6 : quadratic_k;
	quadratic_h= typeof quadratic_h === "undefined" ? 0 : quadratic_h;
	quadratic_b = typeof quadratic_b === "undefined" ? 0 : quadratic_b;
	cubic_k = typeof cubic_k === "undefined" ? 2 : cubic_k;
	cubic_h = typeof cubic_h === "undefined" ? 0 : cubic_h;
	cubic_b = typeof cubic_b === "undefined" ? 0 : cubic_b; 
	measurable = 100; 
	data_loaded=false;
	default_x = 20;
	x_step = 5;
	x_lower_bound = 5;
	x_higher_bound = 50;
	x_maximum=default_x;
	$(".model_second_model_controls").remove();
	$(".model_first_model_controls").show();
	$(".model_function_controls").hide();
	$(".model-choice_buttons_explanation").show();
	$(".model_choice_model_information_div").hide();
	loadsPlot(plot_normal);

	$(".model_linear_m").html(linear_m);
	$(".model_quadratic_k").html(quadratic_k);
	$(".model_cubic_k").html(cubic_k);
	
    
    // slider limits
	var b = 10000, b_step = 50;
 
    $("#thermo3_linear_m_slider").slider({value: linear_m, min: 0, max: 1200, step: 20});
    $("#thermo3_linear_b_slider").slider({value: linear_b, min: -b, max:b, step: b_step});
    $("#thermo3_quadratic_k_slider").slider({value: quadratic_k, min: 0, max: 120, step: 0.1});
    $("#thermo3_quadratic_h_slider").slider({value: quadratic_h, min: 0, max: default_x, step: default_x/100});
    $("#thermo3_quadratic_b_slider").slider({value: quadratic_b, min: -b, max: b, step: b_step});
    $("#thermo3_cubic_k_slider").slider({value: cubic_k, min: 0, max: 30, step: 0.1});
    $("#thermo3_cubic_h_slider").slider({value: cubic_h, min: 0, max: default_x, step: default_x/100});
    $("#thermo3_cubic_b_slider").slider({value: cubic_b, min: -b, max: b, step: b_step});


    });



    var animatePlot = function() {
	 
	 if (model === 1) {
	     x_maximum *= 1.2;
	     y_maximum *= 1.2;
	     
	     plot_linear(x_maximum, y_maximum);
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
	 if (x_maximum > measurable/9*10 && y_maximum > prediction/9*10) {
	     clearInterval(intervalId);
	     intervalId = false;
	     x_maximum = default_x;
	     y_maximum = setYMax();
	     
	     $(".model_choice_buttons").append("<div class='model_second_model_controls'><p>O modelo escolhido prevê uma massa de "+scientific(prediction,1)+"kg para a estátua de "+measurable+"m.</p><p><a href='#' class='model_another_model_link'>Experimentar outro modelo</a> ou <a href='#' class='model_keep_model_link'>Continuar com este modelo</a></p></div>");
	     $(".model_first_model_controls").hide();

	     $(".model_another_model_link").on("click", function() {
		  $(".model_second_model_controls").remove();
		  $(".model_function_controls").hide();
		  $(".model_choice_model_information_div").hide();
		  $(".model_first_model_controls").show();
		  model = 1;
		  loadsPlot(plot_normal);
	     });

	     $(".model_keep_model_link").on("click", function() {
		  $(".model-choice").slideUp();
		  $(".questions").slideDown();

		  var m;
		 if (model === 1) {
		     if (linear_m)
			 m = "linear";
		     else 
			 m = "constante";
		 }
		 else if (model === 2) {
		     if (quadratic_k)
			 m = "quadrático";
		     else
			 m = "constante";
		 }
		 else if (model === 3) {
		     if (cubic_k)
			 m = "cúbico";
		     else
			 m = "constante";
		 }

		 var question1, question2,question3,question4;
		  question1 = "Escolheu o modelo <b>"+m+"</b>. Por que razão essa é uma boa escolha?";

		  if (initial_prediction != null && (initial_prediction/prediction > 1.2 || initial_prediction/prediction < 0.8))
		      question2 = "A sua previsão inicial para a massa da estátua foi "+initial_prediction+"kg enquanto que o modelo prevê "+prediction.toFixed(0)+"kg. Como justifica isto?";
		  else
		      question2 = "A previsão de "+scientific(prediction)+"kg parece-lhe razoável?";
		  

		  question3 = "Previsão inicial";
		  
		  question4 = "O que achou confuso ou difícil nesta atividade?";

		  $(".question_model_field").val(m);
		  $(".question_question1_label").html(question1);
		  $(".question_question1_field").val(question1);

		  
		  $(".question_question2_label").html(question2);
		  $(".question_question2_field").val(question2);

		  $(".question_question3_label").html("");
		  $(".question_question3_field").val(question3);
		  if (initial_prediction) {
		      $(".question_answer3_field").val(initial_prediction+" kg");
		  }
		  else {
		      $(".question_answer3_field").val("Não fez previsão");
		  }
		  $(".question_question4_label").html(question4);
		  $(".question_question4_field").val(question4);

		  
	     });
	     
	 }
    }

    
    // axis-scaler
    $(".x_axis_scaler").on("click", ".scale_minus", function() {
	
	if (default_x > x_lower_bound) {
	    default_x -= x_step;
	    x_maximum = default_x;

	    if (model === 1) 
		plot_linear();
	    else if (model === 2)
		plot_polynomial(getQuadraticData());
	    else if (model === 3)
		plot_polynomial(getCubicData());
	    else
		plot_normal();
	}
	
    });
    $(".x_axis_scaler").on("click", ".scale_plus", function() {
	if (default_x < x_higher_bound) {
	    default_x += x_step;
	    x_maximum = default_x;
 
	    if (model === 1) 
		plot_linear();
	    else if (model === 2)
		plot_polynomial(getQuadraticData());
	    else if (model === 3)
		plot_polynomial(getCubicData());
	    else
		plot_normal();
	}
    });


    
    

    
    // AUXILIARY FUNCTIONS

    // axis units
    var x_unit = $(".x_axis_unit").html();
    var y_unit = $(".y_axis_unit").html();
    

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
		      initial_prediction = json.initial_prediction;
		      
		      
		      var xmax = (typeof xmax) === "undefined" ? default_x : xmax;
		      var ymax = (typeof ymax) === "undefined" ? setYMax() : ymax;
		      
		      if (model === 1 || !model || f === plot_normal)
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
	     
	     if (model === 1 || !model || f === plot_normal) {
	
		 f(xmax, ymax);
	     }
	     else{
	
		 f(arg,xmax, ymax);
	     }
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
	 max_y *=1.1;

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
		     legend: { position: "se", backgroundOpacity: 0, container:".graph_legend_container"},
		     
		 });
	 $(".flot-x-axis").css({left: "10px"});
    }


    var plot_polynomial = function(data, xmax, ymax) {
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
                    data: data
		  },
		  
		  {
		      data: [[measurable,prediction]],
		      points: { show: true },
		  }
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
		     legend: { position: "se", backgroundOpacity: 0, container:".graph_legend_container"},
		 });
	 $(".flot-x-axis").css({left: "10px"});
    }


    var plot_normal = function(xmax, ymax) {
	
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
		     legend: { position: "se", backgroundOpacity: 0, container:".graph_legend_container"},
		 });
	 $(".flot-x-axis").css({left: "10px"});
    }


    var scientific = function(v,d) {
	 var d = typeof d == "undefined" ? 0 : d;

	 if (v < 1) return v.toFixed(1);
	 if (v < 20)
	     return v.toFixed(1);
	 if (v < 10000)
	     return v.toFixed(0);
	 var e = 0, tmp = v;
	 while (tmp >= 10) {
	     tmp /= 10;
	     e += 1;
	 }
	 return (v/Math.pow(10,e)).toFixed(d)+" x 10<sup>"+e+"</sup>";
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



    

});