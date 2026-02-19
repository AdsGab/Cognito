const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const ui = document.getElementById('ui');

// Resize canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//connect to the Server
const socket =io();

let gameState = { agents: {} };

socket.on('connect', () => {
    ui.innerText = "Status: Connected(Live)";
});

socket.on('state_update', (serverState) => {
    // Sync local state with the server state
    gameState = serverState;
    render();
});

function render() {
    // Clear Screen
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Draw Agents
    const agents = gameState.agents || {};

    Object.values(agents).forEach(agent => {
        ctx.fillStyle = agent.color || 'white';
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, 10, 0, Math.PI *2);
        ctx.fill();

        // Draw ID label
        ctx.fillStyle = "white";
        ctx.font = "10px monospace";
        ctx.fillText(agent.id, agent.x -15, agent.y -15);
    });
}

// Handle Window Resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
});