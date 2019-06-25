export class EmojiiCombo {
  private emojiiCombo: string[];


  constructor(emojiiCombo: string[])
  {
    this.emojiiCombo = emojiiCombo;
  }

  /**
  * Returns the emojii combo
  *
  * @return {string[]} the list of emojii in the combo
  */
  public getEmojiiCombo() : string[]
  {
    return this.emojiiCombo;
  }

  /**
  * Returns a lengthy introduction introdution to the emojii combo. (A name, damage range, and emojii list)
  * @param {string} emojiiComboName the title of the emojii combo
  * @param {string[]} emojiiCombo an array of emojii strings
  *
  * @return {string} a labeled string for the emojii combo.
  */
  public static getFullEmojiiStr(emojiiComboName : string, emojiiCombo : string[])
  {
    let fullEmojiiStr = "";
    fullEmojiiStr += EmojiiCombo.getTitleString(emojiiComboName, emojiiCombo);
    fullEmojiiStr += "\n";
    fullEmojiiStr += EmojiiCombo.getEmojiiStr(emojiiCombo);
    fullEmojiiStr += "\n";
    fullEmojiiStr += EmojiiCombo.getHelperStr(emojiiCombo);
    return fullEmojiiStr;
  }

  /**
  * Returns the introdution to the emojii combo. (A name and damage range)
  * @param {string} emojiiComboName the title of the emojii combo
  * @param {string[]} emojiiCombo an array of emojii strings
  *
  * @return {string} a labeled string for the emojii combo.
  */
  public static getTitleString(emojiiComboName : string, emojiiCombo : string[]) : string
  {
    let emojiiTitleString : string = "";
    let emojiiDamageRange : [number, number] = EmojiiCombo.getComboDamageRange(emojiiCombo);

    // construct the emojii title string
    emojiiTitleString += emojiiComboName + "(";
    emojiiTitleString += emojiiDamageRange[0];
    emojiiTitleString += emojiiComboName + "-";
    emojiiTitleString += emojiiDamageRange[1];
    emojiiTitleString += emojiiComboName + " damage)";
    return emojiiTitleString;
  }

  /**
  * Returns the emojii string in emojii form.
  * @param {string[]} emojiiCombo an array of emojii strings
  *
  * @return {string} a string of emojiis when displayed in discord.
  */
  public static getEmojiiStr(emojiiCombo : string[]) : string
  {
    let emojiiString : string = "";
    for(let emojii of emojiiCombo)
    {
      emojiiString+= emojii + " ";
    }
    // remove the last space
    emojiiString = emojiiString.slice(0, -1);

    return emojiiString;
  }

  /**
  * Returns the emojii string as readable text. (A string of escaped emojii)
  * @param {string[]} emojiiCombo an array of emojii strings
  *
  * @return {string} a string of plain-text emojiis when displayed in discord.
  */
  public static getHelperStr(emojiiCombo: string[]) : string
  {
    let helperString : string = "(";
    for(let emojii of emojiiCombo)
    {
      let escapedEmojii = emojii.slice(0, -1) + "\:";
      helperString+= escapedEmojii + " ";
    }
    // remove the last space
    helperString = helperString.slice(0, -1);

    // close the parenthesis
    helperString += ")";
    return helperString;
  }

  /**
  * Calculate the damage of an emojii combo
  * @param {string[]} emojiiCombo an array of emojii strings
  *
  * @return {number, number} the min damage, and the max damage
  */
  public static getComboDamageRange(emojiiCombo: string[]) : [number, number]
  {
    /*let comboDamage = 0;
    let comboMultiplier = 5;
    let comboLength = emojiiCombo.length;

    // If only two emojii, reduce score by 30%. If all unique, increase score by 30%
    let numberUniqueEmojii = 0;
    let uniquenessMultiplier = 0.3;

    // 1
    // 4
    // 16
    // 36
    // 64
    // 100
    // 144
    // 196
    // 256


    //let comboDamage = comboMultiplier * comboLength * comboLength * numberUniqueEmojii/comboLength;

    //let numberSameEmojiiInARow = 0; //
    return comboDamage;*/
    return [5, 15];
  }
}
