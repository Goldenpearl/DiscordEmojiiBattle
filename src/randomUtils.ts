export class RandomUtils{

  /**
  * Returns a random item from the list.
  * @param {any[]} listToProcess the list to search.
  * @return {any} randomly selected item
  */
  public static getRandomItemFromList(listToProcess: any[]) : any
  {
    return listToProcess[Math.floor(Math.random() * listToProcess.length)];
  }

  /**
  * Returns a random value between the given range.
  * @param {number} min the minimum possible value
  * @param {number} max the maximum possible value
  * @return {number} randomly selected value between the given range
  */
  public static getRandomValueFromMinToMax(min: number, max:number) : number
  {
    return Math.random()*(max-min) + min;
  };
}
