
// import { Modal, DatePicker, message } from "antd";
// import { useState } from "react";
// import api from "../../../api";

// interface BoostEventModalProps {
//   eventId: string; // Ensure eventId is a string (or change to number if needed)
//   isOpen: boolean;
//   onClose: () => void;
// }

// const BoostEventModal: React.FC<BoostEventModalProps> = ({ eventId, isOpen, onClose }) => {
//   const [dates, setDates] = useState<[moment.Moment, moment.Moment] | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleBoost = async () => {
//     if (!dates) return message.error("Please select boosting dates.");

//     setLoading(true);
//     try {
//       const response = await api.post("/payment/order/boosting-event", {
//         eventId,
//         startDate: dates[0]?.format("YYYY-MM-DD"),
//         endDate: dates[1]?.format("YYYY-MM-DD"),
//         amount: 100, // Example amount (calculate dynamically based on duration)
//       });

//       window.location.href = response.data.paymentUrl; // Redirect to payment gateway
//     } catch (error) {
//       message.error("Failed to boost event. Try again.");
//     } finally {
//       setLoading(false);
//       onClose();
//     }
//   };

//   return (
//     <Modal
//       title="Boost Event"
//       visible={isOpen}
//       onCancel={onClose}
//       onOk={handleBoost}
//       confirmLoading={loading}
//     >
//       <p>Select the boosting duration:</p>
//       <DatePicker.RangePicker onChange={(val) => setDates(val as [moment.Moment, moment.Moment])} />
//     </Modal>
//   );
// };

// export default BoostEventModal;
// import { Modal, DatePicker, message } from "antd";
// import { useState } from "react";
// import { Dayjs } from "dayjs";
// import api from "../../../api";

// interface BoostEventModalProps {
//   eventId: string;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const BoostEventModal: React.FC<BoostEventModalProps> = ({ eventId, isOpen, onClose }) => {
//   const [dates, setDates] = useState<[Dayjs, Dayjs] | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleBoost = async () => {
//     if (!dates) return message.error("Please select boosting dates.");

//     setLoading(true);
//     try {
//       const response = await api.post("/payment/order/boosting-event", {
//         eventId,
//         startDate: dates[0]?.format("YYYY-MM-DD"),
//         endDate: dates[1]?.format("YYYY-MM-DD"),
//         amount: 100, // Example amount (calculate dynamically based on duration)
//       });

//       window.location.href = response.data.paymentUrl; // Redirect to payment gateway
//     } catch (error) {
//       message.error("Failed to boost event. Try again.");
//     } finally {
//       setLoading(false);
//       onClose();
//     }
//   };

//   return (
//     <Modal
//       title="Boost Event"
//       open={isOpen}
//       onCancel={onClose}
//       onOk={handleBoost}
//       confirmLoading={loading}
//     >
//       <p>Select the boosting duration:</p>
//       <DatePicker.RangePicker onChange={(val) => setDates(val as [Dayjs, Dayjs])} />
//     </Modal>
//   );
// };

// export default BoostEventModal;
// import { Modal, DatePicker, message } from "antd";
// import { useState } from "react";
// import { Dayjs } from "dayjs";
// import api from "../../../api";

// const PER_DAY_PRICE = 8; // Price per day in $

// interface BoostEventModalProps {
//   eventId: string;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const BoostEventModal: React.FC<BoostEventModalProps> = ({ eventId, isOpen, onClose }) => {
//   const [dates, setDates] = useState<[Dayjs, Dayjs] | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [totalAmount, setTotalAmount] = useState(0);

//   // Function to update price dynamically
//   const handleDateChange = (val: [Dayjs, Dayjs] | null) => {
//     setDates(val);
//     if (val) {
//       const startDate = val[0];
//       const endDate = val[1];
//       const numberOfDays = endDate.diff(startDate, "day") + 1; // Including start and end date
//       setTotalAmount(numberOfDays * PER_DAY_PRICE);
//     } else {
//       setTotalAmount(0);
//     }
//   };

//   const handleBoost = async () => {
//     if (!dates) return message.error("Please select boosting dates.");

//     setLoading(true);
//     try {
//       const response = await api.post("/payment/order/boosting-event", {
//         eventId,
//         startDate: dates[0]?.format("YYYY-MM-DD"),
//         endDate: dates[1]?.format("YYYY-MM-DD"),
//         amount: totalAmount,
//       });

