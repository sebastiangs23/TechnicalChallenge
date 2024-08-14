###  TechnicalChallenge IASSISTANT  ###

Este proyecto es una aplicación web que permite a los usuarios crear y personalizar asistentes de inteligencia artificial (IA) haciendo uso de la API ChatGPT (gpt-4o-mini), para ayudarte a realizar cualquier tarea.

## Funcionalidades

1) Login y registro de usuarios
2) Creación de IAsistentes
3) Edición y eliminación de IAsistentes
4) Conversar con el IAsistente

## Requisitos

Asegúrate de tener instalados los siguientes programas:

- Node.js (versión 18 o superior)
- npm (versión 6 o superior) o Yarn (opcional)
- MongoDB el nombre es /dev

## Instalación

Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/sebastiangs23/TechnicalChallenge

## BACK
cd api
npm install
touch .env
# COLOCAR ESTAS VARIALBES DE ENTORNO
PORT = 5100
JWT_SECRET=123456
JWT_EXPIRES_IN=1h
OPENAI_API_KEY= ##Contactarse con el dueño del repositorio para conseguir la api de paga ## 

##FRONT
cd client
npm install
