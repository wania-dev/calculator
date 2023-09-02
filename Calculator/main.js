const Calculator = () => {
    let screen = document.querySelector('.screen')
    
    const inputKey = (element) => {
        let key = element.innerHTML
        appendToScreen(key)
    }
    const appendToScreen = (key) => {
        if (!(key == "=" || key == "del")){
            screen.textContent += key;
        } else {
            let sanitizedScreen = screen.textContent.replace(/x/g, '*').replace(/÷/g, '/');
            try {
                // Evaluate the sanitized expression
                let answer = eval(sanitizedScreen);
                
                // Check if the answer is a finite number (not Infinity or NaN)
                if (isFinite(answer)) {
                  screen.innerHTML = answer;
                } else {
                  // Handle the case where the answer is not a valid number
                  screen.innerHTML = "Error";
                }
              } catch (error) {
                // Handle any evaluation errors
                screen.innerHTML = "Error";
              }
        }
    }
    const clearScreen = () => {
        screen.textContent = "";
    }
    const deleteLastCharacter = () => {
        if (!(screen.textContent == "")){
            let newScreenText = screen.textContent.slice(0, -1);
            screen.textContent = newScreenText;
        }
    }
    return {
        inputKey,
        clearScreen,
        deleteLastCharacter
    }
}

// Create a Calculator instance
const calculator = Calculator();

// add event listeners to the divs
const divs = document.querySelectorAll('.n, .s');
divs.forEach((div) => {
    div.addEventListener('click', () => {
        calculator.inputKey(div);
    });
});

// clear and delete
const clearDiv = document.querySelector('.s.clear');
clearDiv.addEventListener('click', calculator.clearScreen);

const deleteDiv = document.querySelector('.s.del');
deleteDiv.addEventListener('click', calculator.deleteLastCharacter);


// Function to set the theme based on user selection
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}
// Event listeners for theme buttons
document.getElementById('white-theme').addEventListener('click', () => setTheme('white'));
document.getElementById('black-theme').addEventListener('click', () => setTheme('black'));
document.getElementById('beige-theme').addEventListener('click', () => setTheme('beige'));
// Set the default theme
setTheme('white'); // You can set your preferred default theme here
