const registration = (req,res,bcrypt,psql)=>{
  const{email, name, password}=req.body;
  if(!email||!name||!password){
    return res.status(400).json('fill out the fields')
  }
  //hashes password
  const hash = bcrypt.hashSync(password);
  //performs and commits transaction to update both the login table and users table
  psql.transaction(trx =>{
    trx.insert({
      email: email,
      hash: hash
    })
    .into('login')
    .returning('email')
    .then(loginEmail=>{
      return trx('users').returning('*').insert({
        email:loginEmail[0],
        name:name
      }).then(user=>{
        res.json(user[0]);
      })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err=>res.status(400).json('Registration unsuccessful'))
}

module.exports={
    registration: registration
};
