

require('dotenv').config();
require('./config');

const express = require('express');
const cors = require('cors');
const AuthRoute = require('./routes/auth');
const MessagesRoute = require('./routes/messages.route');
const UserRoute = require('./routes/user.route');
const QuoteRoute = require('./routes/quote.route');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const socket = require('socket.io');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) =>{
    res.send("Medaid Project");
});

app.use('/api', AuthRoute);
app.use('/api/user',UserRoute);
app.use('/api/messages', MessagesRoute );
app.use('/api/quote', QuoteRoute );
const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    credentials: true
  }
});

global.onlineUsers= new Map();

io.on('connection', (socket) => {
  
  global.chatSocket= socket;
  socket.on('add-user', (userId)=>{
    onlineUsers.set(userId, socket.id)
  })
  socket.on('send-msg',(data)=>{

    const sendUserSocket= onlineUsers.get(data.to);
    if(sendUserSocket){
        io.emit('msg-receive', data.msg);

    }
  })  

  socket.on("message", (data => {
     socket.emit('out-going', data);
    socket.broadcast.emit('new-message', data);
  }))

});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {console.log(`App listening on port ${PORT}`)});


