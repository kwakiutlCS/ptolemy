$(function() {

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
    });

    $(".data-gathering").on("click", ".data-gathering_previous", function() {
	 $(".data-gathering").slideUp();
	 $(".strategy").slideDown();
    });

    $(".data-gathering").on("click", ".data-gathering_next", function() {
	 $(".data-gathering").slideUp();
	 //$(".").slideDown();
    });

});