//       window.location.href = response.data.paymentUrl; // Redirect to payment gateway
//     } catch (error) {
//       message.error("Failed to boost event. Try again.");
//     } finally {
//       setLoading(false);
//       onClose();
//     }
//   };

//   return (
//     <Modal
//       title="Boost Event"
//       open={isOpen}
//       onCancel={onClose}
//       onOk={handleBoost}
//       confirmLoading={loading}
//     >
//       <p>Select the boosting duration:</p>
//       <DatePicker.RangePicker onChange={(val) => handleDateChange(val as [Dayjs, Dayjs])} />
//       {totalAmount > 0 && (
//         <p style={{ marginTop: "10px", fontWeight: "bold" }}>
//           Total Price: ${totalAmount} ({PER_DAY_PRICE}$/day)
//         </p>
//       )}
//     </Modal>
//   );
// };

// export default BoostEventModal;
// import { Modal, DatePicker, message } from "antd";
// import { useState } from "react";
// import { Dayjs } from "dayjs";
// import api from "../../../api";

// const PER_DAY_PRICE = 8; // Price per day in $

// interface BoostEventModalProps {
//   eventId: string;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const BoostEventModal: React.FC<BoostEventModalProps> = ({ eventId, isOpen, onClose }) => {
//   const [dates, setDates] = useState<[Dayjs, Dayjs] | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [numOfDays, setNumOfDays] = useState(0); // Track number of days

//   // Function to update price dynamically
//   const handleDateChange = (val: [Dayjs, Dayjs] | null) => {
//     setDates(val);
//     if (val) {
//       const startDate = val[0];
//       const endDate = val[1];
//       const days = endDate.diff(startDate, "day") + 1; // Including start and end date
//       setNumOfDays(days); // Set the number of days
//       setTotalAmount(days * PER_DAY_PRICE); // Calculate total amount
//     } else {
//       setNumOfDays(0); // Reset number of days if no date range selected
//       setTotalAmount(0); // Reset total amount if no date range selected
//     }
//   };

//   const handleBoost = async () => {
//     if (!dates) return message.error("Please select boosting dates.");

//     setLoading(true);
//     try {
//       const response = await api.post("/payment/order/boosting-event", {
//         eventId,
//         startDate: dates[0]?.format("YYYY-MM-DD"),
//         endDate: dates[1]?.format("YYYY-MM-DD"),
//         amount: totalAmount,
//       });

//       window.location.href = response.data.paymentUrl; // Redirect to payment gateway
//     } catch (error) {
//       message.error("Failed to boost event. Try again.");
//     } finally {
//       setLoading(false);
//       onClose();
//     }
//   };

//   return (
//     <Modal
//       title="Boost Event"
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
//           <p style={{ fontWeight: "bold" }}>
//             Number of Days: {numOfDays}
//           </p>
//         </div>
//       )}
//     </Modal>
//   );
// };

// export default BoostEventModal;
// import { Modal, DatePicker, message } from "antd";
// import { useState } from "react";
// import { Dayjs } from "dayjs";
// import api from "../../../api";

// const PER_DAY_PRICE = 8; // Price per day in $

// interface BoostEventModalProps {
//   eventId: string;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const BoostEventModal: React.FC<BoostEventModalProps> = ({ eventId, isOpen, onClose }) => {
//   const [dates, setDates] = useState<[Dayjs, Dayjs] | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [numOfDays, setNumOfDays] = useState(0);

//   // Function to update price dynamically
//   const handleDateChange = (val: [Dayjs, Dayjs] | null) => {
//     setDates(val);
//     if (val) {
//       const startDate = val[0];
//       const endDate = val[1];
//       const days = endDate.diff(startDate, "day") + 1; // Including start and end date
//       setNumOfDays(days);
//       setTotalAmount(days * PER_DAY_PRICE); // Calculate total amount
//     } else {
//       setNumOfDays(0);
//       setTotalAmount(0);
//     }
//   };

//   const handleBoost = async () => {
//     if (!dates) return message.error("Please select boosting dates.");

//     setLoading(true);
//     try {
//       // Send request to backend to create the payment order
//       const response = await api.post("/payment/order/boosting-event", {
//         eventId,
//         boostDuration:numOfDays,
//         // totalAmount:totalAmount,
//         charge: 8, 

    
//         // startDate: dates[0]?.format("YYYY-MM-DD"),
//         // endDate: dates[1]?.format("YYYY-MM-DD"),
//         // amount: totalAmount,
//       });

