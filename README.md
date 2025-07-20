# LINCkeys Typing Test – React + TypeScript

Este proyecto es una prueba técnica para LINCkeys. Se trata de una aplicación de velocidad de tipeo que evalúa al usuario en términos de WPM (Palabras por Minuto), Precisión y Puntaje Final, con una experiencia fluida, modular y profesional.

## Tecnologías Utilizadas

- React 18 + TypeScript
- Custom Hooks (useTypingTest, useTimer)
- CSS Modules
- react-toastify (notificaciones)
- json-server (mock API REST)
- Jest + React Testing Library (tests)

## Estructura del Proyecto

src/  
├── api/                # Conexión con json-server (leaderboard)  
├── components/         # Componentes UI modulares  
│   ├── ControlButtons/  
│   ├── SaveScoreModal/  
│   ├── TextDisplay/  
│   ├── TopScores/  
│   └── TypingInput/  
├── hooks/              # Hooks personalizados  
│   ├── useTimer.ts  
│   └── useTypingTest.ts  
├── test/               # Pruebas unitarias  
├── utils/              # Funciones auxiliares (ej: cálculo de score)  
├── App.tsx             # Componente principal  
└── index.tsx           # Punto de entrada de React

## Lógica del Test

La lógica principal se encuentra en el hook useTypingTest y se encarga de:

- Iniciar el cronómetro al primer input
- Calcular precisión real vs. visual
- Contar errores (uso de backspace)
- Calcular WPM al finalizar
- Generar el puntaje con la fórmula:

```ts
score = (wpm * palabras * precisión) - correcciones
```

Feedback visual del texto:
- Verde: carácter correcto
- Rojo: carácter incorrecto
- Azul subrayado: siguiente carácter a escribir

Cómo Ejecutar el Proyecto Localmente

Clona el Repositorio

```ts
https://github.com/RM92023/Code-Challenge-YourWayLearning.git

cd Code-Challenge-YourWayLearning
```
Instala Dependencias

```ts
npm install
```

Configura la API Mock (json-server)

- Se utiliza json-server para simular un backend que guarda los puntajes (leaderboard).

Inicia json-server:

```ts
npm run json-server
```

Asegúrate de tener un archivo .env con esta línea:

```ts
REACT_APP_API_URL=http://localhost:3001
```

Inicia la Aplicación

```ts
npm start
```

Abre en el navegador:

- http://localhost:3000

Ejecutar los Tests

```ts
npm test
```

Pruebas incluidas:

- App.test.tsx: test general de la app

- useTypingTest.test.ts: lógica del hook

- SaveScoreModal.test.tsx: modal de guardado

- leaderboardApi.test.ts: comunicación API

- CalculateScore.test.ts: fórmula de puntaje

Funcionalidades Implementadas:

- Ocultar input al finalizar

- Reinicio sin recargar la página

- Cancelación anticipada

- Cálculo preciso de WPM al primer input

- Feedback visual en tiempo real

- Subrayado azul para siguiente carácter

- Precisión mostrada al finalizar

- Puntaje calculado según fórmula

- Guardado de resultados en API local

- Tabla de top 5 puntajes

- Toasts de confirmación o error

Comentarios en el Código:

- hooks/useTypingTest.ts: lógica del test

- utils/calculateScore.ts: fórmula de puntaje

- api/leaderboard.ts: llamadas API

- App.tsx: lógica principal

- Componentes con lógica clave: TextDisplay, SaveScoreModal, etc.

## Ramas y Flujo de Desarrollo

Se crearon las siguientes ramas para cada funcionalidad y mejoras implementadas:

- `feature/01-hide-input-on-completion`
- `feature/02-seamless-retake`
- `feature/03-cancel-test-early`
- `feature/04-wpm-on-first-key`
- `feature/05-realtime-feedback`
- `feature/06-visual-typing-guide`
- `feature/07-show-accuracy`
- `feature/08-scoring-system`
- `feature/09-save-score`
- `feature/10-display-top-scores`
- `refactor/modular-components`
- `docs/readme-and-comments`

Todas las funcionalidades fueron integradas en la rama `dev` para su validación y pruebas.

Una vez confirmada su correcta implementación, todo será fusionado en la rama `main` para su entrega final.


Autor

Desarrollado por Robinson Muñetón Jaramillo

Contacto: robinjara20@gmail.com

Repositorio: https://github.com/RM92023/Code-Challenge-YourWayLearning.git

Licencia
Este proyecto es parte de una prueba técnica para LINCkeys.
Uso educativo y de evaluación exclusivamente.