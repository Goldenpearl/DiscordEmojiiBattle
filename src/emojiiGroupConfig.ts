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
  getEmojiiGroup(emojiiGroup : EmojiiGroup) : string[]
  {
    let returnable : string[] = [];
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
    }
    return returnable;
  }
}
