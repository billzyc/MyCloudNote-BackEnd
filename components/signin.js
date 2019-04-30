const signin=(req,res,bcrypt,psql)=>{
  const{email, password}=req.body;
  if(!email||!password){
    return res.status(400).json('fill out the fields')
  }
  psql.select('email','hash')
  .from('login')
  .where('email','=',email)
  .then(data=>{
    const passwordLogin = bcrypt.compareSync(req.body.password, data[0].hash);
    if (passwordLogin){
      return psql.select('*')
      .from('users')
      .where('email','=',email)
      .then(user=>{res.json(user[0])})
      .catch(err=>res.status(400).json('Unable to log in'))
    }
    res.status(400).json('wrong password')
  })
  .catch(err=>res.status(400).json('Incorrect password'))
}

module.exports={
    signin: signin
};
