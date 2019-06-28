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
  * @param {number} minDamage the minimum amound of damage caused by the emojii combo
  * @param {number} maxDamage the maximum amound of damage caused by the emojii combo
  */
  constructor(emojiiComboName: string, emojiiCombo: string[], minDamage: number, maxDamage: number)
  {
    this.emojiiComboName = emojiiComboName;
    this.emojiiCombo = emojiiCombo;
    this.damageRange = [minDamage, maxDamage];
    this.fullEmojiiStr = EmojiiCombo.calculateFullEmojiiStr(this.emojiiComboName, this.emojiiCombo, this.damageRange);
  }

  /**
  * Returns the name of the emojii combo
  *
  * @return {string} the name of the combo
  */
  public getName() : string
  {
    return this.emojiiComboName;
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
