import { openDB } from 'idb';

// Function to initialize the database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Function to add content to the database
export const putDb = async (content) => {
  try {
    // Open the database
    const db = await initdb();
    
    // Get a transaction and object store
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    
    // Add the content to the object store
    await store.add({ content });
    
    console.log('Content added to the database:', content);
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
};

// Function to get all content from the database
export const getDb = async () => {
  try {
    // Open the database
    const db = await initdb();
    
    // Get a transaction and object store
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    
    // Get all content from the object store
    const allContent = await store.getAll();
    
    return allContent.map(item => item.content);
  } catch (error) {
    console.error('Error getting content from the database:', error);
    return [];
  }
};


initdb();

