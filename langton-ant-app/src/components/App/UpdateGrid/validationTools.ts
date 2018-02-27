// tslint:disable-next-line:max-line-length
export const isValidNumber = (predicate: (value: number) => boolean, errorMessage: (value: number) => string) => {
    return (target: Object, key: string | symbol) => {
        let value = target[key];

        const getter = () => value;
        // tslint:disable-next-line:no-any
        const setter = (val: any) => {
            if (!predicate(val)) {
                throw new Error(errorMessage(val));
            }
            value = val;

        };
        // tslint:disable-next-line:no-unused-expression
        Reflect.deleteProperty[key];
        Reflect.defineProperty(target, key, {
            get: getter,
            set: setter
        });
    };
};