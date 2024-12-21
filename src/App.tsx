import loovi from './assets/logo-blue-loovi-seguros.svg'
import "./index.css"
import { Stepper } from './components/Stepper';

function App() {

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen">
      <div>
        <img src={loovi}></img>
      </div>
      <div>
        <Stepper currentStep={2} numberOfSteps={3}/>
      </div>
    </div>
  );
}

export default App
