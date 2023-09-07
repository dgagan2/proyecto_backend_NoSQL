const {initializeApp}=require('firebase/app')
const {getStorage}=require("firebase/storage")


const firebaseConfig = {
    apiKey: process.env.APIKEY_FIRE,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
}

const firebaseApp=initializeApp(firebaseConfig)
const storage=getStorage(firebaseApp)

module.exports=storage