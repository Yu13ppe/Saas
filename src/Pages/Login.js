import React, {useState} from 'react'
import SaasLogo from '../Assets/Images/logosaas.svg'
import { useHistory } from "react-router-dom";
import { Alert } from 'reactstrap';

function Login() {
    const history = useHistory();
    const [attemps, setAttemps] = useState(3);
    const [error, setError] = useState("");
    const [user, setUser] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario

        if (attemps === 0) {
            setError("Has superado el número de intentos. Intenta más tarde.");
        }
        else if (user === 'empleado@saas.com') {
            // Si se encuentra el usuario, cambia de ventana
            history.push({
                pathname: "/Inventario",
            });
        }
        else if (user === 'gerente@saas.com') {
            // Si se encuentra el usuario, cambia de ventana
            history.push({
                pathname: "/InventarioG",
            });
        }
        else {
            // Si no se encuentra el usuario, establece un mensaje de error
            setAttemps(attemps - 1);
            setError(`Correo incorrecto. Inténtalo de nuevo. Intentos restantes: ${attemps}`);
        }
    };

    return (
        <div className='login'>
            <form onSubmit={handleSubmit}>
                <img src={SaasLogo} alt="Sass" className="logo" />
                {error && <Alert color="danger">{error}</Alert>}
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email" 
                    placeholder='empleado@saas.com / gerente@saas.com' 
                    onChange={(e) => setUser(e.target.value)}
                    />
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Password' />
                    <button type="submit" className='btn'>
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export { Login }