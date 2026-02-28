import {useEffect, useState} from 'react'
import  {useNavigate } from 'react-router-dom'
import socket from '../socket'

function Waiting(){
	const navigate = useNavigate()

	useEffect(()=>{
		const roomCode = sessionStorage.getItem('roomCode')
		const studentName =  sessionStorage.getItem('studentName')

		if(!roomCode || !studentName){
			navigate('/student')
			return
		}

		socket.emit('join-room', {roomCode, studentName, role:'student'})
		
	}, [navigate])

	return(
		<div className='bg-[#9534eb] h-[100vh] text-center flex flex-col items-center justify-center font-bold text-[30px] text-white'>
			<p>Waiting for the meeting to start...</p>
		</div>
	)
}
export default Waiting
