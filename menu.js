"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main()
{
	var btnJogar, btnRanking, btnOpcoes, btnCreditos, btnAjuda, btnSair;

	btnJogar = document.getElementById("jogar");
	btnRanking = document.getElementById("ranking");
	btnOpcoes = document.getElementById("opcoes");
	btnCreditos = document.getElementById("creditos");
	btnAjuda = document.getElementById("ajuda");
	btnSair = document.getElementById("sair");
	

	var bh = function(ev){
		// removemos os event listeners
		btnJogar.removeEventListener("click", bh); 
		btnRanking.removeEventListener("click", bh); 
		btnOpcoes.removeEventListener("click", bh); 
		btnCreditos.removeEventListener("click", bh); 
		btnAjuda.removeEventListener("click", bh); 

		btnSair.removeEventListener("click", bh);   //este acho que nao e necessario

		buttonHandler(ev);
	};

	// Cliques nos botoes
	btnJogar.addEventListener("click", bh); 
	btnRanking.addEventListener("click", bh); 
	btnOpcoes.addEventListener("click", bh); 
	btnCreditos.addEventListener("click", bh); 
	btnAjuda.addEventListener("click", bh); 
	btnSair.addEventListener("click", bh);
	
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
		case "jogar": parent.window.postMessage("jogar","*");
					  break;
		/*
		case "continue": if(localStorage.getItem("level") != "1"){
							var comando = "level"+localStorage.getItem("level");
						  	parent.window.postMessage(comando,"*");
						 }
						 break;
		*/
		case "ranking": parent.window.postMessage("ranking","*");
						 break;
		case "opcoes": parent.window.postMessage("opcoes","*");
					   break;
		case "ajuda": parent.window.postMessage("ajuda","*");
					   break;
		case "creditos": parent.window.postMessage("creditos","*");
						break;
		case "sair": parent.window.postMessage("sair","*");
						break;
	}

}