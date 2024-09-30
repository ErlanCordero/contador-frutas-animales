const fruits = ['🍎', '🍌', '🍓', '🍊', '🍇'];
const animalData = [
    { emoji: '🐶', name: 'Perro' },
    { emoji: '🐱', name: 'Gato' },
    { emoji: '🐊', name: 'Cocodrilo' },
    { emoji: '🐰', name: 'Conejo' },
    { emoji: '🐘', name: 'Elefante' },
    { emoji: '🦁', name: 'León' },
    { emoji: '🐻', name: 'Oso' },
];
let currentFruit;
let currentCount;
let score = 0;

function getRandomFruit() {
    const fruit = fruits[Math.floor(Math.random() * fruits.length)];
    currentCount = Math.floor(Math.random() * 5) + 1; // Entre 1 y 5
    return Array(currentCount).fill(fruit);
}

function displayFruits() {
    currentFruit = getRandomFruit();
    const fruitDisplay = document.getElementById('fruit-display');
    fruitDisplay.innerHTML = '';
    currentFruit.forEach(fruit => {
        const span = document.createElement('span');
        span.textContent = fruit;
        fruitDisplay.appendChild(span);
    });
    document.getElementById('fruit-count').value = 0; // Reiniciar el contador visible
    const questionLabel = document.querySelector('label');
    questionLabel.classList.remove('label-visible'); // Ocultar la etiqueta
    setTimeout(() => {
        questionLabel.classList.add('label-visible'); // Mostrar la etiqueta
    }, 100); // Mostrar después de un breve retraso
}

function getRandomAnimal() {
    const animalIndex = Math.floor(Math.random() * animalData.length);
    const correctAnimal = animalData[animalIndex];

    // Generar opciones
    const options = [correctAnimal];
    while (options.length < 3) {
        const randomOption = animalData[Math.floor(Math.random() * animalData.length)];
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }

    // Mezclar opciones
    options.sort(() => Math.random() - 0.5);
    return { correctAnimal, options };
}

function startAnimalGame() {
    document.getElementById('fruit-game').style.display = 'none'; // Ocultar el juego de frutas
    document.getElementById('animal-question').style.display = 'block'; // Mostrar el juego de animales
    loadAnimalQuestion();
}

function loadAnimalQuestion() {
    const { correctAnimal, options } = getRandomAnimal();
    const animalDisplay = document.getElementById('animal-display');
    animalDisplay.textContent = correctAnimal.emoji;
    
    const animalOptions = document.getElementById('animal-options');
    animalOptions.innerHTML = '';

    options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option.name;
        button.dataset.correct = option.name === correctAnimal.name; // Marcar la opción correcta
        animalOptions.appendChild(button);
        
        button.addEventListener('click', () => {
            const animalResult = document.getElementById('animal-result');
            if (button.dataset.correct === "true") {
                animalResult.textContent = '¡Correcto! 🎉';
            } else {
                animalResult.textContent = 'Incorrecto. ¡Intenta de nuevo!';
            }

            // Esperar un segundo y cargar la siguiente pregunta
            setTimeout(() => {
                loadAnimalQuestion();
                animalResult.textContent = ''; // Limpiar resultado
            }, 1000);
        });
    });
}

document.getElementById('check-button').addEventListener('click', () => {
    const guess = parseInt(document.getElementById('fruit-count').value);
    const result = document.getElementById('result');

    result.innerHTML = ''; // Limpiar resultados anteriores

    if (guess === currentCount) {
        score++;
        result.textContent = '¡Correcto! 🎉';
        const celebrationEmoji = document.createElement('span');
        celebrationEmoji.textContent = '🥳🎊✨';
        celebrationEmoji.classList.add('celebration');
        result.appendChild(celebrationEmoji);
    } else {
        result.textContent = `Incorrecto. Hay ${currentCount} frutas.`;
        const sadEmoji = document.createElement('span');
        sadEmoji.textContent = '😢💔';
        sadEmoji.classList.add('sad');
        result.appendChild(sadEmoji);
    }

    // Cambiar a juego de animales después de 5 aciertos
    if (score >= 5) {
        setTimeout(() => {
            startAnimalGame();
        }, 1000); // Esperar un segundo antes de iniciar el juego de animales
    } else {
        displayFruits(); // Continuar con el juego de frutas
    }
});

// Funciones de incrementar y decrementar
document.getElementById('increment-button').addEventListener('click', () => {
    const countInput = document.getElementById('fruit-count');
    countInput.value = parseInt(countInput.value) + 1;
});

document.getElementById('decrement-button').addEventListener('click', () => {
    const countInput = document.getElementById('fruit-count');
    if (parseInt(countInput.value) > 0) {
        countInput.value = parseInt(countInput.value) - 1;
    }
});

// Iniciar el juego
displayFruits();

