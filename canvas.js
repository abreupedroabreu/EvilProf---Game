"use strict";

(function()
{
	window.addEventListener("load", main);
}());

// variaveis globais para o movimento do turbo
var left = false;
var right = false;
var up = false;
var down = false;
var drag = false;

var mesas,nAlunos;
var tempo_random = 1;
var velocidade=1;
var teclado = 1;
var volume,volumeAux;
var mapa;
var dificuldade;
var pausa = 0;
var pontuacao = 0;
var totLoad,totObjetos,img_size; // vars para o init
var px0;
var py0;
var x0,y0,xInc,yInc,mod_x,mod_y,wMesa,incrementaLado;

var ALLSET = 0;
var coefPontuacao=1;
var incrementaMesa =0;

var FINISH = 0;

function main()
{	

	var btnMute,btnPausa,btnSair;

	window.addEventListener("message", messageHandler);  // fica a escuta de uma mensagem com as configuracoes do mapa
	
	parent.window.postMessage("MapConfigs","*");

	btnMute = document.getElementById("semSom");
	//btnPausa = document.getElementById("pausa");
	btnSair= document.getElementById("sair");
	
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var spArray;  //sprite array

	canvas.addEventListener("initend", initEndHandler);
	canvas.addEventListener("checkTimes", checkTimesHandler);

	var bh = function(ev){
		// removemos os event listeners
		//btnVoltar.removeEventListener("click", bh); 

		buttonHandler(ev);
	};

	// Cliques nos botoes
	btnMute.addEventListener("click", bh);

	//btnPausa.addEventListener("click", bh);

	btnSair.addEventListener("click",bh);
	

	function verificaAllSet() {   //Serve para se certificar que as configs carreguem todas
				
		if(ALLSET==1){

			init(ctx);	 //carregar todos os componentes
		}
		else{
			setTimeout(verificaAllSet, 100);
		}

	};
	verificaAllSet()
	//init(ctx);  //carregar todos os componentes


	//funções locais para gestão de eventos
	function initEndHandler(ev)
	{
		spArray = ev.spArray;
		//iniciar a animação
		startAnim(ctx, spArray);
	}

	function checkTimesHandler(ev){
		spArray = ev.spArray;

		checkTimes(spArray);
	}
}

function checkTimes(spArray){ //vai verificar se ja acabaram de copiar para voltar a por a imagem original

    var vef=0;

    function veTemposCopiancos(){
        if(FINISH==0){
            
            for (let i = mesas; i < nAlunos+mesas ; i++) {
                if(spArray[i].tipoCopiar > 0){
                    
                    if( (spArray[i].timeCopiar/1000 + spArray[i].duracaoCopiar) <= Date.now()/1000 ){
                        
                        spArray[i].tipo_copianco(0);
                        spArray[i].timeCopiar = 0;
                        spArray[i].duracaoCopiar = 0;
                    }
                }
           }
           setTimeout(veTemposCopiancos, 100);
        }
        else if(FINISH ==1 && vef==0){
			vef=1;
            parent.window.postMessage("SendPontuacao "+pontuacao.toString(),"*");    // vai comunicar com a janela pai, para verificar se a pontuacao obtida entra para o podio!
        }
    }

    veTemposCopiancos();


}

function messageHandler(ev){    // onde recebe as mensagens do pai com o pai
	var buffer = ev.data;
	volume = buffer[0];
	teclado = buffer[1];
	mapa = buffer[2];    //e preciso ver melhor na main
	dificuldade = buffer[3];
	
	mapConfigs();
	

}

