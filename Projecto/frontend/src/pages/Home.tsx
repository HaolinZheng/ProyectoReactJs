import { useEffect, useState } from "react";
import { getUser } from "../service/axios"; // Ajusta la ruta según sea necesario
import { User } from "../config/types";
import List from "../components/List";



export default function Home() {
  const [users, setUsers] = useState<User[]>([]); // Tipar como un array de User
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getallUser = async () => {
    try {
      setLoading(true);
      const response = await getUser();
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      setError("No se pudo cargar la lista de usuarios.");
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
      <h1>Lista de Usuarios</h1>
      <List items={users}/>
    </>
  );
}
