(function()
{
	window.addEventListener("load", main);
}());

var volume

function main()
{
	window.addEventListener("message", messageHandler);  // fica a escuta de uma mensagem com o volume atual
	parent.window.postMessage("optionsSend","*");
	
	var btnVoltar;
	var btnOne,btnTwo,btnThree,btnFour,btnFive,btnSix;
	var btnCheckUm, btnCheckDois;


	btnVoltar = document.getElementById("voltar");

	btnOne= document.getElementById("sound_one");
	btnTwo= document.getElementById("sound_two");
	btnThree= document.getElementById("sound_three");
	btnFour= document.getElementById("sound_four");
	btnFive= document.getElementById("sound_five");
	btnSix= document.getElementById("sound_six");

	btnCheckUm= document.getElementById("check1");
	btnCheckDois= document.getElementById("check2");
	

	var bh = function(ev){
		// removemos os event listeners
		//btnVoltar.removeEventListener("click", bh); 

		buttonHandler(ev);
	};

	// Cliques nos botoes
	btnVoltar.addEventListener("click", bh);

	btnOne.addEventListener("click", bh);
	btnTwo.addEventListener("click", bh);
	btnThree.addEventListener("click", bh);
	btnFour.addEventListener("click", bh);
	btnFive.addEventListener("click", bh);
	btnSix.addEventListener("click", bh);

	btnCheckUm.addEventListener("click", bh);
	btnCheckDois.addEventListener("click", bh);


}

function messageHandler(ev){
	var buffer = ev.data;
	var vol = buffer[0];
	var teclas = buffer[1];

	var botoes = document.getElementsByClassName("check-button");

	if(teclas==1){
		botoes[0].src = "../resources/images/CheckBox_True.png";
		botoes[1].src = "../resources/images/CheckBox_empty.png";
	}
	else{
		botoes[0].src = "../resources/images/CheckBox_empty.png";
		botoes[1].src = "../resources/images/CheckBox_True.png";
	}

	if(vol==0){
		mudaImagensVolume(1, 0);
	}
	else if(vol==15){
		mudaImagensVolume(2, 0);
	}
	else if(vol==30){
		mudaImagensVolume(3, 0);
	}
	else if(vol==45){
		mudaImagensVolume(4, 0);
	}
	else if(vol==60){
		mudaImagensVolume(5, 0);
	}
	else if(vol==80){
		mudaImagensVolume(6, 0);
	}
	else if(vol==100){
		mudaImagensVolume(6, 1);
	}
}

function buttonHandler(ev){
	var blt = ev.currentTarget.id; // id do butao
	var botoes = document.getElementsByClassName("sound-button");
	switch(blt){
		case "voltar": parent.window.postMessage("voltar","*");
			break;
		case "check1":
			var botoes = document.getElementsByClassName("check-button");
			botoes[0].src = "../resources/images/CheckBox_True.png";
			botoes[1].src = "../resources/images/CheckBox_empty.png";

			parent.window.postMessage("teclas 1","*");
			break;
		case "check2":
			var botoes = document.getElementsByClassName("check-button");
			botoes[0].src = "../resources/images/CheckBox_empty.png";
			botoes[1].src = "../resources/images/CheckBox_True.png";

			parent.window.postMessage("teclas 2","*");
			break
		case "sound_one":
			res = botoes[0].src.split("/");
			if(res[res.length-1] == "1_on.png"){
				mudaImagensVolume(1, 0);  //vai colocar off==0
				parent.window.postMessage("volume 0","*");
			}
			else{
				mudaImagensVolume(1 ,1); //vai colocar on==1
				parent.window.postMessage("volume 15","*");
			}
			break;
		case "sound_two":
			res = botoes[1].src.split("/");
			if(res[res.length-1] == "2_on.png"){
				mudaImagensVolume(2, 0);  //vai colocar off==0
				parent.window.postMessage("volume 15","*");
			}
			else{
				mudaImagensVolume(2 ,1); //vai colocar on==1
				parent.window.postMessage("volume 30","*");
			}
			break;
		case "sound_three":
			res = botoes[2].src.split("/");
			if(res[res.length-1] == "3_on.png"){
				mudaImagensVolume(3, 0);  //vai colocar off==0
				parent.window.postMessage("volume 30","*");
			}
			else{
				mudaImagensVolume(3 ,1); //vai colocar on==1
				parent.window.postMessage("volume 45","*");
			}
			break;
		case "sound_four":
			res = botoes[3].src.split("/");
			if(res[res.length-1] == "4_on.png"){
				mudaImagensVolume(4, 0);  //vai colocar off==0
				parent.window.postMessage("volume 45","*");
			}
			else{
				mudaImagensVolume(4 ,1); //vai colocar on==1
				parent.window.postMessage("volume 60","*");
			}
			break;
		case "sound_five":
			res = botoes[4].src.split("/");
			if(res[res.length-1] == "5_on.png"){
				mudaImagensVolume(5, 0);  //vai colocar off==0
				parent.window.postMessage("volume 60","*");
			}
			else{
				mudaImagensVolume(5 ,1); //vai colocar on==1
				parent.window.postMessage("volume 80","*");
			}
			break;
		case "sound_six":
			res = botoes[5].src.split("/");
			if(res[res.length-1] == "6_on.png"){
				mudaImagensVolume(6, 0);  //vai colocar off==0
				parent.window.postMessage("volume 80","*");
			}
			else{
				mudaImagensVolume(6 ,1); //vai colocar on==1
				parent.window.postMessage("volume 100","*");
			}
			break;
	}
}


function mudaImagensVolume(numBotao,bit){
	var caminho = "../resources/images/";
	let max=6;
	var res = "";
	var botoes = document.getElementsByClassName("sound-button");

	if(bit==1){
		max = numBotao;
		numBotao = 1;
	}
	for (let i = numBotao; i <= max; i++) {
		if(bit == 0){
			res = caminho + i + "_off.png";
		}
		else{
			res = caminho + i + "_on.png";
		}
		botoes[i-1].src = res;
	}
}