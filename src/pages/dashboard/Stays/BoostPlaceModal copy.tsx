// import { Modal, DatePicker, message } from "antd";
// import { useState } from "react";
// import { Dayjs } from "dayjs";
// import api from "../../../api";

// // ✅ Proper PayPal type definitions
// interface PayPalButtonsComponent {
//   render: (selector: string | HTMLElement) => void;
// }

// interface PayPalNamespace {
//   Buttons: (options: {
//     createOrder: () => Promise<string>;
//     onApprove: (data: { orderID: string }) => Promise<void>;
//     onError?: (err: unknown) => void;
//   }) => PayPalButtonsComponent;
// }

// declare global {
//   interface Window {
//     paypal: PayPalNamespace;
//   }
// }

// const PER_DAY_PRICE = 8; // Price per day in $

// interface BoostPlaceModalProps {
//   placeId: string;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const BoostPlaceModal: React.FC<BoostPlaceModalProps> = ({ placeId, isOpen, onClose }) => {
//   const [dates, setDates] = useState<[Dayjs, Dayjs] | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [numOfDays, setNumOfDays] = useState(0);
// //   useEffect(() => {
// //     const urlParams = new URLSearchParams(window.location.search);
// //     const orderId = urlParams.get("orderId");
  
// //     if (orderId) {
// //       api.post(`/payment/capture-order/${orderId}`).then((res) => {
// //         if (res.data.isPaid) {
// //           message.success("Payment captured successfully!");
// //           window.location.href = "/app/Places";
// //         } else {
// //           message.error("Payment was not completed.");
// //         }
// //       });
// //     }
// //   }, []);
//   const handleDateChange = (val: [Dayjs, Dayjs] | null) => {
//     setDates(val);
//     if (val) {
//       const startDate = val[0];
//       const endDate = val[1];
//       const days = endDate.diff(startDate, "day") + 1;
//       setNumOfDays(days);
//       setTotalAmount(days * PER_DAY_PRICE);
//     } else {
//       setNumOfDays(0);
//       setTotalAmount(0);
//     }
//   };
// //   const handleBoost = async () => {
// //     if (!dates) return message.error("Please select boosting dates.");

// //     setLoading(true);
// //     try {
// //       // Step 1: Create payment order
// //       const response = await api.post("/payment/order/boosting-place", {
// //         placeId: Number(placeId),
// //         boostDuration: numOfDays,
// //         charge: PER_DAY_PRICE,
// //       });

// //       const paymentUrl: string = response.data.paymentUrl;
// //       const orderId: string = response.data.orderId;

// //       if (!paymentUrl || !orderId) {
// //         throw new Error("Invalid payment details received.");
// //       }

// //       window.open(paymentUrl, "_blank");

// //       // Step 2: Capture payment after a short delay
// //       setTimeout(async () => {
// //         try {
// //           const captureResponse = await api.post(`/payment/capture-order/${orderId}`);
// //           console.log(captureResponse,'isPaid')
// //           if (captureResponse.data.isPaid === true) {
// //             message.success("Payment successful! Event boosted.");
// //             window.location.href = `app/stays`; // or your events list: `/events`
// //           } else {
// //             message.error("Payment failed or was not captured.");
// //           }
// //         } catch (err) {
// //           message.error("Error capturing payment. Try again.");
// //         }
// //       }, 5000);
// //     } catch (error) {
// //       message.error("Failed to boost Place. Try again.");
// //     } finally {
// //       setLoading(false);
// //       onClose();
// //     }
// //   };
// //   const handleBoost = async () => {
// //     if (!dates) return message.error("Please select boosting dates.");
// //     setLoading(true);
  
// //     try {
// //       const response = await api.post("/payment/order/boosting-place", {
// //         placeId: Number(placeId),
// //         boostDuration: numOfDays,
// //         charge: PER_DAY_PRICE,
// //       });
  
// //       const paymentUrl = response.data.paymentUrl;
// //       const orderId = response.data.orderId;
  
// //       if (!paymentUrl || !orderId) throw new Error("Invalid payment details.");
  
// //       const paypalWindow = window.open(paymentUrl, "_blank");
  
// //       if (!paypalWindow) {
// //         throw new Error("Failed to open PayPal window.");
// //       }
  
// //       const pollInterval = setInterval(async () => {
// //         if (paypalWindow.closed) {
// //           clearInterval(pollInterval);
  
// //           try {
// //             const captureRes = await api.post(`/payment/capture-order/${orderId}`);
// //             const { isPaid } = captureRes.data;
  
