
let emojiiMapping :  {[key: string]: string}= {":cow:" : "🐮",
":full_moon:" : "🌕",
":rocket:" : "🚀",
":fire:" : "🔥",
":zap:" : "⚡",
":leaves:" : "🍃",
":fork_and_knife:" : "🍴",
":hamburger:" : "🍔",
":fries:" : "🍟",
":high_heel:" : "👠",
":dress:" : "👗",
":bouquet:" : "💐",
":purse:" : "👛",
":closed_umbrella:" : "🌂",
":rainbow:" : "🌈",
":red_circle:" : "🔴",
":green_apple:" : "🍏",
":orange_book:" : "📙",
":purple_heart:" : "💜",
":small_blue_diamond:" : "🔹",
":mushroom:" : "🍄",
":chestnut:" : "🌰",
":herb:" : "🌿",
":dragon:" : "🐉",
":gem:" : "💎",
":candle:" : "🕯",
":sparkles:" : "✨",
":blue_book:" : "📘",
":star:" : "⭐",
":lollipop:" : "🍭",
":chocolate_bar:" : "🍫",
":cake:" : "🍰",
":candy:" : "🍬",
":bird:" : "🐦",
":balloon:" : "🎈",
":umbrella2:" : "☂",
":grapes:" : "🍇",
":melon:" : "🍈",
":banana:" : "🍌",
":tangerine:" : "🍊",
":tomato:" : "🍅",
":unicorn:" : "🦄",
":ice_cream:" : "🍨",
":sparkling_heart:" : "💖",
":wolf:" : "🐺",
":feet:" : "🐾",
":evergreen_tree:" : "🌲",
":butterfly:" : "🦋",
":tulip:" : "🌷",
":deciduous_tree:" : "🌳",
":sunny:" : "☀",
":squid:" : "🦑",
":dolphin:" : "🐬",
":crab:" : "🦀",
":whale:" : "🐳",
":tropical_fish:" : "🐠",
":bug:" : "🐛",
":bee:" : "🐝",
":beetle:" : "🐞",
":cloud_tornado:" : "🌪",
":droplet:" : "💧",
":shark:" : "🦈"}

export enum EmojiiGroup{
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
};

export class EmojiiGroupConfig
{
  /**
  * Returns a list of possible emojii in a given EmojiiGroup.
  * @param {EmojiiGroup} emojiiGroup an enum representing a grouping of emojii characters
  * @return {string[]} an array of emojii associated with the enum.
  */
  static getPossibleEmojiisInGroup(emojiiGroup : EmojiiGroup) : string[]
  {
    let returnable : string[] = [];
    console.log("loop " + emojiiGroup);
    switch(emojiiGroup)
    {
      case EmojiiGroup.toTheMooooon:
      returnable = [":cow:", ":full_moon:", ":rocket:"]; //:comet: :star:
      break;
      case EmojiiGroup.elementary:
      returnable = [":fire:",":droplet:",":zap:", ":leaves:"];
      break;
      case EmojiiGroup.letThemEatSteak:
      returnable = [":fork_and_knife:",":hamburger:",":fries:"];
      break;
      case EmojiiGroup.shoppingSpree:
      returnable = [":high_heel:", ":dress:", ":bouquet:", ":purse:", ":closed_umbrella:"];
      break;
      case EmojiiGroup.colors:
      returnable = [":rainbow:", ":red_circle:", ":green_apple:", ":orange_book:", ":purple_heart:", ":small_blue_diamond:"];
      break;
      case EmojiiGroup.forestFriends:
      returnable = [":mushroom:", ":chestnut:", ":herb:", ":evergreen_tree:"];
      break;
      case EmojiiGroup.dragonsNest:
      returnable = [":dragon:", ":fire:", ":gem:"];
      break;
      case EmojiiGroup.wizardWonderland:
      returnable =[":candle:", ":sparkles:", ":blue_book:", ":star:"];
      break;
      case EmojiiGroup.sweetTooth:
      returnable = [":lollipop:", ":chocolate_bar:", ":cake:", ":candy:"];
      break;
      case EmojiiGroup.iBelieveICanFly:
      returnable = [":bird:", ":balloon:", ":umbrella2:"];
      break;
      case EmojiiGroup.technicallyBerries:
      returnable = [":grapes:", ":melon:", ":banana:",":tangerine:", ":tomato:"]
      break;
      case EmojiiGroup.unicornWishes:
      returnable = [":unicorn:", ":rainbow:",":ice_cream:",":sparkles:",":sparkling_heart:"]
      break;
      case EmojiiGroup.howl:
      returnable = [":wolf:", ":feet:", ":full_moon:",":evergreen_tree:"]
      break;
      case EmojiiGroup.spring:
      returnable = [":butterfly:", ":bird:", ":tulip:",":deciduous_tree:",":sunny:"]
      break;
      case EmojiiGroup.friends:
      returnable = [":squid:", ":dolphin:", ":crab:", ":whale:", ":tropical_fish:"]
      break;
      case EmojiiGroup.campingBuddies: //#notTheBees
      returnable = [":bug:", ":bee:", ":beetle:",":butterfly:"];
      break;
      case EmojiiGroup.apocalypse:
      returnable = [":cloud_tornado:", ":droplet:", ":shark:"];
      break;
      case EmojiiGroup.soLong:
      returnable = [":dolphin:",":rocket:"];
      break;
      default:
      returnable = [":squid:", ":dolphin:", ":crab:", ":whale:", ":tropical_fish:"]; // TODO remove
    }
    return returnable;
  }