function buttonHandler(ev){
	var blt = ev.currentTarget.id; // id do butao
	
	switch(blt){
		case "semSom":
			var btnSom = document.getElementById("semSom");

			if(volume>0){
				volumeAux = volume;
				volume=0;
				parent.window.postMessage("volume 0","*");
				btnSom.src = "../resources/images/mute.png";
			}
			else{
				volume = volumeAux;
				btnSom.src = "../resources/images/notMute.png";
				parent.window.postMessage("volume "+volume,"*");
			}
			
			break;
		/*case "pausa":
			var btnPausa = document.getElementById("pausa");
			if( pausa == 0){
				btnPausa.innerHTML = 'Continuar';
				pausa = 1;
			}
			else{
				btnPausa.innerHTML = 'Pausa';
				pausa = 0;
			}
			break;*/
		case "sair":
			var btnSair = document.getElementById("sair");
			parent.window.postMessage("sair","*");
			break;
	}
}
//init: carregamento de componentes
function init(ctx)
{

	var nLoad = 0;
	var i=0;
	var loadImg5 = 0;
	var xAluno=0;
	var spArray = new Array(totObjetos);
	var Objetos =  new Array(img_size);      // generalizar com o numero de alunos

	var cont=0;
	var v = new Array(totLoad);
	var conjI = new Array(totLoad);

	for (var i = 0 ; i <totObjetos; i++) {
		v[i] = new Image();
		
		v[i].addEventListener("load", imgLoadedHandler);
		if(i < mesas ){
			if(mapa==0){
				v[i].src = "../resources/images/mesa.png";
				v[i].id = i.toString();
				v[i].style.zIndex = "0";
			}
			if(mapa==1){
				v[i].src = "../resources/images/mesa_esticada1.png";
				v[i].id = i.toString();
				v[i].style.zIndex = "0";
			}
			//console.log(v[i].id);
		}
		else if(i>=mesas && i<nAlunos+mesas){
			v[i].src = "../resources/images/aluno.png";
			v[i].id = i.toString() + " 0";
			v[i].style.zIndex = "0";	

			conjI[i] = new ConjuntoImg();
			conjI[i].img1.src = "../resources/images/olhar_dir.png";
			conjI[i].img2.src ="../resources/images/olhar_esq.png";
			conjI[i].img3.src ="../resources/images/tele.png";
			conjI[i].img4.src ="../resources/images/scroll.png";
			conjI[i].img5.src ="../resources/images/out.png";
			conjI[i].img1.id = i.toString() + " 1";
			conjI[i].img2.id = i.toString() + " 2";
			conjI[i].img3.id = i.toString() + " 3";
			conjI[i].img4.id = i.toString() + " 4";
			conjI[i].img5.id = i.toString() + " 5";
			conjI[i].img1.addEventListener("load", imgLoadedHandler);
			conjI[i].img2.addEventListener("load", imgLoadedHandler);
			conjI[i].img3.addEventListener("load", imgLoadedHandler);
			conjI[i].img4.addEventListener("load", imgLoadedHandler);
			conjI[i].img5.addEventListener("load", imgLoadedHandler);

		}
		else{
			v[i].src = "../resources/images/professor.png";
			v[i].id = "prof";
			v[i].style.zIndex = "2";
		}
	}
	//estilos de texto
	ctx.fillStyle = "#993333";
	ctx.font = "12px helvetica";	
	ctx.textBaseline = "bottom"; 
	ctx.textAlign = "center";  

	//carregar imagens e criar sprites

	
	function imgLoadedHandler(ev)
	{
		var img = ev.target;
		var nw = img.naturalWidth;
		var nh = img.naturalHeight;
		var sp;
		var id,id2;

		if(img.id != "prof"){
			var id_full = img.id.split(" ");
			
			id = parseInt(id_full[0]);
			id2 = parseInt(id_full[1]);
		}
		if(img.id == "prof"){
				sp = new Objeto(px0, py0, nw/7, nh/7, velocidade, false, img);
				spArray[nAlunos+mesas] = sp;

			
		}
		else if(id<mesas){ // mesa
			//id = parseInt(img.id);
			
			if(mapa==1){
				var aux = pos_xy_calculator(id,1);
				//incrementaMesa = 300;
			}
			else{
				var aux = pos_xy_calculator(id,0);
			}
			var x = aux[0] ;
			var y = aux[1];
			
			
            sp = new Objeto(x0+x*xInc*incrementaMesa, y*yInc+y0-10, wMesa, 50, 1, false, img);

			spArray[id] = sp;
	                
		}
		else{ // aluno

			if(id2 == 0){
				
				if(mapa==1){
					var aux = pos_xy_calculator(id-(mesas),0);
				}
				else{
					var aux = pos_xy_calculator(id-(mesas),0);
				}
				
				
				var x = aux[0] ;
				var y = aux[1];
				
				if(mapa==1){
						
					var incremento = XY_incrementoMapa2(x);

					//console.log("ALUNO: "+xAluno+"x: "+x+" y:"+y+ " "+"id:"+id);
					sp = new Aluno(x*xInc+x0+incremento, y*yInc+y0, 40, 50, 1, false, img);
            
					
					spArray[id] = sp;
						
						
				}
					
				
				if(mapa==0){
					sp = new Aluno(x*xInc+x0, y*yInc+y0, 40, 50, 1, false, img);
					spArray[id] = sp;
				}
	
				
						
						//ctx.drawImage(img,x*330+100, y*180+180,80,80);

			}
			else{
				
				Objetos[(id-mesas)*5 + id2-1] = img;
				Objetos[(id-mesas)*5 + id2-1].style.visibility = "hidden";

				var can = document.createElement("canvas"); // cria a canvas
				var ctx1 = can.getContext("2d");

				loadImg5++;
				if(mapa==1){
					
					var aux = pos_xy_calculator(id-(mesas),0);
				}
				else{
					var aux = pos_xy_calculator(id-(mesas),0);
				}
				
				var x = aux[0] ;
				var y = aux[1];

				if(mapa==1){
					var incremento = XY_incrementoMapa2(x);
						
					ctx1.drawImage(Objetos[(id-mesas)*5 + id2-1], x*xInc+x0+incremento, y*yInc+y0, 50, 60); // desenhamos o objeto na canvas
					
				}
				else{
					ctx1.drawImage(Objetos[(id-mesas)*5 + id2-1], x*xInc+x0, y*yInc+y0, 50, 60); // desenhamos o objeto na canvas
				}

			}
			         
		}

		nLoad++;		
		//console.log(nLoad+ " "+totLoad);
		if (nLoad == totLoad && loadImg5==nAlunos*5)
		{
			for( var i =0 ; i<nAlunos;i++){
				for( var k =0 ; k<5 ; k++){
					//console.log("o i e "+i+" e o k: "+ k+" o id da imagem e: " + Objetos[i*5 + k].id);
					spArray[i+mesas].receber_imagem( Objetos[i*5 + k] , k+1  );
				}
			}
			
			var ev2 = new Event("initend");
			ev2.spArray = spArray;
			ctx.canvas.dispatchEvent(ev2);

			var ev3 = new Event("checkTimes");
			ev3.spArray = spArray;
			ctx.canvas.dispatchEvent(ev3);
			
			
			function periodicall() {
				

				if(FINISH==0){
					var vef=0;
					var rand = Math.floor(Math.random() * nAlunos) + mesas; // 20 a 39
					var randCop = Math.floor(Math.random() * 5) + 1;
					
					
					if(spArray[rand].tipoCopiar == 0){
						
						if(randCop == 1 && (rand%mod_x+1==mod_x)){
							
							spArray[rand].tipo_copianco(2);
							atualizaTempoCopianco(rand,spArray);
							
						}

						else if(randCop == 2 && (rand%mod_x==0)){
							spArray[rand].tipo_copianco(1);
							atualizaTempoCopianco(rand,spArray);
						}

						else if(randCop == 5){ // se for do tipo copianco 5 (falar)
							if(rand%mod_x+1!=mod_x && rand%mod_x!=0 ){
								if(spArray[rand+1].tipoCopiar==0 ){ 
									
									spArray[rand].tipo_copianco(51);
									
									spArray[rand+1].tipo_copianco(52);
									atualizaTempoCopianco(rand,spArray);
									atualizaTempoCopianco(rand+1,spArray);

									vef =1;
								}

									
								if(spArray[rand-1].tipoCopiar==0 && vef==0){
									spArray[rand].tipo_copianco(52);
									spArray[rand-1].tipo_copianco(51);
									atualizaTempoCopianco(rand,spArray);
									atualizaTempoCopianco(rand-1,spArray);

								
								}
								vef =0;
							}

						}
	
						else {
							spArray[rand].tipo_copianco(randCop); // 1 a 4
							atualizaTempoCopianco(rand,spArray);
						}

					}

					
					setTimeout(periodicall, Math.floor(Math.random() * tempo_random) * 1000); // 0 a 2000 ms
				}

			};
			periodicall();
		}
	}
}

