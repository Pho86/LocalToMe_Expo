import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
// import { getStorage } from "firebase/storage";

// retreive food banks for map
export async function getFoodBanks() {
  const foodBankCol = collection(db, "foodBank");
  const foodBankSnap = await getDocs(foodBankCol);
  const foodBanks = foodBankSnap.docs.map((doc) => {
    let id = doc.id;
    let data = doc.data();
    return { id, ...data };
  });
  return foodBanks;
}

// get every event for the map
export async function getEvents() {
  const eventCollection = collection(db, "event");
  const eventSnap = await getDocs(eventCollection);
  const events = eventSnap.docs.map((doc) => {
    let id = doc.id;
    let data = doc.data();
    return { id, ...data };
  });
  return events;
}


// get all the pantries for map
export async function getPantries() {
  const pantryCol = collection(db, "pantry");
  const pantrySnap = await getDocs(pantryCol);
  const pantries = pantrySnap.docs.map((doc) => {
    let id = doc.id;
    let data = doc.data();
    return { id, ...data };
  });
  return pantries;
}

// get all the fridges for map
export async function getFridges() {
  const fridgeCol = collection(db, "fridge");
  const fridgeSnap = await getDocs(fridgeCol);
  const fridges = fridgeSnap.docs.map((doc) => {
    let id = doc.id;
    let data = doc.data();
    return { id, ...data };
  });
  return fridges;
}

