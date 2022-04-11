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

// DATABASE
const dbPath = path.join(__dirname, 'src', 'database.json')

// ROUTES - LOGIN
app.get('/', (req, res) => {
	res.render('index')
})

app.post('/login', async (req, res) => {
	const { options, user } = req.body

	const db = await fs.promises.readFile(dbPath, 'utf-8')
	const parsedDb = JSON.parse(db)

	const userLog = findUserLog(parsedDb, user, options)

	res.redirect(`/reaction/${user}&${options}=${userLog}`)
})

// ROUTES - REACTIONS
app.get('/reaction/:userAcess&:typeAcess=:userLog/:postCheck?', async (req, res) => {
	const { userAcess, typeAcess, userLog, postCheck } = req.params
	const db = await fs.promises.readFile(dbPath, 'utf-8')
	const parsedDb = JSON.parse(db)

	let userNow
	parsedDb.users.forEach((userItem) => {
		if (userItem[typeAcess] == userAcess) {
			userNow = userItem
		}
	})

	res.render('reaction', {
		status: 'sucess',
		data: {
			users: userNow,
			acess: {
				userAcess,
				typeAcess,
				userLog,
            postCheck
			},
		},
	})
})

// Ler o arquivo, parsear o objeto, modicar objeto, salvar de volta
app.post('/reactions/:userAcess&:typeAcess=:userLog', async (req, res) => {
	const { person, reason, phrase } = req.body
	const { userAcess, typeAcess, userLog } = req.params

	// Ler o banco de dados
	const db = await fs.promises.readFile(dbPath, 'utf-8')
	// Transformar em JSON
	const parsedDb = JSON.parse(db)

	const userFromUserReaction = findUser(parsedDb, person)
   console.log(person)
   
   let postCheck
   let cont = 0

	parsedDb.users.forEach((item) => {
		if (item.id === userFromUserReaction && isCanReaction(parsedDb, userLog, reason, person)) {
			item[reason].qnt += 1
			item[reason].strings.push([phrase, userLog])
			if (reason == 'colaboration') {
				item.totalPoints += 1
			} else if (reason == 'like') {
				item.totalPoints += 2
			} else if (reason == 'proud') {
				item.totalPoints += 3
			} else if (reason == 'work') {
				item.totalPoints += 4
			}
         postCheck = 'true'
		} else {
         cont++
      }
	})

   if(cont == 19) {
      postCheck = 'false'
   }

   console.log(postCheck)

	await fs.promises.writeFile(dbPath, JSON.stringify(parsedDb, null, 4))

	res.redirect(`/reaction/${userAcess}&${typeAcess}=${userLog}/${postCheck}`)
})

// ROUTES - RANKING
app.get('/ranking/:userAcess&:typeAcess=:userLog', async (req, res) => {
	const { userAcess, typeAcess, userLog } = req.params
	const db = await fs.promises.readFile(dbPath, 'utf-8')
	const parsedDb = JSON.parse(db)

	let userNow
	parsedDb.users.forEach((userItem) => {
		if (userItem[typeAcess] == userAcess) {
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
				typeAcess,
            userLog
			},
		},
	})
})


// ROUTES - CHANGE PAGE
app.get('/toreaction/:userAcess&:typeAcess=:userLog', (req, res) => {
	const { userAcess, typeAcess, userLog } = req.params

	res.redirect(`/reaction/${userAcess}&${typeAcess}=${userLog}`)
})

app.get('/toranking/:userAcess&:typeAcess=:userLog', (req, res) => {
	const { userAcess, typeAcess, userLog } = req.params

	res.redirect(`/ranking/${userAcess}&${typeAcess}=${userLog}`)
})

app.get('/logout', (req, res) => {
	res.redirect('/')
})


// FUNCTIONS
function findUser({ users }, person) {
	for (let user of users) {
		if (user.register == person) {
			return user.id
		}
	}
}

function findUserLog({ users }, userAcess, typeAcess) {
	for (let user of users) {
		if (user[typeAcess] == userAcess) {
			return user.fullName
		}
	}
}

function isCanReaction({ users }, userLog, reason, id) {
   for(let user of users){
      for(let string of user[reason].strings){
         if(string[1] == userLog && user.id == id){
            return false
         }
      }
   }

   return true
}

function orderRanking({ users }) {
	function order(a, b) {
		if (a.totalPoints < b.totalPoints) {
			return 1
		}
		if (a.totalPoints > b.totalPoints) {
			return -1
		}
		return 0
	}

	return users.sort(order)
}


// START SERVER
app.listen(PORT, function () {
	console.log('O Express está rodando na porta ' + PORT)
})