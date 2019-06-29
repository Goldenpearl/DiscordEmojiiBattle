import {EmojiiCombo} from "./emojiiCombo"
import {MiniBoss} from "./miniboss"
import {RandomUtils} from "./randomUtils"
import {OutputHandler} from "./outputHandler";

// Stretch Goal 1: Boss personality enum
export class BossDialogGenerator
{
  private static readonly NUM_HEARTS_TO_DISPLAY = 8;
  private static readonly FULL_HEART_EMOJII = ":heart:";
  private static readonly EMPTY_HEART_EMOJII = ":black_heart:";
  private static readonly HALF_HEART_EMOJII = ":broken_heart";

  public static readonly SPACER = "----------------------------";
  public static readonly MINOR_SPACER = "------------------";

  constructor()
  {

  }

  /**
  * Returns a string representing the boss dialog, in a frame
  * @param {string} bossEmojii the emojii representation of the boss
  * @param {string} message the dialog which the boss will speak
  *
  * @return {string} a string representing the boss dialog, in a frame
  */
  getFramedBossMessage(bossEmojii: string, message: string) : string
  {
    return BossDialogGenerator.MINOR_SPACER + "\n" + bossEmojii+" " + message +"\n"+BossDialogGenerator.MINOR_SPACER;
  }

  /**
  * Returns formatting for an encounter countdown number.
  * @param {string} countdownNum the number of seconds remaining until the encounter.
  */
  getSecondCountdown(countdownNum: number)
  {
    let countdownStr = "";
    if(countdownNum>9)
    {
      countdownStr = ".          **"+countdownNum+"**          ."; // 1 less space on the right than string below
    }
    if(countdownNum>0)
    {
      countdownStr = ".          **"+countdownNum+"**         .";
    }
    else
    {
       countdownStr = ".     ***BEGIN***     .";
    }
    return countdownStr;
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
  * @param {EmojiiCombo[]} emojiiComboList the ;list of available emojii combos
  *
  * @return {string} a string representing the list of all emojii combos
  */
  getComboStatus(emojiiComboList : EmojiiCombo[])
  {
    let statusString = "";
    for(let idx=0; idx < emojiiComboList.length; idx++)
    {
      statusString += emojiiComboList[idx].getFullEmojiiStr() + "\n";
    }
    statusString = statusString.slice(0, -1); // removes last newline
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
       console.log("has numHalfHearts" + numHalfHearts);
       console.log("has numFullHearts" + numFullHearts);
       console.log("has numEmptyHearts" + numEmptyHearts);
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
      console.log(returnableStr);
       // Trim trailing space
       returnableStr = returnableStr.slice(0, -1);
       console.log(returnableStr);
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

  getBossTaunt(bossEmojii: string) : string
  {
    let bossTaunts = ["Not strong enough!", "Give up now, you fools!", "You will never defeat me!"]
    return this.getFramedBossMessage(bossEmojii, RandomUtils.getRandomItemFromList(bossTaunts));
  }

  getBossTakesMinorDamage(damage : number, source : string) : string
  {
    return `Ouch! ${source} did ${damage} damage.`;
  }

  getBossTakesComboDamage(damage : number, combo : EmojiiCombo) : string
  {
    let possibleStrs = [":boom:BOOM!:boom:", ":zap:ZAP!:zap:", ":sparkles:Nice!:sparkles:", "Wow,", "Amazing!"];
    let damageStr = RandomUtils.getRandomItemFromList(possibleStrs);
    return `**${damageStr} ${combo.getName()} did ${damage} damage.**`;
  }

  getBossDefeat(bossEmojii: string) : string
  {
    let defeatMsgs = ["Noooooo!", "Run away!", "Too strong..."];
    let defeatMsg = RandomUtils.getRandomItemFromList(defeatMsgs);
    return this.getFramedBossMessage(bossEmojii, defeatMsg);
  }

  getBossVictoryTaunt(bossEmojii: string) : string
  {
    let victoryTaunts = ["I win again!", "MUAHAHAHA!", "Too slow!"];
    let victoryTaunt = RandomUtils.getRandomItemFromList(victoryTaunts);
    return this.getFramedBossMessage(bossEmojii, victoryTaunt);
  }
};
