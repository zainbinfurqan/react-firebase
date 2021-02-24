import './App.css';
// import concateName from './utils/concate.name'
// import dateFormat from './utils/date.format'
// import customTost from './utils/constum.message'
// import ConvertToBase64 from './utils/convertTobase64'
// import { imageFormatValid } from './utils/image.valid.format'
import { useEffect, useLayoutEffect, useState } from 'react';
import socketClient from 'socket.io-client';
import SocketInd from './soket/socket.js'
import randomstring from 'randomstring'
import firebase from './utils/firebaseInit'
import FirebaseCRUD from './Firebae_CRUD'
import Loader from './Components/Loader'
import firebaseMethod from './utils/firebaseMethods'
// import io from 'socket.io-client'
// console.log(socket_)

const db = firebase.firestore()
function App() {

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)
  const [updatingItem, setUpdatingItem] = useState({})

  useEffect(() => {
    // fetchUsers()
    realTimeListner()
  }, [])


  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const data = {
      email,
      firstName,
      lastName,
      id: users.length + 1
    }
    const response = await firebaseMethod.addData('demo', data)
    if (response.status) {
      // fetchUsers()
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  async function fetchUsers(params) {
    setLoading(true)
    try {
      const response = await firebaseMethod.getData('demo',)
      console.log(response)
      if (response.status) {
        setUsers(response.message)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  async function handleDelete(item) {
    setLoading(true)
    try {
      const response = await firebaseMethod.deleteDataWithId('demo', item.docId)
      if (response.status) {
        setLoading(false)
        // fetchUsers()
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }

  function handleOpenEdit(item) {
    try {
      setIsUpdate(true)
      setFirstName(item.firstName)
      setLastName(item.lastName)
      setEmail(item.email)
      setUpdatingItem(item)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleUpdate(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const body = {
        email,
        firstName,
        lastName
      }
      const response = await firebaseMethod.updateDataWithId('demo', updatingItem.docId, body)
      console.log(response)
      setLoading(false)
      setIsUpdate(false)
      // fetchUsers()
      setEmail('')
      setFirstName('')
      setLastName('')
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  function realTimeListner() {
    try {
      db.collection("demo")
        .onSnapshot((querySnapshot) => {
          const rsp = querySnapshot.docs.map(doc => {
            return {
              docId: doc.id,
              email: doc.data().email,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
            }
          })
          setUsers(rsp)
        });
    } catch (error) {

    }
  }


  return (
    <div className="App">
      <details>
        <summary>
          click me
        </summary>
        <p>zain ahmed her is i am for your work</p>
      </details>
      {loading && <Loader />}
      <div className="card " style={{
        width: '42rem',
        margin: '0 auto',
        padding: '70px',
      }}>
        <div claclassNamess="card-body">
          <form>
            <div className="form-group">
              <label for="first name">First Name</label>
              <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter first name" />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Last Name</label>
              <input type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter last name" />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>

            <div className="form-check">
            </div>
            <button onClick={isUpdate ? handleUpdate : handleSubmit} type="submit" className="btn btn-primary">{isUpdate ? 'Update' : 'Submit'}</button>
          </form>
        </div>
      </div>

      <div style={{
        padding: '0px 40px'
      }}>
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td className="text-left">{item.firstName}</td>
                  <td className="text-left">{item.lastName}</td>
                  <td className="text-left">{item.email}</td>
                  <td className="text-left">
                    <i className='fa fa-trash m-2' onClick={() => handleDelete(item)} />
                    <i className='fa fa-edit m-2' onClick={() => handleOpenEdit(item)} />
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
