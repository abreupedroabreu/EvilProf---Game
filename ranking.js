(function()
{
	window.addEventListener("load", main);
}());



function main()
{
		var btnVoltar;
		btnVoltar = document.getElementById("voltar");

    window.addEventListener("message", messageHandler);  // fica a escuta de uma mensagem com o volume atual
    parent.window.postMessage("rankingSend","*");

    

		var bh = function(ev){

			btnVoltar.removeEventListener("click", bh);

			buttonHandler(ev);
		};

		btnVoltar.addEventListener("click", bh);

}
function buttonHandler(ev){
	var blt = ev.currentTarget.id;

	switch(blt){
		case "voltar": parent.window.postMessage("voltarRank","*");
				break;
	}

}

function messageHandler(ev){
    var ranking = ev.data;
    var pontos = document.getElementsByClassName("pontuacao");
    var nomes = document.getElementsByClassName("nome");


    for( let i=0; i<3 ; i++){

      nomes[i].innerHTML = ranking[i].nome;
      pontos[i].innerHTML = ranking[i].pontuacao;

    }

}
