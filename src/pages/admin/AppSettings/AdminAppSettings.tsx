import { FC, useEffect, useState } from "react";
import { Form, Input, Button, Card, message, Space, Divider, Tabs } from "antd";
import { SaveOutlined, ReloadOutlined } from "@ant-design/icons";
import { usePaymentSettings } from "../../../hooks/usePaymentSettings";
import { UpdatePaymentSettingsBody } from "../../../types/payment";
import Loader from "../../../components/shared/Loader";
import "../../../index.css";

interface PaymentSettings {
  id?: number;
  platformCharge: number;
  platformCurrency: string;
  platformCountryCode: string;
  domesticTransactionFee: number;
  internationalTransactionFee: number;
  payoutDomesticFee: number;
  payoutInternationalFee: number;
  currencyFixRate: number;
  adminCommission: number;
  paymentSettingType?: string;
  createdAt?: string;
  updatedAt?: string;
}

const AdminAppSettings: FC = () => {
  const [roomForm] = Form.useForm();
  const [onsiteEventForm] = Form.useForm();
  const [onlineEventForm] = Form.useForm();
  const { settings, selectedSettingType, currentSetting, loading, saving, fetchSettings, updateSettings, setSelectedType } = usePaymentSettings();
  const [activeTab, setActiveTab] = useState('room');

  // Get the current form based on active tab
  const getCurrentForm = () => {
    switch (activeTab) {
      case 'room':
        return roomForm;
      case 'onsite_event':
        return onsiteEventForm;
      case 'online_event':
        return onlineEventForm;
      default:
        return roomForm;
    }
  };

  // Handle form submission
  const onFinish = (values: PaymentSettings) => {
    if (!currentSetting?.id) {
      message.error('No payment settings found for this type. Please create settings first.');
      return;
    }
    
    const { platformCharge, adminCommission } = values;
    // Validate platformCharge
    if (platformCharge === undefined || platformCharge === null || String(platformCharge).trim() === '') {
      message.error('Please enter Platform Charge Advance');
      return;
    }
    const numPlatformCharge = parseFloat(String(platformCharge));
    if (isNaN(numPlatformCharge)) {
      message.error('Please enter a valid number for Platform Charge Advance');
      return;
    }

    // Validate adminCommission
    if (adminCommission === undefined || adminCommission === null || String(adminCommission).trim() === '') {
      message.error('Please enter Platform Service Charge');
      return;
    }
    const numAdminCommission = parseFloat(String(adminCommission));
    if (isNaN(numAdminCommission)) {
      message.error('Please enter a valid number for Platform Service Charge');
      return;
    }
    if (numAdminCommission < 0 || numAdminCommission > 100) {
      message.error('Platform Service Charge must be between 0% and 100%');
      return;
    }

    const sendBody: UpdatePaymentSettingsBody = {
      platformCharge: numPlatformCharge,
      adminCommission: numAdminCommission,
    };
    updateSettings(currentSetting.id, sendBody);
  };

  // Handle tab change
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setSelectedType(key);
  };

  // Set form values when current setting changes
  useEffect(() => {
    if (currentSetting) {
      const currentForm = getCurrentForm();
      currentForm.setFieldsValue(currentSetting);
    }
  }, [currentSetting, selectedSettingType]);

  // Set initial active tab when settings are loaded
  useEffect(() => {
    if (settings.length > 0 && !activeTab) {
      setActiveTab(selectedSettingType);
    }
  }, [settings, selectedSettingType, activeTab]);

  const tabItems = [
    {
      key: 'room',
      label: 'Room Settings',
      children: (
        <div className="p-4">
          <Form
            form={roomForm}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              platformCharge: 0,
              platformCurrency: 'USD',
              platformCountryCode: 'US',
              domesticTransactionFee: 0,
              internationalTransactionFee: 0,
              payoutDomesticFee: 0,
              payoutInternationalFee: 0,
              currencyFixRate: 0,
              adminCommission: 0
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Platform Settings */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Platform Room Settings</h3>
                
                <Form.Item
                  label="Platform Charge Advance (%)"
                  name="platformCharge"
                  rules={[
                    { required: true, message: 'Please enter Platform Charge Advance' },
                    {
                      validator: (_, value) => {
                        const numValue = parseFloat(value);
                        if (isNaN(numValue)) {
                          return Promise.reject(new Error('Please enter a valid number'));
                        }
                        if (numValue < 0 || numValue > 50) {
                          return Promise.reject(new Error('Platform Charge Advance must be between 0% and 50%'));
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input type="number" placeholder="e.g., 12.5" />
                </Form.Item>

                <Form.Item
                  label="Platform Service Charge (%)"
                  name="adminCommission"
                  rules={[
                    { required: true, message: 'Please enter Platform Service Charge' },
                    {
                      validator: (_, value) => {
                        const numValue = parseFloat(value);
                        if (isNaN(numValue)) {
                          return Promise.reject(new Error('Please enter a valid number'));
                        }
                        if (numValue < 0 || numValue > 100) {
                          return Promise.reject(new Error('Platform Service Charge must be between 0% and 100%'));
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input type="number" placeholder="e.g., 8" />
                </Form.Item>

                <Form.Item
                  label="Platform Currency"
                  name="platformCurrency"
                  rules={[
                    { required: true, message: 'Please enter platform currency' },
                    { 
                      pattern: /^[A-Z]{3}$/, 
                      message: 'Currency must be a 3-letter code (e.g., USD, EUR, IDR)' 
                    }
                  ]}
                >
                  <Input 
                    placeholder="e.g., USD" 
                    maxLength={3}
                    style={{ textTransform: 'uppercase' }}
                  />
                </Form.Item>

                <Form.Item
                  label="Platform Country Code"
                  name="platformCountryCode"
                  rules={[
                    { required: true, message: 'Please enter country code' },
                    { 
                      pattern: /^[A-Z]{2}$/, 
                      message: 'Country code must be a 2-letter code (e.g., US, ID, SG)' 
                    }
                  ]}
                >
                  <Input 
                    placeholder="e.g., US" 
                    maxLength={2}
                    style={{ textTransform: 'uppercase' }}
                  />
                </Form.Item>
              </div>

              {/* Transaction Fees */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Transaction Fees</h3>
                
                <Form.Item
                  label="Domestic Transaction Fee (%)"
                  name="domesticTransactionFee"
                  rules={[
                    { required: true, message: 'Please enter domestic transaction fee' },
                    {
                      validator: (_, value) => {
                        const numValue = parseFloat(value);
                        if (isNaN(numValue)) {
                          return Promise.reject(new Error('Please enter a valid number'));
                        }
                        if (numValue < 0 || numValue > 20) {
                          return Promise.reject(new Error('Domestic fee must be between 0% and 20%'));
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input type="number" step="0.01" placeholder="e.g., 3.4" />
                </Form.Item>

                <Form.Item
                  label="International Transaction Fee (%)"
                  name="internationalTransactionFee"
                  rules={[
                    { required: true, message: 'Please enter international transaction fee' },
                    {
                      validator: (_, value) => {
                        const numValue = parseFloat(value);
                        if (isNaN(numValue)) {
                          return Promise.reject(new Error('Please enter a valid number'));
                        }
                        if (numValue < 0 || numValue > 30) {
                          return Promise.reject(new Error('International fee must be between 0% and 30%'));
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input type="number" step="0.01" placeholder="e.g., 4.4" />
                </Form.Item>

                <Form.Item
                  label="Payout Domestic Fee (%)"
                  name="payoutDomesticFee"
                  rules={[
                    { required: true, message: 'Please enter payout domestic fee' },
                    {
                      validator: (_, value) => {
                        const numValue = parseFloat(value);
                        if (isNaN(numValue)) {
                          return Promise.reject(new Error('Please enter a valid number'));
                        }
                        if (numValue < 0 || numValue > 15) {
                          return Promise.reject(new Error('Payout domestic fee must be between 0% and 15%'));
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input type="number" step="0.01" placeholder="e.g., 2.0" />
                </Form.Item>

                <Form.Item
                  label="Payout International Fee (%)"
                  name="payoutInternationalFee"
                  rules={[
                    { required: true, message: 'Please enter payout international fee' },
                    {
                      validator: (_, value) => {
                        const numValue = parseFloat(value);
                        if (isNaN(numValue)) {
                          return Promise.reject(new Error('Please enter a valid number'));
                        }
                        if (numValue < 0 || numValue > 25) {
                          return Promise.reject(new Error('Payout international fee must be between 0% and 25%'));
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input type="number" step="0.01" placeholder="e.g., 2.5" />
                </Form.Item>

                <Form.Item
                  label="Currency Fix Rate (%)"
                  name="currencyFixRate"
                  rules={[
                    { required: true, message: 'Please enter currency fix rate' },
                    {
                      validator: (_, value) => {
                        const numValue = parseFloat(value);
                        if (isNaN(numValue)) {
                          return Promise.reject(new Error('Please enter a valid number'));
                        }
                        if (numValue < 0 || numValue > 10) {
                          return Promise.reject(new Error('Currency fix rate must be between 0% and 10%'));
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input type="number" step="0.01" placeholder="e.g., 0.3" />
                </Form.Item>
              </div>
            </div>

            <Divider />

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Button 
                type="default" 
                onClick={() => roomForm.resetFields()}
                disabled={saving}
              >
                Reset
              </Button>
            <Button 
                type="primary" 
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={saving}
              >
                Update Settings
            </Button>
            </div>
          </Form>
        </div>
      )
    },
    {
      key: 'onsite_event',
      label: 'Onsite Event Settings',
      children: (
        <div className="p-4">
            <Form
              form={onsiteEventForm}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                platformCharge: 0,
                platformCurrency: 'USD',
              platformCountryCode: 'US',
                domesticTransactionFee: 0,
                internationalTransactionFee: 0,
                payoutDomesticFee: 0,
                payoutInternationalFee: 0,
              currencyFixRate: 0,
              adminCommission: 0
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Platform Settings */}
                <div>
                <h3 className="text-lg font-semibold mb-4">Platform Onsite Event Settings</h3>
                  
                  <Form.Item
                    label="Platform Charge Advance (%)"
                    name="platformCharge"
                    rules={[
                      { required: true, message: 'Please enter Platform Charge Advance' },
                      {
                        validator: (_, value) => {
                          const numValue = parseFloat(value);
                          if (isNaN(numValue)) {
                            return Promise.reject(new Error('Please enter a valid number'));
                          }
                          if (numValue < 0 || numValue > 50) {
                            return Promise.reject(new Error('Platform Charge Advance must be between 0% and 50%'));
                          }
                          return Promise.resolve();
                        }
                      }
                    ]}
                  >
                    <Input type="number" placeholder="e.g., 12.5" />
                  </Form.Item>

                  <Form.Item
                    label="Platform Service Charge (%)"
                    name="adminCommission"
                    rules={[
                      { required: true, message: 'Please enter Platform Service Charge' },
                      {
                        validator: (_, value) => {
                          const numValue = parseFloat(value);
                          if (isNaN(numValue)) {
                            return Promise.reject(new Error('Please enter a valid number'));
                          }
                          if (numValue < 0 || numValue > 100) {
                            return Promise.reject(new Error('Platform Service Charge must be between 0% and 100%'));
                          }
                          return Promise.resolve();
                        }
                      }
                    ]}
                  >
                    <Input type="number" placeholder="e.g., 8" />
                  </Form.Item>

                  <Form.Item
                    label="Platform Currency"
                    name="platformCurrency"
                    rules={[
                      { required: true, message: 'Please enter platform currency' },
                      { 
                        pattern: /^[A-Z]{3}$/, 
                        message: 'Currency must be a 3-letter code (e.g., USD, EUR, IDR)' 
                      }
                    ]}
                  >
                    <Input 
                      placeholder="e.g., USD" 
                      maxLength={3}
                      style={{ textTransform: 'uppercase' }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Platform Country Code"
                    name="platformCountryCode"
                    rules={[
                      { required: true, message: 'Please enter country code' },
                      { 
                        pattern: /^[A-Z]{2}$/, 
                        message: 'Country code must be a 2-letter code (e.g., US, ID, SG)' 
                      }
                    ]}
                  >
                    <Input 
                    placeholder="e.g., US" 
                    maxLength={2}
                    style={{ textTransform: 'uppercase' }}
                  />
                </Form.Item>
              </div>

              {/* Transaction Fees */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Transaction Fees</h3>
                
                <Form.Item
                  label="Domestic Transaction Fee (%)"
                  name="domesticTransactionFee"
                  rules={[
                    { required: true, message: 'Please enter domestic transaction fee' },
                    {
                      validator: (_, value) => {
                        const numValue = parseFloat(value);
                        if (isNaN(numValue)) {
                          return Promise.reject(new Error('Please enter a valid number'));
                        }
                        if (numValue < 0 || numValue > 20) {
                          return Promise.reject(new Error('Domestic fee must be between 0% and 20%'));
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input type="number" step="0.01" placeholder="e.g., 3.4" />
                </Form.Item>

                <Form.Item
                  label="International Transaction Fee (%)"
                  name="internationalTransactionFee"
                  rules={[
                    { required: true, message: 'Please enter international transaction fee' },
                    {
                      validator: (_, value) => {
                        const numValue = parseFloat(value);
                        if (isNaN(numValue)) {
                          return Promise.reject(new Error('Please enter a valid number'));
                        }
                        if (numValue < 0 || numValue > 30) {
                          return Promise.reject(new Error('International fee must be between 0% and 30%'));
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input type="number" step="0.01" placeholder="e.g., 4.4" />
                </Form.Item>

                <Form.Item
                  label="Payout Domestic Fee (%)"
                  name="payoutDomesticFee"
                  rules={[
                    { required: true, message: 'Please enter payout domestic fee' },
                    {
                      validator: (_, value) => {
                        const numValue = parseFloat(value);
                        if (isNaN(numValue)) {
                          return Promise.reject(new Error('Please enter a valid number'));
                        }
                        if (numValue < 0 || numValue > 15) {
                          return Promise.reject(new Error('Payout domestic fee must be between 0% and 15%'));
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input type="number" step="0.01" placeholder="e.g., 2.0" />
                </Form.Item>

                <Form.Item
                  label="Payout International Fee (%)"
                  name="payoutInternationalFee"
                  rules={[
                    { required: true, message: 'Please enter payout international fee' },
                    {
                      validator: (_, value) => {
                        const numValue = parseFloat(value);
                        if (isNaN(numValue)) {
                          return Promise.reject(new Error('Please enter a valid number'));
                        }
                        if (numValue < 0 || numValue > 25) {
                          return Promise.reject(new Error('Payout international fee must be between 0% and 25%'));
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input type="number" step="0.01" placeholder="e.g., 2.5" />
                </Form.Item>

                <Form.Item
                  label="Currency Fix Rate (%)"
                  name="currencyFixRate"
                  rules={[
                    { required: true, message: 'Please enter currency fix rate' },
                    {
                      validator: (_, value) => {
                        const numValue = parseFloat(value);
                        if (isNaN(numValue)) {
                          return Promise.reject(new Error('Please enter a valid number'));
                        }
                        if (numValue < 0 || numValue > 10) {
                          return Promise.reject(new Error('Currency fix rate must be between 0% and 10%'));
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input type="number" step="0.01" placeholder="e.g., 0.3" />
                </Form.Item>
              </div>
            </div>

            <Divider />

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Button 
                type="default" 
                onClick={() => onsiteEventForm.resetFields()}
                disabled={saving}
              >
                Reset
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={saving}
              >
                Update Settings
              </Button>
            </div>
          </Form>
        </div>
      )
    },
    {
      key: 'online_event',
      label: 'Online Event Settings',
      children: (
        <div className="p-4">
            <Form
              form={onlineEventForm}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                platformCharge: 0,
                platformCurrency: 'USD',
                platformCountryCode: 'US',
                domesticTransactionFee: 0,
                internationalTransactionFee: 0,
                payoutDomesticFee: 0,
                payoutInternationalFee: 0,
                currencyFixRate: 0,
                adminCommission: 0
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Platform Settings */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Platform Online Event Settings</h3>
                  
                  <Form.Item
                    label="Platform Charge Advance (%)"
                    name="platformCharge"
                    rules={[]}
                  >
                    <Input type="number" placeholder="e.g., 12.5" />
                  </Form.Item>

                  <Form.Item
                    label="Platform Service Charge (%)"
                    name="adminCommission"
                    rules={[]}
                  >
                    <Input type="number" placeholder="e.g., 8" />
                  </Form.Item>

                  <Form.Item
                    label="Platform Currency"
                    name="platformCurrency"
                    rules={[]}
                  >
                    <Input 
                      placeholder="e.g., USD" 
                      maxLength={3}
                      style={{ textTransform: 'uppercase' }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Platform Country Code"
                    name="platformCountryCode"
                    rules={[]}
                  >
                    <Input 
                    placeholder="e.g., US" 
                      maxLength={2}
                      style={{ textTransform: 'uppercase' }}
                    />
                  </Form.Item>
                </div>

                {/* Transaction Fees */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Transaction Fees</h3>
                  
                  <Form.Item
                    label="Domestic Transaction Fee (%)"
                    name="domesticTransactionFee"
                    rules={[]}
                  >
                    <Input type="number" step="0.01" placeholder="e.g., 3.4" />
                  </Form.Item>

                  <Form.Item
                    label="International Transaction Fee (%)"
                    name="internationalTransactionFee"
                    rules={[]}
                  >
                    <Input type="number" step="0.01" placeholder="e.g., 4.4" />
                  </Form.Item>

                  <Form.Item
                    label="Payout Domestic Fee (%)"
                    name="payoutDomesticFee"
                    rules={[]}
                  >
                    <Input type="number" step="0.01" placeholder="e.g., 2.0" />
                  </Form.Item>

                  <Form.Item
                    label="Payout International Fee (%)"
                    name="payoutInternationalFee"
                    rules={[]}
                  >
                    <Input type="number" step="0.01" placeholder="e.g., 2.5" />
                  </Form.Item>

                  <Form.Item
                    label="Currency Fix Rate (%)"
                    name="currencyFixRate"
                    rules={[]}
                  >
                    <Input type="number" step="0.01" placeholder="e.g., 0.3" />
                  </Form.Item>
                </div>
              </div>

              <Divider />

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <Button 
                  type="default" 
                  onClick={() => onlineEventForm.resetFields()}
                  disabled={saving}
                >
                  Reset
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={saving}
                >
                  Update Settings
                </Button>
              </div>
            </Form>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 font-popins">
      <Card 
        className="min-w-[700px]"
        title="App Settings" 
        extra={
          <Space>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={fetchSettings}
              loading={loading}
            >
              Refresh
            </Button>
          </Space>
        }
      >
        {loading ? (
          <Loader loading={true} className="min-h-[100px]" fullWidthLoader={false} />
        ) : (
          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            tabPosition="left"
            items={tabItems}
            style={{ minHeight: '500px'}}
          />
        )}
      </Card>
    </div>
  );
};

export default AdminAppSettings;