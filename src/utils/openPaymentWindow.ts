export const openPaymentWindow = (initialMessage = 'Redirecting to payment...') => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`<p style="font-family:sans-serif; padding:20px;">${initialMessage}</p>`);
    }
    return newWindow;
  };
  