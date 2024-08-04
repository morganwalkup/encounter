import * as firebase from 'firebase';
import Encounter from '../Models/Encounter';
import Character from '../Models/Character';
import Monster from '../Models/Monster';

/**
 * Retrieves the active user id or 'anonymous' if no user is logged in
 * and sets up a listener for authentication changes
 * 
 * @param onSuccess - function called once data is retrieved. Accepts userid as a parameter
 */
export function getUserId(onSuccess) {
  firebase.auth().onAuthStateChanged((user) => {
    if(user)
        onSuccess(user.uid);
    else
        onSuccess('anonymous');
  });
}

/**
 * Retrieves the active user id as of the last firebase refresh
 * 
 * @return userid - the userid of the active user, or 'anonymous' if no user is logged in
 */
export function getMostRecentUserId() {
  const user = firebase.auth().currentUser;
  if(user)
      return user.uid;
  else
      return 'anonymous';
}

/**
 * Signs the active user out of firebase
 */
export function signOutUser() {
  firebase.auth().signOut().then(function() {
    console.log('User Signed Out');
  }, function(error) {
    console.error('Sign Out Error', error);
  });
}

//===== Encounter CRUD =====
/**
* Retrieves encounter data from firebase once
* 
* @param userid - firebase uid of the active user
* @param encounterid - firebase id of the encounter
* @param onSuccess - function called once data is retrieved. Accepts encounter data as a parameter
*/
export function getEncounter(userid, encounterid, onSuccess) {
  const encounterRef = firebase.database().ref(userid + '/encounters/' + encounterid);
  encounterRef.once('value', snapshot => {
    const encounter = Encounter.fromFirebase(encounterid, snapshot.val());
    onSuccess(encounter);
  });
}

/**
 * Creates a new encounter in firebase
 * 
 * @param userid - firebase uid of the active user
 * @param encounterData - new data for the encounter
 */
export function createEncounter(userid, encounterData) {
  const dbEncounters = firebase.database().ref().child(userid + '/encounters');
  //Get unique id
  const newEncounterId = dbEncounters.push().key;
  //Add timestamp
  encounterData.created_date = firebase.database.ServerValue.TIMESTAMP;
  //Upload encounter data
  updateEncounter(userid, newEncounterId, encounterData);
}

/**
 * Uploads a new encounter image to firebase
 * and creates a new encounter in firebase
 * 
 * @param userid - firebase uid of the active user
 * @param encounterData - new data for the encounter
 * @returns file upload task for progress monitoring
 */
export function createEncounterWithImage(userid, encounterData, imageFile) {
  const dbEncounters = firebase.database().ref().child(userid + '/encounters');
  const newEncounterId = dbEncounters.push().key;
  const imageUpload = uploadEncounterImage(userid, newEncounterId, imageFile);
  
  imageUpload.on('state_changed', null, null, () => {
    // On successful upload, update encounter with image url
    const imageUrl = imageUpload.snapshot.downloadURL;
    encounterData["image"] = imageUrl;
    //Add timestamp
    encounterData.created_date = firebase.database.ServerValue.TIMESTAMP;
    // Upload encounter to firebase
    updateEncounter(userid, newEncounterId, encounterData);
  });
  
  return imageUpload;
}

/**
 * Uploads a new encounter image to firebase
 * 
 * @param userid - firebase uid of the active user
 * @param encounterid - firebase id of the encounter
 * @param imageFile - the image file to upload
 * @returns file upload task for progress monitoring
 */
export function uploadEncounterImage(userid, encounterid, imageFile) {
  const imageMetaData = { 
    contentType: imageFile.type,
  };
  const storageRef = firebase.storage().ref();
  const fileDestination = storageRef.child(userid + '/images/encounters/' + encounterid);
  const fileUpload = fileDestination.put(imageFile, imageMetaData);
  
  return fileUpload;
}

/**
 * Updates encounter data in firebase
 * 
 * @param userid - firebase uid of the active user
 * @param encounterid - firebase id of the encounter
 * @param encounterData - new data for the encounter
 * @param onSuccess - optional function called once transaction is complete
 */
export function updateEncounter(userid, encounterid, encounterData) {
  const dbEncounters = firebase.database().ref().child(userid + '/encounters');
  const updatedEncounter = {
    [encounterid]: encounterData
  };
  dbEncounters.update(updatedEncounter);
}

