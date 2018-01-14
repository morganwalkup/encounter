import * as firebase from 'firebase';

/**
 * Retrieves the active user id or 'anonymous' if no user is logged in
 * and sets up a listener for authentication changes
 * 
 * @param onResolve - function called once data is retrieved. Accepts userid as a parameter
 */
export function getUserId(onResolve) {
  firebase.auth().onAuthStateChanged((user) => {
    if(user)
        onResolve(user.uid);
    else
        onResolve('anonymous');
  });
}

/**
* Retrieves encounter data from firebase once
* 
* @param userid - firebase uid of the active user
* @param encounterid - firebase id of the encounter
* @param onResolve - function called once data is retrieved. Accepts encounter data as a parameter
*/
export function getEncounter(userid, encounterid, onResolve) {
  const encounterRef = firebase.database().ref(userid + '/encounters/' + encounterid);
  encounterRef.once('value', snapshot => {
    onResolve(snapshot.val());
  });
}

/**
 * Retrieves all encounters for a user from firebase
 * and sets up a listener to be called on changes to encounters
 * 
 * @param userid - firebase uid of the active user
 * @param onResolve - function called once data is retrieved. Accepts encounter data as parameter
 */
export function getAllEncounters(userid, onResolve) {
  const encounterRef = firebase.database().ref(userid + '/encounters/');
  encounterRef.on('value', snapshot => {
    onResolve(snapshot.val());
  });
}

//===== Character CRUD =====
/**
 * Retrieves character data from firebase
 * 
 * @param userid - firebase uid of the active user
 * @param charid - firebase id of the character
 * @param onResolve - function called once data is retrieved
 */
export function getCharacter(userid, charid, onResolve) {
  const characterRef = firebase.database().ref(userid + '/characters/' + charid);
  characterRef.once('value', snapshot => {
    onResolve(snapshot.val());
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
  const newCharId = dbCharacters.push().key;
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
 * @param onResolve - optional function called once transaction is complete
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
 * @charid - id of the character whose image we are deleting
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
* @param onResolve - function called once data is retrieved
*/
export function getAllCharacters(userid, onResolve) {
  const characterRef = firebase.database().ref(userid + '/characters/');
  characterRef.on('value', snapshot => {
    onResolve(snapshot.val());
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
* @param onResolve - function called once data is retrieved
*/
export function getMonster(userid, monsterid, onResolve) {
  const monsterRef = firebase.database().ref(userid + '/monsters/' + monsterid);
  monsterRef.once('value', snapshot => {
    onResolve(snapshot.val());
  });
}

/**
 * Creates a new monster in firebase
 * 
 * @param userid - firebase uid of the active user
 * @param charData - new data for the monster
 */
export function createMonster(userid, charData) {
  const dbMonsters = firebase.database().ref().child(userid + '/monsters');
  const newCharId = dbMonsters.push().key;
  updateMonster(userid, newCharId, charData);
}

/**
 * Uploads a new monster image to firebase
 * and creates a new monster in firebase
 * 
 * @param userid - firebase uid of the active user
 * @param charData - new data for the monster
 * @returns file upload task for progress monitoring
 */
export function createMonsterWithImage(userid, charData, imageFile) {
  const dbMonsters = firebase.database().ref().child(userid + '/monsters');
  const newCharId = dbMonsters.push().key;
  const imageUpload = uploadMonsterImage(userid, newCharId, imageFile);
  
  imageUpload.on('state_changed', null, null, () => {
    // On successful upload, update monster with image url
    const imageUrl = imageUpload.snapshot.downloadURL;
    charData["image"] = imageUrl;
    // Upload monster to firebase
    updateMonster(userid, newCharId, charData);
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
export function uploadMonsterImage(userid, charid, imageFile) {
  const imageMetaData = { 
    contentType: imageFile.type,
  };
  const storageRef = firebase.storage().ref();
  const fileDestination = storageRef.child(userid + '/images/monsters/' + charid);
  const fileUpload = fileDestination.put(imageFile, imageMetaData);
  
  return fileUpload;
}

/**
 * Updates monster data in firebase
 * 
 * @param userid - firebase uid of the active user
 * @param charid - firebase id of the monster
 * @param charData - new data for the monster
 * @param onResolve - optional function called once transaction is complete
 */
export function updateMonster(userid, charid, charData) {
  const dbMonsters = firebase.database().ref().child(userid + '/monsters');
  const updatedMonster = {
    [charid]: charData
  };
  dbMonsters.update(updatedMonster);
}

/**
 * Uploads a new monster image to firebase
 * and updates monster in firebase
 * 
 * @param userid - firebase uid of the active user
 * @param charData - new data for the monster
 * @returns file upload task for progress monitoring
 */
export function updateMonsterWithImage(userid, charid, charData, imageFile) {
  const imageUpload = uploadMonsterImage(userid, charid, imageFile);
  imageUpload.on('state_changed', null, null, () => {
    // On successful upload, update monster data with image url
    const imageUrl = imageUpload.snapshot.downloadURL;
    charData["image"] = imageUrl;
    // Upload monster to firebase
    updateMonster(userid, charid, charData);
  });
  
  return imageUpload;
}

/**
 * Deletes a monster from firebase
 * 
 * @param userid - firebase uid of the active user
 * @param charid - firebase id of the monster
 */
export function deleteMonster(userid, charid) {
  const dbMonsters = firebase.database().ref().child(userid + '/monsters');
  const deletedMonster = {
    [charid]: null
  };
  dbMonsters.update(deletedMonster);
  deleteMonsterImage(userid, charid);
}

/**
 * Deletes a monster image from firebase storage
 * 
 * @param userid - the uid of the active firebase user
 * @charid - id of the monster whose image we are deleting
 */
export function deleteMonsterImage(userid, charid) {
  const storageRef = firebase.storage().ref();
  const imagePath = storageRef.child(userid + '/images/monsters/' + charid);
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
* @param onResolve - function called once data is retrieved
*/
export function getAllMonsters(userid, onResolve) {
  const monsterRef = firebase.database().ref(userid + '/monsters/');
  monsterRef.on('value', snapshot => {
    onResolve(snapshot.val());
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