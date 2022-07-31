console.log('inicio programa')

setTimeout(() => {
  console.log('primer Timeout')
}, 3000);

setTimeout(() => {
  console.log('segundo Timeout')
}, 0);

setTimeout(() => {
  console.log('tercer Timeout')
}, 0);


console.log('fin programa')