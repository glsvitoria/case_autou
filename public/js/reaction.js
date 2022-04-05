let userString = localStorage.getItem('user')
let user = JSON.parse(userString)

history.replaceState({}, null, `/reaction/user=${user.register}`)

console.log(user)

let headerTxt = document.querySelector('.header_text')
headerTxt.textContent = `Olá ${user.name} ${user.lastName}, veja as reações que você recebeu`