import loovi from './assets/logo-blue-loovi-seguros.svg'
import "./index.css"
import { Stepper } from './components/Stepper';
import { Form } from './components/Form';
import { useState } from 'react';

function App() {

  const [currentStep, setCurrentStep] = useState(0)

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen">
      <div>
        <img src={loovi}></img>
      </div>
      <div>
        <Stepper
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          numberOfSteps={3}
        />
      </div>
      <div>
        <Form currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
    </div>
  );
}

export default App
