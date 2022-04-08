let userString = localStorage.getItem('user')
let user = JSON.parse(userString)

function ModalAvaliate() {
	const modalWrapper = document.querySelector('.modal-wrapper')

	const cancelButton = document.querySelector('.button.cancel')

	cancelButton.addEventListener('click', close)

   // Fechar modal pressionando o ESC
   document.addEventListener('keydown', function(event){
      if(event.key === "Escape"){
         close()
      }
   })

	function open() {
		//Funcionalidade de atribuir a classe active para a modal
		modalWrapper.classList.add('active')
	}
	function close() {
		//Funcionalidade de remover a classe active para a modal
		modalWrapper.classList.remove('active')
	}

	return {
		open,
		close,
	}
}

ModalAvaliate()

const button = document.querySelector('.received_btn').addEventListener('click', () => {
   ModalAvaliate().open()
})


// Recebendo as reações para pegar os membros
let reactionString = localStorage.getItem('reasonList')
let reaction = JSON.parse(reactionString)

// Recebendo o usuário da sessão
//let userString = localStorage.getItem('user')
//let user = JSON.parse(userString)

// Adicionando os colegas de trabalho no select
const div = document.querySelector('.list-choice-objects')
div.innerHTML = ''

// Criando o select para o membro escolhido e verificando que não está dando como opção o próprio usuário
for(let i = 0; i < 19; i++){
   if(user.id != reaction[i].id) {
      const label = document.createElement('label')

      const input = document.createElement('input')
      input.setAttribute('type', 'radio')
      input.setAttribute('name', 'person')
      input.setAttribute('value', reaction[i].register)

      const span = document.createElement('span')
      const spanTxt = document.createTextNode(reaction[i].fullName)
      span.appendChild(spanTxt)

      label.appendChild(input)
      label.appendChild(span)

      div.appendChild(label)
   }
}

// Criando o input select para as reações
const divReasons = document.querySelector('.options .list-choice-objects')
for(let i = 0; i < 4; i++){
   const label = document.createElement('label')

   const input = document.createElement('input')
   input.setAttribute('type', 'radio')
   input.setAttribute('name', 'reason')
   let txt = 'Like'
   let value = 'like'
   if(i == 1){
      txt = 'Orgulho'
      value = 'proud'
   } else if(i == 2){
      txt = 'Excelente trabalho'
      value = 'work'
   } else if(i == 3){
      txt = 'Colaboração'
      value = 'colaboration'
   }
   input.setAttribute('value', value)

   const span = document.createElement('span')
   const spanTxt = document.createTextNode(txt.toUpperCase())
   span.appendChild(spanTxt)

   label.appendChild(input)
   label.appendChild(span)

   divReasons.appendChild(label)

}