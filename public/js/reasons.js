let userString = localStorage.getItem('user')
let user = JSON.parse(userString)

console.log(user)

let headerTxt = document.querySelector('.header_text')
headerTxt.textContent = `Olá ${user.name}, veja as reações que você recebeu`