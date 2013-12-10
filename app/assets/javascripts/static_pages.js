chart_vars = {

    default_x: 0,
    x_maximum: 0,
    x_lower_bound: 0,
    x_higher_bound: 1,
    x_step: 0.1,
    y_maximum: false,
    
    model: false,

    measurable: false,
    prediction: false, // prediction made by the model
    initial_prediction: false, // early guess
    
    linear_m: false, 
    linear_b: false,    
    quadratic_k: false,
    quadratic_h: false, 
    quadratic_b: false, 
    cubic_k: false, 
    cubic_h: false, 
    cubic_b: false, 

    x_unit: false,
    y_unit: false,

    user_data: false, 
    plot_data: false,

    data_loaded: false,
    data_refresh: 20000, 
    intervalId: false,
    animation_phase: false,


    scientific: function(v,d) {
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
    },


    setYMax: function() {
	 var max_y = 0;

	 for (var i in this.plot_data) {
	     if (this.plot_data[i][1] > max_y)
		  max_y = this.plot_data[i][1];
	 }
	 for (var i in this.user_data) {
	     if (this.user_data[i][1] > max_y)
		  max_y = this.user_data[i][1];
	 }
	 max_y *=1.1;
	if (max_y === 0)
	    max_y = 5;

	
	 return max_y;
    }, 


    getQuadraticData: function() {
	
	if (this.y_maximum && this.quadratic_k * Math.pow((this.x_maximum-this.quadratic_h),2)  + this.quadratic_b > this.y_maximum) {
	    var step = (Math.pow(((this.y_maximum*1.1 - this.quadratic_b)/this.quadratic_k),0.5)+this.quadratic_h)/30;
	}
	else {
	    var step = this.x_maximum/30;
	}

	 var x = 0;
	 var quadratic_data = [];

	for (var i = 0; i < 30; i++) {
	     var y = this.quadratic_k *(x-this.quadratic_h) * (x-this.quadratic_h) + this.quadratic_b;
	     quadratic_data.push([x, y]);
	     x += step;
	     
	 }
	 return quadratic_data;
    },


    getCubicData: function() {
	
	if (this.y_maximum && this.cubic_k * Math.pow((this.x_maximum-this.cubic_h),3)  + this.cubic_b > this.y_maximum) {
	    var step = (Math.pow(((this.y_maximum*1.1 - this.cubic_b)/this.cubic_k),0.333)+this.cubic_h)/40;
	}
	else {
	    var step = this.x_maximum/40;
	}

	 var x = 0;
	 var cubic_data = [];

	 for (var i = 0; i < 40; i++) {
	     var y = this.cubic_k *(x-this.cubic_h) * (x-this.cubic_h) * (x-this.cubic_h) + this.cubic_b;
	     cubic_data.push([x, y]);
	     x += step;
	     
	 }
	 return cubic_data;
    },



    write_linear_formula: function() {
	 if (this.linear_m) {
	     if (this.linear_b > 0)
		  $(".model_choice_model_formula").html(this.y_unit+" = "+this.linear_m+" "+this.x_unit +" + "+this.linear_b);
	     else if (this.linear_b < 0)
		  $(".model_choice_model_formula").html(this.y_unit+" = "+this.linear_m+" "+this.x_unit +" - "+this.linear_b*(-1));
	     else
		  $(".model_choice_model_formula").html(this.y_unit+" = "+this.linear_m+" "+this.x_unit);
	 }
	 else 
	     $(".model_choice_model_formula").html(this.y_unit+" = "+this.linear_b);

    },


    write_quadratic_formula: function() {
	 if (this.quadratic_k) {
	     if (this.quadratic_h > 0) {
		  if (this.quadratic_b > 0) {
		      $(".model_choice_model_formula").html(this.y_unit+" = "+this.quadratic_k+" ("+this.x_unit+"-"+this.quadratic_h+")<sup>2</sup> + "+this.quadratic_b);
		  }
		  else if (this.quadratic_b < 0) {
		      $(".model_choice_model_formula").html(this.y_unit+" = "+this.quadratic_k+" ("+this.x_unit+"-"+this.quadratic_h+")<sup>2</sup> - "+this.quadratic_b*(-1));
		  }
		  else {
		      $(".model_choice_model_formula").html(this.y_unit+" = "+this.quadratic_k+" ("+this.x_unit+"-"+this.quadratic_h+")<sup>2</sup>");
		  }
	     }
	     else if (this.quadratic_h < 0) {
		  if (this.quadratic_b > 0) {
		      $(".model_choice_model_formula").html(this.y_unit+" = "+this.quadratic_k+" ("+this.x_unit+"+"+this.quadratic_h*(-1)+")<sup>2</sup> + "+this.quadratic_b);
		  }
		  else if (this.quadratic_b < 0) {
		      $(".model_choice_model_formula").html(this.y_unit+" = "+this.quadratic_k+" ("+this.x_unit+"+"+this.quadratic_h*(-1)+")<sup>2</sup> - "+this.quadratic_b*(-1));
		  }
		  else {
		      $(".model_choice_model_formula").html(this.y_unit+" = "+this.quadratic_k+" ("+this.x_unit+"+"+this.quadratic_h*(-1)+")<sup>2</sup>");
		  }
	     }
	     else {
		  if (this.quadratic_b > 0) {
		      $(".model_choice_model_formula").html(this.y_unit+" = "+this.quadratic_k+" "+this.x_unit+"<sup>2</sup> + "+this.quadratic_b);
		  }
		  else if (this.quadratic_b < 0) {
		      $(".model_choice_model_formula").html(this.y_unit+" = "+this.quadratic_k+" "+this.x_unit+"<sup>2</sup> - "+(-1)*this.quadratic_b);
		  }
		  else {
		      $(".model_choice_model_formula").html(this.y_unit+" = "+this.quadratic_k+" "+this.x_unit+"<sup>2</sup>");
		  }
	     }

	 }
	 else  {
	     if (this.quadratic_b) {
		  $(".model_choice_model_formula").html(this.y_unit+" = "+this.quadratic_b);
	     }
	     else {
		  $(".model_choice_model_formula").html(this.y_unit+" = 0");
	     }
	 }
    },


    write_cubic_formula: function() {
	 if (this.cubic_k) {
	     if (this.cubic_h > 0) {
		  if (this.cubic_b > 0) {
		      $(".model_choice_model_formula").html(this.y_unit+" = "+this.cubic_k+" ("+this.x_unit+"-"+this.cubic_h+")<sup>3</sup> + "+this.cubic_b);
		  }
		  else if (this.cubic_b < 0) {
		      $(".model_choice_model_formula").html(this.y_unit+" = "+this.cubic_k+" ("+this.x_unit+"-"+this.cubic_h+")<sup>3</sup> - "+this.cubic_b*(-1));
		  }
		  else {
		      $(".model_choice_model_formula").html(this.y_unit+" = "+this.cubic_k+" ("+this.x_unit+"-"+this.cubic_h+")<sup>3</sup>");
		  }
	     }
	     else if (this.cubic_h < 0) {
		  if (this.cubic_b > 0) {
		      $(".model_choice_model_formula").html(this.y_unit+" = "+this.cubic_k+" ("+this.x_unit+"+"+this.cubic_h*(-1)+")<sup>3</sup> + "+this.cubic_b);
		  }
		  else if (this.cubic_b < 0) {
		      $(".model_choice_model_formula").html(this.y_unit+" = "+this.cubic_k+" ("+this.x_unit+"+"+this.cubic_h*(-1)+")<sup>3</sup> - "+this.cubic_b*(-1));
		  }
		  else {
		      $(".model_choice_model_formula").html(this.y_unit+" = "+this.cubic_k+" ("+this.x_unit+"+"+this.cubic_h*(-1)+")<sup>3</sup>");
		  }
	     }
	     else {
		  if (this.cubic_b > 0) {
		      $(".model_choice_model_formula").html(this.y_unit+" = "+this.cubic_k+" "+this.x_unit+"<sup>3</sup> + "+this.cubic_b);
		  }
		  else if (this.cubic_b < 0) {
		      $(".model_choice_model_formula").html(this.y_unit+" = "+this.cubic_k+" "+this.x_unit+"<sup>3</sup> - "+(-1)*this.cubic_b);
		  }
		  else {
		      $(".model_choice_model_formula").html(this.y_unit+" = "+this.cubic_k+" "+this.x_unit+"<sup>3</sup>");
		  }
	     }

	 }
	 else  {
	     if (this.cubic_b) {
		  $(".model_choice_model_formula").html(this.y_unit+" = "+this.cubic_b);
	     }
	     else {
		  $(".model_choice_model_formula").html(this.y_unit+" = 0");
	     }
	 }
    },


    plot_normal: function(xmax, ymax) {
	
	 var xmax = (typeof xmax) == "undefined" ? this.default_x : xmax;
	 var ymax = (typeof ymax) == "undefined" ? this.setYMax() : ymax;
	 
	
	 $.plot($(".graph_div"), [{
		      data: chart_vars.plot_data,
		      points: { show: true },
		      label: "dados dos seus colegas"
     
		  },
		  {
		      data: chart_vars.user_data,
		      points: { show: true},
		      label: "os seus dados",
		      color:2,
     
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
		     legend: { position: "se", backgroundOpacity: 0, container:".graph_legend_container"},
		 });
	 $(".flot-x-axis").css({left: "10px"});
    },


    plot_linear: function(xmax, ymax) {
	 var xmax = (typeof xmax) == "undefined" ? this.default_x : xmax;
	 var ymax = (typeof ymax) == "undefined" ? this.setYMax() : ymax;
	 
	
	 $.plot($(".graph_div"), [{
		      data: chart_vars.plot_data,
		      points: { show: true },
		      label: "dados dos seus colegas"
     
		  },
		  {
		      data: chart_vars.user_data,
		      points: { show: true },
		      label: "os seus dados",
		      color: 2,
		  },
	         {
                    data: [[-chart_vars.measurable,chart_vars.linear_b-(chart_vars.prediction-chart_vars.linear_b)],[chart_vars.measurable, chart_vars.prediction], [chart_vars.measurable*2,chart_vars.prediction+chart_vars.linear_m*chart_vars.measurable]],
		          
		  },
		  {
		      data: [[chart_vars.measurable,chart_vars.prediction]],
		      points: { show: true },
		      
     
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
		     legend: { position: "se", backgroundOpacity: 0, container:".graph_legend_container"},
		     
		 });
	 $(".flot-x-axis").css({left: "10px"});
    },


    plot_polynomial: function(data, xmax, ymax) {
	 var xmax = (typeof xmax) == "undefined" ? this.default_x : xmax;
	 var ymax = (typeof ymax) == "undefined" ? this.setYMax() : ymax;
	 
	 $.plot($(".graph_div"), [{
		      data: chart_vars.plot_data,
		      points: { show: true },
		      label: "dados dos seus colegas"
     
		  },
		  {
		      data: chart_vars.user_data,
		      points: { show: true },
		      label: "os seus dados",
		      color: 2,
		  },
	         {
                    data: data
		  },
		  
		  {
		      data: [[chart_vars.measurable,chart_vars.prediction]],
		      points: { show: true },
		  }
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
		     legend: { position: "se", backgroundOpacity: 0, container:".graph_legend_container"},
		 });
	 $(".flot-x-axis").css({left: "10px"});
    },


    loadsPlot: function(f, arg, xmax, ymax) {
	 
	if (!this.data_loaded || (new Date().getTime() - this.data_loaded) > this.data_refresh) {
	     $.ajax("/data_points/updateGraph", {
		  method: "get",
		  success: function(json) {      
		      chart_vars.user_data = json.user_data;
		      chart_vars.plot_data = json.plot_data;
		      chart_vars.initial_prediction = json.initial_prediction;
		      
		      
		      var xmax = (typeof xmax) === "undefined" ? chart_vars.default_x : xmax;
		      var ymax = (typeof ymax) === "undefined" ? chart_vars.setYMax() : ymax;
		      
		      if (chart_vars.model === 1 || !chart_vars.model || f === chart_vars.plot_normal)
			   f(xmax, ymax);
		      else 
			   f(arg,xmax, ymax);
		  }
	     });
	     this.data_loaded = new Date().getTime();
	 }
	 else {
	     var xmax = (typeof xmax) === "undefined" ? this.default_x : xmax;
	     var ymax = (typeof ymax) === "undefined" ? this.setYMax() : ymax;
	     
	     if (this.model === 1 || !this.model || f === this.plot_normal)
		  f(xmax, ymax);
	     else 
		  f(arg,xmax, ymax);
	 }
    },    


    animatePlot: function() {
	// function to be overrided
    },

}







$(function() {
    
    var closed = false;

    $("body").tooltip({ show: { delay: 0 } });
    
    $("#ptolemy_dashboard").on("click", ".student_removal", function(evt) {
	closed = true;
    });
    $("#ptolemy_dashboard").on("click", ".ptolemy_student_dashboard_header", function() {
	if (!closed)
	    $(this).parent().children(".ptolemy_student_dashboard_body").toggle();
	else
	    closed = false;
    });

    $(".fancybox").fancybox({
	 'hideOnOverlayClick': false
    });

    $("#fancydiv").on("click", "#fancy_close", function(e) {
	 e.preventDefault();
	 $.fancybox.close();
	 
    });


    $("#fancy_trigger").on("click", function() {
	 $(this).remove();
    });


    $(".datepicker").datepicker({format:"dd-mm-yyyy", language:"pt-BR"});


    var mouse_over_template_img = false;
    $("#template_index").on("mouseenter",".template_image_description_index", function() {
	var desc = $(this);
	var number = desc.data("number");
	mouse_over_template_img = number;
	var img1 = desc.children(".template_image_index"); 
	img1.hide( "slide", { direction: "up" }, 800, function() {
	    if (mouse_over_template_img != number) {
		img1.mouseleave();
	    }
	});
    });
    $("#template_index").on("mouseleave",".template_image_description_index", function() {
	var number = $(this).data("number");
	if (mouse_over_template_img === number)
	    mouse_over_template_img = false;
	var img2 = $(this).children(".template_image_index"); 
	img2.show( "slide", { direction: "up" }, 800, function() {
	    if (mouse_over_template_img == number) {
		img2.mouseenter();
	    }
	});
    });

    $("#template_index").on("mouseenter", ".template_cell_index", function() {
	$(this).addClass("template_cell_highlight_index");
    });
    $("#template_index").on("mouseleave", ".template_cell_index", function() {
	$(this).removeClass("template_cell_highlight_index");
    });

    $("#template_index").on("click", ".template_cell_index", function() {
	$.get("templates/"+$(this).data("url"));
    });

    $("#template_specific_navbar").on("click", "a", function() {
	$("#template_general_navbar").show();
	$("#template_specific_navbar").hide();

    });


    // axis units
    chart_vars.x_unit = $(".x_axis_unit").html();
    chart_vars.y_unit = $(".y_axis_unit").html();
    
    

    // GENERAL CODE
   
    $(".model_data_form").on("click",".model_add_data_point_button", function() {
	 chart_vars.data_loaded = new Date().getTime();
	  
    });
    $(".model_data_collection").on("click",".model_remove_data_point_button", function() {
	 chart_vars.data_loaded = new Date().getTime();
	 
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
	$(".filter_section").slideDown();
    });

    $(".pos_filter").on("click", ".strategy_next", function() {
	 $(".pos_filter").slideUp();
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
	if (!chart_vars.animation_phase) {
	    $(".model_linear_m").html(ui.value);
	    chart_vars.linear_m = ui.value;
	    
	    chart_vars.prediction = chart_vars.linear_b + chart_vars.measurable*chart_vars.linear_m;
	    chart_vars.write_linear_formula();
	    chart_vars.loadsPlot(chart_vars.plot_linear);
	}
    });

    $(".model_linear_b_slider").on("slide", function(evt, ui) {
	 if (!chart_vars.animation_phase) {
	     $(".model_linear_b").html(ui.value);
	     chart_vars.linear_b = ui.value;

	     chart_vars.prediction = chart_vars.linear_b + chart_vars.measurable*chart_vars.linear_m;
	     chart_vars.write_linear_formula();
	     chart_vars.loadsPlot(chart_vars.plot_linear);
	 }
    });
    
    $(".model_quadratic_k_slider").on("slide", function(evt, ui) {
	if (!chart_vars.animation_phase) {
	    $(".model_quadratic_k").html(ui.value);
	    chart_vars.quadratic_k = ui.value;
	    
	    chart_vars.prediction = chart_vars.quadratic_b + Math.pow(chart_vars.measurable-chart_vars.quadratic_h, 2)*chart_vars.quadratic_k;
	    chart_vars.write_quadratic_formula();
	    chart_vars.loadsPlot(chart_vars.plot_polynomial, chart_vars.getQuadraticData());
	}
    });
    $(".model_quadratic_h_slider").on("slide", function(evt, ui) {
	 if (!chart_vars.animation_phase) {
	     $(".model_quadratic_h").html(ui.value);
	     chart_vars.quadratic_h = ui.value;

	     chart_vars.prediction = chart_vars.quadratic_b + Math.pow(chart_vars.measurable-chart_vars.quadratic_h, 2)*chart_vars.quadratic_k;
	     chart_vars.write_quadratic_formula();
	     chart_vars.loadsPlot(chart_vars.plot_polynomial, chart_vars.getQuadraticData());
	 }
    });
    $(".model_quadratic_b_slider").on("slide", function(evt, ui) {
	 if (!chart_vars.animation_phase) {
	     $(".model_quadratic_b").html(ui.value);
	     chart_vars.quadratic_b = ui.value;

	     chart_vars.prediction = chart_vars.quadratic_b + Math.pow(chart_vars.measurable-chart_vars.quadratic_h, 2)*chart_vars.quadratic_k;
	     chart_vars.write_quadratic_formula();
	     chart_vars.loadsPlot(chart_vars.plot_polynomial, chart_vars.getQuadraticData());
	 }
    });
    $(".model_cubic_k_slider").on("slide", function(evt, ui) {
	if (!chart_vars.animation_phase) {
	    $(".model_cubic_k").html(ui.value);
	    chart_vars.cubic_k = ui.value;

	    chart_vars.prediction = chart_vars.cubic_b + Math.pow(chart_vars.measurable-chart_vars.cubic_h, 3)*chart_vars.cubic_k;
	    chart_vars.write_cubic_formula();
	    chart_vars.loadsPlot(chart_vars.plot_polynomial, chart_vars.getCubicData());
	}
    });
    $(".model_cubic_h_slider").on("slide", function(evt, ui) {
	if (!chart_vars.animation_phase) {
	    $(".model_cubic_h").html(ui.value);
	    chart_vars.cubic_h = ui.value;
	    
	    chart_vars.prediction = chart_vars.cubic_b + Math.pow(chart_vars.measurable-chart_vars.cubic_h, 3)*chart_vars.cubic_k;
	    chart_vars.write_cubic_formula();
	    chart_vars.loadsPlot(chart_vars.plot_polynomial, chart_vars.getCubicData());
	}
    });
    $(".model_cubic_b_slider").on("slide", function(evt, ui) {
	if (!chart_vars.animation_phase) {
	    $(".model_cubic_b").html(ui.value);
	    chart_vars.cubic_b = ui.value;

	    chart_vars.prediction = chart_vars.cubic_b + Math.pow(chart_vars.measurable-chart_vars.cubic_h, 3)*chart_vars.cubic_k;
	    chart_vars.write_cubic_formula();
	    chart_vars.loadsPlot(chart_vars.plot_polynomial, chart_vars.getCubicData());
	}
    });



    // select model buttons
    $(".model_choice_buttons").on("click", ".linear_model_button", function() {
	if (!chart_vars.animation_phase) {
	    $(".model-choice_buttons_explanation").hide();
	    $(".model_function_controls").hide();
	    $(".linear_function_controls").show();
	    $(".model_choice_model_information_div").show();

	    chart_vars.model = 1;
	    chart_vars.prediction = chart_vars.linear_b + chart_vars.measurable*chart_vars.linear_m;
	    chart_vars.write_linear_formula();
	    chart_vars.loadsPlot(chart_vars.plot_linear);
	}
    });

    $(".model_choice_buttons").on("click", ".quadratic_model_button", function() {
	if (!chart_vars.animation_phase) {
	    $(".model-choice_buttons_explanation").hide();
	    $(".model_function_controls").hide();
	    $(".quadratic_function_controls").show();
	    $(".model_choice_model_information_div").show();
	    chart_vars.model = 2;
	 
	    chart_vars.write_quadratic_formula();
	    chart_vars.prediction = chart_vars.quadratic_b + Math.pow(chart_vars.measurable-chart_vars.quadratic_h, 2)*chart_vars.quadratic_k;
	    chart_vars.loadsPlot(chart_vars.plot_polynomial, chart_vars.getQuadraticData());
	}
    });

    $(".model_choice_buttons").on("click", ".cubic_model_button", function() {
	if (!chart_vars.animation_phase) {
	    $(".model-choice_buttons_explanation").hide();
	    $(".model_function_controls").hide();
	    $(".cubic_function_controls").show();
	    $(".model_choice_model_information_div").show();
	    chart_vars.model = 3;
	    
	    chart_vars.write_cubic_formula();
	    chart_vars.prediction = chart_vars.cubic_b + Math.pow(chart_vars.measurable-chart_vars.cubic_h, 3)*chart_vars.cubic_k;
	    chart_vars.loadsPlot(chart_vars.plot_polynomial, chart_vars.getCubicData());
	}
    });


    $(".model_confirm_model_button").on("click", function() {
	if (!chart_vars.intervalId) {
	    chart_vars.y_maximum = chart_vars.setYMax();
	    chart_vars.x_maximum = chart_vars.default_x;
	    $(".model_slider_controls").slider({disabled:true});
	    chart_vars.animation_phase = 1;
	    chart_vars.intervalId = window.setInterval(chart_vars.animatePlot,30);
	}
    });

    
    // axis-scaler
    $(".x_axis_scaler").on("click", ".scale_minus", function() {
	
	if (chart_vars.default_x > chart_vars.x_lower_bound) {
	    chart_vars.default_x -= chart_vars.x_step;
	    chart_vars.x_maximum = chart_vars.default_x;

	    if (chart_vars.model === 1) 
		chart_vars.plot_linear();
	    else if (chart_vars.model === 2)
		chart_vars.plot_polynomial(chart_vars.getQuadraticData());
	    else if (chart_vars.model === 3)
		chart_vars.plot_polynomial(chart_vars.getCubicData());
	    else
		chart_vars.plot_normal();
	}
	
    });
    $(".x_axis_scaler").on("click", ".scale_plus", function() {
	if (chart_vars.default_x < chart_vars.x_higher_bound) {
	    chart_vars.default_x += chart_vars.x_step;
	    chart_vars.x_maximum = chart_vars.default_x;
 
	    if (chart_vars.model === 1) 
		chart_vars.plot_linear();
	    else if (chart_vars.model === 2)
		chart_vars.plot_polynomial(chart_vars.getQuadraticData());
	    else if (chart_vars.model === 3)
		chart_vars.plot_polynomial(chart_vars.getCubicData());
	    else
		chart_vars.plot_normal();
	}
    });


    $("select#user_role").on("change", function() {
	var role = $(this).val();
	
	if (role === "1") {
	    $("#accountName").slideDown();
	}
	else {
	    $("#accountName").slideUp();
	}
    });


    
});
