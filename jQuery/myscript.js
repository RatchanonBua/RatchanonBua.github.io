$(document).ready(function() {
    $('#submit-btn').click(function() {
  		searchingData();
    });

    $('#input-text').bind("enterKey", function(e) {
		searchingData();
  	});

  	$('#input-text').keyup(function(e) {
	    if(e.keyCode == 13) {
	        $(this).trigger("enterKey");
	    }
	});

	function searchingData() {
		var searchVal = $("#input-text").val();
  		var upper = searchVal.toUpperCase();

  		$("#group-table tr").each(function(index) {
  			if (index !== 0) {
  				$(this).show();
  				var text = $(this).text().toUpperCase();

  				if (text.indexOf(upper) == -1) {
  					$(this).hide();
  				}
   			}
  		});

  		var table = $("#group-table")[0];
		var row = $("tr");

  		for (i = 0; i < row.length; i++) {
  			var td;

  			if ($('#latin-check').is(":checked")) {
				td = row[i].getElementsByTagName("td")[1];
			} else if ($('#english-check').is(":checked")) {
				td = row[i].getElementsByTagName("td")[2];
			} else if ($('#thai-check').is(":checked")) {
				td = row[i].getElementsByTagName("td")[3];
			}

    		if (td) {
      			text = td.textContent.toUpperCase();
      			if (text.indexOf(upper) == -1) {
        			row[i].style.display = "none";
        		}
    		}
  		}

  		for (i = 0; i < row.length; i++) {
	  		var td = row[i].getElementsByTagName("td")[4];
	  		if (td) {
      			text = td.textContent.toUpperCase();
      			if ($('#zodiac-check').is(":checked")) {
      				if (text == "") {
        				row[i].style.display = "none";
        			}
    			} else if ($('#nonzodiac-check').is(":checked")) {
    				if (text != "") {
        				row[i].style.display = "none";
        			}
    			}
	  		}
  		}

  		for (i = 0; i < row.length; i++) {
	  		var td = row[i].getElementsByTagName("td")[1];
	  		if (td) {
      			text = td.textContent.toUpperCase();
      			if ($('#ag-check').is(":checked")) {
      				if (!/[A-G]/.exec(text.charAt(0))) {
        				row[i].style.display = "none";
        			}
    			} else if ($('#hr-check').is(":checked")) {
    				if (!/[H-R]/.exec(text.charAt(0))) {
        				row[i].style.display = "none";
        			}
    			} else if ($('#sz-check').is(":checked")) {
    				if (!/[S-Z]/.exec(text.charAt(0))) {
        				row[i].style.display = "none";
        			}
    			}
	  		}
  		}
	}

	$("#advanced").click(function() {
		if ($('#advanced-block')[0].style.display == "block") {
			$('#advanced-block')[0].style.display = "none";
		} else {
			$('#advanced-block')[0].style.display = "block";
		}
	});

	$('input[type="checkbox"]').on('change', function() {
		$(this).siblings('input[type="checkbox"]').prop('checked', false);
	});

    $.ajax({
        url: 'constellations.json',
        dataType: 'json'
    }).done(function(response) {
        console.log(response);
        response.forEach(element => {
            console.log(element.name, element.age);
        });
    });

    $.getJSON('constellations.json', function(data) {
        var tr = '';
        var index = 1;
        $.each(data, function(key, value) {
        	tr += '<tr>';
        	tr += '<td class="has-text-centered" id="number">(' + value.number + ')</td>';
        	tr += '<td class="has-text-centered" id="latin_name">' + value.latin_name + '</td>';
        	tr += '<td class="has-text-centered" id="english_name">' + value.english_name + '</td>';
        	tr += '<td class="has-text-centered" id="thai_name">[' + value.thai_name + ']</td>';
        	tr += '<td class="has-text-centered" id="zodiac">' + value.zodiac + '</td>';
        	tr += '</tr>'
        });

        $('#table-body').append(tr);
    });

});