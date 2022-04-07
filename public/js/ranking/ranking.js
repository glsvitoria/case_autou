let userString = localStorage.getItem('user')
let user = JSON.parse(userString)

console.log(user)

let headerTxt = document.querySelector('.header_text')
headerTxt.textContent = `Olá ${user.name}, dê uma olhada no ranking de reações`

orderRanking('like', 'Like')
//orderRanking('btn.id.toLowerCase()', btn.value)

function orderRanking(value, title){
   let reasonString = localStorage.getItem('reasonList')
   let reason = JSON.parse(reasonString)
   let ranking = []

   for(let item of reason) {
      ranking.push({
         reason: (item.like * 2) + (item.proud * 3) + (item.colaboration * 1) + (item.work * 4),
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
      let h3Txt = document.createTextNode(`${ranking[i].name}`)
      if(isUser(ranking[i].name)){
         h3Txt.textContent = 'Você'
      }
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
      if(isUser(ranking[i].name)){
         li.classList.add('userLogin')
      }
      ulTops.appendChild(li)
      ul.appendChild(ulTops)
   }
   
   for(let i = 3; i < 11 ; i++){
      
      const li = document.createElement('li')
      li.classList.add('view_list__items')
      
      const h3 = document.createElement('h3')
      let h3Txt = document.createTextNode(`${i + 1}º Lugar - ${ranking[i].name}`)
      if(isUser(ranking[i].name)){
         h3Txt.textContent = `${i + 1}º Lugar - Você`
      }
      h3.appendChild(h3Txt)

      const p1 = document.createElement('p')
      p1.classList.add('view_list__items___total')
      const p1Txt = document.createTextNode(`Pontuação total de reações: `)
      const span = document.createElement('span')
      const spanTxt = document.createTextNode(`${ranking[i].reason}`)
      span.appendChild(spanTxt)
      p1.appendChild(p1Txt)
      p1.appendChild(span)

      li.appendChild(h3)
      li.appendChild(p1)
      if(isUser(ranking[i].name)){
         li.classList.add('userLogin')
      }
      ulLeft.appendChild(li)
      div.appendChild(ulLeft)
      ul.appendChild(div)

   }

   for(let i = 11; i < 19 ; i++){
      
      const li = document.createElement('li')
      li.classList.add('view_list__items')
      
      const h3 = document.createElement('h3')
      let h3Txt = document.createTextNode(`${i + 1}º Lugar - ${ranking[i].name}`)
      if(isUser(ranking[i].name)){
         h3Txt.textContent = `${i + 1}º Lugar - Você`
      }
      h3.appendChild(h3Txt)

      const p1 = document.createElement('p')
      p1.classList.add('view_list__items___total')
      const p1Txt = document.createTextNode(`Pontuação total de reações: `)
      const span = document.createElement('span')
      const spanTxt = document.createTextNode(`${ranking[i].reason}`)
      span.appendChild(spanTxt)
      p1.appendChild(p1Txt)
      p1.appendChild(span)

      li.appendChild(h3)
      li.appendChild(p1)
      if(isUser(ranking[i].name)){
         li.classList.add('userLogin')
      }
      ulRight.appendChild(li)
      div.appendChild(ulRight)
      ul.appendChild(div)
   }

   function isUser(name){
      const isTrue = (name == `${user.name} ${user.lastName}`) ? true : false
      return isTrue
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