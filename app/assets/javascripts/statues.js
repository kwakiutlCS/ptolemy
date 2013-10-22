$(function() {

    //SPECIFIC CODE
    var model, 
    prediction, initial_prediction, 
    linear_m, linear_b, 
    quadratic_k, quadratic_h, quadratic_b, 
    cubic_k, cubic_h, cubic_b, 
    measurable, 
    data_loaded, 
    user_data, plot_data,
    default_x, x_maximum, y_maximum;
    var intervalId;

    $("#statue_size_slider").slider({value: 10, min: 10, max: 50, step: 0.1});

    // creates initial parameters
    $(".data-gathering").on("click", "#statue_data-gathering_next", function() {
	 $(".data-gathering").slideUp();
	 $(".model-choice").slideDown();

	model = false;
	prediction = 600;
	linear_m = 4;
	linear_b = 0;
	quadratic_k = 6;
	quadratic_h= 0;
	quadratic_b =0;
	cubic_k = 2;
	cubic_h= 0;
	cubic_b =0; 
	measurable = 2.5; 
	data_loaded=false;
	default_x = 0.60;
	x_maximum=default_x;
	loadsPlot(plot_normal);
    



    
    // slider limits
    $("#statue_linear_m_slider").slider({value: linear_m, min: 0, max: 50, step: 0.10});
    $("#statue_linear_b_slider").slider({value: linear_b, min: -10, max:10, step: 0.05});
    $("#statue_quadratic_k_slider").slider({value: quadratic_k, min: 0, max: 100, step: 0.1});
    $("#statue_quadratic_h_slider").slider({value: quadratic_h, min: 0, max: default_x, step: default_x/100});
    $("#statue_quadratic_b_slider").slider({value: quadratic_b, min: -10, max: 10, step: 0.05});
    $("#statue_cubic_k_slider").slider({value: cubic_k, min: 0, max: 300, step: 1});
    $("#statue_cubic_h_slider").slider({value: cubic_h, min: 0, max: default_x, step: default_x/100});
    $("#statue_cubic_b_slider").slider({value: cubic_b, min: -10, max: 10, step: 0.05});


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
		     if (linear_k)
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

    // GENERAL CODE
   
    $(".model_data_form").on("click",".model_add_data_point_button", function() {
	 data_loaded = false;
	  
    });
    $(".model_data_collection").on("click",".model_remove_data_point_button", function() {
	 data_loaded = false;
	 
    });

    
    
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

    

    $(".model-choice").on("click", ".model-choice_previous", function() {
	 $(".model-choice").slideUp();
	 $(".data-gathering").slideDown();
    });

    $(".questions").on("click", ".model_questions_previous", function() {
	 $(".questions").slideUp();
	 $(".model-choice").slideDown();
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
	 plot_polynomial(getQuadraticData());
    });
    $(".model_quadratic_h_slider").on("slide", function(evt, ui) {
	 $(".model_quadratic_h").html(ui.value);
	 quadratic_h = ui.value;

	 prediction = quadratic_b + Math.pow(measurable-quadratic_h, 2)*quadratic_k;
	 write_quadratic_formula();
	 plot_polynomial(getQuadraticData());
    });
    $(".model_quadratic_b_slider").on("slide", function(evt, ui) {
	 $(".model_quadratic_b").html(ui.value);
	 quadratic_b = ui.value;

	 prediction = quadratic_b + Math.pow(measurable-quadratic_h, 2)*quadratic_k;
	 write_quadratic_formula();
	 plot_polynomial(getQuadraticData());
    });
    $(".model_cubic_k_slider").on("slide", function(evt, ui) {
	 $(".model_cubic_k").html(ui.value);
	 cubic_k = ui.value;

	 prediction = cubic_b + Math.pow(measurable-cubic_h, 3)*cubic_k;
	 write_cubic_formula();
	 plot_polynomial(getCubicData());
    });
    $(".model_cubic_h_slider").on("slide", function(evt, ui) {
	 $(".model_cubic_h").html(ui.value);
	 cubic_h = ui.value;

	 prediction = cubic_b + Math.pow(measurable-cubic_h, 3)*cubic_k;
	 write_cubic_formula();
	 plot_polynomial(getCubicData());
    });
    $(".model_cubic_b_slider").on("slide", function(evt, ui) {
	 $(".model_cubic_b").html(ui.value);
	 cubic_b = ui.value;

	 prediction = cubic_b + Math.pow(measurable-cubic_h, 3)*cubic_k;
	 write_cubic_formula();
	 plot_polynomial(getCubicData());
    });



    // select model buttons
    $(".model_choice_buttons").on("click", ".linear_model_button", function() {
	 $(".model-choice_buttons_explanation").hide();
	 $(".model_function_controls").hide();
	 $(".linear_function_controls").show();
	 $(".model_choice_model_information_div").show();

	 model = 1;
	 prediction = linear_b + measurable*linear_m;
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
	 prediction = quadratic_b + Math.pow(measurable-quadratic_h, 2)*quadratic_k;
	 loadsPlot(plot_polynomial, getQuadraticData());
	 
    });

    $(".model_choice_buttons").on("click", ".cubic_model_button", function() {
	 $(".model-choice_buttons_explanation").hide();
	 $(".model_function_controls").hide();
	 $(".cubic_function_controls").show();
	 $(".model_choice_model_information_div").show();
	 model = 3;
	 
	 write_cubic_formula();
	 prediction = cubic_b + Math.pow(measurable-cubic_h, 3)*cubic_k;
	 loadsPlot(plot_polynomial, getCubicData());
    });


    $(".model_confirm_model_button").on("click", function() {
	 y_maximum = setYMax();
	 x_maximum = default_x;
	 
	 intervalId = window.setInterval(animatePlot,30);
	 
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
		      
		      if (model === 1 || !model)
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