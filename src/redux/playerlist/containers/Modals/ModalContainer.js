import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

const ModalContainer = ({ memberInfo}) => {

    return (
        <div>
            {memberInfo ? (
                <div className='wrap-element'>
                    <p className='list-element playerlist-element'>Total zvzs: {memberInfo.totalZvzs}</p>
                    <p className='list-element playerlist-element'>Last zvz: {memberInfo.lastZvz ? memberInfo.lastZvz : 'Brak'}</p>
                    <p className='list-element playerlist-element'>LastWeek zvz: {memberInfo.lastWeekZvz ? memberInfo.lastWeekZvz : 'Brak'}</p>
                    <p className='list-element playerlist-element'>LastTwoWeeks zvz: {memberInfo.lastTwoWeeksZvzs ? memberInfo.lastTwoWeeksZvzs : 'Brak'}</p>
                    <p className='list-element playerlist-element'>ThisMonth zvz: {memberInfo.lastMonth ? memberInfo.lastMonth : 'Brak'}</p>
                </div>
            ) : 'Loading...'}
        </div>
    )
}

const mapStateToProps = (state) => ({
    memberInfo: state.playerlist.memberInfo
})

export default connect(mapStateToProps, null)(ModalContainer)