document.addEventListener('DOMContentLoaded', function() {
    fetchRandomPokemon();
});

document.getElementById('guess-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const guess = document.getElementById('pokemon-guess').value.trim().toLowerCase();
    const actualName = document.getElementById('pokemon-shadow').getAttribute('data-name').toLowerCase();

    if (guess === actualName) {
        showResult(`Correct! The Pokémon is ${capitalizeFirstLetter(actualName)}!`, true);
        revealPokemon();
    } else {
        showResult('Incorrect! Try again!', false);
    }
});

function fetchRandomPokemon() {
    fetch(`api/getPokemon.php?random=true`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                showError(data.error);
            } else {
                const shadowCanvas = document.getElementById('pokemon-shadow');
                shadowCanvas.setAttribute('data-name', data.name);
                shadowCanvas.setAttribute('data-sprite', data.sprite);
                drawShadowImage(data.sprite, shadowCanvas);
            }
        })
        .catch(error => showError('An error occurred. Please try again.'));
}

function drawShadowImage(imageUrl, canvas) {
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = "anonymous"; // Allow cross-origin image loading
    img.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        ctx.globalCompositeOperation = 'source-in';
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over'; // Reset to default
    };
    img.src = imageUrl;
}

function revealPokemon() {
    const shadowCanvas = document.getElementById('pokemon-shadow');
    const sprite = shadowCanvas.getAttribute('data-sprite');
    const name = shadowCanvas.getAttribute('data-name');
    const ctx = shadowCanvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = "anonymous"; // Allow cross-origin image loading
    img.onload = function() {
        ctx.clearRect(0, 0, shadowCanvas.width, shadowCanvas.height); // Clear canvas before drawing
        const scale = Math.min(shadowCanvas.width / img.width, shadowCanvas.height / img.height);
        const x = (shadowCanvas.width / 2) - (img.width / 2) * scale;
        const y = (shadowCanvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        fetchPokemonInfo(name);
    };
    img.src = sprite;
}

function fetchPokemonInfo(name) {
    fetch(`api/getPokemon.php?name=${name}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                showError(data.error);
            } else {
                displayPokemonInfo(data);
            }
        })
        .catch(error => showError('An error occurred. Please try again.'));
}

function displayPokemonInfo(pokemon) {
    const infoDiv = document.getElementById('pokemon-info');
    infoDiv.innerHTML = `
        <div class="card">
            <h3>${pokemon.name.toUpperCase()}</h3>
            <p><strong>Height:</strong> ${pokemon.height}</p>
            <p><strong>Weight:</strong> ${pokemon.weight}</p>
            <p><strong>Types:</strong> ${pokemon.types.join(', ')}</p>
            <p><strong>Abilities:</strong> ${pokemon.abilities.join(', ')}</p>
            <p><strong>Stats:</strong></p>
            <ul>
                ${Object.keys(pokemon.stats).map(stat => `<li>${stat}: ${pokemon.stats[stat]}</li>`).join('')}
            </ul>
        </div>
    `;
    infoDiv.style.display = 'flex';
}

function showResult(message, isSuccess) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p>${message}</p>`;
    resultDiv.style.color = isSuccess ? 'green' : 'red';
}

function showError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p>${message}</p>`;
    resultDiv.style.color = 'red';
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
