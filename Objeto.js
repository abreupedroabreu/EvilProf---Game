"use strict";

class Objeto
{
	constructor(x, y, w, h, speed, clickable, img)
	{
		//posição e movimento
		
		this.xIni = x;
		this.yIni = y;
		this.x = x;
		this.y = y;
		this.width = Math.round(w);
		this.height = Math.round(h);
		
		this.speed = speed;
		this.speedIni = speed; // utilizado no metodo do reset para estabelecer a velocidade como a inicial

		//imagem
		this.img = img;		

		// canvas 
		var canvas = document.createElement("canvas"); // cria a canvas
		var ctx = canvas.getContext("2d");
		
		canvas.width = this.width;	// as dimensoes sao as mesmas do objeto
        canvas.height = this.height;
		ctx.drawImage(img, 0, 0, this.width, this.height); // desenhamos o objeto na canvas
		//this.imgData = ctx.getImageData(0, 0, this.width, this.height); // salvamos o image data do objeto para detectar colisoes

		//rato
		this.clickableIni = clickable;
		this.clickable = clickable;			
	}



	draw(ctx)
	{
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}


	clear(ctx)
	{
		ctx.clearRect(this.x, this.y, this.width, this.height);
	}	


	getPos(){
		return [this.x, this.y, this.width, this.height];
	}


	detetaColisao(objeto, a){ // a : e o vetor previsao de posicao do professor


		var b = objeto.getPos();   // este vai ser o vetor de posicao do objeto enviado como parametro

		if( (a[0] < b[0]+b[2]) && (a[0] + a[2] > b[0]) && (a[1] < b[1] + b[3]) && (a[1] + a[3] > b[1]) ){ 
	
			return true;
		}

		return false
	}

	restaurarValores(flag){  // restaura os valores originais
		if(flag==1){   //direita
			this.x = this.x - this.speed;
		}
		else if(flag==2){ //esquerda
			this.x = this.x + this.speed;
		}
		else if(flag==3){	//cima
			this.y = this.y + this.speed;
		}
		else if(flag==4){	//baixo
			this.y = this.y - this.speed;
		}
	}


}