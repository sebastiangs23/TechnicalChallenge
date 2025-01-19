import React, { useEffect, useRef } from "react";

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ajustar tamaño del canvas al tamaño de la ventana
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Dibujar la bandera de los EE.UU.
    const drawFlag = () => {
      // Dibujar franjas rojas y blancas
      const stripeHeight = canvas.height / 13; // 13 franjas en total
      for (let i = 0; i < 13; i++) {
        ctx.fillStyle = i % 2 === 0 ? "red" : "white";
        ctx.fillRect(0, i * stripeHeight, canvas.width, stripeHeight);
      }

      // Dibujar el cantón azul con estrellas
      const cantonWidth = canvas.width * 0.4; // 40% del ancho del canvas
      const cantonHeight = stripeHeight * 7; // 7 franjas de altura
      ctx.fillStyle = "blue";
      ctx.fillRect(0, 0, cantonWidth, cantonHeight);

      // Dibujar estrellas en el cantón
      const starSize = 10;
      const starRows = 9; // 9 filas de estrellas
      const starCols = 6; // 6 columnas de estrellas
      const starOffsetX = cantonWidth / starCols; // Espaciado horizontal
      const starOffsetY = cantonHeight / starRows; // Espaciado vertical

      ctx.fillStyle = "white";
      for (let row = 0; row < starRows; row++) {
        for (let col = 0; col < starCols; col++) {
          const x = col * starOffsetX + starOffsetX / 2;
          const y = row * starOffsetY + starOffsetY / 2;
          if ((row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1)) {
            ctx.beginPath();
            ctx.arc(x, y, starSize / 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    const renderBackground = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar canvas
      drawFlag();
     
    };

    renderBackground();

    // Ajustar tamaño del canvas si cambia el tamaño de la ventana
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderBackground();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // Asegura que el canvas esté detrás del contenido
        background: "black", // Fondo negro puro como base
      }}
    />
  );
};

export default MatrixBackground;
