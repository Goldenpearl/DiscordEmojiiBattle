export class MiniBoss{
  private bossName : string;
  private bossEmojii: string;
  private bossMaxHealth : number;
  private bossCurrentHealth : number;

  constructor(bossName : string, bossEmojii : string, bossMaxHealth : number)
  {
    this.bossName = bossName;
    this.bossEmojii = bossEmojii;
    this.bossMaxHealth = bossMaxHealth;
    this.bossCurrentHealth = bossMaxHealth;
  }

  public getMaxHealth() : number
  {
    return this.bossMaxHealth;
  }

  public getCurrentHealth() : number
  {
    return this.bossMaxHealth;
  }

  public getEmojii() : string
  {
    return this.bossEmojii;
  }

  public getName() : string
  {
    return this.bossName;
  }
};
