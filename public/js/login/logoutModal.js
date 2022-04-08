function Modal() {
	const modalWrapper = document.querySelector('.modal-wrapper-logout')

	const cancelButton = document.querySelector('#cancel')

   const button = document.querySelector('.icon-log-out').addEventListener('click', () => {
      open()
   })

	cancelButton.addEventListener('click', () => close())

   // Fechar modal pressionando o ESC
document.addEventListener('keydown', function(event){
	if(event.key === "Escape"){
		close()
	}
});

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

Modal()

const logout = document.getElementById('logout')
const formLogout = document.querySelector('form[action="/logout"]')

logout.addEventListener('click', () => {
   formLogout.submit()
})