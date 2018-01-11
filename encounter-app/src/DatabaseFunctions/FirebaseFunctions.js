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
* Retrieves all monster data for a character from firebase
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