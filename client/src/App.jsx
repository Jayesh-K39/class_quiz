import {Route, Routes, Navigate} from 'react-router-dom'
import {useEffect} from 'react'
import Home from './Home'
import LoginPage from './student/LoginPage'
import Waiting from './student/waiting'
import DashBoard from './teacher/DashBoard'
import ControlRoom from './teacher/ControlRoom'


function App(){
	return(
		<Routes>
			<Route path='/' element={<Home/>}/>
			<Route path='/student' element={<LoginPage/>}/>
			<Route path='/waiting' element={<Waiting />}/>
			<Route path='/teacher' element={<DashBoard />}/>
			<Route path='/controlroom' element={<ControlRoom />}/>
			<Route path='*' element={<Navigate to='/' replace/> }/>
		</Routes>
	)
}
export default App
