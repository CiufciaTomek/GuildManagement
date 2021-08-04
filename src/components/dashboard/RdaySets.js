import React, { useState } from 'react'
import Modal from './../Modal'
import ModalContainer from './../../redux/rday/containers/Modals/ModalContainer'


const RdaySets = (props) => {

    const toggleShowModal = () => {
        setModalStatus(!modalStatus)
    }

    const [modalStatus, setModalStatus] = useState(false)

    return (
        <div className='container-declarations'>
            <div className='declaration-content container-list'>
                <div className='declarations'>
                    {props.children}
                </div>
                <div className='list-footer'>
                    <p className='add-btn' onClick={() => toggleShowModal()}>ADD</p>
                </div>
            </div>
            <Modal open={modalStatus} toggle={() => toggleShowModal()}>
                <ModalContainer />
            </Modal>
        </div>
    )
}

export default RdaySets