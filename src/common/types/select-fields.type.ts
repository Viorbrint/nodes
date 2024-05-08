export type SelectFields<T> = Readonly<Partial<Record<keyof T, true>>>;