/**
 * Uploads a new encounter image to firebase
 * and updates encounter in firebase
 * 
 * @param userid - firebase uid of the active user
 * @param encounterData - new data for the encounter
 * @returns file upload task for progress monitoring
 */
export function updateEncounterWithImage(userid, encounterid, encounterData, imageFile) {
  const imageUpload = uploadEncounterImage(userid, encounterid, imageFile);
  imageUpload.on('state_changed', null, null, () => {
    // On successful upload, update encounter data with image url
    const imageUrl = imageUpload.snapshot.downloadURL;
    encounterData["image"] = imageUrl;
    // Upload encounter to firebase
    updateEncounter(userid, encounterid, encounterData);
  });
  
  return imageUpload;
}

/**
 * Deletes a encounter from firebase
 * 
 * @param userid - firebase uid of the active user
 * @param encounterid - firebase id of the encounter
 */
export function deleteEncounter(userid, encounterid) {
  const dbEncounters = firebase.database().ref().child(userid + '/encounters');
  const deletedEncounter = {
    [encounterid]: null
  };
  dbEncounters.update(deletedEncounter);
  deleteEncounterImage(userid, encounterid);
}

/**
 * Deletes a encounter image from firebase storage
 * 
 * @param userid - the uid of the active firebase user
 * @param encounterid - id of the encounter whose image we are deleting
 */
export function deleteEncounterImage(userid, encounterid) {
  const storageRef = firebase.storage().ref();
  const imagePath = storageRef.child(userid + '/images/encounters/' + encounterid);
  imagePath.delete().then(function() {
    // File deleted successfully
  }).catch(function(error) {
    console.log(error);
  });
}

/**
 * Retrieves all encounters for a user from firebase
 * and sets up a listener to be called on changes to encounters
 * 
 * @param userid - firebase uid of the active user
 * @param onSuccess - function called once data is retrieved. Accepts encounter data as parameter
 */
export function getAllEncounters(userid, onSuccess) {
  const encounterRef = firebase.database().ref(userid + '/encounters/');
  encounterRef.on('value', snapshot => {
    
    const fbEncounters = snapshot.val();
    let encounters = [];
    for(let id in fbEncounters) {
      const encounter = Encounter.fromFirebase(id, fbEncounters[id]);
      encounters.push(encounter);
    }
    onSuccess(encounters);
    
  });
}

/**
 * Removes any active listeners for encounter data
 * 
 * @param userid - the id of the active firebase user
 */
export function disconnectEncounters(userid) {
  firebase.database().ref(userid + '/encounters').off();
}

//===== Character CRUD =====
/**
 * Retrieves character data from firebase
 * 
 * @param userid - firebase uid of the active user
 * @param charid - firebase id of the character
 * @param onSuccess - function called once data is retrieved
 */
export function getCharacter(userid, charid, onSuccess) {
  const characterRef = firebase.database().ref(userid + '/characters/' + charid);
  characterRef.once('value', snapshot => {
    onSuccess(snapshot.val());
  });
}

/**
 * Creates a new character in firebase
 * 
 * @param userid - firebase uid of the active user
 * @param charData - new data for the character
 */
export function createCharacter(userid, charData) {
  const dbCharacters = firebase.database().ref().child(userid + '/characters');
  //Get unique id
  const newCharId = dbCharacters.push().key;
  //Add timestamp
  charData.created_date = firebase.database.ServerValue.TIMESTAMP;
  //Uplaod character data to firebase
  updateCharacter(userid, newCharId, charData);
}

/**
 * Uploads a new character image to firebase
 * and creates a new character in firebase
 * 
 * @param userid - firebase uid of the active user
 * @param charData - new data for the character
 * @returns file upload task for progress monitoring
 */
export function createCharacterWithImage(userid, charData, imageFile) {
  const dbCharacters = firebase.database().ref().child(userid + '/characters');
  const newCharId = dbCharacters.push().key;
  const imageUpload = uploadCharacterImage(userid, newCharId, imageFile);
  
  imageUpload.on('state_changed', null, null, () => {
    // On successful upload, update character with image url
    const imageUrl = imageUpload.snapshot.downloadURL;
    charData["image"] = imageUrl;
    // Add timestamp
    charData.created_date = firebase.database.ServerValue.TIMESTAMP;
    // Upload character to firebase
    updateCharacter(userid, newCharId, charData);
  });
  
  return imageUpload;
}

