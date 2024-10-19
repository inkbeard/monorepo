export type IconDetails = {
  /**
   * The icon to display on the card.
   */
  icon: string;
  /**
   * The family of the fontawesome icon.
   */
  family: string;
  /**
   * The name of the fontawesome icon.
   */
  name: string;
  /**
   * Whether the icon is a requires a pro license.
   */
  pro: boolean
  /**
   * The style of the fontawesome icon.
   */
  style: string;
};

export type IconCardProps = IconDetails & {
  /**
   * The id of the icon.
   */
  iconId: number;
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
};

export type TimeStopped = {
  /**
   * The time the game was stopped in MM:SS.MS format.
   */
  readableTime: string;
  /**
   * The time the game was stopped in milliseconds.
   */
  time: number;
};
