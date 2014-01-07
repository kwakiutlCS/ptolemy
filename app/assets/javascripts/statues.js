$(function() {

    //SPECIFIC CODE
    


    $("#statue_size_slider").slider({value: 25, min: 10, max: 50, step: 0.1});

    // creates initial parameters
    $(".data-gathering").on("click", "#statue_data-gathering_next", function() {
	chart_vars.data_loaded = false;
	$(".data-gathering").slideUp();
	$(".model-choice").slideDown();
	
	chart_vars.linear_m = !chart_vars.linear_m  ? 4 : chart_vars.linear_m;
	chart_vars.linear_b = !chart_vars.linear_b  ? 0 : chart_vars.linear_b;
	chart_vars.quadratic_k = !chart_vars.quadratic_k ? 6 : chart_vars.quadratic_k;
	chart_vars.quadratic_h= !chart_vars.quadratic_h  ? 0 : chart_vars.quadratic_h;
	chart_vars.quadratic_b = !chart_vars.quadratic_b ? 0 : chart_vars.quadratic_b;
	chart_vars.cubic_k = !chart_vars.cubic_k ? 2 : chart_vars.cubic_k;
	chart_vars.cubic_h = !chart_vars.cubic_h ? 0 : chart_vars.cubic_h;
	chart_vars.cubic_b = !chart_vars.cubic_b ? 0 : chart_vars.cubic_b; 
	chart_vars.measurable = 2.5; 
	chart_vars.default_x = 0.60;
	chart_vars.x_maximum=chart_vars.default_x;
	$(".model_second_model_controls").remove();
	$(".model_first_model_controls").show();
	$(".model_function_controls").hide();
	$(".model-choice_buttons_explanation").show();
	$(".model_choice_model_information_div").hide();
	chart_vars.loadsPlot(chart_vars.plot_normal);
    

	$(".model_linear_m").html(chart_vars.linear_m);
	$(".model_linear_b").html(chart_vars.linear_b);
	$(".model_quadratic_k").html(chart_vars.quadratic_k);
	$(".model_quadratic_h").html(chart_vars.quadratic_h);
	$(".model_quadratic_b").html(chart_vars.quadratic_b);
	$(".model_cubic_k").html(chart_vars.cubic_k);
	$(".model_cubic_h").html(chart_vars.cubic_h);
	$(".model_cubic_b").html(chart_vars.cubic_b);
	

    
	// slider limits
	$("#statue_linear_m_slider").slider({value: chart_vars.linear_m, min: 0, max: 50, step: 0.10});
	$("#statue_linear_b_slider").slider({value: chart_vars.linear_b, min: -10, max:10, step: 0.05});
	$("#statue_quadratic_k_slider").slider({value: chart_vars.quadratic_k, min: 0, max: 100, step: 0.1});
	$("#statue_quadratic_h_slider").slider({value: chart_vars.quadratic_h, min: 0, max: chart_vars.default_x, step: chart_vars.default_x/100});
	$("#statue_quadratic_b_slider").slider({value: chart_vars.quadratic_b, min: -10, max: 10, step: 0.05});
	$("#statue_cubic_k_slider").slider({value: chart_vars.cubic_k, min: 0, max: 300, step: 1});
	$("#statue_cubic_h_slider").slider({value: chart_vars.cubic_h, min: 0, max: chart_vars.default_x, step: chart_vars.default_x/100});
	$("#statue_cubic_b_slider").slider({value: chart_vars.cubic_b, min: -10, max: 10, step: 0.05});




	chart_vars.animatePlot = function() {
	 
	    if (chart_vars.model === 1) {
		if (chart_vars.animation_phase === 1)
		    chart_vars.x_maximum *= 1.05;
		else
		    chart_vars.y_maximum *= 1.05;
		
		chart_vars.plot_linear(chart_vars.x_maximum, chart_vars.y_maximum);
	    }
	    else if (chart_vars.model === 2) {
		if (chart_vars.animation_phase === 1)
		    chart_vars.x_maximum *= 1.05;
		else
		    chart_vars.y_maximum *= Math.pow(1.05,2);
		var quadratic_data = chart_vars.getQuadraticData();
		chart_vars.plot_polynomial(quadratic_data, chart_vars.x_maximum, chart_vars.y_maximum);
	    }
	    else if (chart_vars.model === 3) {
		if (chart_vars.animation_phase === 1)
		    chart_vars.x_maximum *= 1.05;
		else
		    chart_vars.y_maximum *= Math.pow(1.05,3);
		var cubic_data = chart_vars.getCubicData();
		chart_vars.plot_polynomial(cubic_data, chart_vars.x_maximum, chart_vars.y_maximum);
	    }
 	    
	    if (chart_vars.animation_phase === 1 && chart_vars.x_maximum > chart_vars.measurable/9*10) {
		chart_vars.animation_phase = 2;
	    }
	    else if (chart_vars.animation_phase === 2 && chart_vars.y_maximum > chart_vars.prediction/9*10) {
		clearInterval(chart_vars.intervalId);
		chart_vars.intervalId = false;
		chart_vars.animation_phase = false;
		$(".model_slider_controls").slider({disabled:false});
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
		    var param_k, param_h, param_b;
		    
		    if (chart_vars.model === 1) {
			if (chart_vars.linear_m)
			    m = "linear";
			else 
			 m = "constante";
			param_k = chart_vars.linear_m;
			param_b = chart_vars.linear_b;
			param_h = 0;
		    }
		    else if (chart_vars.model === 2) {
			if (chart_vars.quadratic_k)
			    m = "quadrático";
			else
			    m = "constante";
			param_k = chart_vars.quadratic_k;
			param_b = chart_vars.quadratic_b;
			param_h = chart_vars.quadratic_h;
		    }
		    else if (chart_vars.model === 3) {
			if (chart_vars.cubic_k)
			 m = "cúbico";
			else
			    m = "constante";
			param_k = chart_vars.cubic_k;
			param_b = chart_vars.cubic_b;
			param_h = chart_vars.cubic_h;
		    }
		    
		    var question1, question2,question3,question4;
		  question1 = "Escolheu o modelo <b>"+m+"</b>. Por que razão essa é uma boa escolha?";

		  if (chart_vars.initial_prediction != null && (chart_vars.initial_prediction/chart_vars.prediction > 1.2 || chart_vars.initial_prediction/chart_vars.prediction < 0.8))
		      question2 = "A sua previsão inicial para a massa da estátua foi "+chart_vars.initial_prediction+"kg enquanto que o modelo prevê "+chart_vars.prediction.toFixed(0)+"kg. Como justifica isto?";
		  else
		      question2 = "A previsão de "+chart_vars.scientific(chart_vars.prediction)+"kg parece-lhe razoável?";
		  

		  question3 = "Previsão inicial";
		  
		  question4 = "O que achou confuso ou difícil nesta atividade?";

		  $(".question_model_field").val(chart_vars.model);
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

		    $(".question_param_k").val(param_k);
		    $(".question_param_h").val(param_h);
		    $(".question_param_b").val(param_b);
		    
		    
	     });
	     
	 }
	}





    });



    
    
});