# react-google-invisible-recaptcha #

A React component which is simply interested in Google invisible reCAPTCHA. Pure implementation without external dependency.

## [Demo][demo] ##

Type something in the input box and click the button to submit data. The value is then checked to make up example client-side validation. Only valid input triggers reCAPTCHA. When reCAPTCHA is resolved, the demo page shows the result token for demo purpose. In a real application, it should be used in a HTTP request to `https://www.google.com/recaptcha/api/siteverify?secret=<secret>&response=<token>` on the server to validate the reCAPTCHA result before performing sensitive operation. Don't forget to check values derived from clients as well on the server.

Below is it source.

```js
class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = { value: '' };
    this.onSubmit = this.onSubmit.bind( this );
    this.onResolved = this.onResolved.bind( this );
  }
  render() {
    return (
      <div>
        <input
          type="text"
          value={ this.state.value }
          onChange={ event => this.setState( { value: event.target.value } ) } />
        <button onClick={ this.onSubmit }>Submit</button>
        <Recaptcha
          ref={ ref => this.recaptcha = ref }
          sitekey="6LeH_x8UAAAAAKKuaaod4GsENkTJTHdeQIm8l6y2"
          onResolved={ this.onResolved } />
      </div>
    );
  }
  onSubmit() {
    if ( '' == this.state.value ) {
      alert( 'Validation failed! Input cannot be empty.' );
      this.recaptcha.reset();
    } else {
      this.recaptcha.execute();
    }
  }
  onResolved() {
    alert( 'Recaptcha resolved with response: ' + this.recaptcha.getResponse() );
  }
}
```

## Install ##

```sh
npm install react-google-invisible-recaptcha --save
```

## Usage ##

```js
import Recaptcha from 'react-google-invisible-recaptcha';

<Recaptcha
  ref={ ref => this.recaptcha = ref }
  sitekey={ <sitekey> }
  onResolved={ () => console.log( 'Human detected.' ) } />
```

## Configuration ##

Set two required props to get going.

* sitekey: sitekey for your recaptcha. **Required.**
* onResolved: callback when the recaptcha is resolved. **Required.**

Optional props you can tweak.

* locale: in which language it speaks. **Default: en.**
* onExpired: callback when the recaptcha is expired. **Default: function() {}.**

## APIs ##

```js
<Recaptcha ref={ ref => this.recaptcha = ref } ... />
```

* this.recaptcha.execute() invokes the reCAPTCHA check.
* this.recaptcha.reset() resets the reCAPTCHA widget.
* this.recaptcha.getResponse() returns the response token.

## License ##

MIT. See [LICENSE.md](http://github.com/szchenghuang/react-google-invisible-recaptcha/blob/master/LICENSE.md) for details.

[demo]: https://szchenghuang.github.io/react-google-invisible-recaptcha/