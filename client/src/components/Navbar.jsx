import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import { Button } from "./ui";

export function Navbar() {
  const { isAuthenticated, logout, user, role } = useAuth();

  return (
    <nav className="bg-[#080537] flex justify-between py-5 px-10">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/forall" : "/"}>NexoChain</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              Bienvenido {user.full_name} |
            </li>
            <li>
              Rol: {role}
            </li>
            <li>
              {role === 'S01' ? <ButtonLink to="/protected-dashboard">Dashboard</ButtonLink> : null}
            </li>
            <li>
              <Button to="/" onClick={() => logout()}>Salir</Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/login">Entrar</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register">Registrar</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
