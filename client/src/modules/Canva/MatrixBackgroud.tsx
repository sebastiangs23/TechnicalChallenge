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

    const columns = Math.floor(canvas.width / 20); // Número de columnas de caracteres
    const drops: number[] = Array(columns).fill(0); // Cada columna tiene una "gota"

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Fondo semitransparente para efecto de desvanecimiento
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0"; // Color verde brillante
      ctx.font = "15px monospace";

      // Dibujar caracteres en cada columna
      drops.forEach((y, index) => {
        const text = String.fromCharCode(0x30a0 + Math.random() * 96); // Caracteres aleatorios
        const x = index * 20; // Espaciado horizontal

        ctx.fillText(text, x, y);

        // Si la gota sale del canvas, reiníciala en la parte superior
        if (y > canvas.height && Math.random() > 0.975) {
          drops[index] = 0;
        }

        // Incrementa la posición Y de la gota
        drops[index] += 20;
      });

      requestAnimationFrame(drawMatrix); // Repetir la animación
    };

    drawMatrix();

    // Ajustar tamaño del canvas si cambia el tamaño de la ventana
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops.length = Math.floor(canvas.width / 20);
      drops.fill(0);
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
        background: "black", // Fondo negro puro
      }}
    />
  );
};

export default MatrixBackground;
