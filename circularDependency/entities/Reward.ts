import { Item } from './Item';

export class Reward {
  constructor(readonly id: Reward.Id, readonly itemId: Item.Id, readonly quantity: number) {}
}

export namespace Reward {
  export type Id = Key<'reward'> | Item.RewardItem;
}
