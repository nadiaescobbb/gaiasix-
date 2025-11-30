// lib/stripe-mock.ts
export const loadStripeMock = () => ({
  createPaymentMethod: () => Promise.resolve({
    error: null,
    paymentMethod: { id: 'pm_mock_123456' }
  })
});

export const useStripeMock = () => loadStripeMock();
export const useElementsMock = () => ({ getElement: () => null });