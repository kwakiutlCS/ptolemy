
$(function() {

    var water_model=0, aluminium_model=0, copper_model=0, iron_model=0, oil_model=0;

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



    // creates initial parameters
    $(".data-gathering").on("click", "#thermo2_data-gathering_next", function() {

	 $(".data-gathering").slideUp();
	 $(".model-choice").slideDown();

	data_loaded=false;
	default_x = 40;
	x_maximum=default_x;
	loadsPlot(plot_normal);

    

    
    // slider limits
	$("#thermo2_water_k").slider({value: water_model, min: 0, max: 5000, step: 10});
	$("#thermo2_aluminium_k").slider({value: aluminium_model, min: 0, max: 5000, step: 10});
	$("#thermo2_copper_k").slider({value: copper_model, min: 0, max: 5000, step: 10});
	$("#thermo2_iron_k").slider({value: iron_model, min: 0, max: 5000, step: 10});
	$("#thermo2_oil_k").slider({value: oil_model, min: 0, max: 5000, step: 10});
    
	$("#thermo2_water_k").on("slide", function(evt, ui) {
	    water_model = ui.value;

	    if (ui.value > 0)
		$("#thermo2_water_model").html("E = "+ui.value+" "+x_unit);
	    else
		$("#thermo2_water_model").html("E = 0");
	    $("#thermo2_water_k_value").html("k = "+ui.value);
	    loadsPlot(plot_normal);

	});

	$("#thermo2_aluminium_k").on("slide", function(evt, ui) {
	    aluminium_model = ui.value;

	    if (ui.value > 0)
		$("#thermo2_aluminium_model").html("E = "+ui.value+" "+x_unit);
	    else
		$("#thermo2_aluminium_model").html("E = 0");
	    $("#thermo2_aluminium_k_value").html("k = "+ui.value);
	    loadsPlot(plot_normal);

	});

	$("#thermo2_copper_k").on("slide", function(evt, ui) {
	    copper_model = ui.value;

	    if (ui.value > 0)
		$("#thermo2_copper_model").html("E = "+ui.value+" "+x_unit);
	    else
		$("#thermo2_copper_model").html("E = 0");
	    $("#thermo2_copper_k_value").html("k = "+ui.value);
	    loadsPlot(plot_normal);
	});

	$("#thermo2_iron_k").on("slide", function(evt, ui) {
	    iron_model = ui.value;

	    if (ui.value > 0)
		$("#thermo2_iron_model").html("E = "+ui.value+" "+x_unit);
	    else
		$("#thermo2_iron_model").html("E = 0");
	    $("#thermo2_iron_k_value").html("k = "+ui.value);
	    loadsPlot(plot_normal);
	});

	$("#thermo2_oil_k").on("slide", function(evt, ui) {
	    oil_model = ui.value;

	    if (ui.value > 0)
		$("#thermo2_oil_model").html("E = "+ui.value+" "+x_unit);
	    else
		$("#thermo2_oil_model").html("E = 0");
	    $("#thermo2_oil_k_value").html("k = "+ui.value);
	    loadsPlot(plot_normal);
	});

	


	$("#thermo2_axis_small").on("click", function() {
	    if (default_x > 20) {
		default_x -= 10;
		x_maximum = default_x;
		plot_normal();
	    }
	});
	$("#thermo2_axis_big").on("click", function() {
	    if (default_x < 100) {
		default_x += 10;
		x_maximum = default_x;
		plot_normal();
	    }
	});

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
		      
		      copper_data = json.copper;
		      iron_data = json.iron;
		      water_data = json.water;
		      oil_data = json.oil;
		      aluminium_data = json.aluminium;

		      initial_prediction = json.initial_prediction;
		      
		      
		      var xmax = (typeof xmax) === "undefined" ? default_x : xmax;
		      var ymax = (typeof ymax) === "undefined" ? setYMax() : ymax;
		      
		      f(xmax, ymax);
		      
		  }
	     });
	     data_loaded = true;
	 }
	 else {
	     var xmax = (typeof xmax) === "undefined" ? default_x : xmax;
	     var ymax = (typeof ymax) === "undefined" ? setYMax() : ymax;
	     
	     f(xmax, ymax);
	     
	 }
    }


    var setYMax = function() {
	 
	 return 25000;
    }





    var plot_normal = function(xmax, ymax) {
	
	 var xmax = (typeof xmax) == "undefined" ? default_x : xmax;
	 var ymax = (typeof ymax) == "undefined" ? setYMax() : ymax;
	 
	
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
				  return scientific(v,1);
			     }},
		     yaxis: { min:0, max: ymax, 
			     tickFormatter: function (v) {
				  return scientific(v,1);
			     }},
		     legend: { position: "se", backgroundOpacity: 0,container:"#thermo2_container_subtitles"},
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