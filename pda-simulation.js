document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('simulationCanvas');
    const ctx = canvas.getContext('2d');
  
    const states = [
      { id: 'q0', x: 50, y: 100 },
      { id: 'q1', x: 200, y: 50 },
      { id: 'q2', x: 200, y: 150 },
    ];
  
    const transitions = [
      { from: 'q0', to: 'q1', input: '0', pop: 'Z', push: 'Z' },
      { from: 'q1', to: 'q1', input: '0', pop: 'Z', push: 'Z' },
      { from: 'q1', to: 'q1', input: '1', pop: 'Z', push: '' },
      { from: 'q1', to: 'q2', input: '1', pop: 'Z', push: '' },
    ];
  
    let currentState = states[0];
    let inputIndex = 0;
    let stack = ['Z'];
  
    function drawAutomaton() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Draw transitions
      transitions.forEach(transition => {
        const fromState = states.find(state => state.id === transition.from);
        const toState = states.find(state => state.id === transition.to);
  
        ctx.beginPath();
        ctx.moveTo(fromState.x, fromState.y);
        ctx.lineTo(toState.x, toState.y);
        ctx.stroke();
        ctx.fillText(transition.input, (fromState.x + toState.x) / 2, (fromState.y + toState.y) / 2);
      });
  
      // Draw states
      states.forEach(state => {
        ctx.beginPath();
        ctx.arc(state.x, state.y, 20, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillText(state.id, state.x - 5, state.y - 25);
      });
  
      // Highlight current state
      ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
      ctx.beginPath();
      ctx.arc(currentState.x, currentState.y, 20, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
  
      // Display input string and stack
      ctx.fillStyle = '#333';
      ctx.fillText('Input: ' + (inputIndex < inputString.length ? inputString.substring(inputIndex) : ''), 50, 180);
      ctx.fillText('Stack: ' + stack.join(' '), 50, 195);
    }
  
    window.step = function () {
      const inputString = document.getElementById('inputString').value;
  
      if (inputIndex < inputString.length) {
        const currentSymbol = inputString[inputIndex];
        const transition = transitions.find(
          t => t.from === currentState.id && t.input === currentSymbol && t.pop === stack[stack.length - 1]
        );
  
        if (transition) {
          inputIndex++;
          stack.pop();
  
          if (transition.push) {
            stack.push(...transition.push.split('').reverse());
          }
  
          currentState = states.find(state => state.id === transition.to);
        } else {
          // No valid transition, reject
          currentState = states[2]; // Set to rejecting state
        }
  
        drawAutomaton();
      }
    };
  
    window.reset = function () {
      currentState = states[0];
      inputIndex = 0;
      stack = ['Z'];
      drawAutomaton();
    };
  
    // Initial drawing of the automaton
    drawAutomaton();
  });
  