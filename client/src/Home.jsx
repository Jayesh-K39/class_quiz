import {Link} from 'react-router-dom'
function Home(){
	const bodyStyle = 'h-[100vh] bg-[#9534eb] flex flex-col gap-10 items-center justify-center '

	const holderStyle = 'w-[500px] h-[300px] flex flex-col  gap-6 items-center justify-center rounded-xl bg-white p-3'

	const linkStyle = 'text-[18px] text-white text-center shadow-[0_10px_15px_rgba(0,0,0,0.5)] p-5 rounded-[inherit] transition-all duration-300 ease w-3/4 hover:scale-105'
	return (
		<div className={`${bodyStyle}`}>
			<span className='font-bold text-[40px] text-white '>Continue As:</span>

			<div className={`${holderStyle}`}>
				<Link to='/teacher' className={`${linkStyle} bg-blue-600 hover:bg-blue-700`}>Teacher</Link>
				<Link to='/student' className={`${linkStyle} bg-green-600 hover:bg-green-700`}>Student</Link>	
			</div>
		</div>
	)
}
export default Home
