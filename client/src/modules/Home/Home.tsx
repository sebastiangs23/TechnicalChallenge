import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MultiStepForm from "./components/MultiStep";
import axios from "axios";
const api = import.meta.env.VITE_API_LOCAL;

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      console.log("No encoentro el token");
      navigate("/");
    };

  }, []);

  /*_________________________
    |  REQUEST TO THE SERVER  */
  async function getAssistants(){
    try{
        const response = await axios.get(`${api}/`)
    }catch(error){
        console.log(error)
    }
  }


  /*______________
    |  FUNCTIONS  */

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Aqui tengo que tener los asistentes del usuario */}
      <div className="w-1/4 bg-gray-800 p-4 space-y-4">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 tracking-wider uppercase">
          Conversations
        </h2>
        <ul className="space-y-2">
          <li className="p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer">
            Conversation 1
          </li>
          <li className="p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer">
            Conversation 2
          </li>
          <li className="p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer">
            Conversation 3
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 tracking-wider uppercase">
          Crea tu propio asistente!
        </h1>
        <p className="mt-4 text-lg">
          Haz click aquí.
        </p>
        <button
          onClick={openModal}
          className="mt-6 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-lg"
        >
          Crear Asistente
        </button>
      </div>

      {/* Modal with Multistepper */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 w-2/3 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 tracking-wider uppercase">
              IAssistant
            </h2>
            <MultiStepForm closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
