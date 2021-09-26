import * as tsyringe from 'tsyringe';
import { Token } from './decorator';

export class Container {
  constructor(private readonly container = tsyringe.container) {}

  resolve<T>(token: Token<T>): T {
    return this.container.resolve(token as tsyringe.InjectionToken);
  }
}
