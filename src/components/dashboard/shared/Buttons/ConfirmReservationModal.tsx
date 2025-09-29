import { Modal } from "antd";
import { FaCheck, FaTimes } from "react-icons/fa";

interface ConfirmReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: "confirm" | "decline";
  loading?: boolean;
}

const ConfirmReservationModal: React.FC<ConfirmReservationModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  action, 
  loading = false 
}) => {
  const isConfirmAction = action === "confirm";
  
  return (
    <Modal
      title={`${isConfirmAction ? "Confirm" : "Decline"} Reservation`}
      open={isOpen}
      onCancel={onClose}
      onOk={onConfirm}
      confirmLoading={loading}
      okText={isConfirmAction ? "Confirm" : "Decline"}
      cancelText="Cancel"
      okType={isConfirmAction ? "primary" : "default"}
      okButtonProps={{
        style: isConfirmAction 
          ? { backgroundColor: '#9427F7', borderColor: '#9427F7' }
          : { backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', color: 'white' }
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        {isConfirmAction ? (
          <FaCheck className="text-2xl text-green-500" />
        ) : (
          <FaTimes className="text-2xl text-red-500" />
        )}
        <p className="text-lg">
          Are you sure you want to {action} this reservation?
        </p>
      </div>
      <p className="text-gray-600">
        {isConfirmAction 
          ? "This will confirm the reservation and notify the buyer."
          : "This will decline the reservation and notify the buyer."
        }
      </p>
    </Modal>
  );
};

export default ConfirmReservationModal; 