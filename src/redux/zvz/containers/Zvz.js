import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { connect } from 'react-redux'
import { getAllZvzs, getZvzPlayers, openModal, getZvzsByDate } from './../duck/operations'

const Zvz = ({ modalInfo, getAllZvzs, getZvzPlayers, openModal, getZvzsByDate }) => {
    useEffect(() => { 
        setErrorStatus(false)
        getAllZvzs()
     }, [])

    const dateFrom = React.createRef()
    const dateTo = React.createRef()

    const onSubmitZvzsByDate = (e) => {
        e.preventDefault()
        let fromDate = dateFrom.current.value
        let toDate = dateTo.current.value

        if (fromDate.length <= 0) return setErrorStatus(true)
        if (toDate.length <= 0 || toDate < fromDate) return setErrorStatus(true)

        getZvzsByDate(fromDate, toDate)
    }

    const onSubmitResetFiltrs = (e) => {
        e.preventDefault()

        getAllZvzs()
    }

    const [errorStatus, setErrorStatus] = useState(false)

    return (
        <div className='container-zvz'>
            <div className='zvz-top'>
                <input type='date' className={errorStatus ? 'error-input' : ''} ref={dateFrom} />
                <input type='date' className={errorStatus ? 'error-input' : ''} ref={dateTo} />
                <p className='btn-search' onClick={onSubmitZvzsByDate}>Szukaj</p>
                <p className='btn-search' onClick={onSubmitResetFiltrs}>Reset</p>
            </div>
            <div className='zvz-list'>
                {modalInfo ? (
                    modalInfo.map((element, index) => {
                        return (
                            <div className='zvz' onClick={() => {
                                getZvzPlayers(element.id)
                                openModal({ id: element.id, index: index })
                            }}>
                                <div className='zvz-content'>
                                    <p className=''>Ilość graczy: {element.__meta__.zvzPlayers_count}</p>
                                    <p className=''>Data: {element.created_at}</p>
                                    <small className='zvz-note'>{element.note}</small>
                                </div>
                            </div>
                        )
                    })

                ) : 'Loading...'}
            </div>
            <Modal />
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    getAllZvzs: () => dispatch(getAllZvzs()),
    getZvzPlayers: (zvzid) => dispatch(getZvzPlayers(zvzid)),
    openModal: ({ id, index }) => dispatch(openModal({ id, index })),
    getZvzsByDate: (from, to) => dispatch(getZvzsByDate(from, to))
})

const mapStateToProps = (state) => ({
    modalInfo: state.modal.zvzs
})

export default connect(mapStateToProps, mapDispatchToProps)(Zvz)