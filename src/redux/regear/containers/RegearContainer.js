import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getRegears, applyPlayerRegear, getTanksRegears, getMdpsRegears, getRdpsRegears, getHealersRegears, getSupportsRegears, rejectPlayerRegear } from '../duck/operations'

const RegearContainer = ({ getRegears, regears, count, applyPlayerRegear, getTanksRegears, getMdpsRegears, getRdpsRegears, getHealersRegears, getSupportsRegears, rejectPlayerRegear }) => {

    const Input = {
        type: React.createRef(),
    }

    const onSelect = () => {
        let type = Input.type.current.value

        switch (type) {
            case 'Tank':
                getTanksRegears()
                break
            case 'Mdps':
                getMdpsRegears()
                break
            case 'Rdps':
                getRdpsRegears()
                break
            case 'Healer':
                getHealersRegears()
                break
            case 'Support':
                getSupportsRegears()
                break
            default:
                getRegears()
                break
        }
    }

    useEffect(() => {
        getRegears()
    }, [])

    const style = {
        background: '#ffffff17'
    }

    return (
        <div className='regear-content'>
            <div className='filters'>
                <select ref={Input.type}>
                    <option value='0' selected>Any</option>
                    <option>Tank</option>
                    <option>Mdps</option>
                    <option>Rdps</option>
                    <option>Healer</option>
                    <option>Support</option>
                </select>
                <p onClick={() => onSelect()}>Wybierz</p>
            </div>
            {regears ? (
                regears.map((element, index) => {
                    return (
                        <div className='regear' style={index % 2 ? style : { background: 'transparent' }}>
                            <img src={element.url + '?width=400&height=225'} width='400' height='225' />
                            <p>{element.Member.nick}</p>
                            <p>{element.Set.slug}</p>
                            <p>{element.created_at}</p>
                            <div className='btn-group'>
                                <p className='btn-apply' onClick={() => applyPlayerRegear(element.id, index)}>Zatwierdź</p>
                                <p className='btn-decline' onClick={() => rejectPlayerRegear(element.id, index)}>Odrzuć</p>
                            </div>
                        </div>
                    )
                })
            ) : 'Loading...'}
            {count ? (
                <div className='regear'>
                    <p>Total: {count.total}</p>
                    <p>Tanks: {count.tank}</p>
                    <p>Supports: {count.support}</p>
                    <p>Rdps: {count.rdps}</p>
                    <p>Mdps: {count.mdps}</p>
                    <p>Healers: {count.healer}</p>
                </div>
            ) : 'Loading...'}
        </div>
    )
}

const mapStateToProps = (state) => ({
    regears: state.regear.data,
    count: state.regear.count
})

const mapDispatchToProps = dispatch => ({
    getRegears: () => dispatch(getRegears()),
    getTanksRegears: () => dispatch(getTanksRegears()),
    applyPlayerRegear: (id, index) => dispatch(applyPlayerRegear(id, index)),
    rejectPlayerRegear: (id, index) => dispatch(rejectPlayerRegear(id, index)),
    getMdpsRegears: () => dispatch(getMdpsRegears()),
    getRdpsRegears: () => dispatch(getRdpsRegears()),
    getHealersRegears: () => dispatch(getHealersRegears()),
    getSupportsRegears: () => dispatch(getSupportsRegears())
})

export default connect(mapStateToProps, mapDispatchToProps)(RegearContainer)