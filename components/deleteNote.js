
const deleteNote=(req,res,bcrypt,psql)=>{
  const {noteid, loginEmail}=req.body;
  return psql('notes')
  .where('noteid','=', noteid, 'AND', 'email','=',loginEmail )
  .del()
  .then(res.json('note deleted'))
}

module.exports={
  deleteNote:deleteNote
}