/**
 * Uploads a new character image to firebase
 * 
 * @param userid - firebase uid of the active user
 * @param charid - firebase id of the character
 * @param imageFile - the image file to upload
 * @returns file upload task for progress monitoring
 */
export function uploadCharacterImage(userid, charid, imageFile) {
  const imageMetaData = { 
    contentType: imageFile.type,
  };
  const storageRef = firebase.storage().ref();
  const fileDestination = storageRef.child(userid + '/images/characters/' + charid);
  const fileUpload = fileDestination.put(imageFile, imageMetaData);
  
  return fileUpload;
}

/**
 * Updates character data in firebase
 * 
 * @param userid - firebase uid of the active user
 * @param charid - firebase id of the character
 * @param charData - new data for the character
 * @param onSuccess - optional function called once transaction is complete
 */
export function updateCharacter(userid, charid, charData) {
  const dbCharacters = firebase.database().ref().child(userid + '/characters');
  const updatedCharacter = {
    [charid]: charData
  };
  dbCharacters.update(updatedCharacter);
}

/**
 * Uploads a new character image to firebase
 * and updates character in firebase
 * 
 * @param userid - firebase uid of the active user
 * @param charData - new data for the character
 * @returns file upload task for progress monitoring
 */
export function updateCharacterWithImage(userid, charid, charData, imageFile) {
  const imageUpload = uploadCharacterImage(userid, charid, imageFile);
  imageUpload.on('state_changed', null, null, () => {
    // On successful upload, update character data with image url
    const imageUrl = imageUpload.snapshot.downloadURL;
    charData["image"] = imageUrl;
    // Upload character to firebase
    updateCharacter(userid, charid, charData);
  });
  
  return imageUpload;
}

/**
 * Deletes a character from firebase
 * 
 * @param userid - firebase uid of the active user
 * @param charid - firebase id of the character
 */
export function deleteCharacter(userid, charid) {
  const dbCharacters = firebase.database().ref().child(userid + '/characters');
  const deletedCharacter = {
    [charid]: null
  };
  dbCharacters.update(deletedCharacter);
  deleteCharacterImage(userid, charid);
}

/**
 * Deletes a character image from firebase storage
 * 
 * @param userid - the uid of the active firebase user
 * @param charid - id of the character whose image we are deleting
 */
export function deleteCharacterImage(userid, charid) {
  const storageRef = firebase.storage().ref();
  const imagePath = storageRef.child(userid + '/images/characters/' + charid);
  imagePath.delete().then(function() {
    // File deleted successfully
  }).catch(function(error) {
    console.log(error);
  });
}

/**
* Retrieves all character data for a user from firebase
* and sets up a listener to be called on changes to character data
* 
* @param userid - firebase uid of the active user
* @param onSuccess - function called once data is retrieved
*/
export function getAllCharacters(userid, onSuccess) {
  const characterRef = firebase.database().ref(userid + '/characters/');
  characterRef.on('value', snapshot => {
    
    const fbCharacters = snapshot.val();
    let characters = [];
    for(let id in fbCharacters) {
      const character = Character.fromFirebase(id, fbCharacters[id]);
      characters.push(character);
    }
    onSuccess(characters);
    
  });
}

/**
 * Removes any active listeners for character data
 * 
 * @param userid - the id of the active firebase user
 */
export function disconnectCharacters(userid) {
  firebase.database().ref(userid + '/characters').off();
}

//===== Monster CRUD =====
/**
* Retrieves monster data from firebase
* 
* @param userid - firebase uid of the active user
* @param monsterid - firebase id of the monster
* @param onSuccess - function called once data is retrieved
*/
export function getMonster(userid, monsterid, onSuccess) {
  const monsterRef = firebase.database().ref(userid + '/monsters/' + monsterid);
  monsterRef.once('value', snapshot => {
    onSuccess(snapshot.val());
  });
}

/**
 * Creates a new monster in firebase
 * 
 * @param userid - firebase uid of the active user
 * @param charData - new data for the monster
 */
export function createMonster(userid, monsterData) {
  const dbMonsters = firebase.database().ref().child(userid + '/monsters');
  // Get unique id
  const newMonsterId = dbMonsters.push().key;
  // Add timestamp
  monsterData.created_date = firebase.database.ServerValue.TIMESTAMP;
  // Upload data to firebase
  updateMonster(userid, newMonsterId, monsterData);
}

