import { useState } from 'react'
import './App.css'

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [message, setMessage] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async () => {}
	const handleLogout = async () => {}

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
				<button> Hämta! </button>
				<p> {message} </p>
			</div>
		</div>
	)
}

export default App
