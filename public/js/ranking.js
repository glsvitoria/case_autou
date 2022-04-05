let userString = localStorage.getItem('user')
let user = JSON.parse(userString)

history.replaceState({}, null, `/ranking/user=${user.register}`)

console.log(user)

let headerTxt = document.querySelector('.header_text')
headerTxt.textContent = `Olá ${user.name}, dê uma olhada no ranking de reações`

const buttons = document.querySelectorAll('.ranking_options button')

for(let btn of buttons){
   btn.addEventListener('click', () => {
      showRanking(btn)
   })
}

chosedRanking()

function showRanking(btn) {
   const view = document.querySelector('.ranking_view')
   view.classList.add('active')
}

function chosedRanking(){
   const buttons = document.querySelectorAll('.ranking_btn')

   for(let btn of buttons){
      btn.addEventListener('click', () => {
         orderRanking(btn.id.toLowerCase(), btn.value)
      })
   }
}

function orderRanking(value, title){
   console.log(value)
   let reasonString = localStorage.getItem('reasonList')
   let reason = JSON.parse(reasonString)
   let ranking = []

   const h1 = document.querySelector('.view_title')
   h1.innerHTML = ''
   const h1Txt = document.createTextNode(`Ranking de quem mais recebeu ${title.toUpperCase()}`)
   h1.appendChild(h1Txt)

   for(let item of reason) {
      ranking.push({
         reason: item[value],
         name: item.fullName
      })
   }
   
   function order(a, b){
      if(a.reason < b.reason){
         return 1
      }
      if(a.reason > b.reason){
         return -1
      }
      return 0
   }
   ranking.sort(order)

   const ul = document.querySelector('.view_list')
   ul.innerHTML = ''

   const ulTops = document.createElement('ul')
   ulTops.innerHTML = ''
   ulTops.classList.add('view_list__tops')

   const ulLeft = document.createElement('ul')
   ulLeft.innerHTML = ''
   ulLeft.classList.add('view_list__left')

   const ulRight = document.createElement('ul')
   ulRight.innerHTML = ''
   ulRight.classList.add('view_list__right')

   const div = document.createElement('div')

   for(let i = 0; i < 3 ; i++){
   
      const li = document.createElement('li')
      li.classList.add('view_list__itemstop')
      li.classList.add(`top${i + 1}`)

      const img = document.createElement('img')
      img.setAttribute('src', `../assets/${i + 1}_place.png`)
      img.classList.add('view_list__items___img')
      
      const div = document.createElement('div')
      div.classList.add('view_list__div')

      const h3 = document.createElement('h3')
      const h3Txt = document.createTextNode(`${ranking[i].name}`)
      h3.appendChild(h3Txt)

      const p1 = document.createElement('p')
      p1.classList.add('view_list__items___total')
      const span = document.createElement('span')
      const spanTxt = document.createTextNode(`${ranking[i].reason}`)
      span.appendChild(spanTxt)
      p1.appendChild(span)

      

      li.appendChild(img)
      li.appendChild(h3)
      li.appendChild(p1)
      ulTops.appendChild(li)
      ul.appendChild(ulTops)
   }
   
   for(let i = 3; i < 11 ; i++){
      
      const li = document.createElement('li')
      li.classList.add('view_list__items')
      
      const h3 = document.createElement('h3')
      const h3Txt = document.createTextNode(`${i + 1}º Lugar - ${ranking[i].name}`)
      h3.appendChild(h3Txt)

      const p1 = document.createElement('p')
      p1.classList.add('view_list__items___total')
      const p1Txt = document.createTextNode(`Total de reações de like: `)
      const span = document.createElement('span')
      const spanTxt = document.createTextNode(`${ranking[i].reason}`)
      span.appendChild(spanTxt)
      p1.appendChild(p1Txt)
      p1.appendChild(span)

      li.appendChild(h3)
      li.appendChild(p1)
      ulLeft.appendChild(li)
      div.appendChild(ulLeft)
      ul.appendChild(div)

   }

   for(let i = 11; i < 19 ; i++){
      
      const li = document.createElement('li')
      li.classList.add('view_list__items')
      
      const h3 = document.createElement('h3')
      const h3Txt = document.createTextNode(`${i + 1}º Lugar - ${ranking[i].name}`)
      h3.appendChild(h3Txt)

      const p1 = document.createElement('p')
      p1.classList.add('view_list__items___total')
      const p1Txt = document.createTextNode(`Total de reações de like: `)
      const span = document.createElement('span')
      const spanTxt = document.createTextNode(`${ranking[i].reason}`)
      span.appendChild(spanTxt)
      p1.appendChild(p1Txt)
      p1.appendChild(span)

      li.appendChild(h3)
      li.appendChild(p1)
      ulRight.appendChild(li)
      div.appendChild(ulRight)
      ul.appendChild(div)
   }

   
   
   /*<ul class='view_list'>
      <li class='view_list__items'>
         <h3>1º lugar - Guilherme</h3>
         <p class='view_list__items___total'></p>
         <p>
            Uma das frases enviadas:
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Ex sint vitae et cupiditate? Itaque voluptatum</span>
         </p>
      </li>
   </ul>*/

   
}

