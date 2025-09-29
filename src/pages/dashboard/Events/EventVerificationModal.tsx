import React from "react";
import { Modal } from "antd";

interface EventVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const EventVerificationModal: React.FC<EventVerificationModalProps> = ({ isOpen, onClose, message }) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      onOk={onClose}
      footer={null}
    >
        <div className="text-para flex flex-col gap-2">
            <div className="text-xl font-semibold">Event Verification Message</div>    
            <div className="text-para text-base font-normal mt-3" style={{ minHeight: 60 }}>{message}</div>
        </div>
    </Modal>
  );
};

export default EventVerificationModal; 