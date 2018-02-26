# Advanced Typescript & React forms

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

## New need

Ok, here we want to add a modal dialog to re-init and resize grid with ant.
On click on a specific button, a modal dialog will open with :
* A new size field (default value : 21)
* A new x coordinates for ant (default value : 10)
* A new y coordinates for ant (default value : 10)
* A button to re-init grid with previous values

## Form creation

### Update App Component
By the tests first :

``` tsx
  test('AppBar must have a settings buttone', () => {
    const click = () => { return; };
    const wrapper = shallow(<App onPlay={click} onPause={click} />);
    const { iconElementRight } = wrapper.find(AppBar).props();
    expect(iconElementRight).toBeDefined();
  });
``` 

And the code :

``` jsx
<AppBar title={title || 'Langton Ant'}
        iconElementLeft={<><IconButton><AvPause onClick={onPause} /></IconButton> <IconButton><AvPlayArrow onClick={onPlay} /></IconButton></>}
        iconElementRight={<IconButton><AvEqualizer onClick={this.handleClickOpen} /></IconButton>}
/>
``` 

Now add a [MaterialUI Modal Dialog](http://www.material-ui.com/#/components/dialog) :

``` jsx
<Dialog
  title="Reset grid with parameters"
  modal={false}
>
  <div />
</Dialog>
```  

To manage dialog, we have to add state (no in redux because it's specific for our component) :

``` jsx
const customContentStyle = {
  width: '300px',
};

interface AppState {
  isOpen: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  handleClickOpen = () => {
    this.setState({ isOpen: true });
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  render() {
    const { title, onPause, onPlay } = this.props;
    const { isOpen } = this.state;
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={title || 'Langton Ant'}
            // tslint:disable-next-line:max-line-length
            iconElementLeft={<><IconButton><AvPause onClick={onPause} /></IconButton> <IconButton><AvPlayArrow onClick={onPlay} /></IconButton></>}
            iconElementRight={<IconButton><AvEqualizer onClick={this.handleClickOpen} /></IconButton>}
          />
          <div>
            <div className="stretch">
              <Card className="md-card">
                <Switch>
                  <Route path="/" component={Grid} exact={true} />
                  <Route component={NotFound} />
                </Switch>
              </Card>
            </div>
          </div>
          <Dialog
            title="Reset grid with parameters"
            modal={false}
            open={isOpen}
            onRequestClose={this.handleClose}
            contentStyle={customContentStyle}
          >
            <div />
          </Dialog>

        </div>
      </MuiThemeProvider>
    );
  }
}
``` 

Tests (yes, we don't have to test React Library) :

``` typescript
test('App handles must call setState', async () => {
    const app = new App({});
    app.setState = jest.fn();
    app.handleClickOpen();
    expect(app.setState).toBeCalledWith({ isOpen: true });
    app.handleClose();
    expect(app.setState).toBeCalledWith({ isOpen: false });
  });
``` 

### Add Form Component

Tests

``` tsx
    test('Render match snapshot ', () => {
        const click = () => {
            // Do nothing 
        };

        const close = jest.fn();
        // tslint:disable-next-line:max-line-length
        const component = renderer.create(<MuiThemeProvider><Component arrayLength={21} antX={11} antY={11} submitForm={click} handleClose={close} /></MuiThemeProvider>).toJSON();
        expect(component).toMatchSnapshot();
    });
``` 

Code 

``` tsx
export interface UpdateGridBindingProps {
    arrayLength: number;
    antX: number;
    antY: number;
}

export interface UpdateGridEventProps { }

export interface UpdateGridProps extends UpdateGridBindingProps, UpdateGridEventProps { }

export default ({ arrayLength, antX, antY }) => (
            <>
                <TextField
                    id="arrayLength"
                    defaultValue={arrayLength}
                    floatingLabelText="Grid Size (number)"
                /><br /><TextField
                    id="antX"
                    defaultValue={antX}
                    floatingLabelText="Ant X Position"
                /><br /><TextField
                    id="antY"
                    defaultValue={antY}
                    floatingLabelText="Ant Y Position"
                /><br />
                <RaisedButton label="Re-init Grid" fullWidth={true} />
            </>
);
``` 

No behavior, just graphics. So, only a snapshot test.

To add behavior, we have to add this tes :

``` tsx
test('ChangeEvent update values sended to submitForm', async () => {
    const click = jest.fn();
    const close = jest.fn();

    const form = new Component({arrayLength: 21, antX: 10, antY: 10, submitForm: click, handleClose: close});
    form.onChangeLength({ currentTarget: { value: '90'}});
    form.onChangeX({ currentTarget: { value: '60'}});
    form.onChangeY({ currentTarget: { value: '30'}});
    form.onSubmit();

    expect(click).toBeCalledWith(90, 60, 30);
});
``` 

That's make a little revolution as :

``` tsx
export interface UpdateGridBindingProps {
    arrayLength: number;
    antX: number;
    antY: number;
}

export interface UpdateGridEventProps {
    submitForm: (length: number, x: number, y: number) => void;
}

export interface UpdateGridProps extends UpdateGridBindingProps, UpdateGridEventProps { 
    handleClose: () => void;
}

const changeEventValue = (e: {}): number => Number((e as React.ChangeEvent<HTMLInputElement>).currentTarget.value);

export default class UpdateGrid extends React.Component<UpdateGridProps> {
    private _lgth:  number;
    private _x:  number;
    private _y:  number;

    constructor(props: UpdateGridProps) {
        super(props);
    }

    onChangeLength = (e: {}) => {
        // this._lgth 
        this._lgth = changeEventValue(e);
    }

    onChangeX = (e: {}) => {
        this._x = changeEventValue(e);
    }

    onChangeY = (e: {}) => {
        this._y = changeEventValue(e);
    }

    onSubmit = () => {
        this.props.submitForm(this._lgth, this._x, this._y);
    }

    render() {
        const { arrayLength, antX, antY } = this.props;
        return (
            <>
                <TextField
                    id="arrayLength"
                    defaultValue={arrayLength}
                    floatingLabelText="Grid Size (number)"
                    onChange={this.onChangeLength}
                    value={this._lgth}
                /><br /><TextField
                    id="antX"
                    defaultValue={antX}
                    floatingLabelText="Ant X Position"
                    onChange={this.onChangeX}
                    value={this._x}
                /><br /><TextField
                    id="antY"
                    defaultValue={antY}
                    floatingLabelText="Ant Y Position"
                    onChange={this.onChangeY}
                    value={this._y}
                /><br />
                <RaisedButton label="Re-init Grid" fullWidth={true} onClick={this.onSubmit} />
            </>
        );
    }
}
``` 

Ok, now, we have 3 inputs for default value and an event to ascend.

Let's update our store !

### Store

#### Action  method

By tests 

``` typescript
test('Reload re-init grid with Ant as defined', () => {
        expect(reload(90, 60, 30)).toEqual({
            ant: new Ant(60, 30, 0),
            grid: new Array<Array<boolean>>(90)
                .fill(new Array<boolean>(90))
                .map(() => new Array<boolean>(90).fill(false)),
            count: 0,
            gridLength: 90
        });
    });

    test('Reload have default values', () => {
        expect(reload()).toEqual({
            ant: new Ant(10, 10, 0),
            grid: new Array<Array<boolean>>(21)
                .fill(new Array<boolean>(21))
                .map(() => new Array<boolean>(21).fill(false)),
            count: 0,
            gridLength: 21
        });
    });
``` 

Code 

``` typescript
export const reload = (gridSize: number = 21, antPosX: number = 10, antPosY: number = 10): MainState => {
    return {
        ant: { x: antPosX, y: antPosY, rotation: 0} as Ant,
        grid: new Array<Array<boolean>>(gridSize)
            .fill(new Array<boolean>(gridSize))
            .map(() => new Array<boolean>(gridSize).fill(false)),
        count: 0,
        gridLength: gridSize
    };
};
``` 

#### Reducer

Tests :

``` typescript
  describe('Step 6: reload re-init grid', () => {
    test('Reload change size an,d re-init status', () => {
      const { grid } = initAndReload(90);
      expect(grid).toHaveLength(90);
    });

    test('Redim change ant position', () => {
      const { ant } = initAndReload(90, 60, 30);
      expect(ant).toEqual({ x: 60, y: 30, rotation: 0 } as Ant);
    });
  });
``` 

our helper for tests

``` typescript
const initAndReload = (length?: number, x?: number, y?: number): MainState => {
  const initialState = initAndPlay(15);
  return reducer(initialState, {
    type: RELOAD,
    payload: {
      newLength: length,
      newAntX: x,
      newAntY: y
    }
  } as PayloadedAction<ReloadParams>);
};
``` 

and new types :

``` typescript
export const RELOAD = 'RELOAD';

export interface PayloadedAction<T> extends Action {
  payload: T;
}

export interface ReloadParams {
  newLength: number;
  newAntX: number;
  newAntY: number;
}
``` 

Code

``` typescript
export default (state: MainState = initialState, action: Action) => {
  switch (action.type) {
    case PLAYED: {
      const finalState = play(state);
      return { ...finalState };
    }
    case REDIM: {
      const finalState = redim(state);
      return { ...finalState };
    }
    case RELOAD: {
      const { newLength, newAntX, newAntY } = (action as PayloadedAction<ReloadParams>).payload;
      const finalState = reload(newLength, newAntX, newAntY);
      return { ...finalState };
    }
    default:
      return state;
  }
};
``` 

### Store-component connection

By tests

``` tsx
const store = mockStore({
    grid: new Array<Array<boolean>>(21).fill(new Array<boolean>(21))
        .map(() => new Array<boolean>(21).fill(false)),
    ant: new Ant(),
    gridLength: 21
});

describe('App container', () => {
    test('renders without crashing', () => {
        const close = jest.fn();
        container = shallow(<UpdateGrid handleClose={close} />, { context: { store } });
        expect(container.length).toEqual(1);
    });

    test('Submit launch', async () => {
        const close = jest.fn();
        store.dispatch = jest.fn();
        container = shallow(<UpdateGrid handleClose={close} />, { context: { store } });
        (container.props() as UpdateGridProps).submitForm(0, 0, 0);
        expect(store.dispatch).toBeCalled();
    });
});
``` 

Code 

``` typescript
export interface UpdateGridContainerProps { 
    handleClose: () => void;
}

const mapStateToProps: MapStateToProps<UpdateGridBindingProps, UpdateGridProps, MainState> = (state, props) => ({
    arrayLength: 21 ,
    antX: 10,
    antY: 10
});

const mapDispatchToProps: MapDispatchToProps<UpdateGridEventProps, UpdateGridProps> = (dispatch, props) => ({
    submitForm: (length: number, x: number, y: number) => {
        dispatch({ 
            type: RELOAD,
            payload: {
                newLength: length,
                newAntX: x,
                newAntY: y
            } 
        });
        props.handleClose();
    }
});

const enhance = compose<UpdateGridProps, UpdateGridContainerProps>(connect(mapStateToProps, mapDispatchToProps));

const UpdateGridEnhanced = enhance(UpdateGrid);

export default UpdateGridEnhanced;
``` 

Now, our new form works.

If we add little spice? Let's add decorators to validate form data !

## Validation decorators in real

> Under construction

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
