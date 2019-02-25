console.log('starting app');

setTimeout(()=> {
  console.log('Inside of callback');
},2000);

setTimeout(()=>{
  console.log('zero seconds delay');
},0);

console.log('Finishing up');
 