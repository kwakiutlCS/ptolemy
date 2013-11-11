$(function() {
    
    var path = window.location.pathname;
    path = path.split("/");
    
    if (path.length === 3 && path[1] === "activities") {
	var activity = parseInt(path[2]);

	var url = "/activities/"+activity+"/updateTeacherGraph";

	$.ajax(url,{
	    method: "get",
	    success: function(json) {
		var formatted_data = [];
		
		for (var k in json) {
		    if (k != "names") {
			formatted_data.push({data: json[k],
					       points: {show:true}
					      });
		    }		    
		}

		$.plot($(".graph_div"), formatted_data,
		       {
			   xaxis: { min: 0, max: 0.8}
		       }
		);
		$(".flot-x-axis").css({left: "10px"});
	    },
	    
	});
    }
});