//desenha mesas

function pos_xy_calculator(number,comando){   // modx e o numero de colunas e mody e o numero de linhas 
	var x,y=0;			
	var linhas,colunas;						// modx * mody = numero de mesas
	var com = [];

	if(mapa==1){
		if(comando==1){
			colunas = mod_y;
			linhas = mod_y;
		}
		else{
			colunas = mod_y;
			linhas = mod_x;
		}

	}
	else{
		colunas = mod_y;
		linhas = mod_x;
	}
	x = number%linhas;

	for (let i = 1; i <= colunas; i++) {
	
		if( number >= linhas*i){
			y++;
		}
		else{
			break;
		}
	}

	com[0] = x;
	com[1] = y;

	return com;
}

//iniciar animação
function startAnim(ctx, spArray)
{
	var auxDate = new Date();
	var auxTime = auxDate.getTime();

	draw(ctx, spArray);
	animLoop(ctx, spArray, auxTime);	
}


//desenhar sprites
function draw(ctx, spArray)
{
	var dim = spArray.length;

	for (let i = 0; i < dim; i++)
	{
		spArray[i].draw(ctx);
	}
}


//apagar sprites
function clear(ctx, spArray)
{
	var dim = spArray.length;

	for (let i = 0; i < dim; i++)
	{
		spArray[i].clear(ctx);
	}
}


