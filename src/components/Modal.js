import React, { useState, useEffect } from 'react'
import { CgCloseO, CgAdd, CgClose } from 'react-icons/cg'
import { FaRegEdit } from 'react-icons/fa'

const Modal = (props) => {
    const toggleCollapse = () => {
        setCollapse(!collapseStatus)
    }

    const [collapseStatus, setCollapse] = useState(false)
    const [showModalStatus, setModalStatus] = useState(false)

    useEffect(() => {
        setCollapse(false)
        setModalStatus(props.open)
    }, [props.open])

    return (
        <div className={showModalStatus ? 'modal modal-show' : 'modal'}>
            <div className='modal-content'>
                <div className='modal-top'>
                    {/* <FaRegEdit size="1.5em" className="modal-btn" title="Edit" onClick={toggleCollapse} /> */}
                    <CgCloseO size="1.5em" className="modal-btn" title="Close" onClick={() => props.toggle()} />
                </div>
                {props.children}
            </div>
        </div>
    )
}

export default Modal