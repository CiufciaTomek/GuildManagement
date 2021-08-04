import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllUsers } from './../duck/operations'
import { AiFillEdit } from "react-icons/ai";
import { CgClose } from 'react-icons/cg'

const AdminContainer = ({ getAllUsers, userslist }) => {

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <div className='permissions-list'>
            {userslist ? (
                userslist.map((e, index) => {
                    return (
                        <div className='user' style={index%2 ? {background: '#ffffff17'} : { background: 'transparent' }}>
                            <p>{e.login}</p>
                            <p>{e.Ranks.Permissions.name}</p>
                            <p>{e.created_at}</p>
                            <p><AiFillEdit className='edit-ico' size="1.5em"/></p>
                            <p><CgClose size="1.5em" className='btn-delete' title="Delete"/></p>
                        </div>
                    )
                })
            ) : 'Loading...'}
        </div>
    )
}

const mapStateToProps = (state) => ({
    userslist: state.admin.userslist
})

const mapDispatchToProps = dispatch => ({
    getAllUsers: () => dispatch(getAllUsers())
})


export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)