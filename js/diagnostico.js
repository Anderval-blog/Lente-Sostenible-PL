// js/diagnostico.js

// 1. Base de datos de preguntas (Algoritmo de Evaluación)
const questions = [
    {
        question: "¿Qué porcentaje de la iluminación de tu hogar utiliza focos LED?",
        options: [
            { text: "Más del 80%", points: 10 },
            { text: "Entre el 50% y 80%", points: 5 },
            { text: "Menos del 50% / Focos tradicionales", points: 0 }
        ]
    },
    {
        question: "Al salir de casa o al ir a dormir, ¿qué haces con los electrodomésticos que no usas?",
        options: [
            { text: "Los desconecto por completo o uso regletas con interruptor", points: 10 },
            { text: "Apago los equipos pero los dejo enchufados", points: 5 },
            { text: "Los dejo siempre conectados y encendidos en modo de espera", points: 0 }
        ]
    },
    {
        question: "¿Tu hogar cuenta con grifería de bajo consumo o inodoros de doble descarga?",
        options: [
            { text: "Sí, en la mayoría de los baños y cocina", points: 10 },
            { text: "Solo en algunos grifos", points: 5 },
            { text: "Ninguno, son grifos tradicionales", points: 0 }
        ]
    },
    {
        question: "¿Cuánto tiempo promedio toma una ducha diaria en tu familia?",
        options: [
            { text: "Menos de 5 minutos", points: 10 },
            { text: "Entre 5 y 10 minutos", points: 5 },
            { text: "Más de 10 minutos", points: 0 }
        ]
    },
    {
        question: "¿Cómo gestionan los residuos reciclables (plástico, vidrio, papel) en casa?",
        options: [
            { text: "Los separamos limpios y los entregamos a recicladores", points: 10 },
            { text: "Los separamos a veces, pero no siempre se reciclan", points: 5 },
            { text: "Todo va mezclado a la basura común", points: 0 }
        ]
    },
    {
        question: "¿Qué hacen con los restos orgánicos de comida y cáscaras?",
        options: [
            { text: "Los compostamos en casa o los usamos para abono orgánico", points: 10 },
            { text: "Intentamos no desperdiciar comida, pero el residuo va a la basura", points: 5 },
            { text: "Se desperdicia comida frecuentemente", points: 0 }
        ]
    },
    {
        question: "Al realizar las compras semanales, ¿cómo evitan el plástico?",
        options: [
            { text: "Llevamos siempre bolsas de tela y priorizamos productos a granel", points: 10 },
            { text: "Usamos bolsas ecológicas a veces, pero aceptamos empaques plásticos", points: 5 },
            { text: "Siempre usamos bolsas de plástico y empaques desechables", points: 0 }
        ]
    },
    {
        question: "¿Qué se prioriza en casa cuando un objeto o prenda se daña?",
        options: [
            { text: "Intentamos repararlo, donarlo o darle un nuevo uso", points: 10 },
            { text: "Lo guardamos en un almacén sin saber qué hacer con él", points: 5 },
            { text: "Lo desechamos de inmediato y compramos uno nuevo", points: 0 }
        ]
    },
    {
        question: "¿Tu hogar cuenta con plantas, jardines o huertos urbanos?",
        options: [
            { text: "Sí, tenemos plantas abundantes o un huerto que cuidamos", points: 10 },
            { text: "Tenemos un par de plantas de bajo mantenimiento", points: 5 },
            { text: "No tenemos plantas ni áreas verdes", points: 0 }
        ]
    },
    {
        question: "¿Qué medio de transporte priorizan para trayectos cotidianos?",
        options: [
            { text: "Caminar, bicicleta o transporte público", points: 10 },
            { text: "Compartimos el auto familiar o usamos taxis colectivos", points: 5 },
            { text: "Cada miembro usa su auto particular de forma individual", points: 0 }
        ]
    }
];

// 2. Variables de Estado
let currentQuestionIndex = 0;
let totalScore = 0;
let userName = "";

// 3. Referencias del DOM
const introScreen = document.getElementById('eco-intro');
const quizScreen = document.getElementById('eco-quiz');
const resultScreen = document.getElementById('eco-result');
const startBtn = document.getElementById('start-btn');
const nameInput = document.getElementById('user-name');
const nameError = document.getElementById('name-error');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressFill = document.getElementById('eco-progress-fill');
const questionCounter = document.getElementById('question-counter');

// 4. Iniciar Diagnóstico
startBtn.addEventListener('click', () => {
    userName = nameInput.value.trim();
    if (userName === "") {
        nameError.classList.remove('hidden');
        return;
    }
    nameError.classList.add('hidden');
    introScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    quizScreen.classList.add('animate-up');
    renderQuestion();
});

// 5. Renderizar Pregunta
function renderQuestion() {
    // Actualizar progreso
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    questionCounter.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;

    // Limpiar opciones anteriores con una pequeña animación
    optionsContainer.style.opacity = 0;
    
    setTimeout(() => {
        const currentQ = questions[currentQuestionIndex];
        questionText.textContent = currentQ.question;
        optionsContainer.innerHTML = '';

        currentQ.options.forEach((opt) => {
            const btn = document.createElement('button');
            btn.className = 'eco-option';
            btn.textContent = opt.text;
            btn.onclick = () => selectOption(opt.points);
            optionsContainer.appendChild(btn);
        });

        optionsContainer.style.transition = "opacity 0.4s";
        optionsContainer.style.opacity = 1;
    }, 200);
}

