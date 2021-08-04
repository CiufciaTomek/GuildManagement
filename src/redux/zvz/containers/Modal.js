import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { closeModal, removeZvzPlayer } from './../duck/operations'
import { CgCloseO, CgAdd, CgClose } from 'react-icons/cg'
import { addPlayerToZvz, increaseCount } from './../duck/operations'
import { FaRegEdit } from 'react-icons/fa'

const Modal = ({ zvz, openModal, closeModal, addPlayerToZvz, zvzId, modalInfo, zvzIndex, increaseCount, removeZvzPlayer }) => {

    const nicknameInput = React.createRef()

    const onSubmit = (e) => {
        e.preventDefault()
        let nickname = nicknameInput.current.value
        if (nickname.length <= 0) return setErrorStatus(true)

        addPlayerToZvz(zvzId, nickname)
            .then((response) => {
                document.getElementsByTagName('input')[0].value = ''
                setErrorStatus(false)
                increaseCount(zvzIndex)
            })
            .catch((e) => {
                setErrorStatus(true)
            })

        //e.target.reset()
    }

    const toggleCollapse = () => {
        setCollapse(!collapseStatus)
    }

    const [errorStatus, setErrorStatus] = useState(false)
    const [collapseStatus, setCollapse] = useState(false)

    useEffect(() => {
        setErrorStatus(false)
        setCollapse(false)
        document.getElementsByTagName('input')[0].value = ''
    }, [zvz])

    return (
        <div className={openModal ? 'modal modal-show' : 'modal'}>
            <div className='modal-content'>
                <div className='modal-top'>
                    <FaRegEdit size="1.5em" className="modal-btn" title="Edit" onClick={toggleCollapse} />
                    <CgCloseO size="1.5em" className="modal-btn" title="Close" onClick={() => closeModal()} />
                </div>
                <div className='wrap-element'>
                    {zvz ? (
                        zvz.map((element, index) => {
                            return (
                                <p className='list-element'>
                                    {element}
                                    {collapseStatus ? (
                                        <p className='delete-item'>
                                            <CgClose size="1.5em" className='modal-btn-delete' title="Delete" onClick={() => {
                                                removeZvzPlayer(element, zvzId, index, zvzIndex)
                                            }} />
                                        </p>
                                    ) : ''}
                                </p>
                            )
                        })
                    ) : 'Loading...'}
                </div>
                <div className='modal-form'>
                    <input type='text' className={errorStatus ? 'error-input' : ''} placeholder='Dodaj gracza...' ref={nicknameInput} />
                    <CgAdd className='modal-input-add col-1' onClick={onSubmit} size="2em" title="Add" />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    zvz: state.modal.data,
    openModal: state.modal.openModal,
    zvzId: state.modal.zvzId,
    zvzIndex: state.modal.zvzIndex,
    modalInfo: state.modal.zvzs
})

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    addPlayerToZvz: (id, nick) => dispatch(addPlayerToZvz(id, nick)),
    increaseCount: (index) => dispatch(increaseCount(index)),
    removeZvzPlayer: (player, zvzId, index, zvzIndex) => dispatch(removeZvzPlayer(player, zvzId, index, zvzIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)