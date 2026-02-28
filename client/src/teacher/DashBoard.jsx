import {Link} from 'react-router-dom'
function DashBoard(){
	const bodyStyle = 'h-[100vh] bg-[#9534eb] flex flex-col gap-10 items-center justify-center text-white text-3xl'

	const cardStyle = 'bg-white text-black p-8 rounded-[25px] w-[400px] text-center '
	return(
		<div className={`${bodyStyle}`}>
			<Link to='/controlroom' className={`${cardStyle}`}>Start a quiz</Link>
			<Link to='/' className={`${cardStyle}`}>Design a quiz</Link>
		</div>
	)
}
export default DashBoard

