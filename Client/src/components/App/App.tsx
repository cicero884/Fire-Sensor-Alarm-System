import * as React from 'react'
import Router from '../Router'
import { UserProvider } from '../Login/UserContext'

const App = () => {
	return (
		<UserProvider>
			<Router />
		</UserProvider>
	)
}

export default App
