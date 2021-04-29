document.addEventListener('DOMContentLoaded', () => {    //created DOM event listener all JS code will go in here
    const grid = document.querySelector('.grid') // created query selector  for div's 
    const confirmedKills = document.querySelector('#result') //Using # for Id instead of dot
    const endGame = document.querySelector('#endGame')
    const startBtn = document.querySelector('#button')
    let screenWidth = 20 // Let js know we want width of grid to be 15
    let playerOneLocation = 202 // this is where player 1 shooter will start
    let enemyLocation = 0 // this is where the enemy boxes will start
    let enemyMotherShipLocation = 0 //this is using math function below to create random location at start of game
    let enemysKilled = [] // this will count every time you killl enemy box ship
    let result = 0 // starting score enemys killed will increase result
    let directionMovement = 1 // tells each box ship how far it can move 
    let motherShipDirectionMovement = 1 // tells mother ship how many spaces it can move
    let invaderId 
    let motherShipId

    

    // will add divs now instead of listing them all
    for (let i = 0; i < 400; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
      }
      
      const boxes = Array.from(document.querySelectorAll('.grid div'))
    
    //Defines the enemy invdaders on how they will appear in the array
    const enemyInvaderMotherShip = [1,3,5]
    const enemyInvaders = [
        0,2,4,6,   10,12,14,16, 
        20,22,24,26,   30,32,34,36,
        //30,32,34,36,  48,50,52,54,
        //   60,62,64,66,   70,72,74,   78,80,82,84,
        //   90,92,94,96,   100,102,104,   108,110,112,114
    ]
    // draws enemy invaders- for each item in the array we will call invader 
    // I will pass this through the squares and any current index value there might be; 0 in this case
    // Then add a class list to that square. This will pull mothership and invader style from css 
    
    function draw() {
        for (let i = 0; i < enemyInvaders.length; i++) {
          if(!aliensRemoved.includes(i)) {
            boxes[enemyInvaders[i]].classList.add('invader')
          }
        }
      }

    function remove() {
        for (let i = 0; i < enemyInvaders.length; i++) {
          boxes[enemyInvaders[i]].classList.remove('invader')
        }
    }

    // enemyInvaderMotherShip.forEach( invader => boxes[enemyMotherShipLocation + invader].classList.add('motherShip'))
    // enemyInvaders.forEach( invader => boxes[enemyLocation + invader].classList.add('invader'))

    // function getRandomInt(min, max) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    //   }

        
        boxes[playerOneLocation].classList.add('shooter') // Using classList.add to style player

        // Moving the player 
        function movePlayerOne(e) {
            boxes[playerOneLocation].classList.remove('shooter') // This is removing shooters old location 
            switch(e.keyCode) { // using switch to assign keys to player movement
                case 37: //if the players current index is divisible by the width and leaves a remainder its allowed to move left
                    if(playerOneLocation % screenWidth !== 0) playerOneLocation -=1 // move left: 
                    break
                case 39: // if player index is divisible by width and # is less width -1 ===> then you can move right
                    if(playerOneLocation % screenWidth < screenWidth -1) playerOneLocation +=1// move right
                    break
                case 38: // need to create max top and bottom movements for player
                    playerOneLocation -= screenWidth
                    break
                case 40:
                    playerOneLocation += screenWidth
                    break
                }
                boxes[playerOneLocation].classList.add('shooter')
        }
            document.addEventListener('keydown', movePlayerOne)

            // move motherShip
            function moveMotherShip() {// need to define left edge and right edge 
                const leftEdge = enemyInvaderMotherShip[0] % screenWidth === 0
                const rightEdge = enemyInvaderMotherShip[enemyInvaderMotherShip.length -1] % screenWidth === screenWidth -1
                // if on left edge and direction = -1 or at right edge and direction is +1 ===> then set direction to motherShip location to pin to top
                if((leftEdge && motherShipDirectionMovement === -1) || (rightEdge && motherShipDirectionMovement === 1)){
                     motherShipDirectionMovement = enemyMotherShipLocation
                 } else if (motherShipDirectionMovement === enemyMotherShipLocation) {// if directions already screenwidth  we carry on w/ same logic above so if you hit left edge change direction to +1
                    if (leftEdge) motherShipDirectionMovement = 1
                    else motherShipDirectionMovement = -1
                }// loop over motherShip array to move enemy invaders
                for (let i = 0; i <= enemyInvaderMotherShip.length -1; i++) {
                    boxes[enemyInvaderMotherShip[i]].classList.remove('motherShip')
                }// loop over again to add new direction to all items in array
                for (let i = 0; i <= enemyInvaderMotherShip.length -1; i++) {
                    enemyInvaderMotherShip[i] += motherShipDirectionMovement
                } //loop over again to add class of mothership to the new location of all items in array
                for (let i = 0; i <= enemyInvaderMotherShip.length -1; i++) {
                    if (!enemysKilled.includes(i)) {
                        boxes[enemyInvaderMotherShip[i]].classList.add('motherShip')
                    }
                }
                

             }


            // move enemy invaders
            function moveInvaders() { // need to define left edge and right edge 
                const leftEdge = enemyInvaders[0] % screenWidth === 0
                const rightEdge = enemyInvaders[enemyInvaders.length -1] % screenWidth === screenWidth -1
                // if on left edge and direction = -1 or at right edge and direction is +1 ===> then set direction to screen width to drop down 1 row  
                if((leftEdge && directionMovement === -1) || (rightEdge && directionMovement === 1)){
                    directionMovement = screenWidth
                } else if (directionMovement === screenWidth) {// if directions already screenwidth  we carry on w/ same logic above so if you hit left edge change direction to +1
                    if (leftEdge) directionMovement = 1
                    else directionMovement = -1
                } // loop over enemy array to move enemy invaders
                for (let i = 0; i <= enemyInvaders.length -1; i++) {
                    boxes[enemyInvaders[i]].classList.remove('invader')
                } // loop over again to add new direction to all items in array
                for (let i = 0; i <= enemyInvaders.length -1; i++) {
                    enemyInvaders[i] += directionMovement
                } //loop over again to add class of invader to the new location of all items in array
                for (let i = 0; i <= enemyInvaders.length -1; i++) {
                    if (!enemysKilled.includes(i)) { //if enemys killed does not include space you can add invader class this means we wont add invaders after they've been shot
                        boxes[enemyInvaders[i]].classList.add('invader')
                    }
                }
        
                // if shooter touches invader it will end game
                if(boxes[playerOneLocation].classList.contains('invader', 'shooter')) {
                    confirmedKills.textContent = 'Game Over'
                    boxes[playerOneLocation].classList.add('boom')
                    clearInterval(invaderId)
                }
                // if enemyInvader touches last div(bottom of screen) it will end game
                for (let i = 0; i <= enemyInvaders.length -1; i++) {
                    if(enemyInvaders[i] > (boxes.length - (screenWidth-1))) {
                        confirmedKills.textContent = 'Game Over'
                        clearInterval(invaderId)
                    }
                }

                // if you kill all invaders you win
                if (enemysKilled.length === enemyInvaders.length) {
                    confirmedKills.textContent = 'You Win'
                    clearInterval(invaderId)
                }

                
            }
            //set speed of enemy     
            invaderId = setInterval(moveInvaders, 500)

            motherShipId = setInterval(moveMotherShip, 500)
            // motherShipId = setInterval(moveMotherShip, 500)
            



           // creates a laser to shoot enemy ships 
            function shoot(e) {
                let laserId
                let currentLaserIndex = playerOneLocation

                //laser function
                function moveLaser() {
                    boxes[currentLaserIndex].classList.remove('laser')// this will remove laser befor adding new position
                    currentLaserIndex -= screenWidth // laser will go back spaces = screenWidth (this makes laser go up 1)
                    boxes[currentLaserIndex].classList.add('laser')// this will add laser style to new box
                    if(boxes[currentLaserIndex].classList.contains('invader')) { // because we moved we want to check to see if we hit anything
                        boxes[currentLaserIndex].classList.remove('laser')//remove laser style
                        boxes[currentLaserIndex].classList.remove('invader')//remove invader style
                        boxes[currentLaserIndex].classList.add('boom') // create boom
                        const audio = new Audio("sound/sfx-boom.m4a");
                        audio.play();

                        setTimeout(() => boxes[currentLaserIndex].classList.remove('boom'), 250)// so the boom doesnt happen too fast set delay
                        clearInterval(laserId)
                        //This is adding up kills and displaying them at the
                        const alienTakenDown = enemyInvaders.indexOf(currentLaserIndex)
                        enemysKilled.push(alienTakenDown)
                        result++
                        confirmedKills.textContent = result 
                    }
                    
                    // this will stop laser from leaving the box if it misses enemy
                    if(currentLaserIndex < screenWidth) {
                        clearInterval(laserId)
                        setInterval(() => boxes[currentLaserIndex].classList.remove('laser'), 75)
                    }  
                
                }
                
                //asssignes moveLaser Function to spacebar
                switch(e.keyCode) { 
                    case 32:
                        laserId = setInterval(moveLaser, 75)
                        const audio = new Audio("sound/sfx-laser.m4a");
                        audio.play();
                        break
                }
             
            }
            document.addEventListener('keyup', shoot)
    })