  /**
  * Returns a list of possible emojii combo names in a given EmojiiGroup.
  * @param {EmojiiGroup} emojiiGroup an enum representing a grouping of emojii characters
  * @return {string[]} an array of possible emojii combo names associated with the enum.
  */
  static getPossibleNamesInGroup(emojiiGroup : EmojiiGroup) : string[]
  {
    let returnable : string[] = [];
    switch(emojiiGroup)
    {
      case EmojiiGroup.toTheMooooon:
      returnable = ["Cow Powers", "To the Moooooon"];
      break;
      case EmojiiGroup.elementary:
      returnable = ["Super Effective", "Element Storm"];
      break;
      case EmojiiGroup.letThemEatSteak:
      returnable = ["Dehydration Ray"];
      break;
      case EmojiiGroup.shoppingSpree:
      returnable = ["Shopping Spree"];
      break;
      case EmojiiGroup.colors:
      returnable = ["Prismatic Laser"];
      break;
      case EmojiiGroup.forestFriends:
      returnable = ["Forage for Potions"];
      break;
      case EmojiiGroup.dragonsNest:
      returnable = ["Release the Dragon"];
      break;
      case EmojiiGroup.wizardWonderland:
      returnable =["Wizard Wonderland", "Magic Missle"];
      break;
      case EmojiiGroup.sweetTooth:
      returnable = ["Sweet Tooth", "Cavity Barrage"];
      break;
      case EmojiiGroup.iBelieveICanFly:
      returnable = ["Fly"];
      break;
      case EmojiiGroup.technicallyBerries:
      returnable = ["#technicallyBerries"]
      break;
      case EmojiiGroup.unicornWishes:
      returnable = ["Wish", "Imagination Beam"]
      break;
      case EmojiiGroup.howl:
      returnable = ["Wolf Guardians", "Howl"]
      break;
      case EmojiiGroup.spring:
      returnable = ["Spring Breeze"]
      break;
      case EmojiiGroup.friends:
      returnable = ["Tidal Force"]
      break;
      case EmojiiGroup.campingBuddies:
      returnable = ["#notTheBees:", "Forest Friends", "Lucky Bugs"];
      break;
      case EmojiiGroup.apocalypse:
      returnable = ["Apocalypse"];
      break;
      case EmojiiGroup.soLong:
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
    return returnable;
  }
}
