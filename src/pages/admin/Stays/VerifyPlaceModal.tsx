import { useState, useEffect } from "react";
import { Modal, Input, Switch } from "antd";
import { verifyPlace } from "../../../redux/actions/places";

interface VerifyPlaceModalProps {
  placeId: string;
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
  defaultMessage?: string;
  initialIsVerified?: boolean;
}

const VerifyPlaceModal = ({ 
  placeId, 
  isOpen, 
  onClose, 
  onVerified, 
  defaultMessage, 
  initialIsVerified = true 
}: VerifyPlaceModalProps) => {
  const [loading, setLoading] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState(defaultMessage || "");
  const [isVerified, setIsVerified] = useState(initialIsVerified);

  useEffect(() => {
    setVerifyMessage(defaultMessage || "");
    setIsVerified(initialIsVerified);
  }, [defaultMessage, isOpen, initialIsVerified]);

  const handleVerify = async () => {
    setLoading(true);
    try {
      const result = await verifyPlace(placeId, verifyMessage, isVerified);
      if (result.success) {
        onVerified();
        onClose();
      }
    } catch (err) {
      // Error message is handled in the action
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Verify Place"
      open={isOpen}
      onCancel={onClose}
      onOk={handleVerify}
      confirmLoading={loading}
      okText={isVerified ? "Verify" : "Unverify"}
      cancelText="Cancel"
    >
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 8 }}>Verified:</span>
        <Switch checked={isVerified} onChange={setIsVerified} />
      </div>
      <p>Are you sure you want to {isVerified ? "verify" : "unverify"} this place?</p>
      <Input.TextArea
        rows={3}
        value={verifyMessage}
        onChange={e => setVerifyMessage(e.target.value)}
        placeholder="Optional message from admin"
      />
    </Modal>
  );
};

export default VerifyPlaceModal; 