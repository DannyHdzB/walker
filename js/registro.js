$(document).ready(function(){
	$("#errorMsg").hide();
	$("#btnReg").click(function(){
		var usu = $("#nombre").val();
		var mail = $("#mail").val();
		var pass = $("#pass").val();
		$.post("http://thewalker.esy.es/registro.php",{ usu : usu, mail : mail, pass : pass},function(respuesta){
			if (respuesta == true) {
        		$.mobile.changePage("index.html");
        	}
        	else{
				$( ".conte" ).text("Error de registro");
				$.mobile.changePage("#page2");
        		//$.mobile.changePage('#pageError', 'pop', true, true);
        		//$("#errorMsg").fadeIn(300);
        		//$("#errorMsg").css("display", "block");
        	}
		});
    });
});