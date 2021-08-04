import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { removeSet, getItems, editSet } from './../../duck/operations'

const ModalSetContainer = ({ set, elementId, removeSet, toggle, items, getItems, editSet, setIndex }) => {

    const Input = {
        weapon: React.createRef(),
        helmet: React.createRef(),
        armor: React.createRef(),
        boots: React.createRef(),
        cape: React.createRef(),
        offhand: React.createRef(),
        type: React.createRef(),
        discordCommand: React.createRef(),
        discordRank: React.createRef(),
    }

    const roles = ['Tank', 'Healer', 'Support', 'Mdps', 'Rdps']

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const onChange = (index) => {
        let weapon = Input.weapon.current.value
        let helmet = Input.helmet.current.value
        let armor = Input.armor.current.value
        let boots = Input.boots.current.value
        let cape = Input.cape.current.value
        let offhand = Input.offhand.current.value
        let type = Input.type.current.value
        let discordCommand = Input.discordCommand.current.value
        let discordRank = Input.discordRank.current.value

        if (offhand == -1) offhand = null

        const setData = { id: set.id, weapon: weapon, helmet: helmet, armor: armor, boots: boots, cape: cape, offhand: offhand, type: type, discordCommand: discordCommand, discordRank: discordRank }

        editSet(setData, setIndex)
            .then((response) => {
                setSuccess(true)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        getItems()
    }, [])

    return (
        <div>
            <div>
                <h3 className='create-set-content-title'>Bolid Creator</h3>
                {success ? (
                    <small className='info-success'>Zmiany zapisane</small>
                ) : ''}
                {error ? <small className='info-error'>Set nie może zostać usunięty.</small> : ''}
            </div>
            {items ? (
                set ? (
                    <div className='create-set-content'>
                        <select className='' ref={Input.weapon}>
                            <option value='-1' disabled>Weapon</option>
                            {items.weapons.map((element, index) => {
                                return (
                                    <option value={element.id} selected={element.id == set.Weapon.id}>{element.name}</option>
                                )
                            })}
                        </select>
                        <select className='' ref={Input.helmet}>
                            <option value='-1' disabled>Helmet</option>
                            {items.helmets.map((element, index) => {
                                return (
                                    <option value={element.id} selected={element.id == set.Helmet.id}>{element.name}</option>
                                )
                            })}
                        </select>
                        <select className='' ref={Input.armor}>
                            <option value='-1' disabled>Armor</option>
                            {items.armors.map((element, index) => {
                                return (
                                    <option value={element.id} selected={element.id == set.Armor.id}>{element.name}</option>
                                )
                            })}
                        </select>
                        <select className='' ref={Input.boots}>
                            <option value='-1' disabled>Boots</option>
                            {items.boots.map((element, index) => {
                                return (
                                    <option value={element.id} selected={element.id == set.Boots.id}>{element.name}</option>
                                )
                            })}
                        </select>
                        <select className='' ref={Input.cape}>
                            <option value='-1' disabled>Cape</option>
                            {items.capes.map((element, index) => {
                                return (
                                    <option value={element.id} selected={element.id == set.Cape.id}>{element.name}</option>
                                )
                            })}
                        </select>
                        <select className='' ref={Input.offhand}>
                            <option value='-1'>Off-hand</option>
                            {items.offhands.map((element, index) => {
                                return (
                                    <option value={element.id} selected={set.Offhand ? element.id == set.Offhand.id : ''}>{element.name}</option>
                                )
                            })}

                        </select>
                        <input type='text' className=' discord-command' placeholder='Discord command' ref={Input.discordCommand} defaultValue={set.slug} />
                        <select className='' ref={Input.type}>
                            <option value='-1' disabled>Role</option>
                            {roles.map((element, index) => {
                                return (
                                    <option selected={element == set.type}>{element}</option>
                                )
                            })}
                        </select>
                        <input type='text' className=' discord-command' placeholder='Discord rank id' ref={Input.discordRank} defaultValue={set.permission_rank_id} />
                    </div>
                ) : 'Loading...'
            ) : 'Loading...'}
            <div className='btns'>
                <p className='remove-btn ' onClick={() => {
                    removeSet(set, elementId)
                        .then((response) => {
                            toggle()
                        })
                        .catch((e) => {
                            console.log('dupa')
                            setError(true)
                        })
                }} >Delete</p>
                <p className='edit-btn ' onClick={() => {
                    onChange()
                }} >Edit</p>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    removeSet: (set, index) => dispatch(removeSet(set, index)),
    getItems: () => dispatch(getItems()),
    editSet: (set, index) => dispatch(editSet(set, index))
})

const mapStateToProps = (state) => ({
    items: state.sets.items
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalSetContainer)