/*  
    Insert into every page: need to check for variables present. 

*/
$(document).ready(function() {
    $("#header").load("header-bs3.1.1.html");
    $("#support").load("support-bs3.1.1.html");
    $("#footer").load("footer-bs3.1.1.html");
    
    $(".search-field input").on('click', function() {
        $(this).removeClass("helpSearchTxt");
        $(this).addClass("searchTxt");
        $(this).val("");
    });
    
    if ($("#order-table").length > 0) {
        $("#order-table").tablesorter();
        $("#order-table th").on('click', function() {
            $("div.table-arrow-position").toggleClass('down-triangle-graphite').toggleClass('up-triangle-graphite');
        });
    }

    if ($("#warehouse-category-table").length > 0) {	
	    $("#warehouse-category-table").tablesorter(); 
    	$("#warehouse-category-table th").on('click', function() {
        	$("div.table-arrow-position").toggleClass('down-triangle-white').toggleClass('up-triangle-white');
        });
    }

    if ($(".img-handle").length > 0) {	

    	$(".img-handle").on('click', function() {    
    		console.log("clicked img handle");
            $(this).siblings('.add-images').find('.modal-add-img').modal('show');
         });
    }

    if ($("#invoice-table").length > 0) {
    	$("#invoice-table").tablesorter(); 

		$("#invoice-table th").on('click', function() {
			$("div.table-arrow-position").toggleClass('down-triangle-graphite').toggleClass('up-triangle-graphite');
		});

		$('#invoices a').click(function (e) {
			e.preventDefault();
			$(this).tab('show');
		});
	}
  
    if ($("input.date-picker").length > 0) {
        $('input.date-picker').datepicker(); // the bootstrap datepicker script needs to be present
    }
    if ($('.edit-img ul li').length > 0) {
        $(".edit-img ul li").on('click', function() {
            var elem = $(this).html();
            $('#modal-img-info .modal-content').html("Du klikket på: " + elem);
            $('#modal-img-info').modal('show');
        });
    }

    $('.rectangle-small').on('click', function() {
        $(this).parent().toggleClass('no-show');
    });


    if ($('.pulldown-menu').length > 0) {
        $(".pulldown-menu").on('click', function() {
            $(this).siblings().toggleClass('no-show');
            $(this).find("div.pulldown-form-position").toggleClass('down-triangle-graphite').toggleClass('up-triangle-graphite');

            // $(this).siblings().find('.rectangle-small').on('click', function() {
            // 	$(this).parent().toggleClass('no-show');

            // });

        });
    }
    
    if ($(".tmp-w").length > 0) {
        $(".tmp-w").load("warehouse-item.html");
    }
    
    if ($(".click-me").length > 0) {
        $(".click-me").on('click', function() {
            var ok = '<img src="img/checked.png" alt="ok icon">';
            $(this).replaceWith(ok);
        });
    }
    
    if ($(".input-wrapper").length > 0) {
        $(".input-wrapper").siblings('div.gray-box').on('click', function() {
            var currentvalue = parseInt($('#counter').html());
            if (currentvalue === 0) {
                $("#counter").removeClass("no-show"); //.addClass("counterbox");
            }
            currentvalue++;
            $('#counter').html(currentvalue);
            $(this).parent("td").parent("tr").delay(350).fadeOut(250, function() {
                $(this).remove();
            });
        });
    }
    
    if ($("#add-row").length > 0) {
    	$("#add-row").on('click', function() {	
        	var newrow = '<tr><td>34566</td><td>Rødspette</td><td>4</td><td>paller</td><td>455</td><td>7</td><td><input type="text" name="changefield" value="2"></td><td><input type="text" name="changefield" value=""></td><td>467</td><td class="underlined"><a href="" class="underlined">Endre</a></td></tr>';
			$("#order-table").append(newrow);			
        });
	}

	if ($(".change-order").length > 0) {
		$(".change-order").on('change', function() {
	    	$('#change-order').removeClass('no-show');
	    	$('#confirm-message').addClass('green-border');
	    	$('#confirm-order').addClass('fade');
	    });
	}

    if ($("#confirm-form").length > 0) {
		$("#confirm-form").on('submit', function(e) { 
        	e.preventDefault();  //prevent form from submitting
        	var msg = $("#confirm-message").val();

        	if(msg.length<5){
        		$(".confirm-msg").toggle('no-show');	
        		$("#confirm-message").removeClass('green-border');
        		$("#confirm-message").addClass('red-border');
        		$(".user-info").addClass("red-txt");
        	}
    	});
    }

    if ($("#catalogue-widget").length > 0) {
    	$("#catalogue-widget").load("katalogkvalitet.html"); 
	}

});