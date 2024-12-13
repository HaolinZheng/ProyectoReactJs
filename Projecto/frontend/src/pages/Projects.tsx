import { useEffect, useState } from "react";
import { User } from "../config/types";
import { getUser } from "../config/axios";

export default function Projects() {
  const [users, setUsers] = useState<User[]>([]); // Tipar como un array de User
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getallUser = async () => {
    try {
      setLoading(true);
      const response = await getUser();
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener los projectos:", error);
      setError("No se pudo cargar la lista de projectos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getallUser();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Lista de Projectos</h1>
    </>
  );
}
