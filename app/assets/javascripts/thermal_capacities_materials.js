
$(function() {

    $("#thermo2_material").prop("disabled", "disabled");

    var water_model=0, aluminium_model=0, copper_model=0, iron_model=0, oil_model=0;
    var copper_data = false, water_data = false, aluminium_data = false, iron_data = false, oil_data = false;

    $("#thermo2_onoff").attr("disabled",true);
    $("#thermo2_add_data_point_button").attr("disabled",true);

    $("#thermo2_material").on("change", function() {
	var material = $(this).val();
	var translation = {"Água": "water", "Alumínio": "aluminium", "Cobre":"copper", "Ferro": "iron", "Óleo vegetal":"oil"};
	if (material == "") {
	    $("#thermo2_onoff").attr("disabled",true);
	    $("#thermo2_add_data_point_button").attr("disabled",true);
	    $('#thermo2_data_collection').html("");
	}
	else {
	    $("#thermo2_onoff").attr("disabled",false);
	    $("#thermo2_add_data_point_button").attr("disabled",false);
	    $("#thermo2_material_series").val(translation[material]);
	    $.get("data_points", {series:translation[material]});
	}
    });

    $("#thermo2_onoff").on("click", function() {
	if ($(this).html() === "Ligar")
	    $(this).html("Parar");
	else
	    $(this).html("Ligar");
    });

    $("#thermo2_temperature_field").on("keyup", function() {
	
	var time = $(this).val();
	var delta = parseFloat(time)-15;
	
	$("#thermo2_delta_calculator").html(delta.toFixed(1));
	$("#thermo2_delta_field").val(delta);
    });

    $("#thermo2_kJ_field").on("keyup", function() {
	
	var energy = $(this).val();
	var energy = parseFloat(energy)*1000;
	
	$("#thermo2_energy_field").val(energy);
    });


    $(".model-choice").on("click", "#thermo2_model-choice_next", function() {
	$(".model-choice").slideUp();
	$(".questions").slideDown();

	
	var question1, question2,question3,question4;
	var largest_material="água", largest_k=water_model;
	if (aluminium_model > largest_k) {
	    largest_k = aluminium_model;
	    largest_material = "alumínio";
	}
	if (copper_model > largest_k) {
	    largest_k = copper_model;
	    largest_material = "cobre";
	}
	if (iron_model > largest_k) {
	    largest_k = iron_model;
	    largest_material = "ferro";
	}
	if (oil_model > largest_k) {
	    largest_k = oil_model;
	    largest_material = "óleo vegetal";
	}
	
	
	if (largest_material === "água")
	    question1 = "Dos materiais estudados, aquele com a maior constante de proporcionalidade entre a energia e a variação de temperatura foi a água, com um valor de "+largest_k+". Que unidade tem esta constante de proporcionalidade?";
	else
	    question1 = "Dos materiais estudados, aquele com a maior constante de proporcionalidade entre a energia e a variação de temperatura foi o "+largest_material+", com um valor de "+largest_k+". Que unidade tem esta constante de proporcionalidade?";
		  

	question2 = "O que significa fisicamente esta constante de proporcionalidade?";

	question3 = "Valores obtidos de capacidade térmica mássica"

        question4 = "O que achou confuso ou difícil nesta atividade?";

	$(".question_model_field").val("N/A");
	$(".question_question1_label").html(question1);
	$(".question_question1_field").val(question1);
	
	
	$(".question_question2_label").html(question2);
	$(".question_question2_field").val(question2);
	
	$(".question_question3_label").html("");
	$(".question_question3_field").val(question3);
	$(".question_answer3_field").val("Água: "+water_model+"\nAlumínio: "+aluminium_model+"<br/>   Cobre: "+copper_model+"\nFerro: "+iron_model+"\nÓleo vegetal: "+oil_model);

	$(".question_question4_label").html(question4);
	$(".question_question4_field").val(question4);

    });




    // creates initial parameters
    $(".data-gathering").on("click", "#thermo2_data-gathering_next", function() {
	chart_vars.data_loaded = false;

	 $(".data-gathering").slideUp();
	 $(".model-choice").slideDown();

	chart_vars.x_lower_bound = 5;
	chart_vars.x_higher_bound = 80;
	chart_vars.x_step = 5;
    

    
    // slider limits
	$("#thermo2_water_k").slider({value: water_model, min: 0, max: 5000, step: 10});
	$("#thermo2_aluminium_k").slider({value: aluminium_model, min: 0, max: 5000, step: 10});
	$("#thermo2_copper_k").slider({value: copper_model, min: 0, max: 5000, step: 10});
	$("#thermo2_iron_k").slider({value: iron_model, min: 0, max: 5000, step: 10});
	$("#thermo2_oil_k").slider({value: oil_model, min: 0, max: 5000, step: 10});
    
	$("#thermo2_water_k").on("slide", function(evt, ui) {
	    water_model = ui.value;

	    if (ui.value > 0)
		$("#thermo2_water_model").html("E = "+ui.value+" "+chart_vars.x_unit);
	    else
		$("#thermo2_water_model").html("E = 0");
	    $("#thermo2_water_k_value").html("k = "+ui.value);
	    chart_vars.loadsPlot(chart_vars.plot_normal);

	    show_next_screen_if_completed();

	});

	$("#thermo2_aluminium_k").on("slide", function(evt, ui) {
	    aluminium_model = ui.value;

	    if (ui.value > 0)
		$("#thermo2_aluminium_model").html("E = "+ui.value+" "+chart_vars.x_unit);
	    else
		$("#thermo2_aluminium_model").html("E = 0");
	    $("#thermo2_aluminium_k_value").html("k = "+ui.value);
	    chart_vars.loadsPlot(chart_vars.plot_normal);

	    show_next_screen_if_completed();

	});

	$("#thermo2_copper_k").on("slide", function(evt, ui) {
	    copper_model = ui.value;

	    if (ui.value > 0)
		$("#thermo2_copper_model").html("E = "+ui.value+" "+chart_vars.x_unit);
	    else
		$("#thermo2_copper_model").html("E = 0");
	    $("#thermo2_copper_k_value").html("k = "+ui.value);
	    chart_vars.loadsPlot(chart_vars.plot_normal);

	    show_next_screen_if_completed();
	});

	$("#thermo2_iron_k").on("slide", function(evt, ui) {
	    iron_model = ui.value;

	    if (ui.value > 0)
		$("#thermo2_iron_model").html("E = "+ui.value+" "+chart_vars.x_unit);
	    else
		$("#thermo2_iron_model").html("E = 0");
	    $("#thermo2_iron_k_value").html("k = "+ui.value);
	    chart_vars.loadsPlot(chart_vars.plot_normal);

	    show_next_screen_if_completed();
	});

	$("#thermo2_oil_k").on("slide", function(evt, ui) {
	    oil_model = ui.value;

	    if (ui.value > 0)
		$("#thermo2_oil_model").html("E = "+ui.value+" "+chart_vars.x_unit);
	    else
		$("#thermo2_oil_model").html("E = 0");
	    $("#thermo2_oil_k_value").html("k = "+ui.value);
	    chart_vars.loadsPlot(chart_vars.plot_normal);

	    show_next_screen_if_completed();
	});

	

	

	chart_vars.loadsPlot = function(f, arg, xmax, ymax) {
	    
	 
	    if (!chart_vars.data_loaded || (new Date().getTime() - chart_vars.data_loaded) > chart_vars.refresh_data) {
	     $.ajax("data_points/updateGraph", {
		  method: "get",
		  success: function(json) {      
		      
		      copper_data = json.copper;
		      iron_data = json.iron;
		      water_data = json.water;
		      oil_data = json.oil;
		      aluminium_data = json.aluminium;
		      
		      		      
		      var xmax = (typeof xmax) === "undefined" ? chart_vars.default_x : xmax;
		      var ymax = (typeof ymax) === "undefined" ? chart_vars.setYMax() : ymax;
		      
		      f(xmax, ymax);
		      
		  }
	     });
	     chart_vars.data_loaded = new Date().getTime();
	 }
	 else {
	     var xmax = (typeof xmax) === "undefined" ? chart_vars.default_x : xmax;
	     var ymax = (typeof ymax) === "undefined" ? chart_vars.setYMax() : ymax;
	     
	     f(xmax, ymax);
	     
	 }
    }


    chart_vars.setYMax = function() {
	 
	 return 25000;
    }





    chart_vars.plot_normal = function(xmax, ymax) {
	
	 var xmax = (typeof xmax) == "undefined" ? chart_vars.default_x : xmax;
	 var ymax = (typeof ymax) == "undefined" ? chart_vars.setYMax() : ymax;
	 
	
	 $.plot($(".graph_div"), [{
		      data: water_data,
		      points: { show: true },
		      label: "Água"
     
		  },
		  {
		      data: aluminium_data,
		      points: { show: true },
		      label: "Alumínio"
     
		  },
	         {
		      data: copper_data,
		      points: { show: true },
		      label: "Cobre"
     
		  },
		  {
		      data: iron_data,
		      points: { show: true },
		      label: "Ferro"
     
		  },		  
		  {
		      data: oil_data,
		      points: { show: true },
		      label: "Óleo vegetal"
     
		  },
		  {
		      color: 0,
                      data: [[0,0],[200,water_model*200]]
		          
		  },
		  {
		      color: 1,
                      data: [[0,0],[200,aluminium_model*200]]
		          
		  },
		{
		      color: 2,
                      data: [[0,0],[200,copper_model*200]]
		          
		  },
		{
		      color: 3,
                      data: [[0,0],[200,iron_model*200]]
		          
		  },
		{
		      color: 4,
                      data: [[0,0],[200,oil_model*200]]
		          
		  },
					], 
		 {
		     xaxis: { min:0, max: xmax,
			     tickFormatter: function (v) {
				  return chart_vars.scientific(v,1);
			     }},
		     yaxis: { min:0, max: ymax, 
			     tickFormatter: function (v) {
				  return chart_vars.scientific(v,1);
			     }},
		     legend: { position: "se", backgroundOpacity: 0,container:"#thermo2_container_subtitles"},
		 });
	 $(".flot-x-axis").css({left: "10px"});
    }



	chart_vars.data_loaded=false;
	chart_vars.default_x = 40;
	chart_vars.x_maximum = chart_vars.default_x;
	chart_vars.loadsPlot(chart_vars.plot_normal);
    });
    
  

    

    // AUXILIARY FUNCTIONS

    
    
    


    var show_next_screen_if_completed = function() {

	if ((water_data != null && !water_model) || (aluminium_data != null  && !aluminium_model) || (copper_data != null  && !copper_model) || (iron_data != null && !iron_model) || (oil_data != null && !oil_model))
	    return false;
	else {
	    $("#thermo2_model-choice_next").show();
	    $("#thermo2_model-choice_instructions").css({"visibility": "visible"});
	}
    }

    

});