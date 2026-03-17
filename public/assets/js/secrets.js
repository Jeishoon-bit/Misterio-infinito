// Lógica de fecha y revelación del secreto
const SECRET_DATE = new Date(2026, 4, 1, 0, 0, 0); // 1 de mayo (mes 4 en JS)
const IS_SECRET_DAY = new Date() >= SECRET_DATE;

// Función para descargar archivo troll
const downloadSecret = () => {
    const zipLink = document.createElement('a');
    zipLink.href = 'assets/media/secret.zip'; // Compila el GIF y MP3 en un ZIP
    zipLink.download = 'EL_SECRETO.zip';
    document.body.appendChild(zipLink);
    zipLink.click();
    document.body.removeChild(zipLink);

    // Reproducir sonido
    const sound = new Audio('assets/media/secret.mp3');
    sound.volume = 0.5;
    sound.play().catch(() => alert("¡ACTIVA EL SONIDO PARA LA EXPERIENCIA COMPLETA!"));
};

// Pantalla de revelación
const showSecretScreen = () => {
    const container = $('#app-container');
    container.innerHTML = '';

    const revealBlock = createEl('div', 'secret-reveal');
    
    const circle = createEl('div', 'secret-circle');
    const square = createEl('div', 'secret-square');
    const secretText = createEl('p', 'secret-text');
    secretText.textContent = "TOCA AQUÍ";
    
    const title = createEl('h1', 'secret-title');
    title.innerHTML = "LLEGÓ EL DÍA QUE NO EXISTÍA<br>EL SECRETO ESTÁ AQUÍ";

    square.appendChild(secretText);
    circle.appendChild(square);
    revealBlock.appendChild(circle);
    revealBlock.appendChild(title);
    container.appendChild(revealBlock);

    circle.addEventListener('click', () => {
        downloadSecret();
        setTimeout(() => initLabyrinth(), 3000); // Volver al laberinto
    });
};

// Protección contra inspección
const blockInspect = () => {
    document.addEventListener('keydown', e => {
        if((e.ctrlKey && e.shiftKey && e.key === 'I') || e.key === 'F12' || (e.ctrlKey && e.key === 'u')){
            e.preventDefault();
            const rndTxt = txtFragments[rnd(0,txtFragments.length-1)];
            alert(`¿QUÉ BUSCAS? ${rndTxt}`);
            createRandomElement();
        }
    });
    document.addEventListener('contextmenu', e => {
        e.preventDefault();
        playSound();
        createRandomElement();
    });
};