// //             if (isPaid) {
// //               message.success("Payment successful! Place boosted.");
// //               window.location.href = `/app/events`;
// //             } else {
// //               message.error("Payment not completed.");
// //             }
// //           } catch (err) {
// //             message.error("Error while capturing payment. Try again.");
// //           } finally {
// //             setLoading(false);
// //             onClose();
// //           }
// //         }
// //       }, 2000);
  
// //       // Optional: Timeout after 2 minutes
// //       setTimeout(() => {
// //         if (!paypalWindow.closed) {
// //           paypalWindow.close();
// //           clearInterval(pollInterval);
// //           message.error("Payment not completed in time.");
// //           setLoading(false);
// //           onClose();
// //         }
// //       }, 120000);
// //     } catch (error) {
// //       console.error(error);
// //       message.error("Failed to initiate payment.");
// //       setLoading(false);
// //     }
// //   };
  
// //   const handleBoost = async () => {
// //     if (!dates) return message.error("Please select boosting dates.");

// //     setLoading(true);
// //     try {
// //       // Step 1: Create payment order
// //       const response = await api.post("/payment/order/boosting-place", {
// //         placeId: Number(placeId), // ✅ convert to number
// //         boostDuration: numOfDays,
// //         charge: PER_DAY_PRICE,
// //       });

// //       const paymentUrl: string = response.data.paymentUrl;
// //       const orderId: string = response.data.orderId;

// //       if (!paymentUrl || !orderId) {
// //         throw new Error("Invalid payment details received.");
// //       }

// //       window.open(paymentUrl, "_blank");

// //       // Step 2: Capture payment after a short delay
// //       setTimeout(async () => {
// //         try {
// //           const captureResponse = await api.post(`/payment/capture-order/${orderId}`);
// //           console.log(captureResponse,'isPaid')
// //           if (captureResponse.data.isPaid === true) {
// //             message.success("Payment successful! place boosted.");
// //             window.location.href = `/app/events`; // or your events list: `/events`
// //           } else {
// //             message.error("Payment failed or was not captured.");
// //           }
// //         } catch (err) {
// //           message.error("Error capturing payment. Try again.");
// //         }
// //       }, 5000);
// //     } catch (error) {
// //       message.error("Failed to boost places. Try again.");
// //     } finally {
// //       setLoading(false);
// //       onClose();
// //     }
// //   };
// // const handleBoost = async () => {
// //     if (!dates) return message.error("Please select boosting dates.");
// //     setLoading(true);
  
// //     try {
// //       const response = await api.post("/payment/order/boosting-event", {
// //         placeId,
// //         boostDuration: numOfDays,
// //         charge: PER_DAY_PRICE,
// //       });
  
// //       const paymentUrl = response.data.paymentUrl;
// //       const orderId = response.data.orderId;
  
// //       if (!paymentUrl || !orderId) throw new Error("Invalid payment details.");
  
// //       const paypalWindow = window.open(paymentUrl, "_blank");
  
// //       // Wait for PayPal window to close
// //       const pollInterval = setInterval(async () => {
// //         if (paypalWindow?.closed) {
// //           clearInterval(pollInterval);
// //           try {
// //             const captureRes = await api.post(`/payment/capture-order/${orderId}`);
// //             const { isPaid } = captureRes.data;
  
// //             if (isPaid) {
// //               message.success("Payment successful! Event boosted.");
// //               window.location.href = `/app/events`;
// //             } else {
// //               message.error("Payment not completed.");
// //             }
// //           } catch (err) {
// //             message.error("Error while capturing payment. Try again.");
// //           } finally {
// //             setLoading(false);
// //             onClose(); // If you’re using a drawer/modal
// //           }
// //         }
// //       }, 2000);
  
// //       // Optional: Auto-cancel after 2 mins
// //       setTimeout(() => {
// //         if (paypalWindow && !paypalWindow.closed) {
// //           paypalWindow.close();
// //         }
// //         clearInterval(pollInterval);
// //         setLoading(false);
// //         message.error("Payment not completed in time.");
// //       }, 120000);
// //     } catch (error) {
// //       console.error(error);
// //       message.error("Failed to initiate payment.");
// //       setLoading(false);
// //     }
// //   };
  
  
  
//   return (
//     <Modal
//       title="Boost Place"
//       open={isOpen}
//       onCancel={onClose}
//       onOk={handleBoost}
//       confirmLoading={loading}
//     >
//       <p>Select the boosting duration:</p>
//       <DatePicker.RangePicker onChange={(val) => handleDateChange(val as [Dayjs, Dayjs])} />
//       {numOfDays > 0 && (
//         <div>
//           <p style={{ marginTop: "10px", fontWeight: "bold" }}>
//             Total Price: ${totalAmount} ({PER_DAY_PRICE}$/day)
//           </p>
//           <p style={{ fontWeight: "bold" }}>Number of Days: {numOfDays}</p>
//         </div>
//       )}
//     </Modal>
//   );
// };

