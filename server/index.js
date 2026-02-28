import express from 'express'
import {createServer} from 'node:http'
import {Server} from 'socket.io'
import  cors from 'cors' //cors means Cross-origin Resource Security 


const app = express()
app.use(cors())
const server = createServer(app)
const io = new Server(server, {
	cors:{origin:'http://localhost:5173', methods:["GET", "POST"] } 
	//cors allows the origin port to access the server.
})


const Rooms = {} //JSON object. Key-value pairs, not an array

io.on('connection', (socket)=>{

	socket.on('join-room', ({roomCode, studentName, role})=>{
		socket.join(roomCode);

		if(!Rooms[roomCode]){
			//Create that room, if it is not already created
			Rooms[roomCode] = {students:[], teacherSocketId:null}
		}
		console.log(Rooms)
		// Else:
		let currentRoom = Rooms[roomCode]

//----------------------------------------------------------------------------------
		if(role === 'student'){
			const existingStudent = currentRoom.students.find(s => s.name === studentName)

			if(existingStudent){
				existingStudent.socketId = socket.id
			}
			else{
				currentRoom.students.push({socketId:socket.id, name:studentName, score:0})
				const teacherId = currentRoom.teacherSocketId
				if(teacherId){
					//Send the updated info ONLY to the teacher
					io.to(teacherId).emit('student-count-update', {
						count:currentRoom.students.length,
						students:currentRoom.students
					})
				}
			}
		}
//----------------------------------------------------------------------------------

		else if(role === 'teacher'){
			currentRoom.teacherSocketId = socket.id
			//This socket (connection) should receive the current count and students name
			socket.emit('student-count-update', {
				count:currentRoom.students.length,
				students:currentRoom.students
			})
		}
	})//End of join-room event

//----------------------------------------------------------------------------------

	socket.on('disconnect', ()=>{
		//Find out from which room the person disconnected:
		for(const roomCode in Rooms){
			const room = Rooms[roomCode]
			room.students = room.students.filter(s => s.socketId !== socket.id)

			const teacherId = room.teacherSocketId
			if(teacherId){
				io.to(teacherId).emit('student-count-update', {
					count:room.students.length,
					students:room.students
				})
			}
		}
	})

}) 
//----------------------------------------------------------------------------------

const PORT = 3000
server.listen(PORT, ()=>{
	console.log(`The server is running on: http://localhost:${PORT}`)
})
//Listen to the port
