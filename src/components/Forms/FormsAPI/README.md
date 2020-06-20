# Table of Contents
- [A Brief Background](#a-brief-background)
- [Getting started with the FormsAPI](#getting-started-with-the-formsapi)
  - [The Input Component](#the-input-component)
    - [General props](#general-props)
    - [Type dependent props](#type-dependent-props)
      - [Choice based inputs](#for-choice-based-inputs)
      - [Date based inputs](#for-date-inputs)
    - [HTML attributes](#html-attributes)
    - [An example of a form inputs](#an-example-of-form-inputs)
  - [The FormContext Component](#the-formcontext-component)
    - [A complete FormContext example](#a-complete-formcontext-example)
  - [The default form validator](#the-default-form-validator)
  - [Minimum state set up](#minimum-state-set-up)
  - [A complete form example](#a-complete-form-example)
  - [The InputRenderer class](#the-inputrenderer-class)
    - [Improving the complete form example with InputRenderer](#improving-the-complete-form-example-with-inputrenderer)
    - [Changing or adding the formMetadata dynamically](#changing-or-adding-the-formMetadata-dynamically)
      - [Using the formMetadata](#using-the-formmetadata)
      - [Using the customProps](#using-the-customprops)
  - [Using custom event handlers](#using-custom-event-handlers)

# A Brief Background
The FormsAPI was developed at the onset of the project when the first form was produced for Travela. It was developed in order to help developers on the Travela project to produce subsequent forms rapidly and in such a way that all forms would have the same feel and would be produced in a very consistent manner. A quick glance at the forms in the application, you'll be quick to notice that all the forms are created using the same building blocks.

At that time, the developers were torn between producing the only form that they needed for that sprint and creating an engine that would help them save time whenever they needed another form in future. They settled for the latter and the FormsAPI was born.

It's development continues but so far so good, it has been instrumental in helping the team concentrate on processing the data collected by the forms rather than putting in a lot of time and energy trying to create a new form with similar behaviours, looks and feel as previous forms.

# Getting started with the FormsAPI
The FormsAPI has two key components that enable the team to create the forms;
- The `Input` component
- The `FormContext` component

These two can be imported from the FormsAPI as `named exports`
> `import { Input, FormContext } from 'path/to/FormsAPI';`

Besides these two components, two other things in the API are very handy:
- The `InputRenderer` class
- The `getDefaultBlanksValidatorFor` function

The `InputRenderer` is the `default export` from the API and `getDefaultBlanksValidatorFor` is a `named export`
> `import InputRenderer from 'path/to/FormsAPI';`

> `import {getDefaultBlanksValidatorFor} from 'path/to/FormsAPI';`

More about these below.

## The Input Component
This component renders inputs for a form. It requires a number of `props` in order to produce expected results.

It doesn't take any `children` props.

### General props
##### The `type` prop
This specifies the type of `input` that the component should produce. At the moment, the following `type`s are supported;
  - `text`: for text inputs
  - `password`: for password inputs
  - `email`: for email inputs
  - `number`: for number inputs
  - `checkbox`: for checkboxes
  - `date`: for date inputs
  - `dropdown-select`: for dropdown inputs
  - `filter-dropdown-select`: a searchable variant of `dropdown-select`
  - `button-toggler` - this is ideally an special sort of a radio button input. It toggles mutually exclusive choices e.g. `Male` and `Female`. *You can have any number of choices, not just two like in this instance.*

##### The `name` prop
This translates to the input's `name` attribute for HTML forms.

##### The `value` prop
This translates to the input's `value` attribute for HTML forms. Usually, this is set to the inputs value in state at `this.state.values` to enable two-way binding

##### The `label` and `labelNote` props
The `label` translates to the inputs `label` attribute for HTML forms.
###### The `labelNote` prop
Sometimes you'd like to include a message besides the label for users to note when filling the input

#### The `onChange` prop
This is an optional change handler for input. It is not necessary when you don't desire any special behaviours on the input's change since there are default change listeners in the API for collecting data into a form's state.

### Type dependent props
There are some props that are specific to a type of inputs. e.g.

##### For choice-based inputs
These are inputs like  `dropdown-select`, `filter-dropdown-select` and `button-toggler`
###### The `choices` prop
These input types look for choices in their props to decide the choices to show for selection.
```js
  <Input
    ...
    type="dropdown-select"
    choices={['Choice 1', 'Choice 2', ..., 'Choice n']}
  />
```
At the moment, the choices can be an array of `string` or JavaScript objects with `label` and `value` i.e.

```js
  <Input
    ...
    choices=[{
      label: 'John Doe',
      value: 'john.doe@andela.com'
    }, {
      label: 'Alice Doe',
      value: 'alice.doe@andela.com'
    }]
  />
```

If an individual choice's value is equal to it's display label, then we can just pass the `string`:

This
```js
  <Input
    ...
    choices=[{
      label: 'Male',
      value: 'Male'
    }, {
      label: 'Female',
      value: 'Female'
    }]
  />
```
...and this

```js
  <Input
    ...
    choices=['Male', 'Female']
/>
```
...will behave the same way. The first approach is useful when you want to display something different from the value of the choice. e.g. display managers' names in dropdown choices but pick their email addresses as the values in those choices.


##### For date inputs
The API makes use of [react datepicker](https://reactdatepicker.com/). All the props that are specific to that library can be passed as props in the `Input` component and they will take effect as well.

#### HTML attributes
We can pass any HTML attribute into the `Input` component. These include, but not limited to, `className`, `id`, and even custom html attributes with `data-<attribute_name>`

### An example of form inputs
```js
  ...
  <Input
    type: 'dropdown-select'
    name: 'favouriteColor'
    label: 'Your favourite color'
    choices: ['Red', 'Green', 'Blue', 'Other']
  />
  <Input
    type: 'text'
    name: 'fullname'
    label: 'Your name'
    labelNote: '(As it appears on your passport)'
  />
  ...
```

## The FormContext Component
Let's look at context symbolically as a pool of resources or information. If I would like my children to read some of my data, I put that data into a context and make the context available to them. My children can read from my context selectively; `child A` chooses to read this and that, and `child B` can choose to read this and that from my context by adding this and that into their individual contexts.


From its props, the `FormContext` component avails the following to its children
- ***values*** - the form values from the form's state
  ```js
    values={this.state.values}
  ```
- ***errors*** - errors related to input fields in the form
  ```js
    errors={this.state.errors}
  ```
  - Each `Input` component can collect and display it's errors from the context

- ***targetForm*** - default handlers for different types of inputs are available in the Forms API. It has default `onChange` handlers for all the [supported](#the-type-prop) input types. We do not need to define such in each and every form when we do not wish to have special behaviours besides just collecting data into the form's state and validating the updated field(s) for blank when an input change event occurs. These default handlers are used by every form in the application and so it is just necessary for them to know the target form whenever they are triggered
  ```js
    targetForm={this}
  ```

- ***validatorName*** - the default event handlers need to know the name of the method in the form component to use when validating the entire form for validity by virtue of not having blank fields and also validating individual input fields when the user starts inputing data into them. The default form event handlers will make use of the method specified through the `validatorName` prop of the `FormContext`.
  ```js
    validatorName={"validate"}
  ```
  *If a name is not supplied here, then the default handlers will make use of a default form validator that ensures that every input in the form is not blank.*

  It sets a boolean state item `hasBlankFields` in the form component and this can be used, for instance, to disable and enable the form's `Submit` button based on the completeness of the form

### A complete FormContext example

```js
...
render() {
  const { values, errors } = this.state;
  return (
    <FormContext targetForm={this} values={values} errors={errors} validatorName="validate">
      <form>
        ...
        <Input
          type: 'dropdown-select'
          name: 'favouriteColor'
          label: 'Your favourite color'
          choices: ['Red', 'Green', 'Blue', 'Other']
        />
        <Input
          type: 'text'
          name: 'fullname'
          label: 'Your name'
          labelNote: '(As it appears on your passport)'
        />
        ...
      </form>
    </FormContext>
  )
}

```

The `Input` component has added the above items into its context. As the `Input` components are rendered as children of the `FormContext` component, they can access the items above from their own contexts. As you can see from the example input [above](#a-complete-formcontext-example), we didn't need to pass `error`, `value`, `validator` and `targetForm` to the input component and its sibling. They will all choose to pick those from the context.

## The default form validator
The API also provides a default form validator. This ensures that no single input field in the form is empty; *for optional form fields, provide them with a default value in the form state - see minimal state set up [below](#minimum-state-set-up)* When the validator is triggered by the `onChange` handler for an input field, it validates that the field did not change to `empty`. If not empty, it'll then validate the entire form to check if there are any other blank fields. If none, it sets to state a the boolean value `hasBlankFields` to `false`. You can leverage on that flag to determine the state of the submit button for the form.

If a form has custom event handlers e.g. `onChange`, the forms validator should be called as a callback to `setState` in the events handler. See [below](#using-custom-event-handlers) on the usage with custom event handlers

## Minimum state set up
For consistency within every form, the FormsAPI expects forms to have at least the following state setup;

```js
state = {
  values: {
    input1: '',
    input2: '',
    iAmAnOptionalField: 'myDefaultValue',
    ...
    inputn: ''
  },
  errors: {},
  hasBlankFields: true
}

```

## A complete form example
The following is an example for a form with seven different input types;

```js
import React, { PureComponent } from 'react';
import { Input, FormContext } from '../FormsAPI';

class DemoForm extends PureComponent {
  state = {
    values: {
      fullname: '',
      email: '',
      password: '',
      age: '',
      birthday: null
    },
    errors: {},
    hasBlankFields: true
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {values} = this.state;
    console.log(values);
  }

  myCustomeValidator = (field) => {
    // some form validation code
    // it can be named anything as long as the correct name is passed in the FormContext below
    // this is optional, the API provides a default validator
  }

  render() {
    const {errors, values} = this.state;
    return (
      <FormContext
        targetForm={this}
        errors={errors}
        values={values}
        validatorName="myCustomeValidator" // uses default validator if this is undefined
      >
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="fullname"
            label="Your fullname"
            labelNote="(As it appeares on your identification card)"
          />
          <Input
            type="number"
            name="age"
            label="Your age"
          />
          <Input
            type="button-toggler"
            name="gender"
            label="Gender"
            choices={['Male', 'Female', 'Transgender', 'Other']}
          />
          <Input
            type="dropdown-select"
            name="city"
            label="City"
            choices={['Kampala', 'Lagos', 'Nairobi', 'New York', 'Other']}
          />
          <Input
            type="date"
            name="birthday"
            label="Date of Birth"
          />
          <Input
            type="email"
            name="email"
            label="Email address"
          />
          <Input
            type="password"
            name="password"
            label="Choose a password"
          />
          <button disabled={this.state.hasBlankFields} type='submit'> Submit </button>
        </form>
      </FormContext>
    );
  }
}

export default DemoForm;
```

Quite lengthy for just seven inputs, isn't it? We shall improve it in another section below.

## The InputRenderer class
As we saw earlier, a small form can be quite lengthy. This can get very bad for forms with several input fields.

This class helps in making the forms leaner by pulling the forms static metadata, like labels, dropdown and button-toggler choices, into an object away from the forms code.

It's key method `renderInput` takes 3 arguments;
- ***name***: HTML attribute, `name`, for the input
- ***type***: the type of the input
- ***customProps***: this gives the input flexibility. We can pass any custom props here for the `Input` component to be rendered. This may include custom `className` for custom styling, custom `onChange` handler and any other HTML attribute. This argument is very useful for customising inputs.


```js
// renderInput(<name>, <type>, <customProps>)

render() {
  const formMetadata = {
    passportInputLabels: {
      fullname: {
        label: 'Your name',
        note: '(As it appears on your passport)'
      },
      email: {
        label: 'Your email'
      },
      city: {
        label: 'Your city'
      }
    },
    dropdownSelectOptions: {
      city: ['Kampala', 'Lagos', 'Nairobi', 'New York', 'Other']
    }
  }
  const { renderInput } = new InputRenderer(formMetadata);
  return (
    <FormContext
      targetForm={this}
      errors={errors}
      values={values}
      validatorName="myCustomeValidator" // uses FormAPI's default validator if this is undefined
    >
      <form onSubmit={this.handleSubmit}>
        {renderInput('fullname', 'text', {className: 'custom-class'})}
        {renderInput('email', 'email')}
        {renderInput('city', 'dropdown-select')}
      </form>
    </FormContext>
  )
}
```

NB: The `formMetadata` can be imported from a separate file. This is how the complete form example [above](#a-complete-form-example) can be improved

### Improving the complete form example with InputRenderer
```js
import React, { PureComponent } from 'react';
import InputRenderer, { Input, FormContext } from '../FormsAPI';
import formMetadata from '<path>/<to>/DemoFormMetadata'

class DemoForm extends PureComponent {
  state = {
    values: {
      fullname: '',
      email: '',
      password: '',
      age: '',
      birthday: null
    },
    errors: {},
    hasBlankFields: true
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {values} = this.state;
    console.log(values);
  }

  validator = (field) => {
    // some form validation code
    // it can be named anything as long as the correct name is passed in the FormContext below
    // this is optional, the API provides a default validator
  }

  render() {
    const {errors, values} = this.state;
    const { renderInput } = new InputRenderer(formMetadata)
    return (
      // uses default validator if `validator` is undefined
      <FormContext targetForm={this} errors={errors} values={values} validatorName="validator">
        <form onSubmit={this.handleSubmit}>
          {renderInput('fullname', 'text')}
          {renderInput('age', 'number')}
          {renderInput('gender', 'button-toggler')} // we could pass choices in the third arg here. Because they are static, lets us have them in form metadata buttonToggleOptions
          {renderInput('city', 'dropdown-select')} // choices in metadata too
          {renderInput('birthday', 'date')}
          {renderInput('email', 'email')}
          {renderInput('password', 'password')}
          <button disabled={this.state.hasBlankFields} type='submit'> Submit </button>
        </form>
      </FormContext>
    );
  }
}

export default DemoForm;
```
Our form now looks leaner and it's complete with event handlers for collecting data into it's state for all the input types in it, and an effective standby form validator that will step in whenever the form has not specified it's defined validator. We can now create dozens of input fields without bursting realistic number of lines threshold for a single file.

We can get creative as we wish and group the inputs rendered in the form into classes of form `fieldset`s.

#### The formMetadata file

```js
// DemoFormMetadata/index.js
const demoFormMetadata = {
  passportInputLabels: {
    fullname: {
      label: 'Your name',
      note: '(As it appears on your passport)'
    },
    age: { label: 'Your age' },
    gender: { label: 'Gender' },
    city: { label: 'City'},
    birthday: { label : 'Date of Birth' },
    email: { label: 'Email address'},
    password: { label: 'Choose a password'}
  },
  buttonToggleOptions: {
    gender: ['Male', 'Female', 'Transgender', 'Other']
  },
  dropdownSelectOptions: {
    city: ['Kampala', 'Lagos', 'Nairobi', 'New York', 'Other']
  }
};

export default demoFormMetadata;

```

### Changing or adding the formMetadata dynamically
Sometimes, some properties of the `formMetadata` will not be available right away. Take a scenario where you need to fetch some dropdown choices from an API e.g. from backend database and pass them into the form through props for display as dropdown choices. This is not uncommon. There are two ways we can achieve this;

- By maninpulating the `formMetadata`
- By using leveraging the power of the `customProps` argument of `renderInput` and passing `choices` there

*The second method is supreme, it overwrites whatever is passed through `formMetadata`*

Let us have a look at both methods;

The `formMetadata` can be manipulated like any other JavaScript object just before going into the `InputRenderer`. Let's see how we can use a list of `availableCities` passed through props;

#### Using the formMetadata

``` js
...
render() {
  const {errors, values} = this.state;
  const { availableCities } = this.props;
  // prepare the formMetadata before going into InputRenderer
  formMetadata.dropdownSelectOptions.city = availableCities;
  const { renderInput } = new InputRenderer(formMetadata)
  return (
    <FormContext targetForm={this} errors={errors} values={values} validatorName="myCustomeValidator">
      <form onSubmit={this.handleSubmit}>
        ...
        {renderInput('city', 'dropdown-select')}
        ...
      </form>
    </FormContext>
  );
}
```

#### Using the customProps
``` js
...
render() {
  const {errors, values} = this.state;
  const { availableCities } = this.props;
  const { renderInput } = new InputRenderer(formMetadata);
  return (
    <FormContext targetForm={this} errors={errors} values={values} validatorName="myCustomeValidator">
      <form onSubmit={this.handleSubmit}>
        ...
        {renderInput('city', 'dropdown-select', {choices: availableCities})} // set choices via customProps
        ...
      </form>
    </FormContext>
  );
}
```

## Using custom event handlers

Sometimes we may want to have a more behaviour on input change, besides just collecting data into the form's state. For instance, you may want to make some API calls on input change e.g. collecting locations from Google API based on the user's input, searching dropdown choices from the backend API as the user types into the input etc. The default event handler for an input whose desirable behaviour is as such would have to take leave and be replaced by a custom one.

As noted earlier, input event handlers should validate the form whenever they are triggered. We'll take a loot at how to make use of the default validator if a form does not need any special validation criteria besides having all input fields filled.

Using a custom `onChange` handler is going to take 3 key steps:
- Define a custom onChange handler, `handleChangeInput` any name should work
- Import `getDefaultBlanksValidatorFor` function from FormsAPI, to help in creating a default validator that is bound to the current form
- Pass the custom handler to `renderInput`'s customProps

### The parameters of custom event handlers
Text-based input types' `onChange` handlers should be defined with `event` object as the parameter. These include:
- `text`
- `password`
- `number`
- `email`

Other input types like `dropdown-select`, `button-toggler`, `checkbox` and `date` handlers recieve the value of the selected item. We'll see below how to make use of them.

#### Example of a custom onChange handler
##### Text-based inputs

``` js

...
import InputRenderer, { Input, FormContext, getDefaultBlanksValidatorFor } from '../FormsAPI';
import formMetadata from './DemoFormMetadata';
...
class DemoForm extends PureComponent {
...

  validator = getDefaultBlanksValidatorFor(this);

  customHandleChangeInput = (e) => {
    const { name, value } = e.target;
    // some special onChange behaviour code
    this.setState(prevState => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: value
      }
    }), () => this.validator(name))
  }

  render() {
    const {errors, values} = this.state;
    const { renderInput } = new InputRenderer(formMetadata)
    return (
      <FormContext targetForm={this} errors={errors} values={values} validatorName="validator">
        <form onSubmit={this.handleSubmit}>
          ...
          {renderInput('city', 'dropdown-select', {onChange: this.customHandleChangeInput})}
          ...
        </form>
      </FormContext>
    );
  }
}
```

##### Custom handlers for other input types
They require a handler that takes the value of the selected choice e.g. a `city`, `date` etc.

``` js

...
import InputRenderer, { Input, FormContext, getDefaultBlanksValidatorFor } from '../FormsAPI';
import formMetadata from './DemoFormMetadata';
...
class DemoForm extends PureComponent {
...

  validator = getDefaultBlanksValidatorFor(this);

  onChangeBirthday = (date, inputName='birthday') => {
    // some special onChange birthday behaviour code
    console.log(date);
    this.setState(prevState => ({
      ...prevState,
      values: {
        ...prevState.values,
        [inputName]: date.format('YYYY-MM-DD')
      }
    }), () => this.validator(inputName)) // validate form in callback
  }

  onChangeCity = (city, inputName='city') => {
    // some special onChange city behaviour code
    console.log(city);
    this.setState(prevState => ({
      ...prevState,
      values: {
        ...prevState.values,
        [inputName]: city
      }
    }), () => this.validator(inputName)) // validate form in callback
  }

  render() {
    const {errors, values} = this.state;
    const { renderInput } = new InputRenderer(formMetadata)
    return (
      <FormContext targetForm={this} errors={errors} values={values} validatorName="validator">
        <form onSubmit={this.handleSubmit}>
          ...
          {renderInput('birthday', 'date', {onChange: date => this.onChangeBirthday(date)})}
          {renderInput('city', 'dropdown-select', {onChange: city => this.onChangeCity(city)})}
          ...
        </form>
      </FormContext>
    );
  }
}
```
***REMEMBER***:
- When using `renderInput`, a lot of flexibility is achieved in the `customProps`
- In cases where a form has custom `onChange` handlers, validate the form through the callback to `setState` of that custom handler as above

***

## Future Developments
