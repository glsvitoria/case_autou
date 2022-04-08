let userStorage = localStorage.getItem('user')
let userLogging = JSON.parse(userStorage)

let headerTxt2 = document.querySelector('.header_text')
headerTxt2.textContent = `Olá ${userLogging.name} ${userLogging.lastName}, veja as reações que você recebeu`