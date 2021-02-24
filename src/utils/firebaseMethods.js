import firebase from './firebaseInit'

const db = firebase.firestore()
const firebaseMethods = {};

firebaseMethods.getData = async (collection) => {
    try {
        const response = await db.collection(collection).get()
        const responseReuslt = response.docs.map(doc => {
            return {
                docId: doc.id,
                email: doc.data().email,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
            }
        })
        return { status: true, message: responseReuslt }
    } catch (error) {
        return { status: false, message: error }
    }
}

firebaseMethods.getDataWithId = async (collection, doc) => {
    try {
        const response = await db.collection(collection).doc(doc).get()
        return response.data()
    } catch (error) {
        return { status: false, message: error }
    }
}

firebaseMethods.updateDataWithId = async (collection, doc, data) => {
    try {
        await db.collection(collection).doc(doc).update({ ...data })
        return { status: true, message: '' }
    } catch (error) {
        return { status: false, message: error }
    }
}


firebaseMethods.deleteDataWithId = async (collection, doc) => {
    try {
        await db.collection(collection).doc(doc).delete(() => {
            return { status: true, message: '' }
        }).catch((error) => {
            return { status: false, message: error }
        })
    } catch (error) {
        return { status: false, message: error }
    }
}

firebaseMethods.addData = async (collection, data) => {
    console.log(collection, data)
    try {
        await db.collection(collection).add({ ...data })
        return { status: true, message: '' }
    } catch (error) {
        return { status: false, message: error }
    }
}

export default firebaseMethods