

$(document).ready(function(){
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "https://pokeapi.co/api/v2/pokemon-color/yellow", true);

	function fillList() {
		const data 		= JSON.parse(xhr.response);
		const source   	= document.getElementById("pokemon-list").innerHTML;
		const template 	= Handlebars.compile(source);
		const context 	= { pokemon: data.pokemon_species.slice(0, 20), tableClass: 'table' };
		const html     	= template(context);
	
		document.getElementById('result').innerHTML = html;
        $("th").addClass("dark-blue");
        
        setTimeout(function() {
            const hideElements = $("table td a:contains('p')").filter(function(){
                return this.innerHTML.indexOf('p') == 0;
            });
            hideElements.closest('tr').remove();
            $("tbody tr:even").addClass("green");
            
            const info = $('<div></div>').insertAfter($('#pokemon-list')).text('Skriveno: ' + hideElements.length);
        }, 2000);
        
  	  	$('[data-toggle="popover"]').popover();
	}

	xhr.onload = function() {
		fillList();
	};

	xhr.send();
});


