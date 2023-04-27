import { FieldValue } from "firebase-admin/firestore"
import { db } from "./dbConnect.js"

const collection = db.collection("users")

export async function signup(req, res) {
  const { email, password } = req.body //destructuring the email and password for user signups
  if(!email || password.length < 6) {
    res.status(400).send( {message: "Email and password are both required. Password must be more than 6 characters>"} )
    return 
  }
  //TODO: check if email is already in use
  const newUser = { 
    email: email.toLowerCase(), //cascading to lowercase because emails shouldnt be case sensitive! GETTING FROM REQ.BODY
    password,
    createdAt: FieldValue.serverTimestamp(), //importing from google from first LINE from firestore
  }
  await collection.add(newUser) // creating a promise: going to dabtabase stick new user and either say all or show error
  // once the user is added... log them in... 
  login(req, res)
}


export async function login(req, res) {
  const { email, password } = req.body
  if(!email || !password) {
    res.status(400).send( {message: "Email and password are both required."} )
    return 
  }
  const users = await collection
    .where("email", "==", email.toLowerCase()) 
    .where("password", "==", password)
    .get()
  let user = users.docs.map(doc => ({...doc.data(), id: doc.id}))[0] //.map gonna return an array [0] asking for first item in that array.
  if(!user) {
    res.status(400).send({message: "Invalid email and/or password."})
    return 
  }
  delete user.password
  res.send(user) // { email, createdAt, id } should send an object with all those things
}

