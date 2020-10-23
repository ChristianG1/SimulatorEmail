//*Variables 

//Variable of form
const form = document.querySelector('#send-mail');

//Variable of inputs
const email = document.querySelector('#email'); 
const subject = document.querySelector('#subject'); 
const message = document.querySelector('#message'); 

//Variable of buttons 
const btnSend = document.querySelector('#send'); 
const btnDelete = document.querySelector('#resetBtn');

//Regular expression 
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

//Elements of HTML 
const p = document.createElement('p');

function reloadEventListeners() { 

  //eventListener to reload page
  document.addEventListener('DOMContentLoaded', startApp);
  
  //eventListeners of inputs
  email.addEventListener('blur', validationInputs); 
  subject.addEventListener('blur', validationInputs); 
  message.addEventListener('blur', validationInputs); 
  btnSend.addEventListener('click', sendEmail)
  btnDelete.addEventListener('click', resetForm);


}

//*Functiones 
function startApp() { 
  btnSend.disabled = true;
  
  btnSend.classList.add('cursor-not-allowed', 'opacity-50');
  email.classList.remove('border-green-500', 'border-red-500');
  subject.classList.remove('border-green-500', 'border-red-500');
  message.classList.remove('border-green-500', 'border-red-500');

}

function validationInputs(e) { 
  // console.log(e.target)
  if(e.target.value.length > 0) { 
    const error = document.querySelector('p.error')

    // console.log(error)
    if(error) { 
      error.remove();
    }

    e.target.classList.remove('border', 'border-red-500'); 
    e.target.classList.add('border', 'border-green-500');


  }else { 
    e.target.classList.remove('border', 'border-green-500');
    e.target.classList.add('border', 'border-red-500')
    showError('Please, all fields are required');
  }

  if(e.target.type === 'email') { 
    console.log(e.target.value)
    
    if( er.test ( e.target.value ) ) { 
      const error = document.querySelector('p.error')

      if(error) { 
        error.remove();
      }

      e.target.classList.remove('border', 'border-red-500');
      e.target.classList.add('border', 'border-green-500'); 
    }else { 
      e.target.classList.remove('border', 'border-green-500');
      e.target.classList.add('border', 'border-red-500');
      showError("Email don't validate");
    }
  }

  if(er.test(email) !== '' && subject.value !== '' && message.value !== ''){ 
    btnSend.disabled = false; 
    btnSend.classList.remove('cursor-not-allowed', 'opacity-50');

  }

}

function showError(message) { 
  const messageError = document.createElement('p'); 
  const error = document.querySelectorAll('.error') 
 
  console.log(error)
  messageError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error')
  messageError.textContent = message;

  if( error.length === 0 ) { 
    form.appendChild(messageError);
  }
}

function sendEmail(e) { 
  e.preventDefault();

  //Show Spinner 
  const spinner = document.querySelector('#spinner'); 
  spinner.style.display = 'flex'

  setTimeout(() => {
    spinner.style.display = 'none';
    p.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')
    p.textContent = 'Sent Successfully';

    form.insertBefore(p, spinner);

    setTimeout(() => {
      p.remove();
      resetForm();
    }, 2000);

  }, 3000);

}

function resetForm() { 
  const error = document.querySelector('p.error');

  form.reset(); 
  startApp();

  if(error) { 
    error.remove()
  }

}

reloadEventListeners(); 

