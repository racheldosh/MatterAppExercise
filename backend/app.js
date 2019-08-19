const express = require('express');
const { TeamMember } = require('./model');

const app = express();

var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/team', async (req, res, next) => {
  const team = await TeamMember.findAll();
  return res.json(team);
});
/*
app.post('/users/', (request, response) =>{
    knex('users').insert(request.body)
    .then(function(id){
          knex('users').where({id:id[0]})
          .then(results=>{response.send(results[0])});
    });
});*/
app.post('/team', async (req, res, next) => {
  const temp = await TeamMember.create(req.body);
	return res.json(temp);
});

module.exports = app;