// export default BoostPlaceModal;
import { Modal, DatePicker, message } from "antd";
import { useState } from "react";
import { Dayjs } from "dayjs";
import api from "../../../api";

const PER_DAY_PRICE = 8;

interface BoostPlaceModalProps {
  placeId: string;
  isOpen: boolean;
  onClose: () => void;
}

const BoostPlaceModal: React.FC<BoostPlaceModalProps> = ({ placeId, isOpen, onClose }) => {
  const [dates, setDates] = useState<[Dayjs, Dayjs] | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [numOfDays, setNumOfDays] = useState(0);

  const handleDateChange = (val: [Dayjs, Dayjs] | null) => {
    setDates(val);
    if (val) {
      const start = val[0];
      const end = val[1];
      const days = end.diff(start, "day") + 1;
      setNumOfDays(days);
      setTotalAmount(days * PER_DAY_PRICE);
    } else {
      setNumOfDays(0);
      setTotalAmount(0);
    }
  };

//   const handleBoost = async () => {
//     if (!dates) return message.error("Please select boosting dates.");

//     setLoading(true);

//     try {
//       const response = await api.post("/payment/order/boosting-place", {
//         placeId: Number(placeId),
//         boostDuration: numOfDays,
//         charge: PER_DAY_PRICE,
//       });

//       const { paymentUrl, orderId } = response.data;

//       if (!paymentUrl || !orderId) throw new Error("Invalid payment details.");

//       const paypalWindow = window.open(paymentUrl, "_blank");
//       if (!paypalWindow) throw new Error("Unable to open PayPal window.");

//       const pollInterval = setInterval(async () => {
//         if (paypalWindow.closed) {
//           clearInterval(pollInterval);

//           try {
//             const captureRes = await api.post(`/payment/capture-order/${orderId}`);
//             const { isPaid } = captureRes.data;

//             if (isPaid) {
//               message.success("Payment successful! Place boosted.");
//               window.location.href = `/app/events`; // Redirect if needed
//             } else {
//               message.error("Payment was not completed.");
//             }
//           } catch (err) {
//             message.error("Error capturing payment.");
//           } finally {
//             setLoading(false);
//             onClose();
//           }
//         }
//       }, 2000);

//       setTimeout(() => {
//         if (paypalWindow && !paypalWindow.closed) {
//           paypalWindow.close();
//         }
//         clearInterval(pollInterval);
//         setLoading(false);
//         message.error("Payment timeout. Please try again.");
//         onClose();
//       }, 120000); // 2 min timeout
//     } catch (error) {
//       console.error(error);
//       message.error("Failed to boost place. Try again.");
//       setLoading(false);
//     }
//   };
const handleBoost = async () => {
    if (!dates) {
      return message.error("Please select boosting dates.");
    }
  
    setLoading(true);
  
    try {
      const response = await api.post("/payment/order/boosting-place", {
        placeId: Number(placeId),
        boostDuration: numOfDays,
        charge: PER_DAY_PRICE,
      });
  
      const { paymentUrl, orderId } = response.data;
  
      if (!paymentUrl || !orderId) {
        throw new Error("Invalid payment details.");
      }
  
      const paypalWindow = window.open(paymentUrl, "_blank");
      if (!paypalWindow) {
        throw new Error("Unable to open PayPal window.");
      }
  
      let paymentHandled = false;
  
      // Start polling to check when the PayPal window is closed
      const pollInterval = setInterval(async () => {
        if (paypalWindow.closed && !paymentHandled) {
          paymentHandled = true;
          clearInterval(pollInterval);
  
          try {
            const captureRes = await api.post(`/payment/capture-order/${orderId}`);
            const { isPaid } = captureRes.data;
  
            if (isPaid) {
              message.success("Payment successful! Place boosted.");
              window.location.href = `/app/stays`; // Redirect after success
            } else {
              message.error("Payment was not completed.");
            }
          } catch (err) {
            console.error("Capture error:", err);
            message.error("Error capturing payment.");
          } finally {
            setLoading(false);
            onClose();
          }
        }
      }, 2000);
  
      // Set timeout for PayPal window (2 minutes)
      setTimeout(() => {
        if (!paymentHandled) {
          paymentHandled = true;
          if (paypalWindow && !paypalWindow.closed) {
            paypalWindow.close();
          }
          clearInterval(pollInterval);
          setLoading(false);
          message.error("Payment timeout. Please try again.");
          onClose();
        }
      }, 120000);
    } catch (error) {
      console.error("Boosting error:", error);
      message.error("Failed to boost place. Try again.");
      setLoading(false);
    }
  };
  
  return (
    <Modal
      title="Boost Place"
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

export default BoostPlaceModal;
