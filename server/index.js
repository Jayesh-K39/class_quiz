import express from 'express'
import {createServer} from 'node:http'
import {fileURLToPath} from 'node:url'
import {dirname, join} from 'node:path'
import {Server} from 'socket.io'
import  cors from 'cors' //cors means Cross-origin Resource Security 


const app = express()
app.use(cors())
const server = createServer(app)
const io = new Server(server, {
	cors:{origin:'http://localhost:5173', methods:["GET", "POST"]} 
	//cors allows the origin port to access the server.
})


const Rooms = {} //JSON object. Key-value pairs, not an array
io.on('connection', (socket)=>{

	socket.on('join-room', ({roomCode, studentName, role})=>{
		socket.join(roomCode);

		if(!Rooms[roomCode]){
			Rooms[roomCode] = {students:[], teacherSocketId:null}
		}
		let currentRoom = Rooms[roomCode]
		if(role === 'student'){
			currentRoom.students.push({socketId:socket.id, name:studentName, score:0})
			const teacherId = currentRoom.teacherSocketId
			if(teacherId){
				//Send the info ONLY to the teacher
				io.to(teacherId).emit('student-count-update', {
					count:currentRoom.students.length,
					students:currentRoom.students
				})
			}
		}
		else if(role === 'teacher'){
			currentRoom.teacherSocketId = socket.id
			//This socket (connection) should receive the current count and students name
			socket.emit('student-count-update', {
				count:currentRoom.students.length,
				students:currentRoom.students
			})
		}
	})


	socket.on('disconnect', ()=>{
		console.log(socket.id, 'disconnected')
	})


})



server.listen(3000, ()=>{
	console.log(`The server is runnign on: http://localhost:${PORT}`)
})
