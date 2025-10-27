import { UserModel } from "../../server/models/user.model.js";

const newUser = new UserModel({
  username: "test", 
  password: "test", 
  notes: [{name: "testNote1" , content: "testContent1"},
    {name: "testNote2" , content: "testContent2"}]})

newUser.notes.push({name: "testNote3", content: "testContent3"})
const indexToDel = newUser.notes.findIndex((note) => note.name == "testNote1")
newUser.notes.splice(indexToDel, 1)

console.log(newUser)