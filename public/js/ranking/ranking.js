let userString = localStorage.getItem('user')
let user = JSON.parse(userString)

const members = document.querySelectorAll('.position_name span')

members.forEach((member) => {

   if(member.innerText === `${user.fullName}`){
      console.log(member)
      member.innerText = 'Você'
      const li = member.parentNode.parentNode
      li.classList.add('userLogin')
   }
}) 