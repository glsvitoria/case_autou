const acessLogin = [
	{
		id: 1,
		register: 3748,
		email: 'lucas.fernandes@cliente.com',
		name: 'Lucas',
		lastName: 'Fernandes',
		department: 'Financeiro',
		office: 'Analista',
	},
	{
		id: 2,
		register: 2482,
		email: 'pedro.lima@cliente.com',
		name: 'Pedro',
		lastName: 'Lima',
		department: 'Logistica',
		office: 'Transportador',
	},
	{
		id: 3,
		register: 6449,
		email: 'maria.julianelli@cliente.com',
		name: 'Maria',
		lastName: 'Julianelli',
		department: 'Logistica',
		office: 'Planejador',
	},
	{
		id: 4,
		register: 2749,
		email: 'kevin.restom@cliente.com',
		name: 'Kevin',
		lastName: 'Restom',
		department: 'Logistica',
		office: 'Transportador',
	},
	{
		id: 5,
		register: 4128,
		email: 'amanda.amorim@cliente.com',
		name: 'Amanda',
		lastName: 'Amorim',
		department: 'Suprimentos',
		office: 'Operador',
	},
	{
		id: 6,
		register: 9252,
		email: 'fernanda.silva@cliente.com',
		name: 'Fernanda',
		lastName: 'Silva',
		department: 'Suprimentos',
		office: 'Operador',
	},
	{
		id: 7,
		register: 5945,
		email: 'carla.pereira@cliente.com',
		name: 'Carla',
		lastName: 'Pereira',
		department: 'Suprimentos',
		office: 'Almoxarife',
	},
	{
		id: 8,
		register: 4879,
		email: 'pedro.matos@cliente.com',
		name: 'Pedro',
		lastName: 'Matos',
		department: 'Suprimentos',
		office: 'Almoxarife',
	},
	{
		id: 9,
		register: 1827,
		email: 'nathalia.garcia@cliente.com',
		name: 'Nathalia',
		lastName: 'Garcia',
		department: 'Materiais',
		office: 'Transportador',
	},
	{
		id: 10,
		register: 1318,
		email: 'leonardo.lima@cliente.com',
		name: 'Leonardo',
		lastName: 'Lima',
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
		name: 'Michael',
		lastName: 'Pereira',
		department: 'Materiais',
		office: 'Manutenção',
	},
	{
		id: 13,
		register: 6870,
		email: 'natan.franco@cliente.com',
		name: 'Natan',
		lastName: 'Franco',
		department: 'Materiais',
		office: 'Operador',
	},
	{
		id: 14,
		register: 5723,
		email: 'otávio.costa@cliente.com',
		name: 'Otávio',
		lastName: 'Costa',
		department: 'Financeiro',
		office: 'Analista',
	},
	{
		id: 15,
		register: 1996,
		email: 'thales.ferreira@cliente.com',
		name: 'Thales',
		lastName: 'Ferreira',
		department: 'Carga',
		office: 'Transportador',
	},
	{
		id: 16,
		register: 2049,
		email: 'anna.alves@cliente.com',
		name: 'Anna',
		lastName: 'Alves',
		department: 'Carga',
		office: 'Transportador',
	},
	{
		id: 17,
		register: 1694,
		email: 'alvaro.souza@cliente.com',
		name: 'Alvaro',
		lastName: 'Souza',
		department: 'Suprimentos',
		office: 'Analista',
	},
	{
		id: 18,
		register: 8120,
		email: 'marcela.santos@cliente.com',
		name: 'Marcela',
		lastName: 'Santos',
		department: 'Logistica',
		office: 'Analista',
	},
	{
		id: 19,
		register: 2710,
		email: 'ana.oliveira@cliente.com',
		name: 'Ana',
		lastName: 'Oliveira',
		department: 'Carga',
		office: 'Transportador',
	}
]

let user

const loginButton = document.querySelector('#loginButton')
loginButton.addEventListener('click', (event) => {
	event.preventDefault()
	verifyLogin()
   saveUser()
})

function verifyLogin() {
	const optionChoose = chosenOption()
	const loginUser = chosenUser()

	for (let item of acessLogin) {
		if (optionChoose == 'email') {
			if (item.email == loginUser) {
            user = item
            location.assign('/reaction')
            break
			} else if(item.id == 19) {
            createError('Usuário incorreto')
         }
		} else if (optionChoose == 'register') {
			if (item.register == loginUser) {
            user = item
            location.assign('/reaction')
            break
			} else if(item.id == 19) {
            createError('Usuário incorreto')
         }
		} else if(loginUser === '' || optionChoose === '') {
         if(item.id == 19){
            createError('Preencha o formulário')
         }
		}
	}
}

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

function createError(text) {
   let div = document.querySelector('.errorDiv')
   div.innerHTML = ''
	const p = document.createElement('p')
   p.classList.add('error')
	const pTxt = document.createTextNode(text)

	p.appendChild(pTxt)
	div.appendChild(p)
	
}

function saveUser() {
   window.localStorage.setItem('user', JSON.stringify(user))
}