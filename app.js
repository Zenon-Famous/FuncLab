const express = require('express');
const cors = require('cors')

//Importações
const router = require('./routes/user-router')


const app = express();
app.use(cors())

app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) =>{
    res.send('Cors');
})

app.use('/', router)

app.listen(3000, () =>{
    console.error("Server rodando")
})