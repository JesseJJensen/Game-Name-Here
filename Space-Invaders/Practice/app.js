document.addEventListener('DOMContentLoaded', () => {    //created DOM event listener all JS code will go in here
    const boxes = document.querySelectorAll('.grid div') // created query selector  for div's 
    const confirmedKills = document.querySelector('#result') //Using # for Id instead of dot
    let screenWidth = 30 // Let js know we want width of grid to be 15
    let playerOneLocation = 404 // this is where player 1 shooter will start
    let enemyLocation = 0 // this is where the enemy boxes will start
    let enemyMotherShipLocation = 0//getRandomInt(3, 27) //this is using math function below to create random location at start of game
    let enemysKilled = [] // this will count every time you killl enemy box ship
    let result = 0 // starting score enemys killed will increase result
    let directionMovement = 1 // tells each box ship how far it can move 
    let motherShipDirectionMovement = 1 // tells mother ship how many spaces it can move
    let invaderId 
    let motherShipId
    
    //Defines the enemy invdaders on how they will appear in the array
    const enemyInvaderMotherShip = [0]
    const enemyInvaders = [
        // 0,2,4,6,8,
        //15,17,19,21,23,  
        //30,32,34,36,38,
        //45,47,49,51,53,
        60,//62,64,66,68, 
        // 75,77,79,81,83,
        // 90,92,94,96,98,
        // 105,107,109,111,113
    ]
    // draws enemy invaders- for each item in the array we will call invader 
    // I will pass this through the squares and any current index value there might be; 0 in this case
    // Then add a class list to that square. This will pull mothership and invader style from css 
    enemyInvaderMotherShip.forEach( invader => boxes[enemyMotherShipLocation + invader].classList.add('motherShip'))
    enemyInvaders.forEach( invader => boxes[enemyLocation + invader].classList.add('invader'))

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



            // function moveMotherShip(e) {
            //     boxes[enemyMotherShipLocation].classList.remove('motherShip')
            //     switch(e.keyCode) {
            //         case 32:
            //             if(enemyMotherShipLocation % screenWidth < screenWidth -1) enemyMotherShipLocation +=1 {}
            //             break
            //         case 37:
            //             if(enemyMotherShipLocation % screenWidth >= screenWidth -1) enemyMotherShipLocation = 0
            //             break 

            //         }
            //         boxes[enemyMotherShipLocation].classList.add('motherShip')
            // }
            //     document.addEventListener('keydown', moveMotherShip)
            //     document.addEventListener('keyup', moveMotherShip)
    
        

            function moveMotherShip() {
                const leftEdge = enemyInvaderMotherShip[0] % screenWidth === 0
                const rightEdge = enemyInvaderMotherShip[enemyInvaderMotherShip.length -1] % screenWidth === screenWidth -1
                
                if((leftEdge && motherShipDirectionMovement === -1) || (rightEdge && motherShipDirectionMovement === 1)){
                     motherShipDirectionMovement = enemyMotherShipLocation
                 } else if (motherShipDirectionMovement === enemyMotherShipLocation) {
                    if (leftEdge) motherShipDirectionMovement = 1
                    else motherShipDirectionMovement = -1
                }
                for (let i = 0; i <= enemyInvaderMotherShip.length -1; i++) {
                    boxes[enemyInvaderMotherShip[i]].classList.remove('motherShip')
                }
                for (let i = 0; i <= enemyInvaderMotherShip.length -1; i++) {
                    enemyInvaderMotherShip[i] += motherShipDirectionMovement
                }
                for (let i = 0; i <= enemyInvaderMotherShip.length -1; i++) {
                    if (!enemysKilled.includes(i)) {
                        boxes[enemyInvaderMotherShip[i]].classList.add('motherShip')
                    }
                }
                

             }


            // // move enemy invaders
            // function moveInvaders() { // need to define left edge and right edge 
            //     const leftEdge = enemyInvaders[0] % screenWidth === 0
            //     const rightEdge = enemyInvaders[enemyInvaders.length -1] % screenWidth === screenWidth -1
            //     // if on left edge and direction = -1 or at right edge and direction is +1 ===> then set direction to screen width to drop down 1 row  
            //     if((leftEdge && directionMovement === -1) || (rightEdge && directionMovement === 1)){
            //         directionMovement = screenWidth
            //     } else if (directionMovement === screenWidth) {// if directions already screenwidth  we carry on w/ same logic above so if you hit left edge change direction to +1
            //         if (leftEdge) directionMovement = 1
            //         else directionMovement = -1
            //     } // loop over enemy array to move enemy invaders
            //     for (let i = 0; i <= enemyInvaders.length -1; i++) {
            //         boxes[enemyInvaders[i]].classList.remove('invader')
            //     } // loop over again to add new direction to all items in array
            //     for (let i = 0; i <= enemyInvaders.length -1; i++) {
            //         enemyInvaders[i] += directionMovement
            //     } //loop over again to add class of invader to the new location of all items in array
            //     for (let i = 0; i <= enemyInvaders.length -1; i++) {
            //         if (!enemysKilled.includes(i)) {
            //             boxes[enemyInvaders[i]].classList.add('invader')
            //         }
            //     }
        

            //     if(boxes[playerOneLocation].classList.contains('invader', 'shooter')) {
            //         confirmedKills.textContent = 'Game Over'
            //         boxes[playerOneLocation].classList.add('boom')
            //         clearInterval(invaderId)
            //     }
        
            //     for (let i = 0; i <= enemyInvaders.length -1; i++) {
            //         if(enemyInvaders[i] > (boxes.length - (screenWidth-1))) {
            //             confirmedKills.textContent = 'Game Over'
            //             clearInterval(invaderId)
            //         }
            //     }


            //     if (enemysKilled.length === enemyInvaders.length) {
            //         confirmedKills.textContent = 'You Win'
            //         clearInterval(invaderId)
            //     }
            // }

            // invaderId = setInterval(moveInvaders, 75)
            motherShipId = setInterval(moveMotherShip, 100 )
            
            function shoot(e) {
                let laserId
                let currentLaserIndex = playerOneLocation


                function moveLaser() {
                    boxes[currentLaserIndex].classList.remove('laser')
                    currentLaserIndex -= screenWidth
                    boxes[currentLaserIndex].classList.add('laser')
                    if(boxes[currentLaserIndex].classList.contains('invader')) {
                        boxes[currentLaserIndex].classList.remove('laser')
                        boxes[currentLaserIndex].classList.remove('invader')
                        boxes[currentLaserIndex].classList.add('boom')

                        setTimeout(() => boxes[currentLaserIndex].classList.remove('boom'), 250)
                        clearInterval(laserId)

                        const alienTakenDown = enemyInvaders.indexOf(currentLaserIndex)
                        enemysKilled.push(alienTakenDown)
                        result++
                        confirmedKills.textContent = result 
                    }
e
                    if(currentLaserIndex < screenWidth) {
                        clearInterval(laserId)
                        setInterval(() => boxes[currentLaserIndex].classList.remove('laser'), 75)
                    }
                
                }

                switch(e.keyCode) {
                    case 32:
                        laserId = setInterval(moveLaser,200)
                        break
                }
                
            }



            document.addEventListener('keyup', shoot)
    })

    








