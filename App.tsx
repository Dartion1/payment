import { StripeProvider } from '@stripe/stripe-react-native';
import React from 'react';
import PaymentScreen from './PaymentScreen';
let publishableKey = `pk_test_51OU3yZSGZXA2HHG1lLx3voG2iZxl6riDwJ7W9Kr2LGnlI9MHDTNdH99jQgUxQzxOsjRGebyMf0vMSxuXmyHXwOks0030grcIOu`;
const App = () => {
  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <PaymentScreen />
    </StripeProvider>
  );
};

export default App;
