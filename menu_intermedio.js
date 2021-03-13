"use strict";

(function()
{
	window.addEventListener("load", main);
}());

var btnDificuldade=0;
var btnNivel=0;

function main()
{
	var btnContinuar,btnVoltar, btnMapa1, btnMapa2;

	btnContinuar = document.getElementById("continuar");
	btnVoltar = document.getElementById("voltar");

	btnMapa1 = document.getElementById("primeiro");
	btnMapa2 = document.getElementById("segundo");

	var bh = function(ev){
		// removemos os event listeners

		buttonHandler(ev);
	};

	// Cliques nos botoes
	btnContinuar.addEventListener("click", bh); 
	btnVoltar.addEventListener("click", bh); 
	btnMapa1.addEventListener("click", bh); 
	btnMapa2.addEventListener("click", bh); 
	/*
	if(localStorage.getItem("level") == "1"){
		btnContinue.style.opacity = 0.3;
		btnContinue.disabled = true;
	}
	else{
		btnContinue.style.opacity = 1;

		btnContinue.addEventListener("click", bh); // so fica a escuta se o utilizador jogou alteriormente
	}
	*/
}

function buttonHandler(ev){
	var blt = ev.currentTarget.id; // id do butao

	switch(blt){
		
		/*
		case "continue": if(localStorage.getItem("level") != "1"){
							var comando = "level"+localStorage.getItem("level");
						  	parent.window.postMessage(comando,"*");
						 }
						 break;
		*/
		case "continuar":
			var rates = document.getElementsByName('dificuldade');
			var dificuldade;
			for(let i = 0; i < rates.length; i++){
				if(rates[i].checked){
					dificuldade = i;
				}
			}

			rates = document.getElementsByName('nivel');
			var nivel;
			for(let i = 0; i < rates.length; i++){
				if(rates[i].checked){
					nivel = i;
				}
			}
			parent.window.postMessage("continuar " + dificuldade + " " + nivel,"*");
			break;

		case "voltar": parent.window.postMessage("voltar","*");
			break;
		case "primeiro":
			btnNivel=1;
			validarContinuar();
		case "segundo":
			btnNivel=1;
			validarContinuar();	
	}
	
}

function radioButtonHandler(id){
	document.getElementById(id).checked = true;
	btnDificuldade = 1;
	validarContinuar();
}

function validarContinuar(){
	if(btnNivel==1 && btnDificuldade==1){
		var continuar = document.getElementById("continuar");

		continuar.style.opacity = "1";
	}
}