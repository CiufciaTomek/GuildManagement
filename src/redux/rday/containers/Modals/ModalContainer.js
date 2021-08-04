import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addSet, getItems } from './../../duck/operations'

const ModalContainer = ({ addSet, getItems, items }) => {

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

    const [error, setError] = useState(
        {
            weapon: false,
            helmet: false,
            armor: false,
            boots: false,
            cape: false,
            offhand: false,
            type: false,
            discordCommand: false,
            discordRank: false,
        }
    );

    const [success, setSuccess] = useState(false)

    const onSubmit = async (e) => {
        //e.preventDefault()
        let weapon = Input.weapon.current.value
        let helmet = Input.helmet.current.value
        let armor = Input.armor.current.value
        let boots = Input.boots.current.value
        let cape = Input.cape.current.value
        let offhand = Input.offhand.current.value
        let type = Input.type.current.value
        let discordCommand = Input.discordCommand.current.value
        let discordRank = Input.discordRank.current.value

        setError(error => ({
            weapon: false,
            helmet: false,
            armor: false,
            boots: false,
            cape: false,
            offhand: false,
            type: false,
            discordCommand: false,
            discordRank: false,
        }))

        if (weapon < 0) {
            setError(error => ({ ...error, weapon: true }))
        }
        if (helmet < 0) {
            setError(error => ({ ...error, helmet: true }))
        }
        if (armor < 0) {
            setError(error => ({ ...error, armor: true }))
        }
        if (boots < 0) {
            setError(error => ({ ...error, boots: true }))
        }
        if (cape < 0) {
            setError(error => ({ ...error, cape: true }))
        }
        if (type < 0) {
            setError(error => ({ ...error, type: true }))
        }
        if (!discordCommand) {
            setError(error => ({ ...error, discordCommand: true }))
        }
        if (!discordRank) {
            setError(error => ({ ...error, discordRank: true }))
        }

        if (valid(weapon) || valid(helmet) || valid(armor) || valid(cape) || valid(type) || valid(discordCommand) || valid(discordRank)) return

        if (offhand == -1) offhand = null;

        const setData = { weapon: weapon, helmet: helmet, armor: armor, boots: boots, cape: cape, offhand: offhand, type: type, discordCommand: discordCommand, discordRank: discordRank }

        addSet(setData)
            .then((response) => {
                setSuccess(true)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const valid = (item) => {
        if (item < 0) {
            return true
        }
    }

    useEffect(() => {
        getItems()
        console.log(items)
    }, [])

    return (
        <div>
            <div>
                <h3 className='create-set-content-title'>Bolid Creator</h3>
                {success ? (
                    <small className='info-success'>Bolid został dodany</small>
                ) : ''}
            </div>
            {items ? (
                <div className='create-set-content'>
                    <select className={error.weapon ? ' error-input' : ''} ref={Input.weapon}>
                        <option value='-1' disabled selected>Weapon</option>
                        {items.weapons.map((element, index) => {
                            return (
                                <option value={element.id}>{element.name}</option>
                            )
                        })}
                    </select>
                    <select className={error.helmet ? ' error-input' : ''} ref={Input.helmet}>
                        <option value='-1' disabled selected>Helmet</option>
                        {items.helmets.map((element, index) => {
                            return (
                                <option value={element.id}>{element.name}</option>
                            )
                        })}
                    </select>
                    <select className={error.armor ? ' error-input' : ''} ref={Input.armor}>
                        <option value='-1' disabled selected>Armor</option>
                        {items.armors.map((element, index) => {
                            return (
                                <option value={element.id}>{element.name}</option>
                            )
                        })}
                    </select>
                    <select className={error.boots ? ' error-input' : ''} ref={Input.boots}>
                        <option value='-1' disabled selected>Boots</option>
                        {items.boots.map((element, index) => {
                            return (
                                <option value={element.id}>{element.name}</option>
                            )
                        })}
                    </select>
                    <select className={error.cape ? ' error-input' : ''} ref={Input.cape}>
                        <option value='-1' disabled selected>Cape</option>
                        {items.capes.map((element, index) => {
                            return (
                                <option value={element.id}>{element.name}</option>
                            )
                        })}
                    </select>
                    <select className={error.offhand ? ' error-input' : ''} ref={Input.offhand}>
                        <option selected value='-1'>Off-hand</option>
                        {items.offhands.map((element, index) => {
                            return (
                                <option value={element.id}>{element.name}</option>
                            )
                        })}
                    </select>
                    <input type='text' className={error.discordCommand ? ' discord-command error-input' : ' discord-command'} placeholder='Discord command' ref={Input.discordCommand} />
                    <select className={error.type ? ' error-input' : ''} ref={Input.type}>
                        <option value='-1' selected disabled>Role</option>
                        <option>Tank</option>
                        <option>Mdps</option>
                        <option>Rdps</option>
                        <option>Healer</option>
                        <option>Support</option>
                    </select>
                    <input type='text' className=' discord-command' placeholder='Discord rank id' ref={Input.discordRank} />

                </div>
            ) : 'Loading...'}
            <div className=''>
                <p className='add-btn ' onClick={() => onSubmit()}>Dodaj</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    items: state.sets.items
})

const mapDispatchToProps = dispatch => ({
    addSet: (setData) => dispatch(addSet(setData)),
    getItems: () => dispatch(getItems())
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer)