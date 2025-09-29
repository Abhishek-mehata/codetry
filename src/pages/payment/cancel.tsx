// import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Payment Canceled</h1>
      <p>You canceled your payment. No worries!</p>
      <button onClick={() => navigate('/app/events')}>Back to Events</button>
    </div>
  );
};

export default PaymentCancel;
