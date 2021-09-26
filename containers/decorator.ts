import * as tsyringe from 'tsyringe';
import { Lifecycle } from 'tsyringe';

export type Constructor<T = any> = new (...args: any[]) => T;
export type AbstractConstructor<T = any> = abstract new (...args: any[]) => T;
export type Token<T = any> = tsyringe.InjectionToken<T> | AbstractConstructor<T>;

export function injectable(...tokens: Token[]) {
  return (Class: Constructor) => {
    tsyringe.injectable()(Class);
    registerInterfaces(Class, tokens);
  };
}

export function singleton(...tokens: Token[]) {
  return (Class: Constructor) => {
    tsyringe.singleton()(Class);
    registerInterfaces(Class, tokens);
  };
}

export function scoped(lifecycle: Lifecycle.ContainerScoped | Lifecycle.ResolutionScoped, ...tokens: Token[]) {
  return (Class: Constructor) => {
    tsyringe.scoped(lifecycle)(Class);
    registerInterfaces(Class, tokens, { lifecycle });
  };
}

function registerInterfaces(Class: Constructor, tokens: Token[], options?: tsyringe.RegistrationOptions) {
  for (const token of tokens) {
    tsyringe.container.register(token as tsyringe.InjectionToken, { useToken: Class }, options);
  }
}
