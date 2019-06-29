
let emojiiMapping :  {[key: string]: string}= {":cow:" : "🐮",
"🌕": ":full_moon:",
"🚀": ":rocket:",
"🔥": ":fire:",
"⚡": ":zap:",
"🍃": ":leaves:",
"🍴": ":fork_and_knife:",
"🍔": ":hamburger:",
"🍟": ":fries:" ,
"👠": ":high_heel:",
"👗": "dress:",
"💐": ":bouquet:",
"👛": ":purse:" ,
"🌂": ":closed_umbrella:",
"🌈": ":rainbow:",
"🔴": ":red_circle:",
"🍏": ":green_apple:",
"📙": ":orange_book:",
"💜": ":purple_heart:",
"🔹": ":small_blue_diamond:",
"🍄": ":mushroom:" ,
"🌰": ":chestnut:",
"🌿": ":herb:",
"🐉": ":dragon:",
"💎": ":gem:",
"🕯": ":candle:",
"✨": ":sparkles:",
"📘": ":blue_book:",
"⭐": ":star:",
"🍭": ":lollipop:",
"🍫": ":chocolate_bar:",
"🍰": ":cake:",
"🍬": ":candy:",
"🐦": ":bird:" ,
"🎈": ":balloon:",
"☂": ":umbrella2:",
"🍇": ":grapes:",
"🍈": ":melon:",
"🍌": ":banana:",
"🍊": ":tangerine:",
"🍅": ":tomato:",
"🦄": ":unicorn:",
"🍨": ":ice_cream:",
"💖": ":sparkling_heart:",
"🐺": ":wolf:",
"🐾": ":feet:",
"🌲": ":evergreen_tree:" ,
"🦋": ":butterfly:" ,
"🌷": ":tulip:",
"🌳": ":deciduous_tree:",
"☀": ":sunny:",
"🦑": ":squid:",
"🐬": ":dolphin:",
"🦀": ":crab:",
"🐳": ":whale:",
"🐠": ":tropical_fish:",
"🐛": ":bug:",
"🐝":":bee:",
"🐞" : ":beetle:" ,
"🌪": ":cloud_tornado:",
"💧": ":droplet:" ,
"🦈": ":shark:" }

/*export enum EmojiiGroup{
  toTheMooooon,
  elementary,
  letThemEatSteak,
  shoppingSpree,
  colors,
  forestFriends,
  dragonsNest,
  wizardWonderland,
  sweetTooth,
  iBelieveICanFly,
  technicallyBerries,
  unicornWishes,
  howl,
  spring,
  friends,
  campingBuddies, //#not the bees
  apocalypse,
  soLong,
};*/

