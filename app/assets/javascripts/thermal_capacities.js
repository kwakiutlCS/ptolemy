$(function(){

    $("body").tooltip({ show: { delay: 0 } });
    
    var bath_volume = 240;
    var user_data;
    var plot_data;
    var linear_m = 10000;
    var linear_b = 0;
    var quadratic_h = 0;
    var quadratic_k = 15000;
    var quadratic_b = 0;
    var cubic_h = 0;
    var cubic_k = 20000;
    var cubic_b = 0;
    var max_y = 0;
    var data_loaded = false;
    var prediction = 350000;
    var x_maximum = 0.8;
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
	 $(".thermo_strategy").slideDown();
    });

    $("#thermo_strategy_previous").on("click",function() {
	 $(".background").slideDown();
	 $(".thermo_strategy").slideUp();
    });

    $("#thermo_strategy_next").on("click",function() {
	 $(".data-gathering").slideDown();
	 $(".thermo_strategy").slideUp();
    });

    $("#thermo_data-gathering_previous").on("click",function() {
	 $(".data-gathering").slideUp();
	 $(".thermo_strategy").slideDown();
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

    $("#thermo_questions_previous").on("click", function() {
	 $(".questions").slideUp();
	 $(".model-choice").slideDown();
    });

    $(".thermo_slider_controls").slider({ min: -10000, max: 10000, step: 500});
    $("#thermo_linear_m_slider").slider({value: 10000, min: 0, max: 100000, step: 500});
    $("#thermo_quadratic_k_slider").slider({value: 15000, min: 0, max: 200000, step: 1000});
    $("#thermo_quadratic_h_slider").slider({value: 0, min: 0, max: 0.8, step: 0.01});
    $("#thermo_quadratic_b_slider").slider({value: 0, min: -20000, max: 20000});
    $("#thermo_cubic_k_slider").slider({value: 20000, min: 0, max: 200000, step: 1000});
    $("#thermo_cubic_h_slider").slider({value: 0, min: 0, max: 0.8, step: 0.01});
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
	 $("#thermo_quadratic_k").html(ui.value);
        
    });

    $("#thermo_quadratic_b_slider").on("slide", function(evt, ui) {
	 $("#thermo_quadratic_b").html(ui.value);
        
    });
    
    $("#thermo_cubic_h_slider").on("slide", function(evt, ui) {
	 $("#thermo_cubic_h").html(ui.value);
        
    });
    $("#thermo_cubic_k_slider").on("slide", function(evt, ui) {
	 $("#thermo_cubic_k").html(ui.value);
        
    });

    $("#thermo_cubic_b_slider").on("slide", function(evt, ui) {
	 $("#thermo_cubic_b").html(ui.value);
        
    });


    $("#thermo_linear_button").on("click", function() {
	 $("#thermo_buttons_explanation").hide();
	 model = 1;

	 $(".thermo_function_controls").hide();
	 $("#thermo_linear_controls").show();
	 $("#thermo_chosen_model_div").show();
	 
	 if (linear_m) {
	     if (linear_b > 0)
		  $("#thermo_chosen_model").html("E = "+linear_m+" m + "+linear_b);
	     else if (linear_b < 0)
		  $("#thermo_chosen_model").html("E = "+linear_m+" m - "+(-1*linear_b));
	     else
		  $("#thermo_chosen_model").html("E = "+linear_m+" m");
	 }
	 else 
	     $("#thermo_chosen_model").html("E = "+linear_b);

	
	 prediction = linear_b + bath_volume*linear_m;
	 
	 loadsPlot(plot_linear);
	 $("#thermo_confirm_model_button_div").show();
    });

    $("#thermo_quadratic_button").on("click", function() {
	 $("#thermo_buttons_explanation").hide();
	 model = 2;

	 $(".thermo_function_controls").hide();
	 $("#thermo_quadratic_controls").show();
	 $("#thermo_chosen_model_div").show();
	 
	 if (quadratic_b > 0) {
	     if (quadratic_h) {
		  if (quadratic_k) {
		      $("#thermo_chosen_model").html("E = "+quadratic_k+" (m-"+quadratic_h+")<sup>3</sup> + "+quadratic_b);
		  }
		  else 
		      $("#thermo_chosen_model").html("E = "+quadratic_b);
	     }
	     else {
		  if (quadratic_k) {
		      $("#thermo_chosen_model").html("E = "+quadratic_k+" m<sup>3</sup> + "+quadratic_b);
		  }
		  else 
		      $("#thermo_chosen_model").html("E = "+quadratic_b);
	     }
	 }
	 else if (quadratic_b < 0) {
	     if (quadratic_h) {
		  if (quadratic_k) {
		      $("#thermo_chosen_model").html("E = "+quadratic_k+" (m-"+quadratic_h+")<sup>3</sup> - "+quadratic_b*-1);
		  }
		  else 
		      $("#thermo_chosen_model").html("E = "+quadratic_b);
	     }
	     else {
		  if (quadratic_k) {
		      $("#thermo_chosen_model").html("E = "+quadratic_k+" m<sup>3</sup> - "+quadratic_b*-1);
		  }
		  else 
		      $("#thermo_chosen_model").html("E = "+quadratic_b);
	     }
	 }
	 else {
	     if (quadratic_h) {
		  if (quadratic_k) {
		      $("#thermo_chosen_model").html("E = "+quadratic_k+" (m-"+quadratic_h+")<sup>3</sup>");
		  }
		  else 
		      $("#thermo_chosen_model").html("E = 0");
	     }
	     else {
		  if (quadratic_k) {
		      $("#thermo_chosen_model").html("E = "+quadratic_k+" m<sup>3</sup>");
		  }
		  else 
		      $("#thermo_chosen_model").html("E = 0");
	     }
	 }
	 

	 var quadratic_data = getQuadraticData();
	 
	 prediction = quadratic_b + quadratic_k*Math.pow(bath_volume-quadratic_h,2);

	 loadsPlot(plot_polynomial, quadratic_data);
	 $("#thermo_confirm_model_button_div").show();
    });



    $("#thermo_cubic_button").on("click", function() {
	 $("#thermo_buttons_explanation").hide();
	 model = 3;

	 $(".thermo_function_controls").hide();
	 $("#thermo_cubic_controls").show();
	 $("#thermo_chosen_model_div").show();
	 if (cubic_b > 0) {
	     if (cubic_h) {
		  if (cubic_k) {
		      $("#thermo_chosen_model").html("E = "+cubic_k+" (m-"+cubic_h+")<sup>3</sup> + "+cubic_b);
		  }
		  else 
		      $("#thermo_chosen_model").html("E = "+cubic_b);
	     }
	     else {
		  if (cubic_k) {
		      $("#thermo_chosen_model").html("E = "+cubic_k+" m<sup>3</sup> + "+cubic_b);
		  }
		  else 
		      $("#thermo_chosen_model").html("E = "+cubic_b);
	     }
	 }
	 else if (cubic_b < 0) {
	     if (cubic_h) {
		  if (cubic_k) {
		      $("#thermo_chosen_model").html("E = "+cubic_k+" (m-"+cubic_h+")<sup>3</sup> - "+cubic_b*-1);
		  }
		  else 
		      $("#thermo_chosen_model").html("E = "+cubic_b);
	     }
	     else {
		  if (cubic_k) {
		      $("#thermo_chosen_model").html("E = "+cubic_k+" m<sup>3</sup> - "+cubic_b*-1);
		  }
		  else 
		      $("#thermo_chosen_model").html("E = "+cubic_b);
	     }
	 }
	 else {
	     if (cubic_h) {
		  if (cubic_k) {
		      $("#thermo_chosen_model").html("E = "+cubic_k+" (m-"+cubic_h+")<sup>3</sup>");
		  }
		  else 
		      $("#thermo_chosen_model").html("E = 0");
	     }
	     else {
		  if (cubic_k) {
		      $("#thermo_chosen_model").html("E = "+cubic_k+" m<sup>3</sup>");
		  }
		  else 
		      $("#thermo_chosen_model").html("E = 0");
	     }
	 }

	 var cubic_data = getCubicData();

	 prediction = cubic_b + cubic_k*Math.pow(bath_volume-cubic_h,3);

	 loadsPlot(plot_polynomial, cubic_data);
	 $("#thermo_confirm_model_button_div").show();
	 
    });


    $("#thermo_confirm_model_button").on("click", function() {
	 y_maximum = setYMax();
	 intervalId = setInterval(animatePlot,30);
	 
    });

    

    $("#thermo_linear_m_slider").on("slide", function(evt, ui) {
	 linear_m = ui.value;
	 prediction = linear_b + bath_volume*linear_m;
	 
	 plot_linear();
		  
	 write_linear_formula();

	 
	 
    });

    $("#thermo_linear_b_slider").on("slide", function(evt, ui) {
	 linear_b = ui.value;
	 prediction = linear_b + bath_volume*linear_m;
	 
	 plot_linear();
	 	  
	 write_linear_formula();
	 
	 
    });

    $("#thermo_quadratic_h_slider").on("slide", function(evt, ui) {
	 quadratic_h = ui.value;

	 var quadratic_data = getQuadraticData();
	 prediction = quadratic_b + quadratic_k*Math.pow(bath_volume-quadratic_h,2);

	 plot_polynomial(quadratic_data);
		  
	 write_quadratic_formula(); 
	 
    });

    $("#thermo_quadratic_k_slider").on("slide", function(evt, ui) {
	 quadratic_k = ui.value;

	 var quadratic_data = getQuadraticData();
	 prediction = quadratic_b + quadratic_k*Math.pow(bath_volume-quadratic_h,2);

	 plot_polynomial(quadratic_data);
		  
	 write_quadratic_formula(); 
	 
    });

    $("#thermo_quadratic_b_slider").on("slide", function(evt, ui) {
	 quadratic_b = ui.value;

	 var quadratic_data = getQuadraticData();
	 prediction = quadratic_b + quadratic_k*Math.pow(bath_volume-quadratic_h,2);

	 plot_polynomial(quadratic_data);
		  
	 write_quadratic_formula(); 
	 $("#thermo_confirm_model_button_div").show();
    });


    $("#thermo_cubic_h_slider").on("slide", function(evt, ui) {
	 cubic_h = ui.value;

	 var cubic_data = getCubicData();
	 prediction = cubic_b + cubic_k*Math.pow(bath_volume-cubic_h,3);

	 plot_polynomial(cubic_data);
		  
	 write_cubic_formula(); 	
	 
    });

    $("#thermo_cubic_k_slider").on("slide", function(evt, ui) {
	 cubic_k = ui.value;

	 var cubic_data = getCubicData();
        prediction = cubic_b + cubic_k*Math.pow(bath_volume-cubic_h,3);

	 plot_polynomial(cubic_data);
		  
	 write_cubic_formula(); 	 
	 $("#thermo_confirm_model_button_div").show();
    });

    $("#thermo_cubic_b_slider").on("slide", function(evt, ui) {
	 cubic_b = ui.value;

	 var cubic_data = getCubicData();
	 prediction = cubic_b + cubic_k*Math.pow(bath_volume-cubic_h,3);

	 plot_polynomial(cubic_data);
		  
	 write_cubic_formula(); 	 
	 
    });




    var plot_linear = function(xmax, ymax) {
	 var xmax = (typeof xmax) == "undefined" ? 0.8 : xmax;
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
                    data: [[-bath_volume,linear_b-(prediction-linear_b)],[bath_volume, prediction], [bath_volume*2,prediction+linear_m*bath_volume]],
		          
		  },
		  {
		      data: [[bath_volume,prediction]],
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

    var plot_polynomial = function(data, xmax, ymax) {
	 var xmax = (typeof xmax) == "undefined" ? 0.8 : xmax;
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
		      data: [[bath_volume,prediction]],
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
		     legend: { position: "se", backgroundOpacity: 0},
		 });
	 $(".flot-x-axis").css({left: "10px"});
    }


    var plot_normal = function(xmax, ymax) {
	 var xmax = (typeof xmax) == "undefined" ? 0.8 : xmax;
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
		     legend: { position: "se"},
		 });
	 $(".flot-x-axis").css({left: "10px"});
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
		      
		      var xmax = (typeof xmax) === "undefined" ? 0.8 : xmax;
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
	     var xmax = (typeof xmax) === "undefined" ? 0.8 : xmax;
	     var ymax = (typeof ymax) === "undefined" ? setYMax() : ymax;
	     
	     if (model === 1)
		  f(xmax, ymax);
	     else 
		  f(arg,xmax, ymax);
	 }
    }

    var write_linear_formula = function() {
	 if (linear_b > 0) {
	     if (linear_m)
		  $("#thermo_chosen_model").html("E = "+linear_m+" m + "+linear_b);
	     else
		  $("#thermo_chosen_model").html("E = "+linear_b);
	 }
	 else if (linear_b < 0) {
	     if (linear_m)
		  $("#thermo_chosen_model").html("E = "+linear_m+" m - "+linear_b*-1);
	     else
		  $("#thermo_chosen_model").html("E = "+linear_b);
	 }
	 else {
	     if (linear_m)
		  $("#thermo_chosen_model").html("E = "+linear_m+" m");
	     else
		  $("#thermo_chosen_model").html("E = 0");
	 }
    }

    var write_quadratic_formula = function() {
	 if (quadratic_b > 0) {
	     if (quadratic_h) {
		  if (quadratic_k) {
		      $("#thermo_chosen_model").html("E = "+quadratic_k+" (m-"+quadratic_h+")<sup>2</sup> + "+quadratic_b);
		  }
		  else {
		      $("#thermo_chosen_model").html("E = "+quadratic_b);
		  }
	     }
	     else {
		  if (quadratic_k) {
		      $("#thermo_chosen_model").html("E = "+quadratic_k+" m<sup>2</sup> +"+quadratic_b);
		  }
		  else {
		      $("#thermo_chosen_model").html("E = "+quadratic_b);
		  }
	     }
	 }
	 else if (quadratic_b < 0) {
	     if (quadratic_h) {
		  if (quadratic_k) {
		      $("#thermo_chosen_model").html("E = "+quadratic_k+" (m-"+quadratic_h+")<sup>2</sup> - "+-1*quadratic_b);
		  }
		  else {
		      $("#thermo_chosen_model").html("E = "+quadratic_b);
		  }
	     }
	     else {
		  if (quadratic_k) {
		      $("#thermo_chosen_model").html("E = "+quadratic_k+" m<sup>2</sup> - "+-1*quadratic_b);
		  }
		  else {
		      $("#thermo_chosen_model").html("E = "+quadratic_b);
		  }
	     }
	 }
	 else {
	     if (quadratic_h) {
		  if (quadratic_k) {
		      $("#thermo_chosen_model").html("E = "+quadratic_k+" (m-"+quadratic_h+")<sup>2</sup>");
		  }
		  else {
		      $("#thermo_chosen_model").html("E = 0");
		  }
	     }
	     else {
		  if (quadratic_k) {
		      $("#thermo_chosen_model").html("E = "+quadratic_k+" m<sup>2</sup>");
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
		      $("#thermo_chosen_model").html("E = "+cubic_k+" (m-"+cubic_h+")<sup>3</sup> + "+cubic_b);
		  }
		  else {
		      $("#thermo_chosen_model").html("E = "+cubic_b);
		  }
	     }
	     else {
		  if (cubic_k) {
		      $("#thermo_chosen_model").html("E = "+cubic_k+" m<sup>3</sup> +"+cubic_b);
		  }
		  else {
		      $("#thermo_chosen_model").html("E = "+cubic_b);
		  }
	     }
	 }
	 else if (cubic_b < 0) {
	     if (cubic_h) {
		  if (cubic_k) {
		      $("#thermo_chosen_model").html("E = "+cubic_k+" (m-"+cubic_h+")<sup>3</sup> - "+-1*cubic_b);
		  }
		  else {
		      $("#thermo_chosen_model").html("E = "+cubic_b);
		  }
	     }
	     else {
		  if (cubic_k) {
		      $("#thermo_chosen_model").html("E = "+cubic_k+" m<sup>3</sup> - "+-1*cubic_b);
		  }
		  else {
		      $("#thermo_chosen_model").html("E = "+cubic_b);
		  }
	     }
	 }
	 else {
	     if (cubic_h) {
		  if (cubic_k) {
		      $("#thermo_chosen_model").html("E = "+cubic_k+" (m-"+cubic_h+")<sup>3</sup>");
		  }
		  else {
		      $("#thermo_chosen_model").html("E = 0");
		  }
	     }
	     else {
		  if (cubic_k) {
		      $("#thermo_chosen_model").html("E = "+cubic_k+" m<sup>3</sup>");
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
	 if (x_maximum > bath_volume/9*10 && y_maximum > prediction/9*10) {
	     clearInterval(intervalId);
	     x_maximum = 0.8;
	     y_maximum = setYMax();

	     $(".thermo_model_buttons").append("<div id='thermo_second_model_controls'><p>O modelo escolhido prevê um gasto de energia de "+scientific(prediction,1)+"J para aquecer "+scientific(bath_volume,1)+"kg de água.</p><p> Provavelmente não tem noção se este é um valor exagerado ou realista, dado que o joule não é uma unidade que se usa frequentemente. </p><p>Se pensarmos que o custo de 3.6x10<sup>6</sup>J na fatura de eletricidade é cerca de 0.1€, o modelo escolhido prevê um custo monetário de "+(prediction/3600000*0.1).toFixed(2)+"€.</p><p><a href='#' id='thermo_another_model_link'>Experimentar outro modelo</a> ou <a href='#' id='thermo_keep_model_link'>Continuar com este modelo</a></p></div>");
	     $("#thermo_first_model_controls").hide();

	     $("#thermo_another_model_link").on("click", function() {
		  $("#thermo_second_model_controls").remove();
		  $(".thermo_function_controls").hide();
		  $("#thermo_chosen_model_div").hide();
		  $("#thermo_confirm_model_button_div").hide();
		  $("#thermo_first_model_controls").show();
		  model = 1;
		  loadsPlot(plot_normal);
	     });

	     $("#thermo_keep_model_link").on("click", function() {
		  $(".model-choice").slideUp();
		  $(".questions").slideDown();


		  if (model === 1) {
		      $("#thermo_model_field").val("linear");
		      $("#thermo_question1_label").html("Escolheu o modelo <b>linear</b>. Por que razão essa é uma boa escolha?");
		      $("#thermo_question1_field").val("Escolheu o modelo <b>linear</b>. Por que razão essa é uma boa escolha?");
		      
		  }
		  else if (model === 2) {
		      $("#thermo_model_field").val("quadrático");
		      $("#thermo_question1_label").html("Escolheu o modelo <b>quadrático</b>. Por que razão essa é uma boa escolha?");
		      $("#thermo_question1_field").val("Escolheu o modelo <b>quadrático</b>. Por que razão essa é uma boa escolha?");
		      
		  }
		  else if (model === 3) {
		      $("#thermo_model_field").val("cúbico");
		      $("#thermo_question1_label").html("Escolheu o modelo <b>cúbico</b>. Por que razão essa é uma boa escolha?");
		      $("#thermo_question1_field").val("Escolheu o modelo <b>cúbico</b>. Por que razão essa é uma boa escolha?");
		      
		  }
		  $("#thermo_question2_label").html("A previsão de "+scientific(prediction)+"J, que corresponde a um custo de "+(prediction/3600000*0.1).toFixed(2)+"€, parece-lhe razoável?");
		  $("#thermo_question2_field").val("A previsão de "+scientific(prediction)+"J, que corresponde a um custo de "+(prediction/3600000*0.1).toFixed(2)+"€, parece-lhe razoável?");

		  $("#thermo_question3_label").html("Há algum factor que não foi considerado que afete esta previsão? Qual? Esse fator implicará um acréscimo ou decréscimo de energia gasta para aquecer a água?");
		  $("#thermo_question3_field").val("Há algum factor que não foi considerado que afete esta previsão? Qual? Esse fator implicará um acréscimo ou decréscimo de energia gasta para aquecer a água?");
		  $("#thermo_question4_label").html("O que achou confuso ou difícil nesta atividade?");
		  $("#thermo_question4_field").val("O que achou confuso ou difícil nesta atividade?");

		  
	     });
	     
	 }
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