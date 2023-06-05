// imports
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

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
// POST /login
// GET /secret

// starta servern
app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})
