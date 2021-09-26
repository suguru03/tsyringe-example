export type Item = Item.CurrencyItem | Item.RewardItem;

export namespace Item {
  export type Id = Key<'item'>;
  export type RewardId = Key<'item_reward'>;
  export enum Type {
    Currency,
    Reward,
  }
  export interface BaseItem {
    readonly id: Item.Id;
    readonly type: Item.Type;
    readonly quantity: number;
  }
  export class CurrencyItem implements BaseItem {
    constructor(readonly id: Item.Id, readonly type: Item.Type.Currency, readonly quantity: number) {}
  }

  export class RewardItem implements BaseItem {
    constructor(
      readonly id: Item.Id,
      readonly type: Item.Type.Reward,
      readonly quantity: number,
      readonly rewardId: RewardId,
    ) {}
  }
}
