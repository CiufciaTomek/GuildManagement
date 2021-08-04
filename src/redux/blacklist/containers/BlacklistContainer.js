import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getBlacklist, removeElement } from './../duck/operations'
import { CgClose } from 'react-icons/cg'

const BlacklistContainer = ({ blacklist, getBlacklist, removeElement }) => {
    useEffect(() => { getBlacklist()}, [])
    return (
        <div>
            {blacklist.list.map((element, index) => {
                return (<div className='wrap-element' style={index%2 ? {background: '#ffffff17'} : { background: 'transparent' }}>
                    <p className='list-element'>{element.nick}</p>
                    <p className='list-element'>{element.reason}</p>
                    <p className='list-element'>{element.created_at}</p>
                    <p className='list-element list-btn'><CgClose size="1.5em" className='btn-delete' title="Delete" onClick={() => {removeElement(element.nick, index)}}/></p>
                </div>)
            })}
            <div className='list-footer'>
                <p className='list-element'>Total: {blacklist.list.length}</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    blacklist: state.blacklist
})

const mapDispatchToProps = dispatch => ({
    getBlacklist: () => dispatch(getBlacklist()),
    removeElement: (playerId, index) => dispatch(removeElement(playerId, index))
})

export default connect(mapStateToProps, mapDispatchToProps)(BlacklistContainer)