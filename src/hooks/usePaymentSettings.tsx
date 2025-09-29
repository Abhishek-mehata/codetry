import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootAppState, AppDispatch } from '../redux/store';
import { getPaymentSettings, updatePaymentSettings } from '../redux/actions/payment';
import { setSelectedSettingType } from '../redux/reducers/payment';
import { UpdatePaymentSettingsBody } from '../types/payment';

export const usePaymentSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { settings, selectedSettingType, loading, saving } = useSelector((state: RootAppState) => state.payment);

  const fetchSettings = () => {
    dispatch(getPaymentSettings());
  };

  const updateSettings = (settingsId: number, updateData: UpdatePaymentSettingsBody) => {
    dispatch(updatePaymentSettings(settingsId, updateData));
  };

  const setSelectedType = (type: string) => {
    dispatch(setSelectedSettingType(type));
  };

  // Get current selected setting
  const getCurrentSetting = () => {
    return settings.find(setting => setting.paymentSettingType === selectedSettingType);
  };

  useEffect(() => {
    // Only fetch settings if they haven't been loaded yet
    if (settings.length === 0 && !loading) {
      fetchSettings();
    }
  }, [dispatch, settings.length, loading]);

  return {
    settings,
    selectedSettingType,
    currentSetting: getCurrentSetting(),
    loading,
    saving,
    fetchSettings,
    updateSettings,
    setSelectedType,
  };
}; 