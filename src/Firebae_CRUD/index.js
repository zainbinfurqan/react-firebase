import React, { useEffect } from 'react';
import firebaseUtils from '../utils/firebaseMethods'
import firebase from '../utils/firebaseInit'


const DB = firebase.firestore()
function FirebaseCRUD() {

    const userId = '3Z8PeybmOjD7EteIZgD8'
    let unsubscribe = null;

    useEffect(() => {
        fetchContacts()
        fetchUser()
        firebaseListner()
    }, [])


    async function fetchContacts() {
        const response = await firebaseUtils.getData('Contacts')
        // console.log(response)
    }

    async function fetchUser() {
        const response = await firebaseUtils.getDataWithId('Users', userId)
        // console.log(response)
    }

    async function firebaseListner(params) {
        unsubscribe = DB.collection("Users").doc(userId)
            .onSnapshot((data) => {
                console.log("data", data.data())
                // Respond to data
                // ...
            });
    }

    async function addContact() {

    }

    return (
        <div>
            <label >Name</label>
            <input />
            <label  >Number</label>
            <input />
            <button  >Add Contact</button>
        </div>
    );
}

export default FirebaseCRUD;