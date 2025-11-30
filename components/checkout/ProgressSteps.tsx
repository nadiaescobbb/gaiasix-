import { Truck, CreditCard, CheckCircle } from 'lucide-react';

interface ProgressStepsProps {
  currentStep: number;
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps = [
    { number: 1, label: 'Envío', icon: <Truck size={16} /> },
    { number: 2, label: 'Pago', icon: <CreditCard size={16} /> },
    { number: 3, label: 'Confirmar', icon: <CheckCircle size={16} /> }
  ];

  return (
    <div className="flex items-center justify-between max-w-2xl mb-6">
      {steps.map((step) => (
        <div key={step.number} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep > step.number ? 'bg-green-500 text-white' :
            currentStep === step.number ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'
          }`}>
            {currentStep > step.number ? '✓' : step.icon}
          </div>
          <span className={`ml-2 font-medium ${
            currentStep === step.number ? 'text-black' : 'text-gray-500'
          }`}>
            {step.label}
          </span>
          {step.number < 3 && (
            <div className={`w-16 h-0.5 mx-4 ${
              currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}