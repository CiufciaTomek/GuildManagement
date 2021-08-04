import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../duck/operations'

const LogoutContainer = ({ logout }) => {
    return (
        <div className='nav'>
            <p className='nav-element nav-logout' onClick={() => {logout()}}>Logout</p>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(LogoutContainer)