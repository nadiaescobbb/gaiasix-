import { useState, useCallback } from 'react';

export function useCheckoutSteps() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(1, Math.min(step, 3)));
  }, []);

  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep
  };
}