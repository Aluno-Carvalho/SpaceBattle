var nave;
var inimigo_img;
var inimigo_group = [];
var tirosInimigosMatriz = [];
var frames = 300;
var edges;
var asteroide;
var asteroide_img;
var asteroide_group;
var asteroide_option;
var tiro;
var tiros = [];
var background_img;
var energia = 300;
var tiro2_img;
var armazenarTiros = 0;
var pontuacao = 0;
var gameState = 1;

function setup(){
  createCanvas(600,600);
  angleMode(DEGREES);
  nave = new Nave();
  asteroide_group = createGroup();
  edges = createEdgeSprites();
  
}

function preload(){
inimigo_img = loadImage("images/naveInimiga.png");
asteroide_img = loadImage("images/asteroide.png");
background_img = loadImage("images/background.png");
tiro2_img = loadImage("images/tiro.png");
}

function draw(){
  background(background_img); 
  nave.show();

  if(nave.health <= 0){
    gameOver();
  }

  if(tirosInimigosMatriz[0] != null){
    for(var y = 0; y < tirosInimigosMatriz.length; y++){
      if(tirosInimigosMatriz[y] !== undefined && inimigo_group[y] !== undefined){
        if(tirosInimigosMatriz[y].y > 610 || (tirosInimigosMatriz[y].y > -50 && tirosInimigosMatriz[y].y < -40)){
          tirosInimigosMatriz[y].y = 100;
          tirosInimigosMatriz[y].x = inimigo_group[y].x
        }
      }
    }
  }
     

  if(inimigo_group[0] != null){

    tirosInimigos();

    for(var i = 0; i < inimigo_group.length; i++){

      if(inimigo_group[i] !== undefined){
        inimigo_group[i].bounceOff(edges[0]);
      inimigo_group[i].bounceOff(edges[1]);
      inimigo_group[i].bounceOff(edges[2]);
      inimigo_group[i].bounceOff(edges[3]);

      if(inimigo_group[i].y >= 100){
        inimigo_group[i].velocityY = 0;
      }
    }
  }
}  
  text(`Pontuação: ${pontuacao}`, 480,30);

  fill("Blue");
  text(energia + "/300", 50,30);

  

  fill("Red");
  text(`HP: ${nave.health}`, 50,60);

  if(energia < 300){
    energia = energia + 1;
  }

  if(tiros.length >= 1){
    
  for(var i = 0; i < tiros.length; i++){
    if(tiros[i] !== undefined){
      tiros[i].show();

      if(tiros[i].y < 0){
        tiros.splice(i,1);
      }
    }
   }
  }

  if(frameCount % 10 == 0){
    if(keyDown("w") && energia >= 50){ 
      console.log("test");
      criarTiros();
      energia = energia - 50;
    }
  }

  if(frameCount % 300 == 0){
    if(frames > 50){
      frames = frames - 25;
    }
  }

  if(keyDown("a") || keyDown("A")){
    

    if(nave.x > 1){
      nave.x = nave.x - 5;
    }
  }

  if(keyDown("d") || keyDown("D")){
    
    if(nave.x < 472){
      nave.x = nave.x + 5;
    }
  }


  colisaoTiroInimigo();
  drawSprites();
  inimigos();
  asteroides();

  for(var a = 0; a < asteroide_group.length; a++){
    if(asteroide_group[a] !== undefined){
      colisaoTiroAsteroide(a);
    }
  }

  colisaoAsteroide();

  for(var a = 0; a < inimigo_group.length; a++){
    if(inimigo_group[a] !== undefined){
      colisaoTiro(a);
    }
  }
}

function inimigos(){

  if(frameCount % frames === 0 && gameState == 1){

    var inimigo;

    inimigo = createSprite(285,-10);

    inimigo.x = Math.round(random(100,500));

    inimigo.addImage(inimigo_img);

    inimigo.velocityY = 5;
    
    if(Math.round(random(0,1)) == 0){
      inimigo.velocityX = 5;
    }
    else{
      inimigo.velocityX = -5;
    }

    inimigo.scale = - 0.6;

    inimigo_group.push(inimigo);
  }
}

