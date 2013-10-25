
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


    


    // creates initial parameters
    $(".data-gathering").on("click", "#thermo3_data-gathering_next", function() {
	 $(".data-gathering").slideUp();
	 $(".model-choice").slideDown();
	
	chart_vars.linear_m = typeof chart_vars.linear_m === "undefined" ? 250 : chart_vars.linear_m;
	chart_vars.linear_b = typeof chart_vars.linear_b === "undefined" ? 0 : chart_vars.linear_b;
	quadratic_k = typeof quadratic_k === "undefined" ? 6 : quadratic_k;
	quadratic_h= typeof quadratic_h === "undefined" ? 0 : quadratic_h;
	quadratic_b = typeof quadratic_b === "undefined" ? 0 : quadratic_b;
	chart_vars.cubic_k = typeof chart_vars.cubic_k === "undefined" ? 2 : chart_vars.cubic_k;
	chart_vars.cubic_h = typeof chart_vars.cubic_h === "undefined" ? 0 : chart_vars.cubic_h;
	chart_vars.cubic_b = typeof chart_vars.cubic_b === "undefined" ? 0 : chart_vars.cubic_b; 
	chart_vars.measurable = 100; 
	chart_vars.default_x = 20;
	chart_vars.x_maximum=chart_vars.default_x;
	chart_vars.x_step = 5;
	chart_vars.x_lower_bound = 5;
	chart_vars.x_higher_bound = 50;
	$(".model_second_model_controls").remove();
	$(".model_first_model_controls").show();
	$(".model_function_controls").hide();
	$(".model-choice_buttons_explanation").show();
	$(".model_choice_model_information_div").hide();
	chart_vars.loadsPlot(chart_vars.plot_normal);
/*
	$(".model_linear_m").html(linear_m);
	$(".model_quadratic_k").html(quadratic_k);
	$(".model_cubic_k").html(cubic_k);
*/	
    
    // slider limits
	var b = 10000, b_step = 50;
 
	$("#thermo3_linear_m_slider").slider({value: chart_vars.linear_m, min: 0, max: 1200, step: 20});
	$("#thermo3_linear_b_slider").slider({value: chart_vars.linear_b, min: -b, max:b, step: b_step});
	$("#thermo3_quadratic_k_slider").slider({value: chart_vars.quadratic_k, min: 0, max: 120, step: 0.1});
    $("#thermo3_quadratic_h_slider").slider({value: chart_vars.quadratic_h, min: 0, max: chart_vars.default_x, step: chart_vars.default_x/100});
    $("#thermo3_quadratic_b_slider").slider({value: chart_vars.quadratic_b, min: -b, max: b, step: b_step});
    $("#thermo3_cubic_k_slider").slider({value: chart_vars.cubic_k, min: 0, max: 30, step: 0.1});
    $("#thermo3_cubic_h_slider").slider({value: chart_vars.cubic_h, min: 0, max: chart_vars.default_x, step: chart_vars.default_x/100});
    $("#thermo3_cubic_b_slider").slider({value: chart_vars.cubic_b, min: -b, max: b, step: b_step});


    });


    chart_vars.animatePlot = function() {
	 
	 if (chart_vars.model === 1) {
	     chart_vars.x_maximum *= 1.2;
	     chart_vars.y_maximum *= 1.2;
	     
	     chart_vars.plot_linear(chart_vars.x_maximum, chart_vars.y_maximum);
	 }
	 else if (chart_vars.model === 2) {
	     chart_vars.x_maximum *= 1.1;
	     chart_vars.y_maximum *= Math.pow(1.1,2);
	     var quadratic_data = chart_vars.getQuadraticData();
	     chart_vars.plot_polynomial(quadratic_data, chart_vars.x_maximum, chart_vars.y_maximum);
	 }
	 else if (chart_vars.model === 3) {
	     chart_vars.x_maximum *= 1.1;
	     chart_vars.y_maximum *= Math.pow(1.1,3);
	     var cubic_data = chart_vars.getCubicData();
	     chart_vars.plot_polynomial(cubic_data, chart_vars.x_maximum, chart_vars.y_maximum);
	 }
	 if (chart_vars.x_maximum > chart_vars.measurable/9*10 && chart_vars.y_maximum > chart_vars.prediction/9*10) {
	     clearInterval(chart_vars.intervalId);
	     chart_vars.intervalId = false;
	     chart_vars.x_maximum = chart_vars.default_x;
	     chart_vars.y_maximum = chart_vars.setYMax();
	     
	     $(".model_choice_buttons").append("<div class='model_second_model_controls'><p>O modelo escolhido prevê uma massa de "+chart_vars.scientific(chart_vars.prediction,1)+"kg para a estátua de "+chart_vars.measurable+"m.</p><p><a href='#' class='model_another_model_link'>Experimentar outro modelo</a> ou <a href='#' class='model_keep_model_link'>Continuar com este modelo</a></p></div>");
	     $(".model_first_model_controls").hide();

	     $(".model_another_model_link").on("click", function() {
		  $(".model_second_model_controls").remove();
		  $(".model_function_controls").hide();
		  $(".model_choice_model_information_div").hide();
		  $(".model_first_model_controls").show();
		  chart_vars.model = 1;
		  chart_vars.loadsPlot(chart_vars.plot_normal);
	     });

	     $(".model_keep_model_link").on("click", function() {
		  $(".model-choice").slideUp();
		  $(".questions").slideDown();

		  var m;
		 if (chart_vars.model === 1) {
		     if (linear_k)
			 m = "linear";
		     else 
			 m = "constante";
		 }
		 else if (chart_vars.model === 2) {
		     if (chart_vars.quadratic_k)
			 m = "quadrático";
		     else
			 m = "constante";
		 }
		 else if (chart_vars.model === 3) {
		     if (chart_vars.cubic_k)
			 m = "cúbico";
		     else
			 m = "constante";
		 }

		 var question1, question2,question3,question4;
		  question1 = "Escolheu o modelo <b>"+m+"</b>. Por que razão essa é uma boa escolha?";

		  if (chart_vars.initial_prediction != null && (chart_vars.initial_prediction/chart_vars.prediction > 1.2 || chart_vars.initial_prediction/chart_vars.prediction < 0.8))
		      question2 = "A sua previsão inicial para a massa da estátua foi "+chart_vars.initial_prediction+"kg enquanto que o modelo prevê "+chart_vars.prediction.toFixed(0)+"kg. Como justifica isto?";
		  else
		      question2 = "A previsão de "+chart_vars.scientific(chart_vars.prediction)+"kg parece-lhe razoável?";
		  

		  question3 = "Previsão inicial";
		  
		  question4 = "O que achou confuso ou difícil nesta atividade?";

		  $(".question_model_field").val(m);
		  $(".question_question1_label").html(question1);
		  $(".question_question1_field").val(question1);

		  
		  $(".question_question2_label").html(question2);
		  $(".question_question2_field").val(question2);

		  $(".question_question3_label").html("");
		  $(".question_question3_field").val(question3);
		  if (chart_vars.initial_prediction) {
		      $(".question_answer3_field").val(chart_vars.initial_prediction+" kg");
		  }
		  else {
		      $(".question_answer3_field").val("Não fez previsão");
		  }
		  $(".question_question4_label").html(question4);
		  $(".question_question4_field").val(question4);

		  
	     });
	     
	 }
    }

});