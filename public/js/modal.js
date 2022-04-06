function Modal() {
	const modalWrapper = document.querySelector('.modal-wrapper')

	const cancelButton = document.querySelector('.button.cancel')

	cancelButton.addEventListener('click', close)

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

const button = document.querySelector('.received_btn').addEventListener('click', () => {
   Modal().open()
})

// Fechar modal pressionando o ESC
document.addEventListener('keydown', function(event){
	if(event.key === "Escape"){
		Modal().close()
	}
});

// Recebendo as reações para pegar os membros
let reactionString = localStorage.getItem('reasonList')
let reaction = JSON.parse(reactionString)

// Recebendo o usuário da sessão
let userString = localStorage.getItem('user')
let user = JSON.parse(userString)

// Adicionando os colegas de trabalho no select
const div = document.querySelector('.list-choice-objects')
div.innerHTML = ''

// Criando o label e verificando que não está dando como opção o próprio usuário
for(let i = 0; i < 19; i++){
   if(user.id != reaction[i].id) {
      const label = document.createElement('label')

      const input = document.createElement('input')
      input.setAttribute('type', 'radio')
      input.setAttribute('name', 'person')

      const span = document.createElement('span')
      const spanTxt = document.createTextNode(reaction[i].fullName)
      span.appendChild(spanTxt)

      label.appendChild(input)
      label.appendChild(span)

      div.appendChild(label)
   }
}

/*<label>
   <input type='radio' name='month' />
   <span>January</span>
</label>*/