//       // Redirect to payment gateway
//       const paymentUrl = response.data.paymentUrl;
// console.log(paymentUrl,'paymentUrl',response)
//     } catch (error) {
//       message.error("Failed to boost event. Try again.");
//     } finally {
//       setLoading(false);
//       onClose();
//     }
//   };

//   return (
//     <Modal
//       title="Boost Event"
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
//           <p style={{ fontWeight: "bold" }}>
//             Number of Days: {numOfDays}
//           </p>
//         </div>
//       )}
//     </Modal>
//   );
// };

// export default BoostEventModal;
// import { Modal, DatePicker, message } from "antd";
// import { useState } from "react";
// import { Dayjs } from "dayjs";
// import api from "../../../api";

// const PER_DAY_PRICE = 8; // Price per day in $

// interface BoostEventModalProps {
//   eventId: string;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const BoostEventModal: React.FC<BoostEventModalProps> = ({ eventId, isOpen, onClose }) => {
//   const [dates, setDates] = useState<[Dayjs, Dayjs] | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [numOfDays, setNumOfDays] = useState(0);

//   // Function to update price dynamically
//   const handleDateChange = (val: [Dayjs, Dayjs] | null) => {
//     setDates(val);
//     if (val) {
//       const startDate = val[0];
//       const endDate = val[1];
//       const days = endDate.diff(startDate, "day") + 1; // Including start and end date
//       setNumOfDays(days);
//       setTotalAmount(days * PER_DAY_PRICE); // Calculate total amount
//     } else {
//       setNumOfDays(0);
//       setTotalAmount(0);
//     }
//   };

// //   const handleBoost = async () => {
// //     if (!dates) return message.error("Please select boosting dates.");

// //     setLoading(true);
// //     try {
// //       // Send request to backend to create the payment order
// //       const response = await api.post("/payment/order/boosting-event", {
// //         eventId,
// //         boostDuration:numOfDays,
// //         // totalAmount:totalAmount,
// //         charge: 8, 

    
// //         // startDate: dates[0]?.format("YYYY-MM-DD"),
// //         // endDate: dates[1]?.format("YYYY-MM-DD"),
// //         // amount: totalAmount,
// //       });

// //       // Redirect to payment gateway
// //       const paymentUrl = response.data.paymentUrl;
// //     //   window.location.href = paymentUrl; // Redirect to payment page
// //     window.open(paymentUrl, "_blank");

// // console.log(paymentUrl,'paymentUrl',response)
// //     } catch (error) {
// //       message.error("Failed to boost event. Try again.");
// //     } finally {
// //       setLoading(false);
// //       onClose();
// //     }
// //   };
// const handleBoost = async () => {
//     if (!dates) return message.error("Please select boosting dates.");
  
//     setLoading(true);
//     try {
//       // Step 1: Create payment order
//       const response = await api.post("/payment/order/boosting-event", {
//         eventId,
//         boostDuration: numOfDays,
//         charge: PER_DAY_PRICE, 
//       });
  
//       const paymentUrl = response.data.paymentUrl;
//       const orderId = response.data.orderId; // Get order ID properly
  
//       if (!paymentUrl || !orderId) {
//         throw new Error("Invalid payment details received.");
//       }

//       window.open(paymentUrl, "_blank"); // Redirect user to payment page
  
//       // Step 2: Check if payment was completed
//       setTimeout(async () => {
//         try {
//           const captureResponse = await api.post(`/payment/capture-order/${orderId}`);
          
//           if (captureResponse.data.status === "success") {
//             message.success("Payment successful! Event boosted.");
//           } else {
//             message.error("Payment failed or was not captured.");
//           }
//         } catch (error) {
//           message.error("Error capturing payment. Try again.");
//         }
//       }, 5000); // Delay to allow payment processing
//     } catch (error) {
//       message.error("Failed to boost event. Try again.");
//     } finally {
//       setLoading(false);
//       onClose();
//     }
// };

  
//   return (
//     <Modal
//       title="Boost Event"
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
//           <p style={{ fontWeight: "bold" }}>
//             Number of Days: {numOfDays}
//           </p>
//         </div>
//       )}
//     </Modal>
//   );
// };

// export default BoostEventModal;
// BoostEventModal.tsx
import { Modal, DatePicker, message } from "antd";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
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

const PER_DAY_PRICE = 8;

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
      charge: PER_DAY_PRICE
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
      <DatePicker.RangePicker onChange={(val) => handleDateChange(val as [Dayjs, Dayjs])} 
          disabledDate={(current) => current && current < dayjs().startOf('day')}
        
        />
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
