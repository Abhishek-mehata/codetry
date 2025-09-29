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
  // This handleBoost for real Paypal integration Start
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
  // This handleBoost for real Paypal integration 
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
