const acessLogin = [
	{
		id: 1,
		register: 3748,
		email: 'lucas.fernandes@cliente.com',
      fullName: 'Lucas Fernandes',
		department: 'Financeiro',
		office: 'Analista',
	},
	{
		id: 2,
		register: 2482,
		email: 'pedro.lima@cliente.com',
      fullName: 'Pedro Lima',
		department: 'Logistica',
		office: 'Transportador',
	},
	{
		id: 3,
		register: 6449,
		email: 'maria.julianelli@cliente.com',
      fullName: 'Maria Julianelli',
		department: 'Logistica',
		office: 'Planejador',
	},
	{
		id: 4,
		register: 2749,
		email: 'kevin.restom@cliente.com',
      fullName: 'Kevin Restom',
		department: 'Logistica',
		office: 'Transportador',
	},
	{
		id: 5,
		register: 4128,
		email: 'amanda.amorim@cliente.com',
      fullName: 'Amanda Amorim',
		department: 'Suprimentos',
		office: 'Operador',
	},
	{
		id: 6,
		register: 9252,
		email: 'fernanda.silva@cliente.com',
      fullName: 'Fernanda Silva',
		department: 'Suprimentos',
		office: 'Operador',
	},
	{
		id: 7,
		register: 5945,
		email: 'carla.pereira@cliente.com',
      fullName: 'Carla Pereira',
		department: 'Suprimentos',
		office: 'Almoxarife',
	},
	{
		id: 8,
		register: 4879,
		email: 'pedro.matos@cliente.com',
      fullName: 'Pedro Matos',
		department: 'Suprimentos',
		office: 'Almoxarife',
	},
	{
		id: 9,
		register: 1827,
		email: 'nathalia.garcia@cliente.com',
      fullName: 'Nathalia Garcia',
		department: 'Materiais',
		office: 'Transportador',
	},
	{
		id: 10,
		register: 1318,
		email: 'leonardo.lima@cliente.com',
      fullName: 'Leonardo Lima',
		department: 'Materiais',
		office: 'Transportador',
	},
	{
		id: 11,
		register: 3564,
		email: 'giulia.scarppa@cliente.com',
		name: 'Giulia',
		lastName: 'Scarppa',
		department: 'Materiais',
		office: 'Manutenção',
	},
	{
		id: 12,
		register: 9178,
		email: 'michael.pereira@cliente.com',
      fullName: 'Michael Pereira',
		department: 'Materiais',
		office: 'Manutenção',
	},
	{
		id: 13,
		register: 6870,
		email: 'natan.franco@cliente.com',
      fullName: 'Natan Franco',
		department: 'Materiais',
		office: 'Operador',
	},
	{
		id: 14,
		register: 5723,
		email: 'otávio.costa@cliente.com',
      fullName: 'Otávio Costa',
		department: 'Financeiro',
		office: 'Analista',
	},
	{
		id: 15,
		register: 1996,
		email: 'thales.ferreira@cliente.com',
      fullName: 'Thales Ferreira',
		department: 'Carga',
		office: 'Transportador',
	},
	{
		id: 16,
		register: 2049,
		email: 'anna.alves@cliente.com',
      fullName: 'Anna Alves',
		department: 'Carga',
		office: 'Transportador',
	},
	{
		id: 17,
		register: 1694,
		email: 'alvaro.souza@cliente.com',
      fullName: 'Alvaro Souza',
		department: 'Suprimentos',
		office: 'Analista',
	},
	{
		id: 18,
		register: 8120,
		email: 'marcela.santos@cliente.com',
      fullName: 'Marcela Santos',
		department: 'Logistica',
		office: 'Analista',
	},
	{
		id: 19,
		register: 2710,
		email: 'ana.oliveira@cliente.com',
      fullName: 'Ana Oliveira',
		department: 'Carga',
		office: 'Transportador',
	}
]

// Função para ser executada quando o botão de submit for clicado e podermos verificar o usuário, salvar no local storage e dar submit do form
const form = document.querySelector('form')
const loginButton = document.querySelector('#loginButton')
loginButton.addEventListener('click', (event) => {
	event.preventDefault()
	verifyLogin()
   saveUser()
})

// Verificar se libera o login ou não, caso preciso será gerado um erro para o usuário
let user
function verifyLogin() {
   // Buscar os inputs do usuário
	const optionChoose = chosenOption()
	const loginUser = chosenUser()

	for (let item of acessLogin) {
      // Se for acessar por email
		if (optionChoose == 'email') {
         // Se tiver o email na lista de usuário
			if (item.email == loginUser) {
            user = item
            localStorage.setItem('membersList', JSON.stringify(acessLogin))
            form.submit()
            break
         // Se não tiver o email lista de usuário  
			} else if(item.id == 19) {
            createError('Usuário incorreto')
         }
      // Se for acessar por matrícula
		} else if (optionChoose == 'register') {
         // Se tiver a matrícula na lista de usuário
			if (item.register == loginUser) {
            user = item
            localStorage.setItem('membersList', JSON.stringify(acessLogin))
            form.submit()
            break
         // Se não tiver a matrícula lista de usuário
			} else if(item.id == 19) {
            createError('Usuário incorreto')
         }
      // Se algum dos campos ficarem vazios
		} else if(loginUser === '' || optionChoose === '') {
         if(item.id == 19){
            createError('Preencha o formulário')
         }
		}
	}
}

// Encontrar os dois campos do form
function chosenOption() {
	const loginOption = document.querySelectorAll('input[name=options]')
	let res = ''

	for (let i = 0; i < 2; i++) {
		if (loginOption[i].checked) {
			res = loginOption[i].value
			break
		}
	}
	return res
}

function chosenUser() {
   const login = document.querySelector('#login_form__input')
   return login.value
}

// Imprimindo o erro na tela para usuário
function createError(text) {
   let div = document.querySelector('.errorDiv')
   div.innerHTML = ''
	const p = document.createElement('p')
   p.classList.add('error')
	const pTxt = document.createTextNode(text)

	p.appendChild(pTxt)
	div.appendChild(p)
	
}

// Salvando o usuário no localStorage
function saveUser() {
   window.localStorage.setItem('user', JSON.stringify(user))
}