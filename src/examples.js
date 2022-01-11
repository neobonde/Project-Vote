import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, addDoc, collection, getDoc, onSnapshot, query, where, orderBy, getDocs, limit} from 'firebase/firestore';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAHzc7oilAlEZL9nmLjCqzaJT5JKcK6S0Y",
    authDomain: "project-vote-9c871.firebaseapp.com",
    projectId: "project-vote-9c871",
    storageBucket: "project-vote-9c871.appspot.com",
    messagingSenderId: "117515440247",
    appId: "1:117515440247:web:9ac51437e972250d7a7672",
    measurementId: "G-WT259WJZQL"
});


const firestore = getFirestore();




const specialOfTheDay = doc(firestore, 'dailySpecial/2021-09-14')

function writeDailySpecial() {
    const docData = {
        description: 'A delicious vanilla latte',
        price: 3.99,
        milk: 'Whole',
        vegan: false,
    }
    setDoc(specialOfTheDay, docData);
}

const ordersCollection = collection(firestore, 'orders');

async function addANewDocument() {
    const newDoc = await addDoc(ordersCollection, {
        costumer: 'Arthur',
        drink: 'Latte',
        total_cost: (100 + Math.floor(Math.random()* 400)) / 100,
    })
}

async function readASingleDocument() {
    const mySnapshot = await getDoc(specialOfTheDay);
    if (mySnapshot.exists()) {
        const docData = mySnapshot.data();
        console.log('My data is: ' + JSON.stringify(docData));
    }
}

let dailySpecialUnsubscribe;

function listenToADocument() {
    dailySpecialUnsubscribe = onSnapshot(specialOfTheDay, (docSnapshot) => {
        if (docSnapshot.exists()){
            const docData = docSnapshot.data();
            console.log('In realtime, docData is ' + JSON.stringify(docData));
        }
    });
}

function cancelMyListenerAtTheAppropriateTime() {
    dailySpecialUnsubscribe();
}

async function queryForDocuments() {
    const customerOrdersQuery = query(
        collection(firestore, 'orders'),
        where('drink','==', 'Latte'),
        orderBy('total_cost'),
        limit(10)
    );
    const querySnapshot = await getDocs(customerOrdersQuery);
    console.log(querySnapshot)
    const allDocs = querySnapshot.forEach((snap) => {
        console.log('Document ' + snap.id + ' contains ' + JSON.stringify(snap.data));
    });
}


console.log("Hello Firebase")
// writeDailySpecial();
// addANewDocument();
// readASingleDocument();
// listenToADocument();
queryForDocuments();
