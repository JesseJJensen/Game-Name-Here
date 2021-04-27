document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.grid div')
    const confirmedKills = document.querySelector('#result')
    let screenWidth = 30
    let playerOneLocation = 404//Shooter Index
    let enemyLocation = 0
    let enemysKilled = []
    let result = 0
    let directionMovement = 1 
    let invaderId 
    let motherShipId
    

    const enemyInvaderMotherShip = [8,9,10]
    const enemyInvaders = [
        // 0,2,4,6,8,
        //15,17,19,21,23,  
        //30,32,34,36,38,
        //45,47,49,51,53,
        60,62,64,66,68, 
        // 75,77,79,81,83,
        // 90,92,94,96,98,
        // 105,107,109,111,113
    ]

    enemyInvaderMotherShip.forEach( invader => boxes[enemyLocation + invader].classList.add('motherShip'))
        enemyInvaders.forEach( invader => boxes[enemyLocation + invader].classList.add('invader'))


        boxes[playerOneLocation].classList.add('shooter')


        function moveShooter(e) {
            boxes[playerOneLocation].classList.remove('shooter')
            switch(e.keyCode) {
                case 37:
                    if(playerOneLocation % screenWidth !== 0) playerOneLocation -=1
                    break
                case 39:
                    if(playerOneLocation % screenWidth < screenWidth -1) playerOneLocation +=1
                    break
                case 38:
                    boxes[playerOneLocation].classList.remove('shooter')
                    playerOneLocation -= screenWidth
                    break
                case 40:
                    boxes[playerOneLocation].classList.remove('shooter')
                    playerOneLocation += screenWidth
                    break
                }
                boxes[playerOneLocation].classList.add('shooter')
        }
            document.addEventListener('keydown', moveShooter)

            // function moveMotherShip() {
            //     const leftEdge = enemyInvaderMotherShip[0] % screenWidth === 0
            //     const rightEdge = enemyInvaderMotherShip[enemyInvaderMotherShip.length -1] % screenWidth === screenWidth -1

            //     if((leftEdge && directionMovement === -1) || (rightEdge && directionMovement === 1)){
            //         directionMovement = screenWidth
            //     } else if (directionMovement === screenWidth) {
            //         if (leftEdge) directionMovement = 1
            //         else directionMovement = -1
            //     }
            //     for (let i = 0; i <= enemyInvaderMotherShip.length -1; i++) {
            //         boxes[enemyInvaderMotherShip[i]].classList.remove('motherShip')
            //     }
            //     for (let i = 0; i <= enemyInvaderMotherShip.length -1; i++) {
            //         enemyInvaderMotherShip[i] += directionMovement
            //     }
            //     for (let i = 0; i <= enemyInvaderMotherShip.length -1; i++) {
            //         if (!enemysKilled.includes(i)) {
            //             boxes[enemyInvaderMotherShip[i]].classList.add('motherShip')
            //         }
            //     }

            //     if(boxes[playerOneLocation].classList.contains('motherShip', 'shooter')) {
            //         confirmedKills.textContent = 'Game Over'
            //         boxes[playerOneLocation].classList.add('boom')
            //         clearInterval(motherShipId)
            //     }
        
            //     for (let i = 0; i <= enemyInvaders.length -1; i++) {
            //         if(enemyInvaders[i] > (boxes.length - (screenWidth-1))) {
            //             confirmedKills.textContent = 'Game Over'
            //             clearInterval(motherShipId)
            //         }
            //     }


            //     if (enemysKilled.length === enemyInvaders.length) {
            //         confirmedKills.textContent = 'You Win'
            //         clearInterval(motherShipId)
            //     }


            // }
            function moveInvaders() {
                const leftEdge = enemyInvaders[0] % screenWidth === 0
                const rightEdge = enemyInvaders[enemyInvaders.length -1] % screenWidth === screenWidth -1
        
                if((leftEdge && directionMovement === -1) || (rightEdge && directionMovement === 1)){
                    directionMovement = screenWidth
                } else if (directionMovement === screenWidth) {
                    if (leftEdge) directionMovement = 1
                    else directionMovement = -1
                }
                for (let i = 0; i <= enemyInvaders.length -1; i++) {
                    boxes[enemyInvaders[i]].classList.remove('invader')
                }
                for (let i = 0; i <= enemyInvaders.length -1; i++) {
                    enemyInvaders[i] += directionMovement
                }
                for (let i = 0; i <= enemyInvaders.length -1; i++) {
                    if (!enemysKilled.includes(i)) {
                        boxes[enemyInvaders[i]].classList.add('invader')
                    }
                }
        

                if(boxes[playerOneLocation].classList.contains('invader', 'shooter')) {
                    confirmedKills.textContent = 'Game Over'
                    boxes[playerOneLocation].classList.add('boom')
                    clearInterval(invaderId)
                }
        
                for (let i = 0; i <= enemyInvaders.length -1; i++) {
                    if(enemyInvaders[i] > (boxes.length - (screenWidth-1))) {
                        confirmedKills.textContent = 'Game Over'
                        clearInterval(invaderId)
                    }
                }


                if (enemysKilled.length === enemyInvaders.length) {
                    confirmedKills.textContent = 'You Win'
                    clearInterval(invaderId)
                }
            }
            invaderId = setInterval(moveInvaders, 75)
            motherShipId = setInterval(moveMotherShip, 75 )
            
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

                    if(currentLaserIndex < screenWidth) {
                        clearInterval(laserId)
                        setInterval(() => boxes[currentLaserIndex].classList.remove('laser'), 100)
                    }
                }

                switch(e.keyCode) {
                    case 32:
                        laserId = setInterval(moveLaser,100)
                        break
                }
            }
        document.addEventListener('keyup', shoot)
    })

    








