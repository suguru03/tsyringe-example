type Key<Name extends string> = string & Record<`__${Name}`, symbol>;
