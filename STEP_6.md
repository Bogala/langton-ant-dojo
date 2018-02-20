# Advanced Typescript

In this last part, we'll learn some advanced typescript tools like Generics, Decorators or anbient declaration files. But also how to make forms in react.

## Decorators
### Generics

> "Generic programming is a style of computer programming in which algorithms are written in terms of types to-be-specified-later that are then instantiated when needed for specific types provided as parameters. This approach, pioneered by ML in 1973, permits writing common functions or types that differ only in the set of types on which they operate when used, thus reducing duplication. Such software entities are known as generics in Ada, C, C#, Delphi, Eiffel, F#, Java, Objective-C, Rust, Swift, TypeScript and Visual Basic .NET. They are known as parametric polymorphism in ML, Scala, Haskell (the Haskell community also uses the term "generic" for a related but somewhat different concept) and Julia; templates in C++ and D; and parameterized types in the influential 1994 book Design Patterns." -Wikipedia

In sum, if we want to reuse our devs with typed languages as C# or Java, we need to use their tools.
And yes, typescript can use generics.

Generic function example :

``` typescript
function log<T extends Object>(...args: T[]): Array<T> {
  console.log(args);
  return args;
} 
``` 

Generic class example :

``` typescript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = (x, y) => x + y;

alert(stringNumeric.add(stringNumeric.zeroValue, "test"));
``` 

### Intersection or union types
An intersection type combines multiple types into one. This allows you to add together existing types to get a single type that has all the features you need.

``` typescript
interface BindingProps {
  prop1: string;
  prop2: number;
}

interface EventProps {
  onClick: () => void;
}

type StatelessProps = BindingProps & EventProps;
``` 

Union types are closely related to intersection types, but they are used very differently. Occasionally, you’ll run into a library that expects a parameter to be either a number or a string.

``` typescript
let value: string | undefined;
value = "value";

const isNumber = (arg: number | string) => {
  if (arg is number) { 
    return true;
  } else {
    return !isNaN(arg);
  }
}

``` 


### Decorator
A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.

We have 5 types of decorators : factories, methods, classes, parameters and properties. 

### Method / Property decorator
Method decorator can enhance the function described just below declaration. It can be used to observe, modify or replace a function definition.

For example :

``` typescript
const log = (target: Object, key: string | symbol, descriptor: TypedPropertyDescriptor<Function>) => {
    return {
        value: function( ... args: Array<any>) {
            console.log("Arguments: ", args.join(", "));
            const result = descriptor.value.apply(target, args);
            console.log("Result: ", result);
            return result;
        }
    }
}

class Calculator {
    @log
    add(x: number, y: number) {
        return x + y;
    }
}
``` 

To update or replace method behavior, you have to use descriptor.value (and apply to execute).
If you want to be simplier, you can make your decorator like this :

``` typescript
const log = (target: Object, key: string | symbol, descriptor: TypedPropertyDescriptor<Function>) => {
    console.log("log decorator called");
}
``` 

But, with that, you can not use function args or enhance existing.

Property decorators are similar to method decorators. The only difference is they do not accept property descriptor as argument and do not return anything.

### Class decorator

A class decorator is a function that accepts a constructor function and returns a contstructor function. Returning undefined is equivalent to returning the constructor function passed in as argument.

Here, you can see the react-redux connect decorator

``` typescript 
export type InferableComponentEnhancer<TInjectedProps> =
    InferableComponentEnhancerWithProps<TInjectedProps, {}>;
    
export interface InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> {
    <P extends TInjectedProps>(
        component: Component<P>
    ): ComponentClass<Omit<P, keyof TInjectedProps> & TNeedsProps> & {WrappedComponent: Component<P>}
};

export interface Connect {
    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {}>(
        mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
        mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
    ): InferableComponentEnhancerWithProps<TStateProps & TDispatchProps, TOwnProps>;
};

export declare const connect: Connect;

const mapStateToProps = (state) => {
  return { todos: state.todos };
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyApp extends React.Component {
  // ...define your main app here
}
```

### Factory decorators

In order to create a parametrized decorator you create a decorator factory that accepts arguments and returns the decorator function to be used.

``` typescript
const greaterOrEqual = (n: number)  => {
    return (target: Object, key: string | symbol) => {
        let value = target[key];
 
        const getter = () =>  value;
        const setter = (val) => {
            if (val < n) {
                throw new Error(`Value smaller than ${n}`);
            }
            value = val;
        }
        Reflect.deleteProperty[key];
        Reflect.defineProperty(target, key, {
            get: getter,
            set: setter
        });
    }
}
 
 
class List {
    @greaterOrEqual(0) length: number;
}
``` 

### Parameter decorators

A parameter decorator is a function that accepts 3 arguments: the object on which the method is defined or the construction function if the decorator is on a constructor argument, the key for the method (a string name or symbol) or undefined in case of constructor argument and the index of the parameter in the argument list. A property decorator does not return anything.

``` typescript
const LOGGED_PARAM_KEY = "logged_param";
 
//Parameter decorator
const  loggedParam = (target: Object, key: string | symbol, index: number) => {
    const loggedParams: number[] = Reflect.getOwnMetadata(LOGGED_PARAM_KEY, target, key) || [];
    loggedParams.push(index);
    Reflect.defineMetadata(LOGGED_PARAM_KEY, loggedParams, target, key);
}
 
//Method decorator
const logMethodParams = (target: Object, key: string, descriptor: TypedPropertyDescriptor<Function>) => {
    const loggedParams: number[] = Reflect.getOwnMetadata(LOGGED_PARAM_KEY, target, key) || [];
    return {
        value: function( ... args: any[]) {
            console.log("Logged params: ", loggedParams.map(index => args[index]).join(", "));
            return descriptor.value.apply(target, args);
        }
    }
}
 
//Class decorator
const logConstructorParams: ClassDecorator = <T>(target: new(...args: any[]) => T) => {
    const loggedParams: number[] = Reflect.getOwnMetadata(LOGGED_PARAM_KEY, target) || [];
    function newConstructor(... args) {
        console.log("Logged params: ", loggedParams.map(index => args[index]).join(", "));
        new target(args);
    }
    newConstructor.prototype = target.prototype;
    return newConstructor;
}
 
@logConstructorParams
class List<T> {
    private items = new Array<T>();
 
    constructor(@loggedParam private initialItem: T) {
        this.items.push(initialItem);
    }  
 
    @logMethodParams
    addItem(@loggedParam item: T) {
      this.items.push(item);  
    }
}
``` 

## React forms

> Work in progress

# Reminders
![TDD Cycles](https://upload.wikimedia.org/wikipedia/commons/0/0b/TDD_Global_Lifecycle.png)
5 Steps to reproduce every cycle:
1. Add a new test
1. Run all tests and verify if the new test fails
1. Write code to pass the new test to green
1. Run all tests and verify all are green
1. Refactor

Before each test, launch a five minutes timer.
* If the code compiles and the tests are green, commit!
* Otherwise, revert!

All of __your__ code must be covered by unit tests.

We'll avoid `any` as much as possible (implicit or not).

## Exercice Solution
[_Download Example_](https://github.com/Bogala/langton-ant-dojo/archive/step6.zip)
