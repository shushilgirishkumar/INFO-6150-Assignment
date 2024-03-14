$(document).ready(() => {
    var isvalid = true;
    
    const performOperation = (operation) => {
      const num1 = parseFloat($('#number1').val());
      const num2 = parseFloat($('#number2').val());
      let result = 0;
      $('#operation-error').text('');  
      switch(operation) {
        case 'add': result = num1 + num2; break;
        case 'subtract': result = num1 - num2; break;
        case 'multiply': result = num1 * num2; break;
        case 'reset': $('#number1').val(''); $('#number2').val(''); $('#result').val(''); break;
        case 'divide':
          if(num2 === 0) {
            $('#operation-error').text('Cannot divide by zero.');
            return;
          } else {
            result = num1 / num2;
          }
          break;
        default: $('#operation-error').text('Invalid operation.'); return;
      }
  
      $('#result').val(result);
    };
  
    $('button').click((event) => {
        const operation = $(event.target).attr('data-operation');
        performOperation(operation);
      });
      
    $('input[type="text"]').on('keyup', (event) => {
        if (!/^\d*\.?\d*$/.test(event.target.value)) {
          $(event.target).next('.error').text('Please enter a valid number.');
          isvalid = false;
        } else {
          $(event.target).next('.error').text('');
            isvalid = true;
        }
      });
      
    const username = localStorage.getItem('username') || 'User';
  $('#user-name-display').text(`Welcome, ${username}!`);
  });