//-------------------------------------------------------------
//--- controlo da animação: coração da aplicação!!!
//-------------------------------------------------------------


function animLoop(ctx, spArray, auxTime)
{	
	var al = function(time)
	{
		animLoop(ctx, spArray, auxTime);
	}
	var reqID = window.requestAnimationFrame(al);

	var auxDate = new Date();
	var dt = auxDate.getTime() - auxTime;

	render(ctx, spArray, reqID, dt);
}

//resedenho, actualizações, ...
function render(ctx, spArray, reqID, dt)
{
	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;

	// fica a escuta do teclado -- vao para o mesmo handler
	window.addEventListener("keydown",keyHandler);
    window.addEventListener("keyup",keyHandler);

	//apagar canvas
	ctx.clearRect(0, 0, cw, ch);

	//animar sprites
	
	var prof = spArray[mesas+nAlunos]; // Movimento do prof


	Moviment(prof,spArray);
	

	// escrever o ranking no quadro
	ctx.font = "100px Stencil";
	ctx.fillStyle = "#FFEC00"
	var txt = pontuacao;
	ctx.fillText(txt, cw/2, 80);


	draw(ctx, spArray);
}


function Moviment(prof,array){
	if (right){
		if(verificaColisoes(prof,array,1) == false){
			prof.x += prof.speed;
		}
			
	}

	if (left) {
		if(verificaColisoes(prof,array,2) == false){
			prof.x -= prof.speed;
		}
		
	}
	
	if (up) {
		if(verificaColisoes(prof,array,3) == false){
			prof.y -= prof.speed;
		}
		
	}
	
	if (down){
		if(verificaColisoes(prof,array,4) == false){
			prof.y += prof.speed;
		}
		
	} 
	
}


function audioCanPlayHandler(ev) {
	var aud = ev.target;
	aud.play().catch(function() {
    	// do something
	});;
}

