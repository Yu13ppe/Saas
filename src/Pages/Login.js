import React from 'react'
import SaasLogo from '../Assets/Images/logosaas.svg'

function Login() {
    return (
        <div className='login'>
            <form >
                <img src={SaasLogo} alt="Sass" className="logo" />
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder='empleado@saas.com / gerente@saas.com'
                    // onChange={(e) => setEmail(e.target.value)} 
                    />
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Password'
                    // onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button className='btn'
                    // disabled={loading} onClick={() => console.log(errorMessage)}
                    >Login
                    </button>
                </div>
                {/* {errorMessage && <div className="alert alert-danger mt-2"><p className="text-center">No autorizado</p></div>} */}
            </form>
        </div>
    )
}

export { Login }