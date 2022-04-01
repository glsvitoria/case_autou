const buttons = document.querySelectorAll('.ranking_options input')

for(let btn of buttons){
   btn.addEventListener('click', () => showRanking(btn))
}

function showRanking(btn) {
   const view = document.querySelector('.ranking_view')
   view.classList.add('active')

   const qnt = 5

   const p = document.querySelectorAll('.view_list__items___total')
   for(let i of p){
      i.innerHTML = `Total de reações de ${btn.value.toLowerCase()}: <span>${qnt}</span>`
   }
}