function keyHandler(ev){
	var key_state=(ev.type=="keydown")?true:false; // verifica se o utilizador carregou na tecla ou tirou o dedo da tecla


	if(teclado==1 && FINISH==0){     //controlo com setas
		switch(ev.keyCode){
			// Esquerda
			case 37:  // esquerda seta
				left=key_state;
				break;
	
			// Direita
			case 39: // direita seta
				right=key_state;
				break;
	
			// Cima
			case 38: // cima seta
				up=key_state;
				break;
	
			// Baixo
			case 40: // baixo seta
				down=key_state;
				break;
			
		}
	}
	else if(teclado == 2){   				// a w s d
		switch(ev.keyCode){
			// Esquerda
			case 65: // A
				left=key_state;
				break;
	
			// Direita
			case 68: // D
				 right=key_state;
				break;
	
			// Cima
			case 87: // W
				up=key_state;
				break;
	
			// Baixo
			case 83: // S
				down=key_state;
				break;
		}
	}
	
}



function escolheAlunoCopiar(spArray){
	var idAluno;

	idAluno = Math.floor((Math.random() * mod_y*mod_x+1) + mod_y*mod_x+1) // do indice 21 até ao fim do array, que é onde estao os alunos
	
	var tipoCop = Math.floor((Math.random() * 4) + 1); // valores entre 1 e 4
	
	spArray[idAluno].tipoCopianco(tipoCop);


}

function verificaColisoes(professor,spArray,flag){

	

	var a = professor.getPos(); // vetor de coordenadas da posicao do professor
	var copRet;

	a = vetorPrevisao( a, flag, professor.speed);
	
	if( verificaParedes(a, flag) == true ){
		return true;
	}

			
	for(let j=0; j< spArray.length-1 ;j++){


		if(  professor.detetaColisao( spArray[j] , a ) == true   ){ 

			if( spArray[j] instanceof Aluno){

				if(spArray[j].tipoCopiar > 0 && spArray[j].tipoCopiar <= 4  ){
					laughSoundEffect();
				
					if(spArray[j].tipoCopiar == 1){
						
						copRet = strikeAluno(spArray,1,j);
						if(copRet==2){
							spArray[j].restaurarAluno();
						}

					}
					else if(spArray[j].tipoCopiar == 2){
						
						copRet = strikeAluno(spArray,2,j);
						if(copRet==2){
							spArray[j].restaurarAluno();
						}
						
						
					}
					else if(spArray[j].tipoCopiar == 3){
						copRet = strikeAluno(spArray,3,j);
						if(copRet==2){
							spArray[j].restaurarAluno();
						}
						
					}
					else if(spArray[j].tipoCopiar == 4){
						copRet = strikeAluno(spArray,4,j);
						if(copRet==2){
							spArray[j].restaurarAluno();
						}
						
					}
					
					
					
					pontuacao = pontuacao+100*coefPontuacao;
					
					return true;
				}

				if(spArray[j].tipoCopiar == 51 ){
					
					laughSoundEffect();
					pontuacao = pontuacao+100*coefPontuacao;
					copRet = strikeAluno(spArray,51,j);
						if(copRet==2){
							spArray[j].restaurarAluno();
							spArray[j+1].restaurarAluno();
						}
						
					
					
					return true;

				}
				else if(spArray[j].tipoCopiar == 52){
					laughSoundEffect();
					pontuacao = pontuacao+100*coefPontuacao;
					copRet = strikeAluno(spArray,52,j);
						if(copRet==2){
							spArray[j].restaurarAluno();
							spArray[j-1].restaurarAluno();
						}
						
					
					return true;

				}
	
			}

			return true;
		}
	
	}
	return false;
}

function vetorPrevisao(a,flag,speed){
	if(flag==1){   //direita
		a[0] = a[0] + speed;
	}
	else if(flag==2){ //esquerda
		a[0] = a[0] - speed;
	}
	else if(flag==3){	//cima
		a[1] = a[1] - speed;
	}
	else if(flag==4){	//baixo
		a[1] = a[1] + speed;
	}
	return a;
}

