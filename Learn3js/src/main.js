import './style.css';
import { lessons } from './lessons.js';

const app = document.querySelector('#app');

// 1. Setup Layout
app.innerHTML = `
  <div id="sidebar">
    <h3>Learn Three.js</h3>
    <div id="lesson-list"></div>
  </div>
  <div id="content">
    <div id="instructions"></div>
    <div id="controls"></div>
    <div id="canvas-container"></div>
  </div>
`;

const lessonListEl = document.getElementById('lesson-list');
const instructionsEl = document.getElementById('instructions');
const controlsEl = document.getElementById('controls');
const canvasContainerEl = document.getElementById('canvas-container');

let currentCleanup = null;
let currentLessonId = null;
let completedTasks = new Set();
let completedLessons = new Set(); // store completed lesson IDs

function renderSidebar() {
    lessonListEl.innerHTML = '';
    lessons.forEach(lesson => {
        const btn = document.createElement('div');
        btn.className = `lesson-btn ${lesson.id === currentLessonId ? 'active' : ''} ${completedLessons.has(lesson.id) ? 'completed' : ''}`;
        btn.innerText = lesson.title;
        btn.onclick = () => loadLesson(lesson.id);
        lessonListEl.appendChild(btn);
    });
}

function updateTasksUI(tasks) {
    const checklist = document.getElementById('task-checklist');
    if (!checklist) return;
    
    checklist.innerHTML = '';
    tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = `task-item ${completedTasks.has(task.id) ? 'completed' : ''}`;
        div.innerHTML = `
            <span>${completedTasks.has(task.id) ? '✅' : '⬜'}</span>
            <span>${task.text}</span>
        `;
        checklist.appendChild(div);
    });

    // Check if all tasks for this lesson are done
    const allDone = tasks.every(t => completedTasks.has(t.id));
    if (allDone && !completedLessons.has(currentLessonId)) {
        completedLessons.add(currentLessonId);
        // Re-render sidebar to show checkmark
        renderSidebar();
    }
}

function loadLesson(id) {
    // Cleanup previous lesson
    if (currentCleanup) {
        currentCleanup();
        currentCleanup = null;
    }

    currentLessonId = id;
    const lesson = lessons.find(l => l.id === id);
    if (!lesson) return;

    // Reset tasks for this view session (optional, keeping persistent would require LocalStorage)
    completedTasks.clear();

    renderSidebar();

    // Render Instructions
    instructionsEl.innerHTML = `
        <h2>${lesson.title}</h2>
        <div>${lesson.description}</div>
        <h4>Tasks:</h4>
        <div id="task-checklist"></div>
    `;
    updateTasksUI(lesson.tasks);

    // Initialize Scene
    canvasContainerEl.innerHTML = ''; // Clear canvas
    
    const onTaskComplete = (taskId) => {
        completedTasks.add(taskId);
        updateTasksUI(lesson.tasks);
    };

    const instance = lesson.init(canvasContainerEl, onTaskComplete);
    
    // Store cleanup
    if (instance && instance.dispose) {
        currentCleanup = instance.dispose;
    }

    // Render Controls
    controlsEl.innerHTML = '';
    if (instance && instance.actions) {
        Object.entries(instance.actions).forEach(([key, actionFn]) => {
            const btn = document.createElement('button');
            btn.className = 'primary';
            // Beautify key: rotateCube -> Rotate Cube
            btn.innerText = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            
            btn.onclick = () => {
                actionFn();
                // Some actions might trigger task completion logic internallyor return state
            };
            controlsEl.appendChild(btn);
        });
    }

    // Add Next Lesson button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'secondary';
    nextBtn.innerText = 'Next Lesson';
    nextBtn.onclick = () => {
        const nextIndex = lessons.findIndex(l => l.id === currentLessonId) + 1;
        if (nextIndex < lessons.length) {
            loadLesson(lessons[nextIndex].id);
        } else {
            alert('Congratulations! You finished all lessons.');
        }
    };
    controlsEl.appendChild(nextBtn);
}

// Start app
if (lessons.length > 0) {
    loadLesson(lessons[0].id);
}
