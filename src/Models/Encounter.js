import * as Firebase from '../DatabaseFunctions/FirebaseFunctions';

export default class Encounter {
    /**
     * Default constructor
     */
    constructor() {
      this.id = "";
      this.title = "";
      this.description = "";
      this.image = "https://firebasestorage.googleapis.com/v0/b/encounter-49be9.appspot.com/o/admin%2Fimages%2Fencounters%2FDefaultEncounter.jpg?alt=media&token=41e728ac-1167-4436-bd44-e40c533595b4";
      this.characterIDs = [];
      this.monsterIDs = [];
      this.createdDate = Date.now();
    } 
    
    /**
     * Constructor taking encounter in Firebase format
     * @param id - Unique id of the combatant
     * @param encounter - Encounter data in firebase format
     * @return new Encounter object
     */
    static fromFirebase(id, encounter) {
      let newEncounter = new Encounter();
      if(encounter != null) {
        newEncounter.id = id; 
        newEncounter.title = encounter.title;
        newEncounter.description = encounter.description;
        newEncounter.image = encounter.image;
        newEncounter.characterIDs = encounter.characters;
        newEncounter.monsterIDs = encounter.monsters;
        newEncounter.createdDate = encounter.created_date;
      }
      return newEncounter;
    }
    
    /**
     * Constructor duplicating existing encounter
     * @param encounter - Encounter data in Encounter format
     * @return new Encounter object
     */
    static copy(encounter) {
      let newEncounter = new Encounter();
      if(encounter != null) {
        newEncounter.id = encounter.id; 
        newEncounter.title = encounter.title;
        newEncounter.description = encounter.description;
        newEncounter.image = encounter.image;
        newEncounter.characterIDs = encounter.characterIDs;
        newEncounter.monsterIDs = encounter.monsterIDs;
        newEncounter.createdDate = encounter.createdDate;
      }
      return newEncounter;
    }
    
    /**
     * Updates this character in Firebase
     */
    update() {
      const fbEncounterData = {
        title: this.title,
        description: this.description,
        image: this.image,
        characters: this.characterIDs,
        monsters: this.monsterIDs,
        created_date: this.createdDate,
      };
        
      Firebase.updateEncounter(
        Firebase.getMostRecentUserId(), 
        this.id, 
        fbEncounterData
      );
    }
    
    /**
     * Updates this character in firebase and uploads the image file
     * @param imageFile - The new image file for the character avatar
     */
    updateWithImage(imageFile) {
      const fbEncounterData = {
        title: this.title,
        description: this.description,
        image: this.image,
        characters: this.characterIDs,
        monsters: this.monsterIDs,
        created_date: this.createdDate,
      };
        
      Firebase.updateEncounterWithImage(
        Firebase.getMostRecentUserId(), 
        this.id, 
        fbEncounterData,
        imageFile
      );
    }
    
    /**
     * Creates this character in Firebase
     */
    create() {
      const fbEncounterData = {
        title: this.title,
        description: this.description,
        image: this.image,
        characters: this.characterIDs,
        monsters: this.monsterIDs,
        created_date: this.createdDate,
      };
        
      Firebase.createEncounter(
        Firebase.getMostRecentUserId(), 
        fbEncounterData
      );
    }
    
    /**
     * Creates this character in firebase and uploads the image file
     * @param imageFile - The new image file for the character avatar
     */
    createWithImage(imageFile) {
      const fbEncounterData = {
        title: this.title,
        description: this.description,
        image: this.image,
        characters: this.characterIDs,
        monsters: this.monsterIDs,
        created_date: this.createdDate,
      };
        
      Firebase.createEncounterWithImage(
        Firebase.getMostRecentUserId(), 
        fbEncounterData,
        imageFile
      );
    }
    
    /**
     * Deletes this encounter from firebase
     */
    deleteEncounter() {
      Firebase.deleteEncounter(
        Firebase.getMostRecentUserId(), 
        this.id
      );
    }
}