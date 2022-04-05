const html = document.querySelector('html')
const checkbox =  document.querySelector('#switch')

let theme

checkbox.addEventListener('change', () => {
   html.classList.toggle('dark_mode')
   theme = html.classList[0]
   window.localStorage.setItem('mode', theme)
})

if(localStorage.getItem('mode') == 'dark_mode'){
   document.getElementById('switch').checked = true
   html.classList.add('dark_mode')
}

