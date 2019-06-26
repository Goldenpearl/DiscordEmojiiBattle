// Stretch Goal 1: Boss personality enum
export class BossDialogGenerator
{
  constructor()
  {

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
