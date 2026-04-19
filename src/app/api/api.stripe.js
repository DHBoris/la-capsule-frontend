import axios from 'axios';

const config = {
  withCredentials: true,
};

const stripeApi = {
  createCheckoutSession: async (items) => {
    try {
      const rawResponse = await axios.post('http://localhost:5500/create-checkout-session', { items, currency: 'eur' }, config);
      let response;

      if (rawResponse.status === 200) {
        return rawResponse.data;
      }

      return response;
    } catch (error) {
      return error;
    }
  },

};

export default stripeApi;
