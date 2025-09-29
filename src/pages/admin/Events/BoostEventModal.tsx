import { Modal, DatePicker, message } from "antd";
import { useState } from "react";
import { Dayjs } from "dayjs";
import api from "../../../api";

// ✅ Proper PayPal type definitions
interface PayPalButtonsComponent {
  render: (selector: string | HTMLElement) => void;
}

interface PayPalNamespace {
  Buttons: (options: {
    createOrder: () => Promise<string>;
    onApprove: (data: { orderID: string }) => Promise<void>;
    onError?: (err: unknown) => void;
  }) => PayPalButtonsComponent;
}

declare global {
  interface Window {
    paypal: PayPalNamespace;
  }
}

const PER_DAY_PRICE = 8; // Price per day in $

interface BoostEventModalProps {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
}

const BoostEventModal: React.FC<BoostEventModalProps> = ({ eventId, isOpen, onClose }) => {
  const [dates, setDates] = useState<[Dayjs, Dayjs] | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [numOfDays, setNumOfDays] = useState(0);

  const handleDateChange = (val: [Dayjs, Dayjs] | null) => {
    setDates(val);
    if (val) {
      const startDate = val[0];
      const endDate = val[1];
      const days = endDate.diff(startDate, "day") + 1;
      setNumOfDays(days);
      setTotalAmount(days * PER_DAY_PRICE);
    } else {
      setNumOfDays(0);
      setTotalAmount(0);
    }
  };
//running code 
  // const handleBoost = async () => {
  //   if (!dates) return message.error("Please select boosting dates.");

  //   setLoading(true);
  //   try {
  //     // Step 1: Create payment order
  //     const response = await api.post("/payment/order/boosting-event", {
  //       eventId,
  //       boostDuration: numOfDays,
  //       charge: PER_DAY_PRICE,
  //     });

  //     const paymentUrl: string = response.data.paymentUrl;
  //     const orderId: string = response.data.orderId;

  //     if (!paymentUrl || !orderId) {
  //       throw new Error("Invalid payment details received.");
  //     }

  //     window.open(paymentUrl, "_blank");

  //     // Step 2: Capture payment after a short delay
  //     setTimeout(async () => {
  //       try {
  //         const captureResponse = await api.post(`/payment/capture-order/${orderId}`);
  //         console.log(captureResponse,'isPaid')
  //         if (captureResponse.data.isPaid === true) {
  //           message.success("Payment successful! Event boosted.");
  //           window.location.href = `/app/events`; // or your events list: `/events`
  //         } else {
  //           message.error("Payment failed or was not captured.");
  //         }
  //       } catch (err) {
  //         message.error("Error capturing payment. Try again.");
  //       }
  //     }, 5000);
  //   } catch (error) {
  //     message.error("Failed to boost event. Try again.");
  //   } finally {
  //     setLoading(false);
  //     onClose();
  //   }
  // };
// const handleBoost = async () => {
//     if (!dates) return message.error("Please select boosting dates.");
//     setLoading(true);
  
//     try {
//       const response = await api.post("/payment/order/boosting-event", {
//         eventId,
//         boostDuration: numOfDays,
//         charge: PER_DAY_PRICE,
//       });
  
//       const paymentUrl = response.data.paymentUrl;
//       const orderId = response.data.orderId;
  
//       if (!paymentUrl || !orderId) throw new Error("Invalid payment details.");
  
//       const paypalWindow = window.open(paymentUrl, "_blank");
  
//       // Wait for PayPal window to close
//       const pollInterval = setInterval(async () => {
//         if (paypalWindow?.closed) {
//           clearInterval(pollInterval);
//           try {
//             const captureRes = await api.post(`/payment/capture-order/${orderId}`);
//             const { isPaid } = captureRes.data;
  
//             if (isPaid) {
//               message.success("Payment successful! Event boosted.");
//               window.location.href = `/app/events`;
//             } else {
//               message.error("Payment not completed.");
//             }
//           } catch (err) {
//             message.error("Error while capturing payment. Try again.");
//           } finally {
//             setLoading(false);
//             onClose(); // If you’re using a drawer/modal
//           }
//         }
//       }, 2000);
  
//       // Optional: Auto-cancel after 2 mins
//       setTimeout(() => {
//         if (paypalWindow && !paypalWindow.closed) {
//           paypalWindow.close();
//         }
//         clearInterval(pollInterval);
//         setLoading(false);
//         message.error("Payment not completed in time.");
//       }, 120000);
//     } catch (error) {
//       console.error(error);
//       message.error("Failed to initiate payment.");
//       setLoading(false);
//     }
//   };
// const handleBoost = async () => {
//     if (!dates) {
//       return message.error("Please select boosting dates.");
//     }
  
//     setLoading(true);
//     try {
//       // Step 1: Create payment order
//       const response = await api.post("/payment/order/boosting-event", {
//         eventId,
//         boostDuration: numOfDays,
//         charge: PER_DAY_PRICE,
//       });
  
//       const paymentUrl: string = response.data.paymentUrl;
//       const orderId: string = response.data.orderId;
  
//       if (!paymentUrl || !orderId) {
//         throw new Error("Invalid payment details received.");
//       }
  
//       const paypalWindow = window.open(paymentUrl, "_blank");
//       if (!paypalWindow) {
//         throw new Error("Failed to open payment window.");
//       }
  
//       let paymentHandled = false;
  
//       // Step 2: Monitor if the PayPal window is closed
//       const pollInterval = setInterval(async () => {
//         if (paypalWindow.closed && !paymentHandled) {
//           paymentHandled = true;
//           clearInterval(pollInterval);
  
//           try {
//             const captureResponse = await api.post(`/payment/capture-order/${orderId}`);
//             console.log(captureResponse, "isPaid");
  
//             if (captureResponse.data.isPaid === true) {
//               message.success("Payment successful! Event boosted.");
//               window.location.href = `/app/events`;
//             } else {
//               message.error("Payment failed or was not completed.");
//             }
//           } catch (err) {
//             message.error("Error capturing payment. Try again.");
//           } finally {
//             setLoading(false);
//             onClose();
//           }
//         }
//       }, 2000);
  
//       // Optional: timeout after 2 minutes if the window is still open
//       setTimeout(() => {
//         if (!paymentHandled) {
//           paymentHandled = true;
//           if (paypalWindow && !paypalWindow.closed) {
//             paypalWindow.close();
//           }
//           clearInterval(pollInterval);
//           setLoading(false);
//           message.error("Payment timed out. Please try again.");
//           onClose();
//         }
//       }, 12000);
//     } catch (error) {
//       console.error(error);
//       message.error("Failed to boost event. Try again.");
//       setLoading(false);
//       onClose();
//     }
//   };
const handleBoost = async () => {
  if (!dates) {
    return message.error("Please select boosting dates.");
  }

  setLoading(true);

  // Open window immediately to avoid popup blocking
  const paypalWindow = window.open('', '_blank');
  if (!paypalWindow) {
    message.error("Failed to open payment window. Please allow popups.");
    setLoading(false);
    return;
  }

  // Optionally show a loading message in the new window
  // paypalWindow.document.write(`<p style="font-family:sans-serif;padding:20px;">Preparing your payment...</p>`);

  try {
    // Now do your API call
    const response = await api.post("/payment/order/boosting-event", {
      eventId,
      boostDuration: numOfDays,
      charge: PER_DAY_PRICE,
    });

    const paymentUrl: string = response.data.paymentUrl;
    const orderId: string = response.data.orderId;

    if (!paymentUrl || !orderId) {
      throw new Error("Invalid payment details received.");
    }

    // Redirect window to PayPal payment URL
    paypalWindow.location.href = paymentUrl;

    let paymentHandled = false;

    // Poll for window close
    const pollInterval = setInterval(async () => {
      if (paypalWindow.closed && !paymentHandled) {
        paymentHandled = true;
        clearInterval(pollInterval);

        try {
          const captureResponse = await api.post(`/payment/capture-order/${orderId}`);
          console.log(captureResponse, "isPaid");

          if (captureResponse.data.isPaid === true) {
            message.success("Payment successful! Event boosted.");
            window.location.href = `/app/events`;
          } else {
            message.error("Payment failed or was not completed.");
          }
        } catch (err) {
          message.error("Error capturing payment. Try again.");
        } finally {
          setLoading(false);
          onClose();
        }
      }
    }, 2000);

    // Timeout after 2 min if still open
    setTimeout(() => {
      if (!paymentHandled) {
        paymentHandled = true;
        if (!paypalWindow.closed) {
          paypalWindow.close();
        }
        clearInterval(pollInterval);
        setLoading(false);
        message.error("Payment timed out. Please try again.");
        onClose();
      }
    }, 120000);

  } catch (error) {
    console.error(error);
    paypalWindow.close();
    message.error("Failed to boost event. Try again.");
    setLoading(false);
    onClose();
  }
};
  
  
  return (
    <Modal
      title="Boost Event"
      open={isOpen}
      onCancel={onClose}
      onOk={handleBoost}
      confirmLoading={loading}
    >
      <p>Select the boosting duration:</p>
      <DatePicker.RangePicker onChange={(val) => handleDateChange(val as [Dayjs, Dayjs])} />
      {numOfDays > 0 && (
        <div>
          <p style={{ marginTop: "10px", fontWeight: "bold" }}>
            Total Price: ${totalAmount} ({PER_DAY_PRICE}$/day)
          </p>
          <p style={{ fontWeight: "bold" }}>Number of Days: {numOfDays}</p>
        </div>
      )}
    </Modal>
  );
};

export default BoostEventModal;
