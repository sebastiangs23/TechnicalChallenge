import React, { useState } from "react";
import MultiStepForm from "./components/MultiStep";
import ConversationModal from "./components/ConversationModal";
import { ToastContainer } from "react-toastify";
import img from "../../assets/imgs/aimia.webp";
import telegram from "../../assets/icons/TELGRAM.webp";
import x from "../../assets/icons/x.webp";
import MatrixBackground from "../Canva/MatrixBackgroud";

import IAssistants from "../../interfaces/IAssistances";

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assistants, setAssistants] = useState<any>([]);
  const [selectedAssistant, setSelectedAssistant] =
    useState<IAssistants | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [conversation, setConversation] = useState<any>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAssistant(null);
  };

  const handleAssistantClick = async (assistant: any) => {
    try {
      console.log("assistans", assistant);
      setSelectedAssistant(assistant);
      setIsModalOpen(true);
      setConversation(assistant.message);
    } catch (error) {
      console.log("Error al obtener la conversación:", error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addAssistant = (newAssistant: any) => {
    console.log("newAssistant: ", newAssistant);
    setAssistants((prev:any) => [...prev, newAssistant]);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen  text-white">
      <MatrixBackground />
      <ToastContainer />

      {/* Sidebar */}
      <div className="lg:w-1/6 w-full  from-gray-800 via-gray-900 to-black bg-opacity-80 backdrop-blur-lg p-4 space-y-6 border-r border-cyan-800 shadow-lg">
        {/* Título del Sidebar */}
        <h2 className="text-4xl font-bold text-cyan-400 tracking-wide uppercase text-center lg:text-left">
          AI Agent
        </h2>

        {/* Lista de asistentes */}
        <ul className="space-y-4">
          {assistants.map((item:any , index:number) => (
            <li
              key={index}
              onClick={() => handleAssistantClick(item)}
              className="p-3 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-lg hover:bg-gradient-to-l hover:from-cyan-800 hover:to-green-800 cursor-pointer transition-all duration-300 ease-in-out flex justify-between items-center shadow-md"
            >
              <span className="text-cyan-300 font-medium tracking-wide uppercase">
                {item.asset}
              </span>
            </li>
          ))}
        </ul>

        {/* Información extra o branding */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Powered by{" "}
            <span className="text-cyan-300 font-semibold">
              AIMIA23 & ChatGpt
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Your Trading AI Assistant
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-12">
        <div className="mb-8 text-center">
          {/* Título principal */}
          <h1 className="text-5xl font-extrabold text-cyan-500 tracking-wider uppercase">
            AIMIA23
          </h1>

          {/* Subtítulo */}
          <h2 className="text-3xl font-extrabold tracking-wide uppercase mt-4 text-gray-300">
            Contract:
          </h2>

          {/* Imagen */}
          <div className="flex justify-center my-6">
            <img
              src={img}
              alt="AIMIA23"
              className="w-64 rounded-lg shadow-lg"
            />
          </div>

          {/* Descripción */}
          <h1 className="text-4xl font-extrabold text-cyan-500 tracking-wider uppercase mt-8">
            Analyze and Trade
          </h1>
          <p className=" text-lg text-gray-400 max-w-2xl mx-auto">
            Advanced AI agent to analyze and predict your assets, helping you
            make informed decisions.
          </p>

          {/* Botón */}
          <button
            onClick={openModal}
            className="relative flex items-center justify-center w-40 h-40 mx-auto mt-6 text-lg font-semibold text-cyan-400 bg-gray-900 border-2 border-cyan-400 rounded-full transition-transform duration-300 hover:scale-110 hover:shadow-[0_0_10px_2px] hover:shadow-cyan-400"
          >
            <span className="text-center">
              Start <br />
              Analyze
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute w-5 h-5 text-cyan-400 top-[45%] right-[28%] transform rotate-45"
            >
              <path
                fillRule="evenodd"
                d="M14.7 3.3a1 1 0 0 1 1.4 0l5 5a1 1 0 1 1-1.4 1.4L17 6.4v12.6a1 1 0 1 1-2 0V6.4l-2.3 2.3a1 1 0 1 1-1.4-1.4l5-5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Roadmap Section */}
        <div className="mt-12">
          <div className="flex justify-center">
            <a href="https://x.com/aimia_23" target="_blank">
              <img src={x} alt="x" className="w-24" />
            </a>
            <a href="https://t.me/aimia_23" target="_blank">
              <img src={telegram} alt="telegram" className="w-24" />
            </a>
          </div>

          <h1 className="text-3xl font-extrabold text-blue-500 tracking-wide uppercase">
            Our Vision
          </h1>
          <div className="text-lg mt-4">
            <span className="ml-6 space-y-2 mt-2">
              We want the AI agent to help you make money while you're at work,
              on vacation, eating, spending time with your family, and more.
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-blue-500 tracking-wide uppercase">
            Roadmap
          </h1>
          <div className="text-lg mt-4">
            <h2 className="text-xl font-semibold">Q1</h2>
            <ul className="list-disc ml-6 space-y-2 mt-2">
              <li>
                Create the project architecture and choose the tech stack ✅
              </li>
              <li>
                Tokenomics (meeting with the economics and dev team to create
                the tokenomics) ✅
              </li>
              <li>Create a fully responsive desktop version ✅</li>
              <li>Beta demo of the AI with 3 multisteppers ✅</li>
              <li>Continue training the AI models ✅</li>
              <li>Listing on CoinMarketCap</li>
              <li>Listing on CoinGecko</li>
              <li>Tier 3 exchange listings</li>
              <li>Present the project to investors</li>
              <li>50 million market cap</li>
              <li>New Trading tools</li>
            </ul>
          </div>

          <div className="text-lg mt-4">
            <h2 className="text-xl font-semibold">Q2</h2>
            <ul className="list-disc ml-6 space-y-2 mt-2">
              <li>Tier 1 exchange listings</li>
              <li>Connect your wallet and let AIMIA start trading memecoins</li>
              <li>1 billion market cap</li>
              <li>
                Connect to Binance, Gate.io, and Bitget APIs to enable futures
                trading with AIMIA23
              </li>
              <li>Ask Me Anything with the development team (AMA)</li>
            </ul>
          </div>

          <div className="text-lg mt-4">
            <h2 className="text-xl font-semibold">Q3</h2>
            <ul className="list-disc ml-6 space-y-2 mt-2">
              <li>Present AIMIA23 to accelerators and incubators</li>
              <li>5 billion market cap</li>
              <li>1 Billion Market Cap.</li>
            </ul>
          </div>

          <div className="text-lg mt-4">
            <h2 className="text-xl font-semibold">Q4</h2>
            <ul className="list-disc ml-6 space-y-2 mt-2">
              <li>Tier 1 exchange listings</li>
              <li>Robin Hood listing</li>
              <li>5 Billion Markett Cap</li>
              <li>Mobile version (iOS & Android)</li>
            </ul>
          </div>

          <div className="text-lg mt-4">
            <h2 className="text-xl font-semibold">2026</h2>
            <ul className="list-disc ml-6 space-y-2 mt-2">
              <li>Coming soon</li>
            </ul>
          </div>
        </div>

        {/* Tokenomics Section */}
        <div className="mt-12">
          <h1 className="text-3xl font-extrabold text-blue-500 tracking-wide uppercase">
            Tokenomics
          </h1>
          <div className="text-lg mt-4">
            <p className="mb-4">
              Through AIMIA23, users will be able to analyze market trends,
              receive financial advice, and make informed investment decisions.
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                You will need to use AIMIA23 tokens to add new memecoins and
                connect your wallet to start trading.
              </li>
              <li>1% fee per trade (applied only to profits).</li>
            </ul>
            <ul className="list-disc ml-6 space-y-2">
              <li>Quarterly token burn.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && selectedAssistant && (
        <ConversationModal
          isOpen={isModalOpen}
          assistantName={selectedAssistant.asset}
          conversation={conversation}
          onClose={closeModal}
        />
      )}

      {isModalOpen && !selectedAssistant && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-gray-900 w-11/12 md:w-2/3 p-6 rounded-lg shadow-lg">
            <MultiStepForm
              closeModal={closeModal}
              addAssistant={addAssistant}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
