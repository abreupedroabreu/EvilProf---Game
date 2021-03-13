"use strict";

(function()
{
	window.addEventListener("load", main);
}());

// variaveis globais para o volume dos audios
var music;
var volume= 1;
var START_NIVEL = 7;
var dificuldade;
var teclas=1;
var mapa=1;
var ranking = [];

function main()
{
	window.addEventListener("message", messageHandler);  // fica a escuta de mensagens

	var startPage = 6;

	inicializaVetorRanking();

	showPage(startPage);
}

function showPage(page)
{
	//carregar página na frame e enviar mensagem para a página logo que esteja carregada (frameLoadHandler)
	var frm = document.getElementsByTagName("iframe")[0];

	switch(page){ // carrega as paginas
        case 0: frm.src = "menu_intermedio.html";
                break;
        case 1: frm.src = "ranking.html";
                break;
        case 2: frm.src = "opcoes.html";
                break;
        case 3: frm.src = "ajuda.html";
                break;
        case 4: frm.src = "creditos.html";
                break;
        case 5: frm.src = "jogar.html";
                break;
        case 6: frm.src = "menu.html";
				break;
		case 7: frm.src = "mapa1.html";
				break;
		case 8: frm.src = "mapa2.html"
				break;
        case 99: frm.src = "menu.html";
                var res = confirm("Quer mesmo sair?");
                if(res == true){
					   window.close(); // falar
				}
                break;
    }

	//carregaMusica(page);
}
/*
function carregaMusica(page)
{
	switch(page){
		case 0: music.src = "../resources/audio/audioMenu.mp3";
			    break;
		case 1: music.src = "../resources/audio/audio1.mp3";
				break;
		case 2: music.src = "../resources/audio/audio2.mp3";
				break;
		case 3: music.src = "../resources/audio/audio3.mp3";
				break;
	}
}

function audioCanPlayHandler(ev) {
	var aud = ev.target;
	aud.play().catch(function() {
    	// do something
	});;
}
*/
function messageHandler(ev){
	var recebido = ev.data; // le a mensagem
	var msg = recebido.split(" ");
	switch(msg[0]){
		case "jogar": showPage(0);
			break;
		case "ranking": showPage(1);
			break;
	  	case "opcoes": showPage(2);
			break;
  		case "ajuda": showPage(3);
			break;
	  	case "creditos": showPage(4);
			break;
		case "sair": showPage(99);
			break;
		case "voltar": showPage(6);
			break;
		case "voltarRank":
			musica(1);
			showPage(6);
			break;
		case "continuar":
			dificuldade = parseInt(msg[1]);	
			mapa = parseInt(msg[2]);	
			// guardar globalmente
			
			if(mapa == 0){
				showPage(7);
			}
			else if(mapa == 1){
				showPage(8);
			}
			// ver se nivel corresponde ao showpage(num)
			// exemplo: nivel 2 pode nao ser showpage(2) 
			break;
		case "teclas": teclas = parseInt(msg[1]);
			break;
		case "volume":
			var audio = document.getElementById("audio");
			volume = parseInt(msg[1])/100;
			audio.volume= volume;

			break;
		case "optionsSend": 
			var buffer =[];
			buffer[0] = volume*100;
			buffer[1] = teclas;
			var frm = document.getElementsByTagName("iframe")[0]; // Permite a comunicacao com o filho
			frm.contentWindow.postMessage(buffer, '*');
			break;
		case "MapConfigs":
			var buffer =[];
			buffer[0] = volume*100;
			buffer[1] = teclas;
			buffer[2] = mapa;
			buffer[3] = dificuldade;
			var frm = document.getElementsByTagName("iframe")[0]; // Permite a comunicacao com o filho
			frm.contentWindow.postMessage(buffer, '*');
			break;
		case "SendPontuacao":
			var pontuacao = parseInt( msg[1]);
			var index = getNameHigh(pontuacao);
			if( index != -1  ){  // Significa que entrou no highscore
				var txt;
				var person;
				var vef = 1;
				while(person == null || person == ""){
					if(vef==1){
						person= prompt("PARABENS!!! ATINGISTE UM HIGHSCORE\nIntroduz o teu nome:", "");
					}
					else{
						person= prompt("Introduza um nome valido:", "");
					}
				}
				console.log(person);
				console.log(index);
				ranking[index] = new Rank(pontuacao,person);
				showPage(1);
			}
			else{
				if (confirm("Nao entraste no highScore! Queres tentar outra vez?")) {
					if(mapa==1){
						showPage(8);
					}
					else{
						showPage(7);
					}
					

				} else {
					showPage(0);
				  }
			}
			break;
		case "rankingSend":
			musica(2);
			var frm = document.getElementsByTagName("iframe")[0]; // Permite a comunicacao com o filho
			frm.contentWindow.postMessage(ranking, '*');
			break;
	}
}

function inicializaVetorRanking(){

    for(let i=0; i<4; i++){
	  ranking[i] = new Rank(0," ");
    }
}

function getNameHigh(pontuacao){ // mostrar so os 3 high score

	var a,index;

	ranking[3].pontuacao = pontuacao;
	ranking[3].setNome("verifica");

	for (var i = 0; i < 4; ++i) 
	{
		for (var j = i + 1; j < 4; ++j) 
		{
			if (ranking[i].pontuacao < ranking[j].pontuacao) 
			{
				a = ranking[i];
				ranking[i] = ranking[j];
				ranking[j] = a;
			}
		}
	}
	for(var i = 0; i<3;i++){
		if(ranking[i].nome == "verifica"){
			index = i;
			break;
		}
	}
	if(i<3){
		ranking[i]=pontuacao;
	}
	else{
		i=-1;
	}

  	return i;

}


function musica(num)
{	
	var audio = document.getElementById("audio");
	if(num==1){
		audio.src = "../resources/sound/soundMenu.mp3";
	}
	if(num==2){
		audio.src="../resources/sound/ranking.mp3";
	}
	if(num==3){
		audio.src="../resources/sound/silence.mp3";
	}
}