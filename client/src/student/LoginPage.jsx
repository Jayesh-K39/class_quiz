import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import socket from '../socket'

function LoginPage(){
	const bodyStyle = 'h-[100vh] bg-[#9534eb] flex flex-col gap-10 items-center justify-center'
	const holderStyle = 'w-[500px] h-[300px] flex flex-col items-center justify-center rounded-xl bg-white'

	const inputStyle = 'rounded w-4/5 p-5 bg-gray-300 m-2 outline-none'

	const btnStyle = 'bg-emerald-400 rounded-2xl w-[300px] p-3 font-bold transition-all duration-300 ease-in-out cursor-pointer text-center hover:bg-emerald-500 hover:scale-110'

//--------------------------------------------------------------------

	const navigate = useNavigate()
	const [roomCode, setRoomCode] = useState('')
	const [name, setName] = useState('')

	const handleJoin = () => {
		sessionStorage.setItem('roomCode',roomCode)
		sessionStorage.setItem('studentName', name)
		navigate('/waiting')
	}

//--------------------------------------------------------------------
	return(
		<div className={`${bodyStyle}`}>
			<div className={`holder ${holderStyle}`}>
				<span className='font-bold p-3 '>STUDENT LOGIN</span>

				<input name='studentName' className={`${inputStyle}`} placeholder='Enter your name here' value={name} onChange={e=>setName(e.target.value)}/>

				<input name='password' className={`${inputStyle}`} type='password' placeholder='Enter the password  here' value={roomCode} onChange={e=>setRoomCode(e.target.value)}/>
			</div>

			<button className={`${btnStyle}`} onClick={handleJoin}> JOIN </button>
		</div>
	)
}
export default LoginPage
