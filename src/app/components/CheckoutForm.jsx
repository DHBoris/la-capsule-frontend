import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ items }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    const response = await fetch('http://localhost:5500/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: items,
        currency: 'eur',
      }),
    });
  
    const sessionData = await response.json();
  

    const result = await stripe.redirectToCheckout({
      sessionId: sessionData.sessionId,
    });
  
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Passez votre commande et payez
      </button>
    </form>
  );
};

export default CheckoutForm;