function verificaParedes( a , flag){

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	
	var x = ctx.canvas.width;
	var y = ctx.canvas.height;

	
	if(flag==1){   //direita
		if(a[0] > x-65 ){
			return true
		}
	}
	else if(flag==2){ //esquerda
		if(a[0] < 0){
			return true;
		}
	}
	else if(flag==3){	//cima
		if(a[1] < 70){
			return true;
		}
	}
	else if(flag==4){	//baixo
		if(a[1]>y-85){
			return true;
		}
	}

	return false;
}

function mapConfigs()
{
	if( dificuldade==0){ // easy mode
		velocidade = 5;
		tempo_random = 5;
		coefPontuacao = 0.1;
	}
	if( dificuldade==1){ // medium mode
		velocidade = 4;
		tempo_random = 4;
		coefPontuacao = 0.4
	}
	if( dificuldade==2){ // hard mode
		velocidade = 3;
		tempo_random = 2;
		coefPontuacao = 1;
	}
	if(mapa==0){ // mapa1
		px0 = 200;
		py0 = 100;
		x0 = 110;
		xInc = 330;
		y0= 190;
		yInc = 250;
		mod_x=5;
		mod_y=3;
		incrementaMesa = 1;
		//num de mesas e alunos
		nAlunos = mod_y*mod_x;
		mesas = nAlunos;
		//incrementaLado = 0;
		//codigo para os objetos
		totLoad = mod_x*mod_y*2+mod_x*mod_y*5+1;     // (20 mesas + 20 alunos) + 80 imagens( 4 por aluno) + 1 professor
		totObjetos = mod_x*mod_y*2+1;
		img_size = mod_x*mod_y*5
		wMesa = 50;
	}
	if(mapa==1){ //mapa2
		
		px0 = 200;
		py0 = 100;
		x0 = 100;
		xInc = 150;
		y0= 225;
		yInc = 250;
		mod_x=9;
		mod_y=3;
		nAlunos = mod_y*mod_x;
		mesas = mod_x;
		wMesa = 350;
		incrementaMesa = 3.5;
		//incrementaLado = 5;
		//codigo para os objetos
		//este codigo todo e preciso ser verificado
		totLoad = mesas+nAlunos+nAlunos*5+1;     // (20 mesas + 20 alunos) + 80 imagens( 4 por aluno) + 1 professor
		totObjetos = mesas+nAlunos+1;
		img_size = nAlunos*5
		
	}
	var twoMinutes = 60 * 2,
	display = document.getElementById('time');
	startTimer(twoMinutes, display);
	ALLSET = 1;
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            FINISH = 1;
        }
	}, 1000);
	
}

function atualizaTempoCopianco(pos,spArray){
	var randTime = Math.floor(Math.random() * 10) + 4
	spArray[pos].timeCopiar = Date.now();
	spArray[pos].duracaoCopiar = randTime;

}

function strikeAluno(spArray,copianc,pos){

	if(copianc == 1 ){
		spArray[pos].serApanhado -= 10;

	}
	else if(copianc == 2){
		spArray[pos].serApanhado -= 10;

	}


	else if(copianc == 3){
		spArray[pos].serApanhado -= 25;

	}

	else if(copianc == 4){
		spArray[pos].serApanhado -= 20;

	}

	else if(copianc == 51){
		spArray[pos].serApanhado -= 10;
		spArray[pos+1].serApanhado -= 10;
		console.log(spArray[pos].serApanhado + " "+spArray[pos].tipoCopiar + " "+spArray[pos+1].tipoCopiar);

	}
	else if(copianc == 52){
		spArray[pos].serApanhado -= 10;
		spArray[pos-1].serApanhado -= 10;

	}
	
	
	if(spArray[pos].serApanhado <=0 ){
		spArray[pos].kickAluno();
		return 1;
		
	}

	return 2;



}

function XY_incrementoMapa2(x){

	var incremento=0;

	for (let i = 1; i <= 3; i++) {
	
		if( x >= 3*i){
			incremento=incremento+80;
		}
		else{
			break;
		}
	}

	return incremento;
}


function laughSoundEffect(){
    var audio = document.getElementById("audioGame");
    audio.src="../resources/sound/laughSoundEffect.mp3"
}