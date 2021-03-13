"use strict";


class Aluno extends Objeto { 


    constructor(x, y, w, h, speed, clickable, img)
    {
        super(x, y, w, h, speed, clickable, img);
        
        this.tipoCopiar = 0;
        this.serApanhado= 100; 
        this.timeCopiar = 0;
        this.duracaoCopiar = 0;


        var canvas = document.createElement("canvas"); // cria a canvas
		var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, this.width, this.height); // desenhamos o objeto na canvas



    }
    draw(ctx){
        if( this.tipoCopiar ==0){
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
        else if( this.tipoCopiar ==1  ){
            ctx.drawImage(this.img1, this.x, this.y, this.width, this.height);
        }
        else if(  this.tipoCopiar ==51 ){
            ctx.drawImage(this.img1, this.x, this.y, this.width, this.height);
        }
        else if(  this.tipoCopiar ==52 ){
            ctx.drawImage(this.img2, this.x, this.y, this.width, this.height);
        }
        else if( this.tipoCopiar ==2 ){
            ctx.drawImage(this.img2, this.x, this.y, this.width, this.height);
        }        
        else if( this.tipoCopiar ==3 ){
            ctx.drawImage(this.img3, this.x, this.y, this.width, this.height);
        }
        else if( this.tipoCopiar ==4 ){
            ctx.drawImage(this.img4, this.x, this.y, this.width, this.height);
        }
        else if( this.serApanhado ==0 ){
            ctx.drawImage(this.img5, this.x, this.y, this.width, this.height);
        }
    }
    tipo_copianco(tipo){
        this.tipoCopiar = tipo;
        if(tipo==0){
            this.img.style.visibility="visible";
            this.img1.style.visibility="hidden";
            this.img2.style.visibility="hidden";
            this.img3.style.visibility="hidden";
            this.img4.style.visibility="hidden";
            this.img5.style.visibility="hidden"; // imagem do busted
            //muda_Imagens(0);
        }
        else if(tipo==1){   
            this.img1.style.visibility="visible";
            this.img.style.visibility="hidden";
            this.img2.style.visibility="hidden";
            this.img3.style.visibility="hidden";
            this.img4.style.visibility="hidden";
            this.img5.style.visibility="hidden"; // imagem do busted
            //muda_Imagens(1);
        }
        else if(tipo==2){
            this.img2.style.visibility="visible";
            this.img.style.visibility="hidden";
            this.img1.style.visibility="hidden";
            this.img3.style.visibility="hidden";
            this.img4.style.visibility="hidden";
            this.img5.style.visibility="hidden"; // imagem do busted
            //muda_Imagens(2);
        }
        else if(tipo==3){
            this.img3.style.visibility="visible";
            //muda_Imagens(3);
            this.img.style.visibility="hidden";
            this.img1.style.visibility="hidden";
            this.img2.style.visibility="hidden";
            this.img4.style.visibility="hidden";
            this.img5.style.visibility="hidden"; // imagem do busted
        }
        else if(tipo==4){
            this.img4.style.visibility="visible";
            //muda_Imagens(4);
            this.img.style.visibility="hidden";
            this.img1.style.visibility="hidden";
            this.img2.style.visibility="hidden";
            this.img3.style.visibility="hidden";
            this.img5.style.visibility="hidden"; // imagem do busted
        }
        else if(tipo==51){
            this.img1.style.visibility="visible";
            this.img.style.visibility="hidden";
            this.img2.style.visibility="hidden";
            this.img3.style.visibility="hidden";
            this.img4.style.visibility="hidden";
            this.img5.style.visibility="hidden"; // imagem do busted

        }
        else if(tipo==52){
            this.img2.style.visibility="visible";
            this.img.style.visibility="hidden";
            this.img1.style.visibility="hidden";
            this.img3.style.visibility="hidden";
            this.img4.style.visibility="hidden";
            this.img5.style.visibility="hidden"; // imagem do busted

        }
    }

    receber_imagem(img_aux,tipo){
        //console.log(" o id da imagem e: " + img_aux.id);
        if(tipo==1){   
            this.img1 =img_aux;
            //console.log(" o id da imagem1 e: " + this.img1.id);
            this.img1.style.visibility="hidden";
        }
        else if(tipo==2){
            this.img2=img_aux;
            //console.log(" o id da imagem2 e: " + this.img2.id);
            this.img2.style.visibility="hidden";
        }
        else if(tipo==3){
            this.img3 =img_aux;
            //console.log(" o id da imagem3 e: " + this.img3.id);
            this.img3.style.visibility="hidden";
        }
        else if(tipo==4){
            this.img4 = img_aux;
            //console.log(" o id da imagem4 e: " + this.img4.id);
            this.img4.style.visibility="hidden";
        }
        else if(tipo==5){
            this.img5 = img_aux;
            //console.log(" o id da imagem4 e: " + this.img4.id);
            this.img5.style.visibility="hidden";
        }
    }

    
    restaurarAluno(){
        this.tipo_copianco(0);
    }

    kickAluno(){

        this.img2.style.visibility="hidden";
        this.img.style.visibility="hidden";
        this.img1.style.visibility="hidden";
        this.img3.style.visibility="hidden";
        this.img4.style.visibility="hidden";
        this.img5.style.visibility="visible"; // imagem do busted
        this.serApanhado = 0;
        this.timeCopiar = -1;
        this.tipoCopiar = -1;
        console.log("BBBBBBBBBBB");
    }

}