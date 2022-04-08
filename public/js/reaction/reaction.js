let userStorage = localStorage.getItem('user')
let userLogging = JSON.parse(userStorage)

let headerTxt2 = document.querySelector('.header_text')
headerTxt2.textContent = `Olá ${userLogging.name} ${userLogging.lastName}, veja as reações que você recebeu`

const changePage = document.querySelectorAll('form[method="GET"] .change_page i')
const form = document.querySelectorAll('form.gets')

for(let i = 0; i < changePage.length; i++){
   changePage[i].addEventListener('click', () => form[i].submit())
}

const logout = document.getElementById('logout')
const formLogout = document.querySelector('form[action="/logout"]')

logout.addEventListener('click', () => {
   formLogout.submit()
})