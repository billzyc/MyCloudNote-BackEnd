const newnote = (req,res,bcrypt,psql)=>{
  const {textBody, textTitle, loginEmail}=req.body;
  let found=false;
  return psql('notes')
  .insert({
    email:loginEmail,
    title: textTitle,
    body: textBody
  })
  .then(user=>{
    res.json('note saved');
  })
  .catch(err=>res.status(400).json('unable to save'))
}

module.exports={
  newnote:newnote
}
