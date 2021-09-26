import * as tsyringe from 'tsyringe';
import { injectable, Token } from './decorator';

@injectable()
export class Container {
  private readonly container = tsyringe.container;

  resolve<T>(token: Token<T>): T {
    return this.container.resolve(token as tsyringe.InjectionToken);
  }
}
