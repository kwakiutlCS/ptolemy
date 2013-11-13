$(function() {
    var updateGraph = function(points, url) {
	$.ajax(url,{
	    method: "get",
	    data: {points: points},
	    success: function(json) {
		var formatted_data = [];
		
		for (var k in json) {
		    if (k != "names") {
			formatted_data.push({data: json[k],
					     points: {show:true},
					     label: json["names"][k]
					    });
		    }		    
		}

		$("#teacher_graph_div").html("");
		var plot = $.plot($("#teacher_graph_div"),
		      formatted_data, {
               
			  grid: { hoverable: true, clickable: true },
			  xaxis: { min: 0,  },
			  legend: {show: false},
		      });
		
		$(".flot-x-axis").css({left: "10px"});
		
		function showTooltip(x, y, contents) {
		    $('<div id="tooltip">' + contents + '</div>').css( {
			position: 'absolute',
			display: 'none',
			top: y + 5,
			left: x + 5,
			border: '1px solid #fdd',
			padding: '2px',
			'background-color': '#fee',
			opacity: 0.80
		    }).appendTo("body").fadeIn(200);
		}

		var previousPoint = null;
		$("#teacher_graph_div").bind("plothover", function (event, pos, item) {
        
		    if (item) {
			if (previousPoint != item.dataIndex) {
			    previousPoint = item.dataIndex;
                    
			    $("#tooltip").remove();
			    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);
			    
			    showTooltip(item.pageX, item.pageY,
					item.series.label);
			}
		    }
		    else {
			$("#tooltip").remove();
			previousPoint = null;            
		    }
        
		});

		$("#teacher_graph_div").on("plotclick", function (event, pos, item) {
		    if (item) {
			$("#activity_point_info").html("<p>"+item.series.label+"<p/><p>x: "+item.datapoint[0]+"</p><p>y: "+item.datapoint[1]+"<p><a href='#'>remover</a></p>");
			
		    }
		});


	    },
	    
	});
    }

    
    var path = window.location.pathname;
    path = path.split("/");
    
    if (path.length === 3 && path[1] === "activities") {
	var activity = parseInt(path[2]);

	var url = "/activities/"+activity+"/updateTeacherGraph";
	var points = []
	
	$(".userbox>:checkbox").each(function() {
	    var box = $(this);
	    if (box.attr("checked")) {
		points.push(parseInt(box.attr("name")));
	    }
	});
	updateGraph(points, url);
	
    }
    
    
    $("#teacher_graph_form").on("submit", function() {
	 var points = [];
	$(".userbox>:checked").each(function() {
	    var box = $(this);
	    points.push(parseInt(box.attr("name")));
	    
	});
	updateGraph(points, url);
	return false;
    });


    
    $(".userbox>:checkbox").on("change", function() {
	$("#teacher_graph_form").submit();
    });







    
});