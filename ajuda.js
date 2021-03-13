

(function()
{
	window.addEventListener("load", main);
}());



function main()
{
		var btnVoltar;
		btnVoltar = document.getElementById("voltar");

		var bh = function(ev){

			btnVoltar.removeEventListener("click", bh);

			buttonHandler(ev);
		};

		btnVoltar.addEventListener("click", bh);

}
function buttonHandler(ev){
	var blt = ev.currentTarget.id;

	switch(blt){
		case "voltar": parent.window.postMessage("voltar","*");
				break;
	}
	
}
