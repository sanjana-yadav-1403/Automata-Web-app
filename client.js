document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('simulationCanvas');
    const ctx = canvas.getContext('2d');
  
    const states = [
      { id: 'q0', x: 50, y: 100 },
      { id: 'q1', x: 200, y: 50 },
      { id: 'q2', x: 200, y: 150 },
    ];
  
    const transitions = [
      { from: 'q0', to: 'q1', symbol: '0' },
      { from: 'q1', to: 'q2', symbol: '0' },
      { from: 'q2', to: 'q1', symbol: '0' },
      { from: 'q0', to: 'q0', symbol: '1' },
      { from: 'q1', to: 'q1', symbol: '1' },
      { from: 'q2', to: 'q2', symbol: '1' },
    ];
  
    let currentState = states[0];
  
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
        ctx.fillText(transition.symbol, (fromState.x + toState.x) / 2, (fromState.y + toState.y) / 2);
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
    }
  
    window.simulate = function () {
      const inputString = document.getElementById('inputString').value;
      const resultElement = document.getElementById('result');
  
      if (validateInput(inputString)) {
        resultElement.innerText = simulateInput(inputString);
      } else {
        resultElement.innerText = 'Invalid input. Use only 0s and 1s.';
      }
    };
  
    function validateInput(inputString) {
      return /^[01]+$/.test(inputString);
    }
  
    function simulateInput(inputString) {
      currentState = states[0];
  
      for (const symbol of inputString) {
        const transition = transitions.find(t => t.from === currentState.id && t.symbol === symbol);
  
        if (transition) {
          currentState = states.find(s => s.id === transition.to);
        } else {
          return 'Rejected';
        }
      }
  
      return currentState.id === 'q1' ? 'Accepted' : 'Rejected';
    }
  
    drawAutomaton();
  });
  