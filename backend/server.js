// imports
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

// konfigurera servern
const app = express()
dotenv.config()
const port = process.env.PORT || 1337
const secret = process.env.SECRET || 'banankaka'
// Obs! I en riktig app ska man ha hemligheten i en .env-fil, som inte laddas upp på github.

// middleware
app.use( cors() )
app.use( express.json() )
app.use((req, res, next) => {
	console.log(`${req.method}  ${req.url} `, req.body)
	next()
}) 

// routes
// GET /public
app.get('/public', (req, res) => {
	res.send({
		message: 'This is public data, anyone can see it.'
	})
})

// POST /login
app.post('/login', (req, res) => {
	// Body: { username, password }
	// Validate body
	if( !req.body || !req.body.username || !req.body.password ) {
		res.sendStatus(400)
		return
	}
	const { username, password } = req.body

	let found = users.find(user => user.username === username)
	if( !found ) {
		console.log('- felaktigt användarnamn')
		res.sendStatus(401)
		return
	}
	if( found.password !== password ) {
		console.log('- felaktigt lösenord')
		res.sendStatus(401)
		return
	}

	// Lyckad inloggning! Skapa en JWT och skicka tillbaka
	// jwt.sign(payload, secretOrPrivateKey, [options, callback])
	const hour = 60 * 60
	const payload = { userId: found.id }
	const options = { expiresIn: 2 * hour }
	let token = jwt.sign(payload, secret, options)
	console.log('Signed JWT: ', token)
	let tokenPackage = { token: token }
	res.send(tokenPackage)
})
let users = [
	{ id: 'a1', username: 'admin', password: 'password' }
]

// GET /secret

// starta servern
app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})
