import React, { useState } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../duck/operations'

import { ImSpinner2 } from 'react-icons/im';

const LoginForm = ({ loginUser }) => {

    const loginInput = React.createRef()
    const passwordInput = React.createRef()

    const loginSubmit = async (e) => {
        e.preventDefault()
        let login = loginInput.current.value
        let password = passwordInput.current.value
        let loginData = {
            login: login,
            password: password
        }
        loginUser(loginData)
            .then((response) => {
                console.log(response)
                if(response.message === 'Nie znaleziono konta.') {
                    setLoginError(response.message);
                    setErrorStatus(true);
                }
                setLoading(false);
            })
            .catch((e) => {
                setLoginError('Wystąpił błąd, spróbuj ponownie później.');
                setErrorStatus(true);
                setLoading(false);
            })
    }

    const [loading, setLoading] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);
    const [loginError, setLoginError] = useState(null);

    return (
        <div className='container-login'>
            <div className='login-panel'>
                {loading ? (
                    <div className='loading'>
                        <ImSpinner2 size="3em" className='loading-ico' />
                    </div>
                ) : ''}
                {errorStatus ? (<span className='login-error'>
                    {loginError}
                </span>) : ''}
                <form className='login-form' onSubmit={loginSubmit}>
                    <span className='login-title'>
                        Zaloguj się
            </span>
                    <div className='wrap-input'>
                        <input type='text' className='input-login' placeholder='Login' ref={loginInput} />
                    </div>
                    <div className='wrap-input'>
                        <input type='password' className='input-login' placeholder='Password' ref={passwordInput} />
                    </div>
                    <div className='input-btn-submit' onClick={() => setLoading(true)}>
                        <button className='login-btn' type='submit'>Zaloguj</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    loginUser: (loginData) => dispatch(loginUser(loginData))
})

export default connect(null, mapDispatchToProps)(LoginForm)