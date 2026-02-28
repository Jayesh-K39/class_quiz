import {useState, useEffect} from 'react'
import UserIcon from '../../../../shared/icons/UserIcon' //4 folders up
import socket from '../socket'

function ControlRoom(){
	const [studentCount, setCount] = useState(0)  //For UI
	const [students, setStudents] = useState([])  //For UI
	const roomCode = 'R1'
	
//--------------------------------------------------------------

	useEffect(()=>{
		socket.emit('join-room', {roomCode, role:'teacher'})

		socket.on('student-count-update', (data) => {
			setCount(data.count)
			setStudents(data.students)
		})
	
		return () => {
			socket.off('student-count-update')
			//Remove the event when the component is unmounted
		}
	
	}, [])
//--------------------------------------------------------------

	const bodyStyle = 'bg-[#9534eb] h-[100vh] text-white p-4'
	const headingStyle = 'font-bold text-[20px] p-2'

	const divStyle = `flex flex-wrap overflow-auto scroll-smooth bg-white rounded-[20px] transition-all duration-300 ease-in-out ${studentCount > 0 ? 'h-[100px]' : 'h-0'} `

	const liStyle = `bg-yellow-500 p-2 m-4 w-fit h-[50px] rounded-2xl flex gap-5 justify-center  `

	const roundDiv = 'rounded-full w-[34px] bg-white p-2 flex justify-center items-center text-black text-center text-[14px]'

	
//--------------------------------------------------------------

	return(
		<div className={`${bodyStyle}`}>
			<p className='font-bold text-[20px] text-center p-4'>Student Count: {studentCount}</p>

			
			<h2 className={`${headingStyle}`}> {studentCount > 0 ? "Students:" : "No student has joined yet 😴"}</h2>
	
			<div className={`${divStyle}`}>
				{students.map((student) => (
					<div className={`${liStyle}`} key={crypto.randomUUID()}>						
						<div className={`${roundDiv}`}>
							{student.name.split(' ').length === 1 ? 
							student.name[0].toUpperCase() : 
							(student.name.split(' ')[0][0]  + student.name.split(' ')[1][0]).toUpperCase()
							}
						</div>

						<span className='font-bold flex justify-center items-center '>
							{student.name}
						</span>
					</div>
				))}
			</div>

			
		</div>
	)
}
export default ControlRoom
