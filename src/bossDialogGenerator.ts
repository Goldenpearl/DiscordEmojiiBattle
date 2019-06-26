import {EmojiiCombo} from "./emojiiCombo"

// Stretch Goal 1: Boss personality enum
export class BossDialogGenerator
{
  private static readonly NUM_HEARTS_TO_DISPLAY = 8;
  private static readonly FULL_HEART_EMOJII = ":heart:";
  private static readonly EMPTY_HEART_EMOJII = ":black_heart:";
  private static readonly HALF_HEART_EMOJII = ":broken_heart";

  private static readonly SPACER = "----------------------------";
  private static readonly MINOR_SPACER = "------------------";

  constructor()
  {

  }

  /**
  * Returns a string representing the encounter status.
  * @param {string} bossName the name of the boss
  * @param {string} bossEmojii the emojii representation of the boss
  * @param {number} currentHealth the current health of the boss
  * @param {number} maxHealth the maximum health of the boss
  * @param {EmojiiCombo[]} emojiiCombos the available emojii combos
  *
  * @return {string} a string representing the encounter status
  */
  getFullStatus(bossName : string, bossEmojii: string, currentHealth: number, maxHealth: number, emojiiCombos: EmojiiCombo[])
  {
    let statusStr = BossDialogGenerator.SPACER + "\n" +
    this.getBossStatus(bossName, bossEmojii, currentHealth, maxHealth) + "\n" +
    BossDialogGenerator.MINOR_SPACER + "\n" +
    this.getComboStatus(emojiiCombos) + "\n" +
    BossDialogGenerator.SPACER;

    return statusStr;
  }

  /**
  * Returns a string representing the boss status.
  * @param {string} bossName the name of the boss
  * @param {string} bossEmojii the emojii representation of the boss
  * @param {number} currentHealth the current health of the boss
  * @param {number} maxHealth the maximum health of the boss
  *
  * @return {string} a string representing the boss status
  */
  getBossStatus(bossName : string, bossEmojii: string, currentHealth: number, maxHealth: number)
  {
    let statusString =  bossName + "\n" + bossEmojii + "\n" + // TODO add a separate message for boss emojii so it is big
      this.getBossHealthStatus(currentHealth, maxHealth) + "\n";
    return statusString;
  }

  /**
  * Returns a description of available emojii combos
  * @param {EmojiiCombo[]} emojiiCombos the available emojii combos
  *
  * @return {string} a string representing all emojii combos
  */
  getComboStatus(emojiiCombos : EmojiiCombo[])
  {
    let statusString = "";
    for(let idx=0; idx < emojiiCombos.length; idx++)
    {
      statusString = emojiiCombos[idx].getFullEmojiiStr() + "\n";
    }
    statusString = statusString.substr(0, -1); // removes last newline
    return statusString;
  }

  /**
  * Returns the boss health as an emojii health bar
  * @param {number} currentHealth the current health of the boss
  * @param {number} maxHealth the maximum health of the boss
  *
  * @return {string} a string of emojii representing a health bar
  */
  // TODO in the future consider multiple rows; it looks cool. Just use newlines every X characters
  getBossHealthStatus(currentHealth: number, maxHealth: number) : string
  {
    let returnableStr :string = "";
    if(currentHealth <= maxHealth && currentHealth >=0)
    {
       returnableStr = "- "; // add a non-emojii character so font stays small
       let numHalfHearts :number = Math.round(currentHealth/maxHealth * BossDialogGenerator.NUM_HEARTS_TO_DISPLAY * 2);
       let numFullHearts :number = Math.round(numHalfHearts/2);
       numHalfHearts -= numFullHearts * 2;
       let numEmptyHearts = BossDialogGenerator.NUM_HEARTS_TO_DISPLAY - numFullHearts - numHalfHearts;

       for(let idx = 0; idx< numFullHearts; idx++)
       {
         returnableStr+= BossDialogGenerator.FULL_HEART_EMOJII + " ";
       }
       for(let idx = 0; idx< numHalfHearts; idx++)
       {
         returnableStr+= BossDialogGenerator.HALF_HEART_EMOJII + " ";
       }
       for(let idx = 0; idx< numEmptyHearts; idx++)
       {
         returnableStr+= BossDialogGenerator.EMPTY_HEART_EMOJII + " ";
       }

       // Trim trailing space
       returnableStr = returnableStr.substr(0, -1);
     }
     else
     {
       returnableStr = "error";
     }
     return returnableStr;
  }


  getBossGreeting() : string
  {
    return "Hi there heroes!";
  }

  getBossTaunt() : string
  {
    return "Not strong enough!";
  }

  getBossTakesMinorDamage(damage : number, source : string) : string
  {
    return `Ouch! ${source} did ${damage} damage.`;
  }

  getBossTakesMediumDamage() : string
  {
    return "Ouch!!";
  }

  getBossTakesMassiveDamage() : string
  {
    return "Ouch!!!";
  }

  getBossDefeat() : string
  {
    return "Noooooo!";
  }

  getBossVictoryTaunt() : string
  {
    return "I win again!";
  }
};
