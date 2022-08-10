import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form'),
  firstDelay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  btn: document.querySelector('button'),
};

refs.btn.addEventListener('click', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const firstDelay = Number(refs.firstDelay.value);
  const step = Number(refs.step.value);
  const amount = Number(refs.amount.value);
  let delay = 0;

  for (let i = 1; i <= amount; i++) {
    const position = i;
    console.log(`i = ${i}`);

    if (i === 1) {
      delay += firstDelay;
    } else {
      delay += step;
    }

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    console.log(delay);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); // Fulfill
      } else {
        reject({ position, delay }); // Reject
      }
    }, delay);
  });
  return promise;
}
