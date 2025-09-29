import { Input, Modal, Switch } from "antd";
import { useState, useEffect } from "react";

export default function StaysRoomsVerifyModal({
    isModalOpen,
    handleCancel,
    handleOk,
    initialIsVerified = true,
    initialMessage = "Room meets all requirements and is approved",
    loading = false,
    onVerify,
}: {
    isModalOpen: boolean,
    handleCancel: () => void,
    handleOk: (isVerified: boolean, verifyMessage: string) => void,
    initialIsVerified?: boolean,
    initialMessage?: string,
    loading?: boolean,
    onVerify?: (isVerified: boolean, verifyMessage: string) => void,
}) {
    const [isVerified, setIsVerified] = useState(initialIsVerified);
    const [verifyMessage, setVerifyMessage] = useState(initialMessage);

    useEffect(() => {
        setIsVerified(initialIsVerified);
        setVerifyMessage(initialMessage);
    }, [isModalOpen, initialIsVerified, initialMessage]);

    const handleModalOk = () => {
        if (onVerify) {
            onVerify(isVerified, verifyMessage);
        }
        handleOk(isVerified, verifyMessage);
    };

    return (
        <Modal
            title="Verify Room"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onCancel={handleCancel}
            okText={isVerified ? "Verify" : "Unverify"}
            onOk={handleModalOk}
            confirmLoading={loading}
        >
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginRight: 8 }}>Verified:</span>
                <Switch checked={isVerified} onChange={setIsVerified} />
            </div>
            <p>Are you sure you want to {isVerified ? "verify" : "unverify"} this room?</p>
            <Input.TextArea
                rows={3}
                value={verifyMessage}
                onChange={e => setVerifyMessage(e.target.value)}
            />
        </Modal>
    )
}
