$(function() {

    //SPECIFIC CODE
    
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
    

    $("#volume_slider").slider({ min: 150, max: 750 });
    

    // creates initial parameters
    $(".data-gathering").on("click", "#thermo_data-gathering_next", function() {
	$(".data-gathering").slideUp();
	$(".model-choice").slideDown();
	
	chart_vars.linear_m = !chart_vars.linear_m  ? 10000 : chart_vars.linear_m;
	chart_vars.linear_b = !chart_vars.linear_b  ? 0 : chart_vars.linear_b;
	chart_vars.quadratic_k = !chart_vars.quadratic_k ? 15000 : chart_vars.quadratic_k;
	chart_vars.quadratic_h= !chart_vars.quadratic_h  ? 0 : chart_vars.quadratic_h;
	chart_vars.quadratic_b = !chart_vars.quadratic_b ? 0 : chart_vars.quadratic_b;
	chart_vars.cubic_k = !chart_vars.cubic_k ? 20000 : chart_vars.cubic_k;
	chart_vars.cubic_h = !chart_vars.cubic_h ? 0 : chart_vars.cubic_h;
	chart_vars.cubic_b = !chart_vars.cubic_b ? 0 : chart_vars.cubic_b; 
	chart_vars.measurable = 240; 
	chart_vars.default_x = 0.8;
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
	$("#thermo_slider_b_slider").slider({ min: -10000, max: 10000, step: 500});
	$("#thermo_linear_m_slider").slider({value: 10000, min: 0, max: 100000, step: 500});
	$("#thermo_quadratic_k_slider").slider({value: 15000, min: 0, max: 200000, step: 1000});
	$("#thermo_quadratic_h_slider").slider({value: 0, min: 0, max: 0.8, step: 0.01});
	$("#thermo_quadratic_b_slider").slider({value: 0, min: -20000, max: 20000});
	$("#thermo_cubic_k_slider").slider({value: 20000, min: 0, max: 200000, step: 1000});
	$("#thermo_cubic_h_slider").slider({value: 0, min: 0, max: 0.8, step: 0.01});
	$("#thermo_cubic_b_slider").slider({value: 0, min: -20000, max: 20000});
	




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
		chart_vars.x_maximum = chart_vars.default_x;
		chart_vars.y_maximum = chart_vars.setYMax();
	     
		$(".model_choice_buttons").append("<div class='model_second_model_controls'><p>O modelo escolhido prevê um gasto de energia de "+chart_vars.scientific(prediction,1)+"J para aquecer "+chart_vars.scientific(bath_volume,1)+"kg de água.</p><p> Provavelmente não tem noção se este é um valor exagerado ou realista, dado que o joule não é uma unidade que se usa frequentemente. </p><p>Se pensarmos que o custo de 3.6x10<sup>6</sup>J na fatura de eletricidade é cerca de 0.1€, o modelo escolhido prevê um custo monetário de "+(chart_vars.prediction/3600000*0.1).toFixed(2)+"€.</p><p><a href='#' class='model_another_model_link'>Experimentar outro modelo</a> ou <a href='#' class='model_keep_model_link'>Continuar com este modelo</a></p></div>");
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
			if (chart_vars.linear_m)
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
		    question1 = I18n.translate("modeling.choice1")+m+I18n.translate("modeling.choice1");

		  
		    question2 = "A previsão de "+chart_vars.scientific(chart_vars.prediction)+"J, que corresponde a um custo de "+(chart_vars.prediction/3600000*0.1).toFixed(2)+"€, parece-lhe razoável?";
		  

		    question3 = "Há algum factor que não foi considerado que afete esta previsão? Qual? Esse fator implicará um acréscimo ou decréscimo de energia gasta para aquecer a água?";
		  
		    question4 = I18n.translate("modeling.opinion");

		  $(".question_model_field").val(m);
		  $(".question_question1_label").html(question1);
		  $(".question_question1_field").val(question1);

		  
		  $(".question_question2_label").html(question2);
		  $(".question_question2_field").val(question2);

		  $(".question_question3_label").html(question3);
		  $(".question_question3_field").val(question3);
		  
		  $(".question_question4_label").html(question4);
		  $(".question_question4_field").val(question4);

		 
	     });
	     
	 }
	}





    });



    
    
});
