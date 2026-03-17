// Lógica principal del laberinto infinito
const container = $('#app-container');
let elementCount = 0;
const MAX_ELEMENTS = 50; // Limite para no saturar el navegador

// Tipos de elementos
const createDot = () => {
    const dot = createEl('div', 'interactive-element dot');
    const pos = rndPos();
    dot.style.left = `${pos.x}%`;
    dot.style.top = `${pos.y}%`;
    return dot;
};

const createShape = () => {
    const shapes = ['circle', 'square', 'line'];
    const shape = createEl('div', `interactive-element shape ${shapes[rnd(0,2)]}`);
    const pos = rndPos();
    shape.style.left = `${pos.x}%`;
    shape.style.top = `${pos.y}%`;
    if(shape.classList.contains('line')){
        shape.style.width = `${rnd(10,30)}%`;
        shape.style.transform = `rotate(${rnd(0,360)}deg)`;
    } else {
        shape.style.width = `${rndSize(10,50)}px`;
        shape.style.height = `${rndSize(10,50)}px`;
    }
    return shape;
};

const createText = () => {
    const text = createEl('div', 'interactive-element text-block');
    const pos = rndPos();
    text.style.left = `${pos.x}%`;
    text.style.top = `${pos.y}%`;
    const fragments = shuffleArr(txtFragments.slice(0, rnd(3,6)));
    const nums = shuffleArr(numPool.slice(0, fragments.length-1));
    let txt = '';
    fragments.forEach((f,i) => txt += `${f}${nums[i] || ''} `);
    text.textContent = txt.trim();
    return text;
};

const createImage = () => {
    const img = createEl('div', 'interactive-element image-block');
    const pos = rndPos();
    img.style.left = `${pos.x}%`;
    img.style.top = `${pos.y}%`;
    img.style.filter = `grayscale(100%) contrast(150%) hue-rotate(${rnd(0,360)}deg)`;
    img.style.transform = `rotate(${rnd(0,45)}deg) scale(${rnd(0.8,1.2)})`;
    return img;
};

const createRandomElement = () => {
    if(elementCount >= MAX_ELEMENTS){
        const elements = $$('.interactive-element');
        elements[rnd(0, elements.length-1)].remove();
        elementCount--;
    }

    const elementTypes = [createDot, createShape, createText, createImage];
    const element = elementTypes[rnd(0,3)]();
    
    element.addEventListener('click', (e) => {
        e.target.classList.toggle('red-accent');
        setTimeout(() => e.target.classList.toggle('red-accent'), 300);
        playSound();
        moveAllElements();
        createRandomElement();
    });

    container.appendChild(element);
    elementCount++;
};

const moveAllElements = () => {
    $$('.interactive-element').forEach(el => {
        const newPos = rndPos();
        el.style.left = `${newPos.x}%`;
        el.style.top = `${newPos.y}%`;
        el.style.transform = `rotate(${rnd(0,360)}deg) scale(${rnd(0.7,1.3)})`;
    });
};

// Inicialización
const initLabyrinth = () => {
    container.innerHTML = '';
    elementCount = 0;

    // Primer elemento: punto central
    const firstDot = createDot();
    firstDot.style.left = '50%';
    firstDot.style.top = '50%';
    firstDot.style.transform = 'translate(-50%, -50%)';
    
    firstDot.addEventListener('click', () => {
        firstDot.remove();
        createRandomElement();
        createRandomElement();
        createRandomElement();
        setInterval(createRandomElement, rnd(2000,5000)); // Nuevo elemento cada X segundos
    });

    container.appendChild(firstDot);
    blockInspect();
};

// Comprobar si es el día del secreto
if(IS_SECRET_DAY){
    showSecretScreen();
} else {
    initLabyrinth();
}
