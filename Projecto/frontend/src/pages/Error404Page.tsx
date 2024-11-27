import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Error404Page() {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const idInterval = setInterval(() => {
      console.log("lsdjkhg");
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const idTimeout = setTimeout(() => {
      // redirigir programáticamente
      navigate("/");
    }, 5000);

    return () => {
      clearInterval(idInterval);
      clearTimeout(idTimeout);
    };
  }, [navigate]);

  return (
    <>
      <h1>Error 404</h1>
      <h2>Página no encontrada</h2>

      <p>Volviendo a la página principal en {countdown} segundos...</p>

      <p>
        Haz clic en el siguiente botón para{" "}
        <Link to="/">volver a la página principal</Link>
      </p>
    </>
  );
}

export default Error404Page;
