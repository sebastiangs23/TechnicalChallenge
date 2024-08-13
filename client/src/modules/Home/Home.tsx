import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MultiStepForm from "./components/MultiStep";
import axios from "axios";
const api = import.meta.env.VITE_API_LOCAL;

import IAssistants from "../../interfaces/IAssistances";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assistants, setassistants] = useState<IAssistants[]>([]);
  const [selectedAssistant, setSelectedAssistant] =
    useState<IAssistants | null>(null);
  const [question, setQuestion] = useState<string>("");
  const [conversation, setConversation] = useState<
    { role: "user" | "system"; content: string }[]
  >([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAssistant(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      console.log("No encoentro el token");
      navigate("/");
    }

    getAssistants();
  }, []);

  /*_________________________
    |  REQUEST TO THE SERVER  */
  async function getAssistants() {
    try {
      const id_user = localStorage.getItem("id_user");
      const response = await axios.get(`${api}/assistants/${id_user}`);

      setassistants(response.data.assistants);
    } catch (error) {
      console.log(error);
    }
  }

  async function askAssistant() {
    try {
      const currentQuestion = question.trim(); // Eliminar espacios en blanco innecesarios
      setQuestion("");

      if (!currentQuestion) {
        console.log("La pregunta está vacía. No se enviará la solicitud.");
        return; // No hacer nada si la pregunta está vacía
      }

      if (!selectedAssistant || !selectedAssistant._id) {
        console.log(
          "No hay un asistente seleccionado. No se enviará la solicitud."
        );
        return; // No hacer nada si no hay un asistente seleccionado
      }

      let data;
      if (!conversation || conversation.length === 0) {
        // Primera vez, enviar el mensaje inicial
        data = {
          _id: selectedAssistant._id,
          initial: currentQuestion,
        };
      } else {
        // Conversación continua
        data = {
          _id: selectedAssistant._id,
          initial: currentQuestion,
          conversationHistory: conversation,
        };
      }

      console.log("Datos a enviar:", data); // Verificar los datos que se están enviando

      const response = await axios.post(`${api}/assistants/chat`, data);

      console.log("Respuesta del servidor:", response.data); // Verificar la respuesta del servidor

      setConversation((prev) => [
        ...(prev || []), // Asegura que prev es siempre un array
        { role: "user", content: currentQuestion },
        { role: "system", content: response.data.system },
      ]);
    } catch (error) {
      console.log("Error en la solicitud:", error);
      // Aquí puedes agregar una notificación o alerta para manejar el error
    }
  }

  const handleAssistantClick = async (assistant: IAssistants) => {
    try {
      console.log(assistant);
      setSelectedAssistant(assistant);
      setIsModalOpen(true);

      setConversation(assistant.conversation);
    } catch (error) {
      console.log("Error al obtener la conversación:", error);
      // Manejar el error, mostrar una notificación o mensaje al usuario
    }
  };

  const handleChange = (e: any) => {
    setQuestion(e.target.value);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* ASISTENTES SIDEBAR */}
      <div className="w-1/4 bg-gray-800 p-4 space-y-4">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 tracking-wider uppercase">
          IAsistentes
        </h2>

        <ul className="space-y-2">
          {assistants &&
            assistants.map((item) => {
              return (
                <li
                  key={item._id}
                  className="p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer"
                  onClick={() => handleAssistantClick(item)}
                >
                  {item.name}
                </li>
              );
            })}
        </ul>
      </div>

      {/* PRINCIPAL */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 tracking-wider uppercase">
          Crea y personaliza tu propi@ asistente!
        </h1>
        <p className="mt-4 text-lg">Haz click aquí.</p>
        <button
          onClick={openModal}
          className="mt-6 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-lg"
        >
          Crear Asistente
        </button>
      </div>

      {/* MODAL CONVERSACIÓN */}
      {isModalOpen && selectedAssistant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 w-2/3 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 tracking-wider uppercase">
              Conversación con {selectedAssistant.name}
            </h2>
            {/* Section to display the conversation */}
            <div className="bg-gray-700 p-4 mt-4 h-64 overflow-y-auto rounded-lg">
              {conversation &&
                conversation.map((msg: any, index) => (
                  <div
                    key={index}
                    className={`p-2 mb-2 rounded-lg max-w-xs ${
                      msg.role === "user"
                        ? "bg-teal-500 ml-auto text-right"
                        : "bg-gray-600 mr-auto text-left"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}
            </div>

            <input
              onChange={handleChange}
              type="text"
              value={question}
              placeholder="Preguntame algo.."
              className="w-full p-2 mt-4 bg-gray-700 text-white rounded-lg"
            />
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg"
              >
                Cerrar
              </button>
              <button
                onClick={askAssistant}
                className="px-6 py-2 ml-5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL MULTISTEPPER */}
      {isModalOpen && !selectedAssistant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 w-2/3 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 tracking-wider uppercase">
              IAssistant
            </h2>
            <MultiStepForm closeModal={closeModal} refresh={getAssistants} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