export class EmojiiGroupConfig
{
  /**
  * Returns a list of possible emojii in a given EmojiiGroup.
  * @param {number} emojiiGroup an enum representing a grouping of emojii characters
  * @return {string[]} an array of emojii associated with the enum.
  */
  static getPossibleEmojiisInGroup(emojiiGroup : number) : string[]
  {
    let returnable : string[] = [];
    console.log("loop " + emojiiGroup);
    switch(emojiiGroup)
    {
      case 1:
      returnable = [":cow:", ":full_moon:", ":rocket:"]; //:comet: :star:
      break;
      case 2:
      returnable = [":fire:",":droplet:",":zap:", ":leaves:"];
      break;
      case 3:
      returnable = [":fork_and_knife:",":hamburger:",":fries:"];
      break;
      case 4:
      returnable = [":high_heel:", ":dress:", ":bouquet:", ":purse:", ":closed_umbrella:"];
      break;
      case 5:
      returnable = [":rainbow:", ":red_circle:", ":green_apple:", ":orange_book:", ":purple_heart:", ":small_blue_diamond:"];
      break;
      case 6:
      returnable = [":mushroom:", ":chestnut:", ":herb:", ":evergreen_tree:"];
      break;
      case 7:
      returnable = [":dragon:", ":fire:", ":gem:"];
      break;
      case 8:
      returnable =[":candle:", ":sparkles:", ":blue_book:", ":star:"];
      break;
      case 9:
      returnable = [":lollipop:", ":chocolate_bar:", ":cake:", ":candy:"];
      break;
      case 10:
      returnable = [":bird:", ":balloon:", ":umbrella2:"];
      break;
      case 11:
      returnable = [":grapes:", ":melon:", ":banana:",":tangerine:", ":tomato:"]
      break;
      case 12:
      returnable = [":unicorn:", ":rainbow:",":ice_cream:",":sparkles:",":sparkling_heart:"]
      break;
      case 13:
      returnable = [":wolf:", ":feet:", ":full_moon:",":evergreen_tree:"]
      break;
      case 14:
      returnable = [":butterfly:", ":bird:", ":tulip:",":deciduous_tree:",":sunny:"]
      break;
      case 15:
      returnable = [":squid:", ":dolphin:", ":crab:", ":whale:", ":tropical_fish:"]
      break;
      case 16: //#notTheBees
      returnable = [":bug:", ":bee:", ":beetle:",":butterfly:"];
      break;
      case 17:
      returnable = [":cloud_tornado:", ":droplet:", ":shark:"];
      break;
      case 18:
      returnable = [":dolphin:",":rocket:"];
      break;
      default:
      returnable = [":squid:", ":dolphin:", ":crab:", ":whale:", ":tropical_fish:"]; // TODO remove
    }
    return returnable;
  }

  /**
  * Returns a list of possible emojii combo names in a given EmojiiGroup.
  * @param {EmojiiGroup} number an enum representing a grouping of emojii characters
  * @return {string[]} an array of possible emojii combo names associated with the enum.
  */
  static getPossibleNamesInGroup(emojiiGroup : number) : string[]
  {
    console.log("Possible name: " + emojiiGroup);
    let returnable : string[] = [];
    switch(emojiiGroup)
    {
      case 1:
      returnable = ["Cow Powers", "To the Moooooon"];
      break;
      case 2:
      returnable = ["Super Effective", "Element Storm"];
      break;
      case 3:
      returnable = ["Dehydration Ray"];
      break;
      case 4:
      returnable = ["Shopping Spree"];
      break;
      case 5:
      returnable = ["Prismatic Laser"];
      break;
      case 6:
      returnable = ["Forage for Potions"];
      break;
      case 7:
      returnable = ["Release the Dragon"];
      break;
      case 8:
      returnable =["Wizard Wonderland", "Magic Missle"];
      break;
      case 9:
      returnable = ["Sweet Tooth", "Cavity Barrage"];
      break;
      case 10:
      returnable = ["Fly"];
      break;
      case 11:
      returnable = ["#technicallyBerries"]
      break;
      case 12:
      returnable = ["Wish", "Imagination Beam"]
      break;
      case 13:
      returnable = ["Wolf Guardians", "Howl"]
      break;
      case 14:
      returnable = ["Spring Breeze"]
      break;
      case 15:
      returnable = ["Tidal Force"]
      break;
      case 16:
      returnable = ["#notTheBees:", "Forest Friends", "Lucky Bugs"];
      break;
      case 17:
      returnable = ["Apocalypse"];
      break;
      case 18:
      returnable = ["So Long!:","Rocket Surgery"];
      break;
    }
    return returnable;
  }

  /**
  * Returns an emojii as sent from discord in pure text format
  * @param {string} emojiiStringFromDiscord an encoded emojii
  * @return {string} a discord-formatted string representation of an emojii.
  */
  static translateEmojii(emojiiStringFromDiscord : string) : string
  {
    let returnable = emojiiMapping[emojiiStringFromDiscord];
    if(!returnable)
    {
      returnable = "";
    }
    console.log("Translating " +emojiiStringFromDiscord+"to " + returnable);
    return returnable;
  }
}
