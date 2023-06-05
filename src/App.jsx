import { useState, useEffect } from 'react'
import './App.css'

const sessionStorageKey = 'jwt-example'

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [message, setMessage] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		if( sessionStorage.getItem(sessionStorageKey) ) {
			setIsLoggedIn(true)
		}
	}, [])
	
	const handleLogin = async () => {
		// förbereda request: body, options
		// skicka request
		// hantera svaret
		let body = { username, password }
		let options = {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		}

		const response = await fetch('/login', options)
		if( response.status !== 200 ) {
			setMessage('Det gick inte att logga in!')
			console.log('Login failed with status: ', response.status)
			return
		}

		const data = await response.json()
		let jwt = data.token
		sessionStorage.setItem(sessionStorageKey, jwt)

		setIsLoggedIn(true)
	}
	const handleLogout = async () => {
		sessionStorage.removeItem(sessionStorageKey)
		setIsLoggedIn(false)
	}

	const handleGetData = async () => {
		// fixa token - om den finns
		// skicka request med fetch
		// hantera svaret
		let maybeJwt = sessionStorage.getItem(sessionStorageKey)
		
		let options = {
			headers: {}
		}
		if( maybeJwt ) {
			options.headers.Authorization = "Bearer: " + maybeJwt
		}
		
		let response = await fetch('/secret', options)
		let data = await response.json()
		setMessage( data.message )
	}

	return (
		<div>
			{isLoggedIn
			? (
				<div>
					<h2> Logga ut</h2>
					<button onClick={handleLogout}> Logga ut </button>
				</div>
			)
			: (
				<div>
					<h2> Logga in </h2>
					<input type="text" placeholder="user name"
						onChange={e => setUsername(e.target.value)}
						value={username}
						/>
					<input type="text" placeholder="password"
						onChange={e => setPassword(e.target.value)}
						value={password}
						/>
					<button type="button"
						onClick={handleLogin}
						> Logga in </button>
				</div>
			)
			}

			<div>
				<h2> Hämta data från backend</h2>
				<button onClick={handleGetData}> Hämta! </button>
				<p> {message} </p>
			</div>
		</div>
	)
}

export default App
