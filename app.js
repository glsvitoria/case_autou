const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const path = require('path')
const fs = require('fs')

app.use(express.urlencoded({ extended: true }))

const PORT = 3000

// HANDLE BARS
app.set('view engine', 'handlebars')
const hbs = exphbs.create({ defaultLayout: 'main' })
app.engine('handlebars', hbs.engine)
app.set('views', path.join(__dirname, 'views'))

// STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.get('/', (req, res) => {
	res.render('index')
})

app.post('/login', (req, res) => {
	res.redirect('/reaction')
})

const dbPath = path.join(__dirname, 'src', 'databasetest.json')
app.get('/reaction', async (req, res) => {
	const db = await fs.promises.readFile(dbPath, 'utf-8')
	const parsedDb = JSON.parse(db)

	res.render('reaction', {
		status: 'success',
		data: {
			users: parsedDb.users,
		},
	})
})

app.get('/ranking', (req, res) => {
	const { options, user } = req.body

	res.render('ranking')
})

// Ler o arquivo, parsear o objeto, modicar objeto, salvar de volta
app.post('/reactions', async (req, res) => {
	const { person, reason, phrase } = req.body

	// Ler o banco de dados
	const db = await fs.promises.readFile(dbPath, 'utf-8')
	// Transformar em JSON
	const parsedDb = JSON.parse(db)

	const userFromUserReaction = findUser(parsedDb, person)

	parsedDb.users.forEach((item) => {
		if (item.id === userFromUserReaction) {
			item[reason].qnt += 1
			item[reason].strings.push(phrase)
		}
	})

	await fs.promises.writeFile(dbPath, JSON.stringify(parsedDb, null, 4))

	res.redirect('/reaction')
})

function findUser({ users }, person) {
	for (let user of users) {
		if (user.register == person) {
			return user.id
		}
	}
}

/*function sendUser({ users }) {
   // Receber usuário logado

   users.forEach((item) => {
      if(item.id == user.id){
         return item
      }
   })
}*/

app.listen(PORT, function () {
	console.log('O Express está rodando na porta ' + PORT)
})
