let startButton = document.querySelector('button')

 let container = document.querySelector('.container');

 createGrid();
startButton.addEventListener('click', startGame)


 function createGrid(){

 	let weapons = ['&#9824;','&#9827','&#9829','&#9830'];
 	let text = '';
  let random1 = Math.floor(Math.random()*100);//11
       let random2 = Math.floor(Math.random()*100);//22
        let random3 = Math.floor(Math.random()*100);//44
         let random4 = Math.floor(Math.random()*100);//66
 	for(let i = 0; i < 100; i++){
      let random = Math.floor(Math.random()*10)
       if(random < 2){
         text += '<div id = "'+i+'" class = "box mud"></div>';
       }else{
       	 let randomWeapon = Math.floor(Math.random()*100)
       	 if(i == random1 || i == random2 || i == random3 || i == random4){ //nije sigurno 4
             text += '<div id = "'+i+'" class = "box weapon">'+weapons.pop()+'</div>';
       	 }else{
       	 	text += '<div id = "'+i+'" class = "box available"></div>';
       	 }
          
       }
    
 	}
    container.innerHTML = text; 
    placePlayers();
 }

 function placePlayers(){
     let allBoxes = document.querySelectorAll('.box');
     let availableSpots = document.querySelectorAll('.available');
     let random = Math.floor(Math.random()*allBoxes.length);
     let r = Math.floor(Math.random()*availableSpots.length);
    // let player1 = availableSpots[9];
     let player1 = availableSpots[r];
     player1.classList.add('player1')
     //player1.style.background = 'red';
     let player1Id = player1.id;
     let posibleSiblings = [];
     if(player1Id == 0){
       posibleSiblings = [ 1,10,11];   
     }else if(player1Id == 9){
        posibleSiblings = [8,18,19]
     }else if(player1Id == 90){
        posibleSiblings = [80,81,91]
     }else if(player1Id == 99){
        posibleSiblings = [88,89,98]
     }else if(player1Id %10 == 0){
        posibleSiblings = [+player1Id + 1, +player1Id + 10, +player1Id + 11, player1Id - 9, player1Id -10]
     }else if(player1Id % 10 == 9){
        posibleSiblings = [player1Id - 1,player1Id - 10, player1Id - 11, +player1Id +9, +player1Id +10]
     }else{
        posibleSiblings = [player1Id - 1, +player1Id + 1, player1Id - 9, player1Id  - 10, player1Id - 11, +player1Id + 9,+player1Id + 10,+player1Id + 11 ]
     }
  
     for(let i = 0; i < posibleSiblings.length; i++){ 
       if(allBoxes[posibleSiblings[i]]){
            allBoxes[posibleSiblings[i]].classList.remove('available')
     }
     }

//place player 2
availableSpots = document.querySelectorAll('.available');
random = Math.floor(Math.random()*availableSpots.length);
let player2Spot = availableSpots[random];
player2Spot.classList.add('player2');
//player2Spot.style.background = 'cadetblue';

 };

function startGame(){
    player1PosibleMovments('player1')

}

function player1PosibleMovments(playerClass){

  let allBoxes = document.querySelectorAll('.box')
  let player1 = document.querySelector('.'+ playerClass)
    let player1Id = parseInt(player1.id);
      let posibleMoves = []
        if(player1Id %10 == 0){
       
           posibleMoves = [[player1Id +1, player1Id +2], [player1Id -10, player1Id - 20], [player1Id +10, player1Id + 20]]
        }else if(player1Id %10 == 1){
   
             posibleMoves = [[player1Id - 1],[player1Id +1, player1Id +2], [player1Id -10, player1Id - 20], [player1Id +10, player1Id + 20]]
        }else if(player1Id %10 == 9){
    
              posibleMoves = [[player1Id -1, player1Id -2], [player1Id -10, player1Id - 20], [player1Id +10, player1Id + 20]]
        }else if(player1Id %10 == 8){
     
               posibleMoves = [[player1Id - 1,player1Id - 2],[player1Id +1], [player1Id -10, player1Id - 20], [player1Id +10, player1Id + 20]]
        }else{
          posibleMoves = [[player1Id - 1, player1Id - 2], [player1Id +1, player1Id + 2], [player1Id - 10, player1Id -20], [player1Id +10, player1Id +20]]
        }

        for(var i = 0; i< posibleMoves.length; i++){
           let line = posibleMoves[i];
           for(var k = 0; k < line.length; k++){
              let fieldId = line[k]
              if(allBoxes[fieldId] && !allBoxes[fieldId].classList.contains('mud')){
                 allBoxes[fieldId].classList.add('canMove')

              }else{
                break;
              }
           }
        }
        let canMoveDivs = document.querySelectorAll('.canMove')
         for(var i = 0; i < canMoveDivs.length; i++){
            canMoveDivs[i].onclick = playerMove;

         }
         function playerMove(){
          for(var i =0; i < canMoveDivs.length; i++){
           canMoveDivs[i].classList.remove('canMove')        
           allBoxes[player1Id].classList.remove(playerClass)
          }
           this.classList.add(playerClass)
           if(playerClass == 'player1'){
              playerClass = 'player2';
           }else{
            playerClass = 'player1';
           }
           player1PosibleMovments(playerClass)
          }
         }

  