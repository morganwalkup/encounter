import Combatant from './Combatant';
import * as Firebase from '../DatabaseFunctions/FirebaseFunctions';

export default class Monster extends Combatant {
    /**
     * Default constructor
     */
    constructor() {
      super();
      this.image = "https://firebasestorage.googleapis.com/v0/b/encounter-49be9.appspot.com/o/admin%2Fimages%2Fmonsters%2FDefault.jpg?alt=media&token=09401431-a9d6-4e21-a204-f5a4e95390c3";
      this.CR = "";
    }
    
    /**
     * Creates a Monster instance from Firebase format data
     * @param id - Unique id of the monster
     * @param monster - Monster data in firebase format
     * @return new Monster object
     */
    static fromFirebase(id, monster) {
      let newMonster = new Monster();
      if(monster != null) {
        newMonster.id = id; 
        newMonster.name = monster.name;
        newMonster.image = monster.image;
        newMonster.CR = monster.CR;
        newMonster.AC = monster.AC;
        newMonster.HP = monster.HP;
        newMonster.SPD = monster.SPD;
        newMonster.STR = monster.STR;
        newMonster.DEX = monster.DEX;
        newMonster.CON = monster.CON;
        newMonster.INT = monster.INT;
        newMonster.WIS = monster.WIS;
        newMonster.CHA = monster.CHA;
        newMonster.createdDate = monster.created_date;
      }
      return newMonster;
    }
    
    /**
     * Creates a copy of the given Monster
     * @param monster - Monster data in Monster format
     * @return new Monster object
     */
    static copy(monster) {
      let newMonster = new Monster();
      if(monster != null) {
        newMonster.id = monster.id; 
        newMonster.name = monster.name;
        newMonster.image = monster.image;
        newMonster.CR = monster.CR;
        newMonster.AC = monster.AC;
        newMonster.HP = monster.HP;
        newMonster.SPD = monster.SPD;
        newMonster.STR = monster.STR;
        newMonster.DEX = monster.DEX;
        newMonster.CON = monster.CON;
        newMonster.INT = monster.INT;
        newMonster.WIS = monster.WIS;
        newMonster.CHA = monster.CHA;
        newMonster.createdDate = monster.createdDate;
      }
      return newMonster;
    }
    
    /**
     * Updates this monster in Firebase
     */
    update() {
      const fbMonsterData = {
        name: this.name,
        image: this.image,
        CR: this.CR,
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
        
      Firebase.updateMonster(
        Firebase.getMostRecentUserId(), 
        this.id, 
        fbMonsterData
      );
    }
    
    /**
     * Updates this monster in firebase and uploads the image file
     * @param imageFile - The new image file for the monster avatar
     */
    updateWithImage(imageFile) {
      const fbMonsterData = {
        name: this.name,
        image: this.image,
        CR: this.CR,
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
        
      Firebase.updateMonsterWithImage(
        Firebase.getMostRecentUserId(), 
        this.id, 
        fbMonsterData,
        imageFile
      );
    }
    
    /**
     * Creates this monster in Firebase
     */
    create() {
      const fbMonsterData = {
        name: this.name,
        image: this.image,
        CR: this.CR,
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
        
      Firebase.createMonster(
        Firebase.getMostRecentUserId(), 
        fbMonsterData
      );
    }
    
    /**
     * Creates this monster in firebase and uploads the image file
     * @param imageFile - The new image file for the monster avatar
     */
    createWithImage(imageFile) {
      const fbMonsterData = {
        name: this.name,
        image: this.image,
        CR: this.CR,
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
        
      Firebase.createMonsterWithImage(
        Firebase.getMostRecentUserId(), 
        fbMonsterData,
        imageFile
      );
    }
    
    /**
     * Deletes this monster from firebase
     */
    deleteMonster() {
      Firebase.deleteMonster(
        Firebase.getMostRecentUserId(), 
        this.id
      );
    }
}