// 6. Seleccionar Opción
function selectOption(points) {
    totalScore += points;
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

// 7. Mostrar Resultados Finales
function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    document.getElementById('score-number').textContent = totalScore;
    const rankTitle = document.getElementById('result-rank');
    const msgText = document.getElementById('result-message');
    const actionsDiv = document.getElementById('result-actions');

    actionsDiv.innerHTML = ''; // Limpiar botones

    if (totalScore >= 80) {
        rankTitle.textContent = "🥇 Hogar Eco-Líder";
        msgText.textContent = `¡Felicidades ${userName}! Tu hogar es un ejemplo activo de preservación ambiental. Estás liderando el cambio.`;
        
        const diplomaBtn = document.createElement('button');
        diplomaBtn.className = 'eco-btn';
        diplomaBtn.innerHTML = 'Descargar Diploma Oficial';
        diplomaBtn.onclick = generateDiploma;
        actionsDiv.appendChild(diplomaBtn);

} else if (totalScore >= 50) {
        rankTitle.textContent = "🥈 Hogar en Transición Ecológica";
        msgText.textContent = `¡Vas por buen camino, ${userName}! Realizas esfuerzos notables, pero aún hay detalles por optimizar.`;
        
        const guideBtn = document.createElement('a');
        guideBtn.className = 'eco-btn eco-btn-outline';
        // 👇 AQUÍ PONES LA RUTA DE TU GUÍA 
        guideBtn.href = 'assets/guias/guia-optimizacion.pdf'; 
        // 👇 ESTO FUERZA LA DESCARGA CON UN NOMBRE BONITO
        guideBtn.download = 'Guia_Optimizacion_EcoHogar.pdf'; 
        guideBtn.innerHTML = 'Descargar Guía de Optimización';
        actionsDiv.appendChild(guideBtn);

    } else {
        rankTitle.textContent = "🥉 Alto Potencial Verde";
        msgText.textContent = `Tienes una gran oportunidad de cambio. Pequeños ajustes en tu rutina diaria pueden salvar el planeta.`;
        
        const guideBtn = document.createElement('a');
        guideBtn.className = 'eco-btn eco-btn-outline';
        // 👇 AQUÍ PONES LA RUTA DE TU MANUAL BASE
        guideBtn.href = 'assets/guias/manual-accion-base.pdf'; 
        // 👇 ESTO FUERZA LA DESCARGA CON UN NOMBRE BONITO
        guideBtn.download = 'Manual_Accion_Base.pdf'; 
        guideBtn.innerHTML = 'Descargar Manual de Acción Base';
        actionsDiv.appendChild(guideBtn);
    }
}

// 8. Generar Diploma con Canvas API (Magia pura)
function generateDiploma() {
    const canvas = document.getElementById('diploma-canvas');
    const ctx = canvas.getContext('2d');

    // Fondo elegante (Crema)
    ctx.fillStyle = "#F8F6F0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Borde (Verde Oliva)
    ctx.strokeStyle = "#5A6B53";
    ctx.lineWidth = 15;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    
    // Borde interno fino
    ctx.lineWidth = 2;
    ctx.strokeRect(35, 35, canvas.width - 70, canvas.height - 70);

    // Textos Centrales
    ctx.textAlign = "center";
    ctx.fillStyle = "#2D2D2D";
    
    ctx.font = "italic 35px 'Playfair Display', serif";
    ctx.fillText("Certificado de Reconocimiento", canvas.width / 2, 150);

    ctx.font = "bold 50px 'Playfair Display', serif";
    ctx.fillStyle = "#5A6B53";
    ctx.fillText("Hogar Eco-Líder", canvas.width / 2, 220);

    ctx.font = "20px 'Montserrat', sans-serif";
    ctx.fillStyle = "#2D2D2D";
    ctx.fillText("Se otorga el presente diploma a:", canvas.width / 2, 300);

    // Nombre del Usuario
    ctx.font = "italic 40px 'Playfair Display', serif";
    ctx.fillText(userName.toUpperCase(), canvas.width / 2, 360);

    // Descripción
    ctx.font = "18px 'Montserrat', sans-serif";
    ctx.fillText("Por demostrar prácticas sobresalientes de sostenibilidad", canvas.width / 2, 430);
    ctx.fillText("y cuidado del medio ambiente en su vida cotidiana.", canvas.width / 2, 460);

    // Firmas o fecha
    ctx.font = "16px 'Montserrat', sans-serif";
    const fecha = new Date().toLocaleDateString('es-PE');
    ctx.fillText(`Emitido el: ${fecha} | Proyecto Lente Sostenible UCV`, canvas.width / 2, 530);

    // Descargar
    const imageURI = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `Diploma_Sostenibilidad_${userName.replace(/\s+/g, '_')}.png`;
    link.href = imageURI;
    link.click();
}