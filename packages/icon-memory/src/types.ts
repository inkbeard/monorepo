export interface IconDetails {
  /**
   * The icon to display on the card.
   */
  icon: string;
  /**
   * The id of the icon.
   */
  iconId: number;
  /**
   * The name of the icon.
   */
  name?: string;
  /**
   * Whether the icon is a requires a pro license.
   */
  pro?: boolean
}

export interface IconCardProps extends IconDetails {
  /**
   * Whether the card is active.
   */
  isActive: boolean;
  /**
   * Whether the game is currently calculating a match.
   */
  isCalculating?: boolean;
  /**
   * Whether the card has been matched.
   */
  isMatched?: boolean;
}

export interface TimeStopped {
  /**
   * The time the game was stopped in MM:SS.MS format.
   */
  readableTime: string;
  /**
   * The time the game was stopped in milliseconds.
   */
  time: number;
}
