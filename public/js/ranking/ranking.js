let userString = localStorage.getItem('user')
let user = JSON.parse(userString)

console.log(user)

let headerTxt = document.querySelector('.header_text')
headerTxt.textContent = `Olá ${user.name} ${user.lastName}, dê uma olhada no ranking de reações`


const members = document.querySelectorAll('.position_name span')

members.forEach((member) => {
   
   if(member.innerText === `${user.name} ${user.lastName}`){
      member.innerText = 'Você'
      const li = member.parentNode.parentNode
      li.classList.add('userLogin')
   }
}) 