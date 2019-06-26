export class EmojiiCombo {
  private emojiiCombo: string[];
  private emojiiComboName: string;
  private fullEmojiiStr: string;
  private damageRange: [number, number];

  /**
  * Returns the emojii combo
  *
  * @param {string} emojiiComboName the title of the emojii combo
  * @param {string[]} emojiiCombo a list of emojii in the combo
  */
  constructor(emojiiComboName: string, emojiiCombo: string[])
  {
    this.emojiiComboName = emojiiComboName;
    this.emojiiCombo = emojiiCombo;
    this.damageRange = EmojiiCombo.calculateComboDamageRange(emojiiCombo);
    this.fullEmojiiStr = EmojiiCombo.calculateFullEmojiiStr(this.emojiiComboName, this.emojiiCombo, this.damageRange);

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
  * Returns the stored introdution to the emojii combo.
  *
  * @return {string[]} the list of emojii in the combo
  */
  public getFullEmojiiStr() : string
  {
    return this.fullEmojiiStr;
  }

  /**
  * Returns the damage range of the emojii combo.
  *
  * @return {[number, number]} the damage range of the emojii combo. (Min, Max)
  */
  public getDamageRange() : [number, number]
  {
    return this.damageRange;
  }

  /**
  * Returns the introdution to the emojii combo. (A name and damage range)
  * @param {string[]} emojiiCombo an array of emojii strings
  *
  * @return {string} a labeled string for the emojii combo.
  */
  private getDamageString(emojiiCombo : string[]) : string
  {
    // construct the emojii damage string
    let emojiiDamageStr : string = `(${this.damageRange[0]}-${this.damageRange[1]} dmg)`;
    return emojiiDamageStr;
  }

  /**
  * Returns the emojii string in emojii form.
  * @param {string[]} emojiiCombo an array of emojii strings
  *
  * @return {string} a string of emojiis when displayed in discord.
  */
  private static getEmojiiStr(emojiiCombo : string[]) : string
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
  private static getHelperStr(emojiiCombo: string[]) : string
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
  private static calculateComboDamageRange(emojiiCombo: string[]) : [number, number]
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

  /**
  * Returns a lengthy introduction to the emojii combo.
  * @param {string} emojiiComboName the title of the emojii combo
  * @param {string[]} emojiiCombo an array of emojii strings
  *
  * @return {string} a labeled string for the emojii combo.
  */
  private static calculateFullEmojiiStr(emojiiComboName : string, emojiiCombo :string[], damageRange :[number,number]) : string
  {
    let fullEmojiiStr = "";
    fullEmojiiStr += `**${emojiiComboName}**\n`;
    fullEmojiiStr += `- ${EmojiiCombo.getEmojiiStr(emojiiCombo)} (${damageRange[0]}-${damageRange[1]} dmg)`;
    return fullEmojiiStr;
  }
}
