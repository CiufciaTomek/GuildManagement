import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { AiFillEdit } from "react-icons/ai";
import { FiCopy } from "react-icons/fi";
import RdaySets from '../../../components/dashboard/RdaySets'
import { getAllSets } from './../duck/operations'
import Modal from './../../../components/Modal'
import ModalSetContainer from './Modals/ModalSetContainer'

const RdaySetsContainer = ({ getAllSets, sets }) => {

    const [modalStatus, setModalStatus] = useState(false)
    const [setId, changeSetId] = useState(null)
    const [set, changeSet] = useState(null)
    const [setIndex, changeSetIndex] = useState(null)

    const toggleShowModal = () => {
        setModalStatus(!modalStatus)
    }

    const onSetsCopy = () => {
        let text = "```\n--------------------------------------------Bolidy--------------------------------------------\n\n"

        sets.list.map((element) => {
            text += element.Weapon.name + ' ' + (element.Offhand ? (element.Offhand.name + ' ') : '') + element.Helmet.name + ' ' + element.Armor.name + ' ' + element.Boots.name + ' ' + element.Cape.name + ' ------> ' + element.slug + "\n"
        })

        text += '\n```'

        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    useEffect(() => { getAllSets() }, [])

    return (
        <RdaySets>
            <div className='rday-content-top'>
                <FiCopy size="1.5em" title='Copy' className='copy-btn' onClick={() => onSetsCopy()} />
            </div>
            {sets.list ? (
                sets.list.map((element, index) => {
                    return (
                        <div className={'wrap-element declaration ' + element.type}>
                            <p className='list-element'>{element.slug}</p>
                            <img className='item' src={'https://render.albiononline.com/v1/item/' + element.Weapon.item_name + '.png'} title={element.Weapon.name} />
                            {element.Offhand ? (<img className='item' src={'https://render.albiononline.com/v1/item/' + element.Offhand.item_name + '.png'} title={element.Offhand.name} />) : ''}
                            <img className='item' src={'https://render.albiononline.com/v1/item/' + element.Helmet.item_name + '.png'} title={element.Helmet.name} />
                            <img className='item' src={'https://render.albiononline.com/v1/item/' + element.Armor.item_name + '.png'} title={element.Armor.name} />
                            <img className='item' src={'https://render.albiononline.com/v1/item/' + element.Boots.item_name + '.png'} title={element.Boots.name} />
                            <img className='item' src={'https://render.albiononline.com/v1/item/' + element.Cape.item_name + '.png'} title={element.Cape.name} />
                            <p className='list-element'>{element.type}</p>
                            <p className='list-element'>{element.permission_rank_id}</p>
                            <p className='list-element list-btn'><AiFillEdit className='edit-ico' size="1.5em" onClick={() => {
                                changeSetId(index)
                                toggleShowModal()
                                changeSet(element)
                                changeSetIndex(index)
                            }} /></p>
                        </div>
                    )
                })
            ) : 'Loading...'}

            <Modal open={modalStatus} toggle={() => toggleShowModal()}>
                <ModalSetContainer elementId={setId} set={set} toggle={() => toggleShowModal()} setIndex={setIndex} />
            </Modal>
        </RdaySets>
    )
}

const mapStateToProps = (state) => ({
    sets: state.sets
})

const mapDispatchToProps = dispatch => ({
    getAllSets: () => dispatch(getAllSets()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RdaySetsContainer)