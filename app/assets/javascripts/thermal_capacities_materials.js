
$(function() {
    $("#thermo2_onoff").attr("disabled",true);
    $("#thermo2_add_data_point_button").attr("disabled",true);

    $("#thermo2_material").on("change", function() {
	var material = $(this).val();
	
	if (material == "") {
	    $("#thermo2_onoff").attr("disabled",true);
	    $("#thermo2_add_data_point_button").attr("disabled",true);
	    $('#thermo2_data_collection').html("");
	}
	else {
	    $("#thermo2_onoff").attr("disabled",false);
	    $("#thermo2_add_data_point_button").attr("disabled",false);
	    $("#thermo2_material_series").val(material);
	    $.get("data_points", {series:material});
	}
    });

    $("#thermo2_onoff").on("click", function() {
	if ($(this).html() === "Ligar")
	    $(this).html("Parar");
	else
	    $(this).html("Ligar");
    });

    $("#thermo2_time_field").on("keyup", function() {
	
	var time = $(this).val();
	var energy = parseInt(time)*0.2;
	
	$("#thermo2_energy_calculator").html(energy.toFixed(1));
	$("#thermo2_energy_field").val(energy);
    });


    // creates initial parameters
    $(".data-gathering").on("click", "#thermo2_data-gathering_next", function() {
	alert(3);
	 $(".data-gathering").slideUp();
	 $(".model-choice").slideDown();

	model = false;
	prediction = 20000;
	linear_m = 1000;
	linear_b = 0;
	quadratic_k = 6;
	quadratic_h= 0;
	quadratic_b =0;
	cubic_k = 2;
	cubic_h= 0;
	cubic_b =0; 
	measurable = 100; 
	data_loaded=false;
	default_x = 80;
	x_maximum=default_x;
	loadsPlot(plot_normal);
	alert("here");

    

    
    // slider limits
    $("#thermo2_linear_m_slider").slider({value: linear_m, min: 0, max: 50000, step: 1000});
    $("#thermo2_linear_b_slider").slider({value: linear_b, min: -20000, max:20000, step: 500});
    $("#thermo2_quadratic_k_slider").slider({value: quadratic_k, min: 0, max: 100, step: 0.1});
    $("#thermo2_quadratic_h_slider").slider({value: quadratic_h, min: 0, max: default_x, step: default_x/100});
    $("#thermo2_quadratic_b_slider").slider({value: quadratic_b, min: -10, max: 10, step: 0.05});
    $("#thermo2_cubic_k_slider").slider({value: cubic_k, min: 0, max: 300, step: 1});
    $("#thermo2_cubic_h_slider").slider({value: cubic_h, min: 0, max: default_x, step: default_x/100});
    $("#thermo2_cubic_b_slider").slider({value: cubic_b, min: -10, max: 10, step: 0.05});

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
		     legend: { position: "se", backgroundOpacity: 0},
		     
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
		     legend: { position: "se", backgroundOpacity: 0},
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
		     legend: { position: "se", backgroundOpacity: 0},
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