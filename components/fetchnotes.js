
const fetchnotes = (req,res,bcrypt,psql)=>{
  const {email}=req.params;
  psql.select('*')
  .from('notes')
  .where({email:email})
  .then(data=>{
    if(data.length===0){
      res.json('no notes')
    }
    else {res.json(data)}
  })
  .catch(err=>res.status(400).json('not working'))

}

module.exports={
  fetchnotes:fetchnotes
}
