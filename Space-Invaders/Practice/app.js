document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.grid div')
    const resultDisplay = document.querySelector('#result')
    let enemyIndex = 0


    const enemy = [
        0, 2, 4, 6, 8, 10, 12,
        20, 22, 24, 26, 28, 30, 32 
      ] 
enemy.forEach( invader => boxes[enemyIndex + invader].classList.add('enemy'))

    })
