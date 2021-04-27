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
    

  
    const alienInvaders = [
        0,//2,4,6,8,
        // 15,17,19,21,23,  
        // 30,32,34,36,38,
        // 45,47,49,51,53,
        // 60,62,64,66,68, 
        // 75,77,79,81,83,
        // 90,92,94,96,98,
        // 105,107,109,111,113
    ]


        alienInvaders.forEach( invader => boxes[enemyLocation + invader].classList.add('invader'))


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
                    if(playerOneLocation % screenWidth !== 0) playerOneLocation -=1
                    break
                }
                boxes[playerOneLocation].classList.add('shooter')
        }
            document.addEventListener('keydown', moveShooter)


            function moveInvaders() {
                const leftEdge = alienInvaders[0] % screenWidth === 0
                const rightEdge = alienInvaders[alienInvaders.length -1] % screenWidth === screenWidth -1
        
                if((leftEdge && directionMovement === -1) || (rightEdge && directionMovement === 1)){
                    directionMovement = screenWidth
                } else if (directionMovement === screenWidth) {
                    if (leftEdge) directionMovement = 1
                    else directionMovement = -1
                }
                for (let i = 0; i <= alienInvaders.length -1; i++) {
                    boxes[alienInvaders[i]].classList.remove('invader')
                }
                for (let i = 0; i <= alienInvaders.length -1; i++) {
                    alienInvaders[i] += directionMovement
                }
                for (let i = 0; i <= alienInvaders.length -1; i++) {
                    if (!enemysKilled.includes(i)) {
                        boxes[alienInvaders[i]].classList.add('invader')
                    }
                }
        

                if(boxes[playerOneLocation].classList.contains('invader', 'shooter')) {
                    confirmedKills.textContent = 'Game Over'
                    boxes[playerOneLocation].classList.add('boom')
                    clearInterval(invaderId)
                }
        
                for (let i = 0; i <= alienInvaders.length -1; i++) {
                    if(alienInvaders[i] > (boxes.length - (screenWidth-1))) {
                        confirmedKills.textContent = 'Game Over'
                        clearInterval(invaderId)
                    }
                }


                if (enemysKilled.length === alienInvaders.length) {
                    confirmedKills.textContent = 'You Win'
                    clearInterval(invaderId)
                }
            }
            invaderId = setInterval(moveInvaders, 500)


            
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

                        const alienTakenDown = alienInvaders.indexOf(currentLaserIndex)
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


    sprite = [document.getElementById("sprite0"),
            null,
            document.getElementById("sprite2"),
            document.getElementById("sprite3"),
            document.getElementById("sprite4"),
            document.getElementById("sprite5"),
            document.getElementById("sprite6")]
  spriteBits = [
    [0x99, 0x99, 0x99, 0xe7, 0xc3, 0xc3, 0xc3, 0xc3],  // Ship
    [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
    [0x00, 0x00, 0x42, 0xa5, 0x42, 0x00, 0x00, 0x00],  // Rockets
    [0x18, 0x42, 0xe7, 0xbd, 0x5a, 0x24, 0x3c, 0x66],  // Freighter
    [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],  // Explosion
    [0x00, 0x10, 0x38, 0x7c, 0x7c, 0x38, 0x10, 0x00]   // Status Beam
  ]

    








