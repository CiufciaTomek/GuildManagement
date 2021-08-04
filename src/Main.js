import { useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';

function Main() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="Main">
      <div className='container-main'>
        <div className='login-panel'>
          <form className='login-form'>
            <span className='login-title'>
              Zaloguj się
            </span>
            <div className='wrap-input'>
              <input type='text' className='input-login' placeholder='Login'/>
            </div>
            <div className='wrap-input'>
              <input type='password' className='input-login' placeholder='Password'/>
            </div>
            <div className='input-btn-submit' onClick={() => setLoading(true)}>
              <p className='login-btn'>Zaloguj</p>
            </div>
          </form>
        </div>
      {loading ? (
        <div className='loading'>
          <ImSpinner2 size="3em" className='loading-ico'/>
        </div>
      ) : ''}
      </div>
    </div>
  );
}

export default Main;
