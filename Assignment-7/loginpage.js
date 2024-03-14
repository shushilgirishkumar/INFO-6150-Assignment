$(document).ready(() => {
    $('button').prop('disabled', true);
  
    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/.test(email);
    const validateusername = (username) => /^[a-zA-Z0-9]+$/.test(username);
  
    const validate = () => {
      let isValid = true;
      $('.error').text('');
  
      if (!$('#email').val() || !validateEmail($('#email').val())) {
        $('#email-error').text('Please enter a valid Northeastern email.');
        isValid = false;
      }
      if (!$('#username').val() || /[^a-zA-Z0-9]/.test($('#username').val()) || $('#username').val().length < 4 || $('#username').val().length > 20) {
        $('#username-error').text('Username must be 4-20 characters long and not include special characters.');
        isValid = false;
      }
      if (!$('#password').val() || $('#password').val().length < 8 || $('#password').val().length > 20) {
        $('#password-error').text('Password must be 8-20 characters long.');
        isValid = false;
      }
      if ($('#password').val() !== $('#confirm-password').val()) {
        $('#confirm-password-error').text('Passwords do not match.');
        isValid = false;
      }
  
      $('button').prop('disabled', !isValid);
    };
  
    $('input').on('keyup', validate);
    $('button').click(() => {
        localStorage.setItem('username', $('#username').val());
        window.location.href = 'calculator.html'; // Redirect to calculator Page
      });
  });