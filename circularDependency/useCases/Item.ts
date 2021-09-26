import { injectable } from '../../containers/decorator';
import { entities } from '../entities';

export abstract class Item {
  abstract get(id: entities.Item.Id): Promise<entities.Item>;
}

export namespace Item {
  export abstract class Repository {
    abstract get(id: entities.Item.Id): Promise<entities.Item>;
  }
}

@injectable(Item)
class ItemUseCase implements Item {
  constructor(private readonly repository: Item.Repository) {}

  async get(id: entities.Item.Id): Promise<entities.Item> {
    return this.repository.get(id);
  }
}
