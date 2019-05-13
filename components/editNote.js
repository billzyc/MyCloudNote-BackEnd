
const editNote=(req,res,bcrypt,psql)=>{
  const {id, email, body, title}=req.body;
  return psql('notes')
  .where('noteid','=', id, 'AND', 'email','=',email )
  .update({
     title: title,
     body: body
   })
  .then(user=>{
    res.json('note edited');
  })
  .catch(err=>res.status(400).json('unable to edit'))
  }
}

module.exports={
  editNote:editNote
}
