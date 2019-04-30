const express=require('express');
const bodyParser= require('body-parser');
const app=express();
const cors=require('cors');
const knex=require('knex');
const bcrypt=require('bcryptjs');
const registration=require('./components/registration.js');
const signin=require('./components/signin.js');
const fetchnotes=require('./components/fetchnotes.js');
const newnote=require('./components/newnote.js');
const deleteNote=require('./components/deleteNote.js');
app.use(bodyParser.json());
app.use(cors());


/*use below for local database connection
const psql= knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'database_username',
    password : 'database_password',
    database : 'database_name'
  }
});

const psql= new knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
      ssl: true
  }
});
*/
const psql= knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '12396st',
    database : 'fastnotes'
  }
});

app.get('/', (req,res)=>{
  res.json('connected');
})

app.post('/signin',(req,res)=>{
  signin.signin(req,res,bcrypt,psql)
})

app.post('/register',(req, res)=>{
  registration.registration(req,res,bcrypt,psql)
})

app.get('/fetchnotes/:email',(req,res)=>{
  fetchnotes.fetchnotes(req,res,bcrypt,psql)
})

app.post('/newNote',(req, res)=>{
  newnote.newnote(req,res,bcrypt,psql)
})

app.put('/deleteNote',(req, res)=>{
  deleteNote.deleteNote(req,res,bcrypt,psql)
})

app.listen(PORT= process.env.PORT || 3000,()=>{
  console.log('running')
})
