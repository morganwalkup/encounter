import Combatant from './Combatant';
import * as Firebase from '../DatabaseFunctions/FirebaseFunctions';

export default class Character extends Combatant {
    /**
     * Default constructor
     */
    constructor() {
      super();
      this.image = "https://firebasestorage.googleapis.com/v0/b/encounter-49be9.appspot.com/o/admin%2Fimages%2Fcharacters%2FDefault.jpg?alt=media&token=d67e681c-849f-4160-923a-5c87acd3b48a";
      this.LVL = "";
    }
    
    /**
     * Creates a Character instance from Firebase format data
     * @param id - Unique id of the character
     * @param character - Character data in firebase format
     * @return new Character object
     */
    static fromFirebase(id, character) {
      let newCharacter = new Character();
      if(character != null) {
        newCharacter.id = id; 
        newCharacter.name = character.name;
        newCharacter.image = character.image;
        newCharacter.LVL = character.LVL;
        newCharacter.AC = character.AC;
        newCharacter.HP = character.HP;
        newCharacter.SPD = character.SPD;
        newCharacter.STR = character.STR;
        newCharacter.DEX = character.DEX;
        newCharacter.CON = character.CON;
        newCharacter.INT = character.INT;
        newCharacter.WIS = character.WIS;
        newCharacter.CHA = character.CHA;
        newCharacter.createdDate = character.created_date;
      }
      return newCharacter;
    }
    
    /**
     * Creates a copy of the given Character
     * @param character - Character data in Character format
     * @return new Character object
     */
    static copy(character) {
      let newCharacter = new Character();
      if(character != null) {
        newCharacter.id = character.id; 
        newCharacter.name = character.name;
        newCharacter.image = character.image;
        newCharacter.LVL = character.LVL;
        newCharacter.AC = character.AC;
        newCharacter.HP = character.HP;
        newCharacter.SPD = character.SPD;
        newCharacter.STR = character.STR;
        newCharacter.DEX = character.DEX;
        newCharacter.CON = character.CON;
        newCharacter.INT = character.INT;
        newCharacter.WIS = character.WIS;
        newCharacter.CHA = character.CHA;
        newCharacter.createdDate = character.createdDate;
      }
      return newCharacter;
    }
    
    /**
     * Updates this character in Firebase
     */
    update() {
      const fbCharData = {
        name: this.name,
        image: this.image,
        LVL: this.LVL,
        AC: this.AC,
        HP: this.HP,
        SPD: this.SPD,
        STR: this.STR,
        DEX: this.DEX,
        CON: this.CON,
        INT: this.INT,
        WIS: this.WIS,
        CHA: this.CHA,
        created_date: this.createdDate,
      };
        
      Firebase.updateCharacter(
        Firebase.getMostRecentUserId(), 
        this.id, 
        fbCharData
      );
    }
    
    /**
     * Updates this character in firebase and uploads the image file
     * @param imageFile - The new image file for the character avatar
     */
    updateWithImage(imageFile) {
      const fbCharData = {
        name: this.name,
        image: this.image,
        LVL: this.LVL,
        AC: this.AC,
        HP: this.HP,
        SPD: this.SPD,
        STR: this.STR,
        DEX: this.DEX,
        CON: this.CON,
        INT: this.INT,
        WIS: this.WIS,
        CHA: this.CHA,
        created_date: this.createdDate,
      };
        
      Firebase.updateCharacterWithImage(
        Firebase.getMostRecentUserId(), 
        this.id, 
        fbCharData,
        imageFile
      );
    }
    
    /**
     * Creates this character in Firebase
     */
    create() {
      const fbCharData = {
        name: this.name,
        image: this.image,
        LVL: this.LVL,
        AC: this.AC,
        HP: this.HP,
        SPD: this.SPD,
        STR: this.STR,
        DEX: this.DEX,
        CON: this.CON,
        INT: this.INT,
        WIS: this.WIS,
        CHA: this.CHA,
        created_date: this.createdDate,
      };
        
      Firebase.createCharacter(
        Firebase.getMostRecentUserId(), 
        fbCharData
      );
    }
    
    /**
     * Creates this character in firebase and uploads the image file
     * @param imageFile - The new image file for the character avatar
     */
    createWithImage(imageFile) {
      const fbCharData = {
        name: this.name,
        image: this.image,
        LVL: this.LVL,
        AC: this.AC,
        HP: this.HP,
        SPD: this.SPD,
        STR: this.STR,
        DEX: this.DEX,
        CON: this.CON,
        INT: this.INT,
        WIS: this.WIS,
        CHA: this.CHA,
        created_date: this.createdDate,
      };
        
      Firebase.createCharacterWithImage(
        Firebase.getMostRecentUserId(), 
        fbCharData,
        imageFile
      );
    }
    
    /**
     * Deletes this character from firebase
     */
    deleteChar() {
      Firebase.deleteCharacter(
        Firebase.getMostRecentUserId(), 
        this.id
      );
    }
}