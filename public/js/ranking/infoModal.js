function Modal() {
	const modalWrapper = document.querySelector('.modal_wrapper')

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

const btn = document.querySelector('.view_header i')

btn.addEventListener('click', () => {
   Modal().open()
})

const btnClose = document.querySelector('.icon-x')

btnClose.addEventListener('click', () => Modal().close())

// Fechar modal pressionando o ESC
document.addEventListener('keydown', function(event){
	if(event.key === "Escape"){
		Modal().close()
	}
});

