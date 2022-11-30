import { db } from '../firebase/firebase';
import { collection, getDocs, getDoc } from 'firebase/firestore';

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

// retreive every event for map
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


// retreive all the pantries for map
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

// retreive all the fridges for map
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






// maybe add in future

// fetch event || use the same as one as the map
// export async function getEvents() {
//   const eventCollection = collection(db, "event");
//   const eventSnap = await getDocs(eventCollection);
//   const events = eventSnap.docs.map((doc) => {
//     let id = doc.id;
//     let data = doc.data();
//     return { id, ...data };
//   });
//   return events;
// }

// fetch all news items
export async function getAllNews() {
  const newsCollection = collection(db, "news");
  const newsSnap = await getDocs(newsCollection);
  const news = await Promise.all(newsSnap.docs.map(async (doc) => {
    let id = doc.id;
    let data = doc.data();
    let userSnap = await getDoc(data.newsCreatorId);
    let user = userSnap.data();
    return { id, ...data, newsCreatorId: user };
  }));
  return news;
}

