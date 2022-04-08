let userString = localStorage.getItem('user')
let user = JSON.parse(userString)

console.log(user)

let headerTxt = document.querySelector('.header_text')
headerTxt.textContent = `Olá ${user.name}, dê uma olhada no ranking de reações`

orderRanking()
//orderRanking('btn.id.toLowerCase()', btn.value)


/*let h3Txt = document.createTextNode(`${ranking[i].name}`)
if(isUser(ranking[i].name)){
   h3Txt.textContent = 'Você'
}

if(isUser(ranking[i].name)){
   li.classList.add('userLogin')
}*/

   
   