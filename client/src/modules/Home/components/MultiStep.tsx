// eslint-disable-next-line @typescript-eslint/no-explicit-any
import React, { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import { toast, ToastContainer } from "react-toastify";

// const api = import.meta.env.VITE_API_LOCAL;

interface MultiStepFormProps {
  closeModal: () => void;
  addAssistant: any;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  closeModal,
  addAssistant,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [ip, setIp] = useState(null);
  const [step, setStep] = useState(1);
  const [mia, setMia] = useState({
    asset: "",
    type_analysis: "",
    help: "",
    ip: null,
  });
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    getIpUser();
  }, []);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  async function askMia(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    // Recuperar los tokens actuales
    const currentTokens = parseInt(localStorage.getItem("tokens") || "0", 10);
  
    // Validación: Si los tokens son mayores a 15, mostrar mensaje y detener la ejecución
    if (currentTokens > 15) {
      toast.error("You have reached the maximum number of allowed queries (15).", {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
      });
      setDisabled(false); // Rehabilitar el botón si estaba deshabilitado
      return;
    }
  
    setDisabled(true); // Deshabilita el botón y muestra el loading
  
    try {
      // Incrementar y almacenar los tokens
      localStorage.setItem("tokens", (currentTokens + 1).toString());
  
      // Actualizar la IP en el estado "mia"
      setMia((prev) => ({
        ...prev,
        ip: ip,
      }));
  
      // Realizar la solicitud al endpoint
      // const response = await axios.post(`https://sgsdeveloper.com/ai-mia/ask`, {
      //   data: mia,
      // });
  
      // console.log("responseeee--->", response.data);
  
      // // Actualizar el estado "mia" con la respuesta del servidor
      // const updatedMia = {
      //   ...mia,
      //   message: response.data.system,
      // };
  
      // setMia(updatedMia);
      // addAssistant(updatedMia);
  
      setShowConfetti(true);
  
      setTimeout(() => {
        closeModal();
        setShowConfetti(false);
        setDisabled(false);
      }, 2500);
    } catch (error) {
      console.error(error);
      toast.error("Error al crear al asistente.", {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
      });
      setDisabled(false);
    }
  }
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setMia((prev) => ({ ...prev, [id]: value }));
  };

  async function getIpUser() {
    try {
      const response = await axios.get("https://api.ipify.org/?format=json");
      setIp(response.data?.ip);
    } catch (error) {
      console.error("Error fetching IP:", error);
    }
  }

  function handleStepSelection(field: string, value: string) {
    setMia((prev) => ({ ...prev, [field]: value }));
    nextStep();
  }

  return (
    <div className="relative">
      {/* Overlay para el loading */}
      {disabled && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          style={{ zIndex: 10000 }}
        >
          <div className="flex flex-col items-center">
            {/* Spinner de carga */}
            <div className="loader border-t-4 border-cyan-400 border-solid rounded-full w-12 h-12 animate-spin"></div>
            <p className="text-cyan-400 mt-4">Processing...</p>
          </div>
        </div>
      )}

      <form onSubmit={askMia} className="p-6 bg-gray-800 rounded-lg text-white">
        <ToastContainer />
        {showConfetti && <Confetti width={1000} height={600} />}

        <div className="flex justify-end mb-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-bold"
          >
            Close
          </button>
        </div>

        {step === 1 && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Step 1: What asset would you like to talk about?
            </h3>
            <input
              type="text"
              id="asset"
              placeholder="Example: Bitcoin"
              className="w-full p-3 bg-gray-700 rounded-lg text-white mb-6"
              value={mia.asset}
              onChange={handleChange}
            />
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg font-bold"
            >
              Next
            </button>
          </div>
        )}

{step === 2 && (
        <div>
          <h3 className="text-2xl font-semibold mb-4">
            Step 2: What type of technical analysis would you like to apply?
          </h3>
          {["Fibonacci", "RSI", "Media Móvil", "MACD", "Bollinger Bands"].map((type) => (
            <button
              key={type}
              onClick={() => handleStepSelection("type_analysis", type)}
              className="w-full p-3 bg-gray-700 rounded-lg mb-4 hover:bg-gray-600 text-white font-bold"
            >
              {type}
            </button>
          ))}
          <div className="flex justify-between mt-4">
            <button
              onClick={prevStep}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-bold"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="text-2xl font-semibold mb-4">
            Step 3: What action would you like to take based on the analysis?
          </h3>
          {["Accumulation Zone", "Possible Correction", "Place Buy or Sell Order"].map((action) => (
            <button
              key={action}
              onClick={() => handleStepSelection("help", action)}
              className="w-full p-3 bg-gray-700 rounded-lg mb-4 hover:bg-gray-600 text-white font-bold"
            >
              {action}
            </button>
          ))}
          <div className="flex justify-between mt-4">
            <button
              onClick={prevStep}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-bold"
            >
              Back
            </button>
          </div>
        </div>
      )}

        {step === 4 && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Step 4: Let AI TRUMP AGENT analyze
            </h3>
            <button
              type="submit"
              disabled={disabled}
              className={`relative flex items-center justify-center w-40 h-40 mx-auto mt-6 text-lg font-semibold border-2 rounded-full transition-transform duration-300 ${
                disabled
                  ? "text-gray-400 bg-gray-700 border-gray-500 cursor-not-allowed"
                  : "text-cyan-400 bg-gray-900 border-cyan-400 hover:scale-110 hover:shadow-[0_0_10px_2px] hover:shadow-cyan-400"
              }`}
            >
              <span className="text-center">
                Start <br />
                Analyze
              </span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MultiStepForm;
