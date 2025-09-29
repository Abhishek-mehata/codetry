import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const PaymentSuccess = () => {
  const [isPaymentCaptured, setIsPaymentCaptured] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const orderID = queryParams.get('token');

    if (!orderID) return;

    const alreadyCaptured = localStorage.getItem(`payment-captured-${orderID}`);
    if (alreadyCaptured) {
      // console.log('Payment already captured locally.');
      setIsPaymentCaptured(true);
      return;
    }

    capturePayment(orderID);
  }, []); // <-- only on mount

  const capturePayment = async (orderID: string) => {
    try {
      const response = await api.post(`/payment/capture-order/${orderID}`);
      console.log('Payment capture response:', response.data);

      // alert('Payment successfully captured!');
      localStorage.setItem(`payment-captured-${orderID}`, 'true'); // set flag
      setIsPaymentCaptured(true);

      if(response.data.context == "CUSTOMER_BOOK_ROOM") {
        setTimeout(() => navigate('/app/reservation?stays=stays'), 1000);
      }else if(response.data.context == "CUSTOMER_BUY_EVENT_ONLINE") {
        setTimeout(() => navigate('/app/reservation?event=online'), 1000);
      }else if(response.data.context == "CUSTOMER_BUY_EVENT_ONSITE") {
        setTimeout(() => navigate('/app/reservation?event=onsite'), 1000);
      }else if(response.data.context == "SELLER_BOOST_EVENT" || response.data.context == "seller_boost_event") {
        setTimeout(() => navigate('/app/events'), 1000);
      }else if(response.data.context == "SELLER_BOOST_PLACE" || response.data.context == "seller_boost_place") {
        setTimeout(() => navigate('/app/stays'), 1000);
      }else{
        setTimeout(() => navigate('/app/dashboard'), 1000);
      }

      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error capturing payment:', error.response?.data || error.message);

      // If it's already captured, handle gracefully without 500 or alert loops
      if (error.response?.data?.details?.[0]?.issue === 'ORDER_ALREADY_CAPTURED') {
        console.log('Order already captured according to PayPal.');
        localStorage.setItem(`payment-captured-${orderID}`, 'true');
        setIsPaymentCaptured(true);
        setTimeout(() => navigate('/app/events'), 1000);
      } else {
        alert('Something went wrong while capturing your payment.');
      }
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen text-center'>
      {/* <h1 className='text-2xl font-semibold text-dark-blue'>Payment Success!</h1> */}
      {!isPaymentCaptured && <p className='text-gray-500'>Processing your payment...</p>}
      {isPaymentCaptured && (
        <div>
          <p>Your payment has been successfully captured. Redirecting you now...</p>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
