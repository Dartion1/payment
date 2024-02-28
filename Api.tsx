import axios from 'axios';

const postPayment = async () => {
  const url = `http://10.0.2.2:4002/payment-sheet`;
  const body = {amount: 89000, currency: 'inr'};

  try {
    const resp = await axios.post(url, body);
    console.log('API resp', resp.data);
    return resp.data;
  } catch (error) {
    console.log('API ERROR', error);
  }
};

export { postPayment };

