
const tools = document.querySelectorAll('.tool-container');
let swipeStartY = 0;
let swipeTreshold = 50;
let currentToolIndex = 0;
let animationInProgress = false;

// Make sure all tools start in the correct position
tools.forEach((toolContainer, index) => {
    toolContainer.style.transition = 'transform 0.5s ease-in-out';
    toolContainer.style.transform = `translateY(${index * 100}vh)`;
});

// Showing previous and next tools based on the current tool.
function getNextTool(delta) {
    var newIndex = currentToolIndex + delta;
    return tools[newIndex];
}

function resetAnimationDebounce() {
    setTimeout(() => {
        animationInProgress = false;
    }, 500);
}

function showNextTool() {
    if (animationInProgress) 
        return;

    const nextTool = getNextTool(1);
    if (nextTool == null)
        return;

    var currentToolContainer = tools[currentToolIndex];
    currentToolIndex += 1;

    // Animate frames upwards
    animationInProgress = true;
    
    currentToolContainer.style.transform = `translateY(-100vh)`;
    nextTool.style.transform = `translateY(0)`;

    // console.log("Moved downwards. Current index: ", currentToolIndex, ".\n", "Current:\n", currentToolContainer,  ".\n", "Next:\n", nextTool);
    resetAnimationDebounce();
}

function showPreviousTool() {
    if (animationInProgress) 
        return;

    const previousTool = getNextTool(-1)
    if (previousTool == null)
        return;

    var currentToolContainer = tools[currentToolIndex];
    currentToolIndex -= 1;

    // Animate frames downwards
    animationInProgress = true;

    currentToolContainer.style.transform = `translateY(100vh)`;
    previousTool.style.transform = `translateY(0)`;

    // console.log("Moved downwards. Current index: ", currentToolIndex, ".\n", "Previous:\n", previousTool,  ".\n", "Current:\n", currentToolContainer);
    resetAnimationDebounce();
}

// Handle user input
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        showNextTool();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        showPreviousTool();
    }
});

document.addEventListener('touchstart', (event) => {
    swipeStartY = event.touches[0].clientY;
});

document.addEventListener('touchend', (event) => {
    const swipeEndY = event.changedTouches[0].clientY;
    const swipeDistance = swipeEndY - swipeStartY;

    if (swipeDistance > swipeTreshold) {
        showPreviousTool();
    } else if (swipeDistance < -swipeTreshold) {
        showNextTool();
    }
});