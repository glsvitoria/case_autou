const postCheck = document.querySelector('.post_check').innerText

const p = document.querySelector('.message_post')
if(postCheck == 'false'){
   p.innerText = 'Elemento não adicionado a lista. Você já reagiu a esse usuário.'
   p.classList.add('failed')
   ModalPost().open()
} else if(postCheck == 'true'){
   p.innerText = 'Elemento adicionado a lista de reações com sucesso.'
   p.classList.add('concluded')
   ModalPost().open()
}

function ModalPost() {
	const modalWrapper = document.querySelector('.modal-wrapper-post')

	const continueButton = document.querySelector('.modal-wrapper-post button')

	continueButton.addEventListener('click', close)

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

