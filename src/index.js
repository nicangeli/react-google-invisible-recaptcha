import React from 'react';
import PropTypes from 'prop-types';

class GoogleRecaptcha extends React.Component {
  componentDidMount() {
    const { sitekey, locale, badge, onResolved, onExpired } = this.props;
    window.GoogleRecaptchaResolved = onResolved;
    window.GoogleRecaptchaExpired = onExpired;
    window.GoogleRecaptchaLoaded = () => {
      const recaptchaId = grecaptcha.render( this.container, {
        sitekey,
        size: 'invisible',
        badge,
        callback: 'GoogleRecaptchaResolved'
      });
      this.execute = () => grecaptcha.execute( recaptchaId );
      this.reset = () => grecaptcha.reset( recaptchaId );
      this.getResponse = () => grecaptcha.getResponse( recaptchaId );
    };

    if ( !GoogleRecaptcha.script ) {
      const script = document.createElement( 'script' );
      script.id = 'recaptcha';
      script.src = `https://www.google.com/recaptcha/api.js?hl=${locale}&onload=GoogleRecaptchaLoaded&render=explicit`;
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.onerror = function( error ) { throw error; };
      document.body.appendChild( script );
      GoogleRecaptcha.script = script;
    }
  }
  render() {
    return (
      <div ref={ ref => this.container = ref } style={ { display: 'none' } } />
    );
  }
}

GoogleRecaptcha.propTypes = {
  sitekey: PropTypes.string.isRequired,
  locale: PropTypes.string,
  onResolved: PropTypes.func.isRequired,
  onExpired: PropTypes.func
};

GoogleRecaptcha.defaultProps = {
  locale: 'en',
  onExpired: () => {}
};

export default GoogleRecaptcha;