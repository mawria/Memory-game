const  characters = [
    {
        name: 'witch1',
        picture: 'https://img.freepik.com/vector-gratis/nina-linda-bruja-buho_23-2148313564.jpg?ga=GA1.1.763340920.1724856081&semt=ais_hybrid'
    },
    {
        name: 'witch2',
        picture: 'https://img.freepik.com/vector-gratis/fondo-halloween-bruja-linda_23-2147946188.jpg?ga=GA1.1.763340920.1724856081&semt=ais_hybrid'
    },
    {
        name: 'witch3',
        picture: 'https://img.freepik.com/vector-gratis/fondo-halloween-bruja-linda_23-2147946189.jpg?ga=GA1.1.763340920.1724856081&semt=ais_hybrid'
    },
    {
        name: 'witch4',
        picture: 'https://img.freepik.com/vector-gratis/linda-bruja-halloween-cabello-rosado_23-2148309960.jpg?ga=GA1.1.763340920.1724856081&semt=ais_hybrid'
    },
    {
        name: 'witch5',
        picture: 'https://img.freepik.com/vector-gratis/fondo-halloween-bruja_23-2147941176.jpg?ga=GA1.1.763340920.1724856081&semt=ais_hybrid'
    },
    {
        name: 'witch6',
        picture: 'https://img.freepik.com/vector-gratis/joven-bruja-halloween-gato-negro_23-2148303110.jpg?ga=GA1.1.763340920.1724856081&semt=ais_hybrid'
    },
    {
        name: 'witch7',
        picture: 'https://img.freepik.com/vector-gratis/linda-bruja-halloween-fondo-noche-estrellada_23-2148292318.jpg?ga=GA1.1.763340920.1724856081&semt=ais_hybrid'
    },
    {
        name: 'witch8',
        picture: 'https://img.freepik.com/vector-gratis/diseno-plano-linda-bruja-halloween_23-2148287013.jpg?ga=GA1.1.763340920.1724856081&semt=ais_hybrid'
    },
    {
        name: 'witches',
        picture: 'https://img.freepik.com/vector-gratis/bruja-adorable-estilo-dibujo-mano_23-2147693061.jpg?ga=GA1.1.763340920.1724856081&semt=ais_hybrid'
    }
]


const duplicatedCharacters = [...characters, ...characters];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const shuffledCharacters = shuffle(duplicatedCharacters);

const cardsContainer = document.getElementById('cards-container');

shuffledCharacters.forEach(character => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = character.name;
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="${character.picture}" alt="${character.name}">
            </div>
            <div class="card-back"></div>
        </div> 
    `;

    cardsContainer.appendChild(card);
});

function restart() {
    // Reiniciar el puntaje
    score = 0;
    scoreElement.textContent = score;

    // Vaciar el contenedor de cartas
    cardsContainer.innerHTML = '';

    // Barajar las cartas nuevamente
    const shuffledCharacters = shuffle(duplicatedCharacters);

    // Crear nuevas cartas y agregarlas al contenedor
    shuffledCharacters.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = character.name;
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${character.picture}" alt="${character.name}">
                </div>
                <div class="card-back"></div>
            </div> 
        `;
        cardsContainer.appendChild(card);
    });

    // Reasignar las variables
    selectedCards = [];
    
    // Seleccionar todas las nuevas cartas
    const cards = document.querySelectorAll('.card');

    // Reasignar el evento click a las nuevas cartas
    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (selectedCards.length < 2 && !card.classList.contains('flip')) {
                card.classList.add('flip');
                selectedCards.push(card);

                if (selectedCards.length === 2) {
                    setTimeout(() => {
                        if (selectedCards[0].dataset.name === selectedCards[1].dataset.name) {
                            score++;
                            scoreElement.textContent = score;
                            selectedCards = [];

                            if (score === totalPairs){
                                showWinMessage();
                            }
                        } else {
                            selectedCards[0].classList.remove('flip');
                            selectedCards[1].classList.remove('flip');
                            selectedCards = [];
                        }
                    }, 800);
                }
            }
        });
    });
}


const cards = document.querySelectorAll('.card');
let selectedCards = [];
let score = 0;
const scoreElement = document.getElementById('score');
const totalPairs = characters.length;

cards.forEach(card => {
    card.addEventListener('click', () => {
        if (selectedCards.length < 2 && !card.classList.contains('flip')) {
            card.classList.add('flip');
            selectedCards.push(card);

            if (selectedCards.length === 2) {
                setTimeout(() => {
                    if (selectedCards[0].dataset.name === selectedCards[1].dataset.name) {
                        score++;
                        scoreElement.textContent = score; 
                        selectedCards = [];

                        if (score === totalPairs){
                            showWinMessage();
                        }
                    } else {
                        selectedCards[0].classList.remove('flip');
                        selectedCards[1].classList.remove('flip');
                        selectedCards = []; 
                    }
                }, 800);
            }
        }
    });
});

function showWinMessage() {
    document.getElementById('win-message').style.display = 'block';
    cardsContainer.style.display = 'none';
}

function playAgain () {
    window.location.reload();
}

const music = document.getElementById('background-music');

function pauseMusic() {
    music.pause();
}

function playMusic() {
    music.play();
}

window.onload = function() {
    playMusic();
}