function asteroides(){
  if(frameCount % frames === 0 && gameState == 1){

    asteroide = createSprite(-10,300);

    asteroide.scale = 0.1;

    asteroide.y = Math.round(random(100,400))

    asteroide.addImage(asteroide_img);

    asteroide_option = Math.round(random(0,1))

    if(asteroide_option == 0){
      asteroide.rotation = -110;

      asteroide.velocityX = -10;

      asteroide.x = -10;
    }

    else{
      asteroide.rotation = 0;

      asteroide.velocityX = -8;

      asteroide.x = 610;
    }

     asteroide.velocityY = 5;

    asteroide_group.add(asteroide);
  }
}

  function criarTiros(){
    var tiro = new Tiro(nave.x + 43);
    tiros.push(tiro);
  }

  function tirosInimigos(){

    if(tirosInimigosMatriz.length < inimigo_group.length && gameState == 1){
      if(inimigo_group[armazenarTiros] !== undefined){
        var tiro2;
        
        tiro2 = createSprite(100, 100);

        tiro2.x = inimigo_group[armazenarTiros].x;
    
        tiro2.addImage(tiro2_img);
    
        tiro2.velocityY = 8;
    
        tiro2.scale = -0.4;
    
        tirosInimigosMatriz.push(tiro2);
    
        armazenarTiros++;
    }
   }
  }


  function colisaoTiroInimigo(){
    if(tirosInimigosMatriz.length >= 1){
      for(var i = 0; i < tirosInimigosMatriz.length; i++){
        if(tirosInimigosMatriz[i] !== undefined)
        if((tirosInimigosMatriz[i].x + 18 >= nave.x) && (nave.x + 100 >= tirosInimigosMatriz[i].x)){
          if((tirosInimigosMatriz[i].y + 26 >= nave.y) && (nave.y + 100 >= tirosInimigosMatriz[i].y)){
            tirosInimigosMatriz[i].y = -200;
            nave.health = nave.health - 1;
            console.log(nave.health);
          }
        }
      }
    }
  }

  function colisaoTiro(index){
    if(tiros.length >= 1){
      for(var i = 0; i < tiros.length; i++){
        if(tiros[i] !== undefined && inimigo_group[index] !== undefined){
          if((tiros[i].x + 10 >= inimigo_group[index].x) && (inimigo_group[index].x + 67 >= tiros[i].x)){
            if((tiros[i].y + 25 >= inimigo_group[index].y) && (inimigo_group[index].y + 50 >= tiros[i].y)){
              //Usar o splice matriz.splice(i,1);
              console.log("teste tiro");
              pontuacao = pontuacao + 100;
              inimigo_group[index].destroy();
              inimigo_group.splice(index,1);
              console.log(pontuacao);
              if(tirosInimigosMatriz[index] !== undefined){
                if(tirosInimigosMatriz[index].y < 0 || tirosInimigosMatriz[index].y > 600){
                  tirosInimigosMatriz[index].destroy();
                  tirosInimigosMatriz.splice(index,1);
                }
              }
              
              
              delete tiros[i];
              tiros.splice(i,1);
            }
          }
        }
      }
    }
  }
        

  function colisaoAsteroide(){
    if(asteroide_group.length >= 1 && gameState == 1){
    for(var i = 0; i < asteroide_group.length; i++){
    if(asteroide_group[i] !== undefined){
    if((asteroide_group[i].x + 40 >= nave.x) && (nave.x + 60 >= asteroide_group[i].x)){
      if((asteroide_group[i].y + 50 >= nave.y) && (nave.y + 60 >= asteroide_group[i].y)){
        nave.health = nave.health - 1;
        console.log(nave.health);
        console.log("colisaoAsteroide");
        asteroide_group[i].destroy();
        asteroide_group.splice(i,1);
      }
    }
   }
  }
 }
}

function colisaoTiroAsteroide(index){
  if(tiros.length >= 1){
    for(var i = 0; i < tiros.length; i++){
      if(tiros[i] !== undefined && asteroide_group[index] !== undefined){
        if((tiros[i].x + 15 >= asteroide_group[index].x) && (asteroide_group[index].x + 60 >= tiros[i].x)){
          if((tiros[i].y + 30 >= asteroide_group[index].y) && (asteroide_group[index].y + 90 >= tiros[i].y)){
            console.log("teste asteroide");
            pontuacao = pontuacao + 300;
            console.log(pontuacao);
            asteroide_group[index].destroy();
            asteroide_group.splice(index,1);
            delete tiros[i];
            tiros.splice(i,1);
          }
        }
      }
    }
  }
}

function gameOver(){
  gameState = 0;

  if(asteroide_group[length - 1] !== undefined){
  asteroide_group[length - 1].velocityX = 0;
  asteroide_group[length - 1].velocityY = 0;
 }


 for(var i = 0; i < inimigo_group.length; i++){

  if(inimigo_group[i] !== undefined){
    inimigo_group[i].velocityX = 0;
    tirosInimigosMatriz[i].destroy();
  }
 }

 swal(

  {title: `Fim de Jogo`,
  text: `Clique no botão para reiniciar`,
  image: "images/nave2.png",
  imageSize: "100 x 100",
  confirmButtonText: "Reiniciar"},
  function(isConfirm){
    if(isConfirm){
      location.reload();
    }
  }

 )
}
      
