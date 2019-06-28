import * as Discord from "discord.js";
import {MiniBoss} from "./miniBoss";
import {EmojiiGroup, EmojiiGroupConfig} from "./emojiiGroupConfig";
import {EmojiiCombo} from "./emojiiCombo";
import {Encounter} from "./encounter";
import {sleep} from "./sleepUtilities";

export class EncounterGenerator
{
  private static readonly MIN_EMOJII_COMBOS = 3;
  private static readonly MAX_EMOJII_COMBOS = 3;

  private static readonly BOSS_MAX_TIME = 10;
  private static readonly BOSS_MIN_TIME = 10;

  private static readonly BOSS_MAX_HEALTH = 10;

  private static readonly MAX_DAMAGE_WOBBLE = 0.35;
  private static readonly MIN_DAMAGE_WOBBLE = 0.15;

  private static readonly BASE_COMBO_DMG = 10;

  /**
  * Generates a boss with a random name and emojii.
  *
  * @return {MiniBoss} a randomly generated miniboss
  */
  public static generateBoss() : MiniBoss
  {
    // Boss Name
    let bossName = "Gargal The Destroyer";
    let bossEmojii = ":dolphin:";
    let bossMaxHealth = EncounterGenerator.BOSS_MAX_HEALTH;
    //let bossTimeLimit = EncounterGenerator.BOSS_MIN_TIME; // TODO future
    return new MiniBoss(bossName, bossEmojii, bossMaxHealth);

  }

  /**
  * Generates a list of random emojii combos.
  *
  * @return {EmojiiCombo[]} a randomly generated list of emojii combos
  */
  public static generateEmojiiCombos() : EmojiiCombo[]
  {
    let comboList :EmojiiCombo[] = [];

    // Number of emojii combos
    let numberOfEmojiiCombos = this.getRandomValueFromMinToMax(EncounterGenerator.MIN_EMOJII_COMBOS, EncounterGenerator.MAX_EMOJII_COMBOS);

    // Number of characters in emojii combo.
    let comboLengths : {[key: string]: number[]} = {
      'short': [4],
      'medium': [5,6],
      'long': [7,8]
    }
    // Must be at least one non-long and non-short combo
    let containsNonLongCombo = false;
    let containsNonShortCombo = false;
    let comboLength : number = 0;

    for(let idx=0; idx<numberOfEmojiiCombos; idx++)
    {
      let comboKeys = Object.keys(comboLengths);
      let comboIdx = Math.floor(Math.random() * comboKeys.length);
      let randomComboKey = comboKeys[comboIdx];

      // Ensure the combo lengths are varied
      if(idx == numberOfEmojiiCombos - 1)
      {
        if(!containsNonLongCombo)
        {
          if(randomComboKey == 'long')
          {
            randomComboKey = "medium";
          }
        }
        else if(!containsNonShortCombo)
        {
          if(randomComboKey == 'short')
          {
            randomComboKey = "medium";
          }
        }
      }
      if(randomComboKey != 'short')
      {
        containsNonShortCombo = true;
      }
      if(randomComboKey != 'long')
      {
        containsNonLongCombo = true;
      }

      // Calculate a combo length
      comboLength = this.getRandomItemFromList(comboLengths[randomComboKey]);

      // Get combo group and name
      // No more than 50% of the combo can be a duplicate character.
      let randomEmojiiGroup : EmojiiGroup = EmojiiGroup.toTheMooooon; // default value; will be overwritten
      let possibleEmojiisInGroup : string[] = [];
      while(possibleEmojiisInGroup.length < Math.floor(comboLength / 2))
      {
        randomEmojiiGroup= this.getRandomItemFromList(Object.keys(EmojiiGroup));
        possibleEmojiisInGroup = EmojiiGroupConfig.getPossibleEmojiisInGroup(randomEmojiiGroup);
      }

      let possibleNamesInGroup = EmojiiGroupConfig.getPossibleNamesInGroup(randomEmojiiGroup);
      let comboName = this.getRandomItemFromList(possibleNamesInGroup);

      // Exact characters of emojii combo
      // At least 50% of the length of the combo must be unique
      let emojiiComboContents : string[] = [];
      let numDuplicates = 0;
      for(let idx = 0; idx< comboLength; idx++)
      {
        let nextEmojiiInCombo = "";
        if(idx < Math.floor(comboLength/2))
        {
          // Add unique character
          let availableEmojiiCharacters = possibleEmojiisInGroup.filter(function(item){return !emojiiComboContents.includes(item)});
          nextEmojiiInCombo = this.getRandomItemFromList(availableEmojiiCharacters);
        }
        else
        {
          // Add any character. (Possibly a duplicate)
          nextEmojiiInCombo = this.getRandomItemFromList(possibleEmojiisInGroup);
          if(emojiiComboContents.includes(nextEmojiiInCombo))
          {
            numDuplicates++;
          }
        }
        emojiiComboContents.push(nextEmojiiInCombo);
      }

      // Randomize combo order
      emojiiComboContents = emojiiComboContents.sort(function(){ return 0.5 - Math.random()});

      // Damage range of emojii combo
      // Step 1: Get base value (BASE_COMBO_DMG * Length squared; for each duplicate emojii, multiply by 90%)
      let baseDamage = (EncounterGenerator.BASE_COMBO_DMG * comboLength*comboLength * Math.pow(0.9, numDuplicates));

      // Step 2: Add delta (30%-70% wobble)
      let damageWobble = this.getRandomValueFromMinToMax(EncounterGenerator.MIN_DAMAGE_WOBBLE, EncounterGenerator.MAX_DAMAGE_WOBBLE);
      let minDamage = baseDamage - Math.floor(baseDamage * damageWobble);
      let maxDamage = baseDamage + Math.floor(baseDamage * damageWobble);

      // Add emojii combo to list
      comboList.push(new EmojiiCombo(comboName, emojiiComboContents, minDamage, maxDamage));
    }
    return comboList;
  }

  /**
  * Returns a random item from the list.
  * @param {any[]} listToProcess the list to search.
  * @return {any} randomly selected item
  */
  private static getRandomItemFromList(listToProcess: any[]) : any
  {
    return listToProcess[Math.floor(Math.random() * listToProcess.length)];
  }

  /**
  * Returns a random value between the given range.
  * @param {number} min the minimum possible value
  * @param {number} max the maximum possible value
  * @return {number} randomly selected value between the given range
  */
  private static getRandomValueFromMinToMax(min: number, max:number) : number
  {
    return Math.random()*(max-min) + min;
  }
}
