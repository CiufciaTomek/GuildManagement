import React from 'react'
import { connect } from 'react-redux'

const DeclarationsTopContainer = ({ rday }) => {
    return (
        <div className='declaration-top'>
            {rday ? rday.name : 'loading...'}
        </div>
    )
}

const mapStateToProps = (state) => ({
    rday: state.sets.rday
})

export default connect(mapStateToProps, null)(DeclarationsTopContainer)