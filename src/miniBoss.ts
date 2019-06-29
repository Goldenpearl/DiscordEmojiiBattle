export class MiniBoss{
  private name : string;
  private bossEmojii: string;
  private maxHealth : number;
  private currentHealth : number;

  constructor(bossName : string, bossEmojii : string, bossMaxHealth : number)
  {
    this.name = bossName;
    this.bossEmojii = bossEmojii;
    this.maxHealth = bossMaxHealth;
    this.currentHealth = bossMaxHealth;
  }

  public getMaxHealth() : number
  {
    return this.maxHealth;
  }

  public getCurrentHealth() : number
  {
    return this.currentHealth;
  }

  public getEmojii() : string
  {
    return this.bossEmojii;
  }

  public getName() : string
  {
    return this.name;
  }

  public takeDamage(damageToTake : number) : void
  {
    if(this.currentHealth < damageToTake)
    {
      this.currentHealth = 0;
    }
    else
    {
      this.currentHealth-=damageToTake;
    }
  }
};
