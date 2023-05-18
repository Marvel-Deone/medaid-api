require('dotenv').config();
require('./config');

const express = require('express');
const cors = require('cors');
const AuthRoute = require('./routes/auth');
const MessagesRoute = require('./routes/messages.route');
const BlogRoute = require('./routes/blog.route');
const UserRoute = require('./routes/user.route');
const QuoteRoute = require('./routes/quote.route');
const ExpertRoute = require('./routes/expert.route');
const medicationRoute = require('./routes/medication.route');
const reminderRoute = require('./routes/reminder.route');
const quoteRoute = require('./routes/quote.route');
const selfAssessmentRoute = require('./routes/selfAssessment.route');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const socket = require('socket.io');
const setupMedicationNotification = require('./utils/medicationNotification');
const setupReminderNotification = require('./utils/reminderNotification');

app.use(bodyParser.urlencoded({ extended: true , limit:"20mb"}));
app.use(bodyParser.json({limit:"20mb"}));
app.use(cors());

app.get('/', (req,res) =>{
    res.send("Medaid Project");
});

setupMedicationNotification();
setupReminderNotification();

app.use('/api', AuthRoute);
app.use('/api/user',UserRoute);
app.use('/api/messages', MessagesRoute );
app.use('/api/quote', QuoteRoute );
app.use('/api/expert', ExpertRoute );
app.use('/api/blog', BlogRoute);
app.use('/api/medication', medicationRoute);
app.use('/api/reminder', reminderRoute);
app.use('/api/quote', quoteRoute);
app.use('/api/selfAssessment', selfAssessmentRoute);

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


