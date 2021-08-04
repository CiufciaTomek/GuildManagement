import React from 'react'
import { connect } from 'react-redux'

import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

const ProfilHeader = ({ user }) => {
    return (
        <div className='nav'>
            <p className='nav-element' title={user ? user.Ranks.Permissions.name : 'Brak'}>Witaj, {user ? user.login : 'Loading...'}</p>
            {user.Ranks.Permissions.PermAtr.some(e => e.name === 'CAN_SEE_ADMIN_PANEL') ? (
                <p className='nav-element'><Link to='/admin'>AdminPanel</Link></p>
            ) : ''}
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.data,
})

export default connect(mapStateToProps, null)(ProfilHeader)