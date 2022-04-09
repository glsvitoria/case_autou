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

app.post('/login', async (req, res) => {
	const { options, user } = req.body

	res.redirect(`/reaction/${user}&${options}`)
})

const dbPath = path.join(__dirname, 'src', 'databasetest.json')
app.get('/reaction/:userAcess&:typeAcess', async (req, res) => {
	const { userAcess, typeAcess } = req.params
	const db = await fs.promises.readFile(dbPath, 'utf-8')
	const parsedDb = JSON.parse(db)

   let userNow
   parsedDb.users.forEach((userItem) => {
      if(userItem[typeAcess] == userAcess){
         userNow = userItem
      }
   })

	res.render('reaction', {
		status: 'sucess',
		data: {
         users: userNow,
         acess: {
            userAcess,
            typeAcess
         }
		}
	})
})

app.get('/ranking/:userAcess&:typeAcess', async (req, res) => {
   const { userAcess, typeAcess } = req.params
   const db = await fs.promises.readFile(dbPath, 'utf-8')
	const parsedDb = JSON.parse(db)

   let userNow
   parsedDb.users.forEach((userItem) => {
      if(userItem[typeAcess] == userAcess){
         userNow = userItem
      }
   })
   
	res.render('ranking', {
		status: 'sucess',
		data: {
			users: orderRanking(parsedDb),
         userNow,
         acess: {
            userAcess,
            typeAcess
         }
		},
      
	})
})

// Ler o arquivo, parsear o objeto, modicar objeto, salvar de volta
app.post('/reactions/:userAcess&:typeAcess', async (req, res) => {
	const { person, reason, phrase } = req.body
   const { userAcess, typeAcess } = req.params

	// Ler o banco de dados
	const db = await fs.promises.readFile(dbPath, 'utf-8')
	// Transformar em JSON
	const parsedDb = JSON.parse(db)

	const userFromUserReaction = findUser(parsedDb, person)

	parsedDb.users.forEach((item) => {
		if (item.id === userFromUserReaction) {
			item[reason].qnt += 1
			item[reason].strings.push(phrase)
         if(reason == 'colaboration'){
            item.totalPoints += 1
         } else if(reason == 'like'){
            item.totalPoints += 2
         } else if(reason == 'proud'){
            item.totalPoints += 3
         } else if(reason == 'work'){
            item.totalPoints += 4
         }
		}
	})

	await fs.promises.writeFile(dbPath, JSON.stringify(parsedDb, null, 4))

	res.redirect(`/reaction/${userAcess}&${typeAcess}`)
})

app.get('/toreaction/:userAcess&:typeAcess', (req, res) => {
   const { userAcess, typeAcess } = req.params
  
   res.redirect(`/reaction/${userAcess}&${typeAcess}`)
})

app.get('/toranking/:userAcess&:typeAcess', (req, res) => {
   const { userAcess, typeAcess } = req.params
   
   res.redirect(`/ranking/${userAcess}&${typeAcess}`)
})

app.get('/logout', (req, res) => {
   res.redirect('/')
})

function findUser({ users }, person) {
	for (let user of users) {
		if (user.register == person) {
			return user.id
		}
	}
}

function orderRanking({ users }){
   function order(a, b){
      if(a.totalPoints < b.totalPoints){
         return 1
      }
      if(a.totalPoints > b.totalPoints){
         return -1
      }
      return 0
   }

   return users.sort(order)
}

app.listen(PORT, function () {
	console.log('O Express está rodando na porta ' + PORT)
})
