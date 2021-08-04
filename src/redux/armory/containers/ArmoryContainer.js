import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getArmory, changeValue } from '../duck/operations'

const ArmoryContainer = ({ getArmory, items, changeValue }) => {

    useEffect(() => {
        getArmory()
    }, [])

    const Input = []

    const style = {
        background: '#ffffff17'
    }

    return (
        <div className='armory-content'>
            {items ? (
                items.map((e, index) => {
                    Input.push(React.createRef())
                    return (
                        <div className='item' style={index%2 ? style : { background: 'transparent' }}>
                            <img src={'https://render.albiononline.com/v1/item/' + e.item_name + '.png'} />
                            <p>{e.count}</p>
                            <p>{e.updated_at}</p>
                            <input type='number' ref={Input[index]}></input>
                            <p className='btn-apply' onClick={() => {
                                changeValue(e.id, Input[index].current.value, index)
                            }}>Zmień</p>
                        </div>
                    )
                })
            ): 'Loading...'}
        </div>
    )
}

const mapStateToProps = (state) => ({
    items: state.armory.list
})

const mapDispatchToProps = dispatch => ({
    getArmory: () => dispatch(getArmory()),
    changeValue: (id, value, index) => dispatch(changeValue(id, value, index))
})

export default connect(mapStateToProps, mapDispatchToProps)(ArmoryContainer)