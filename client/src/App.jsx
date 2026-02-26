import {Route, Routes, Navigate} from 'react-router-dom'
import {useEffect} from 'react'
import LoginPage from './student/LoginPage'
import DashBoard from './teacher/DashBoard'
import Home from './Home'


function App(){
	return(
		<Routes>
			<Route path='/' element={<Home/>}/>
			<Route path='/student' element={<LoginPage/>}/>
			<Route path='/teacher' element={<DashBoard/>}/>
			<Route path='*' element={<Navigate to='/' replace/> }/>
		</Routes>
	)
}
export default App
