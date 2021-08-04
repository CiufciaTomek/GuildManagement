import React from 'react'
import DeclarationsContainer from './../../redux/rday/containers/DeclarationsContainer'
import DeclarationsTopContainer from './../../redux/rday/containers/DeclarationsTopContainer'

const Regear = () => {
    return (
        <div className='container-declarations'>
            <DeclarationsTopContainer/>
            <div className='declaration-content container-list'>
                <div className='declarations'>

                    <DeclarationsContainer />
                </div>
            </div>
        </div>
    )
}

export default Regear