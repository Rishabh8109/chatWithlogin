const uname  = document.getElementById('U-input');
const pwd = document.getElementById('P-input');
var disabled = document.getElementById('loginBtn');
const formcontrol = document.querySelector('.form-control');

uname.addEventListener('input' , () => {
    pwd.addEventListener('input' , () => {
        disabledBtn(pwd.value , pwd.value);
     });
   
});



 function disabledBtn(uval , pval) {
    if(uval !== "" && pval !== "") {
        disabled.classList.remove('disabled');
   } else {
      disabled.classList.add('disabled');
   }
}


//close model 

    
console.log(model);