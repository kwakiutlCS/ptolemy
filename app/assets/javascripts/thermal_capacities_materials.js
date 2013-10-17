
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



    var model = false, 
    prediction=600, initial_prediction, 
    linear_m = 4, linear_b = 0, 
    quadratic_k =6, quadratic_h= 0, quadratic_b =0, 
    cubic_k = 2, cubic_h= 0, cubic_b =0, 
    measurable = 100, 
    data_loaded=false, 
    user_data, plot_data,
    default_x = 75, x_maximum=default_x, y_maximum;
    var intervalId;

    
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