/**
 * Uploads a new monster image to firebase
 * and creates a new monster in firebase
 * 
 * @param userid - firebase uid of the active user
 * @param charData - new data for the monster
 * @returns file upload task for progress monitoring
 */
export function createMonsterWithImage(userid, monsterData, imageFile) {
  const dbMonsters = firebase.database().ref().child(userid + '/monsters');
  const newMonsterId = dbMonsters.push().key;
  const imageUpload = uploadMonsterImage(userid, newMonsterId, imageFile);
  
  imageUpload.on('state_changed', null, null, () => {
    // On successful upload, update monster with image url
    const imageUrl = imageUpload.snapshot.downloadURL;
    monsterData["image"] = imageUrl;
    // Add timestamp
    monsterData.created_date = firebase.database.ServerValue.TIMESTAMP;
    // Upload monster to firebase
    updateMonster(userid, newMonsterId, monsterData);
  });
  
  return imageUpload;
}

/**
 * Uploads a new monster image to firebase
 * 
 * @param userid - firebase uid of the active user
 * @param charid - firebase id of the monster
 * @param imageFile - the image file to upload
 * @returns file upload task for progress monitoring
 */
export function uploadMonsterImage(userid, monsterid, imageFile) {
  const imageMetaData = { 
    contentType: imageFile.type,
  };
  const storageRef = firebase.storage().ref();
  const fileDestination = storageRef.child(userid + '/images/monsters/' + monsterid);
  const fileUpload = fileDestination.put(imageFile, imageMetaData);
  
  return fileUpload;
}

/**
 * Updates monster data in firebase
 * 
 * @param userid - firebase uid of the active user
 * @param monsterid - firebase id of the monster
 * @param monsterData - new data for the monster
 * @param onSuccess - optional function called once transaction is complete
 */
export function updateMonster(userid, monsterid, monsterData) {
  const dbMonsters = firebase.database().ref().child(userid + '/monsters');
  const updatedMonster = {
    [monsterid]: monsterData
  };
  dbMonsters.update(updatedMonster);
}

/**
 * Uploads a new monster image to firebase
 * and updates monster in firebase
 * 
 * @param userid - firebase uid of the active user
 * @param monsterData - new data for the monster
 * @returns file upload task for progress monitoring
 */
export function updateMonsterWithImage(userid, monsterid, monsterData, imageFile) {
  const imageUpload = uploadMonsterImage(userid, monsterid, imageFile);
  imageUpload.on('state_changed', null, null, () => {
    // On successful upload, update monster data with image url
    const imageUrl = imageUpload.snapshot.downloadURL;
    monsterData["image"] = imageUrl;
    // Upload monster to firebase
    updateMonster(userid, monsterid, monsterData);
  });
  
  return imageUpload;
}

/**
 * Deletes a monster from firebase
 * 
 * @param userid - firebase uid of the active user
 * @param monsterid - firebase id of the monster
 */
export function deleteMonster(userid, monsterid) {
  const dbMonsters = firebase.database().ref().child(userid + '/monsters');
  const deletedMonster = {
    [monsterid]: null
  };
  dbMonsters.update(deletedMonster);
  deleteMonsterImage(userid, monsterid);
}

/**
 * Deletes a monster image from firebase storage
 * 
 * @param userid - the uid of the active firebase user
 * @monsterid - id of the monster whose image we are deleting
 */
export function deleteMonsterImage(userid, monsterid) {
  const storageRef = firebase.storage().ref();
  const imagePath = storageRef.child(userid + '/images/monsters/' + monsterid);
  imagePath.delete().then(function() {
    // File deleted successfully
  }).catch(function(error) {
    console.log(error);
  });
}

/**
* Retrieves all monster data for a monster from firebase
* and sets up a listener to be called on changes to monster data
* 
* @param userid - firebase uid of the active user
* @param onSuccess - function called once data is retrieved
*/
export function getAllMonsters(userid, onSuccess) {
  const monsterRef = firebase.database().ref(userid + '/monsters/');
  monsterRef.on('value', snapshot => {
    
    const fbMonsters = snapshot.val();
    let monsters = [];
    for(let id in fbMonsters) {
      const monster = Monster.fromFirebase(id, fbMonsters[id]);
      monsters.push(monster);
    }
    onSuccess(monsters);
    
  });
}

/**
 * Removes any active listeners for monster data
 * 
 * @param userid - the id of the active firebase user
 */
export function disconnectMonsters(userid) {
  firebase.database().ref(userid + '/monsters').off();
}