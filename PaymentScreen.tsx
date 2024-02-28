import { CardField, useStripe } from '@stripe/stripe-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { postPayment } from './Api';

export default function PaymentScreen() {
  const {confirmPayment} = useStripe();
  const [cardData, setCardData] = useState(null);

  const handalCardData = (cardDetails: any) => {
    console.log('cardDetailscardDetailscardDetails', cardDetails);
    if (cardDetails.complete) {
      setCardData(cardDetails);
    } else {
      setCardData(null);
    }
  };

  const handalDone = async () => {
    try {
      const data = await postPayment();
      console.log('data', data.paymentIntent);
      if (data?.paymentIntent) {
        const onConform = await confirmPayment(data?.paymentIntent, {
          paymentMethodType: 'Card',
        });
        console.log('onConform', onConform);
        // alert('Success');
        if (onConform.error) {
          // Payment failed
          alert('Payment Failed');
        } else if (
          onConform.paymentIntent &&
          onConform.paymentIntent.status === 'Succeeded'
        ) {
          // Payment succeeded
          alert('Payment Succeeded');
        } else {
          // Unexpected response or payment is still pending
          alert('Unexpected Response. Please check your payment status.');
        }
      }
    } catch (error) {
      console.log('ON Done error', error);
    }

    // if (!!cardData) {
    //   try {
    //     const Token = await createToken({...cardData, type: 'Card'});
    //     console.log('Token=', Token);
    //   } catch (error) {
    //     console.log('ERROR Token', error);
    //   }
    // }
  };
  return (
    <>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          handalCardData(cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      <TouchableOpacity
        style={{
          height: 40,
          width: '60%',
          backgroundColor: !!cardData ? 'green' : 'gray',
          borderRadius: 10,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => handalDone()}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Pay</Text>
      </TouchableOpacity>
    </>
  );
}
