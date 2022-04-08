const changePage = document.querySelectorAll('form[method="GET"] .change_page i')
const form = document.querySelectorAll('form.gets')

for(let i = 0; i < changePage.length; i++){
   changePage[i].addEventListener('click', () => form[i].submit())
}