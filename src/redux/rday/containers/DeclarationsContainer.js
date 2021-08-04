import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getDeclarations, removeDeclaration, getShameList } from './../duck/operations'
import { CgClose } from 'react-icons/cg'

const DeclarationsContainer = ({ getDeclarations, declarations, count, removeDeclaration, getShameList, shameList }) => {

    const copySkipers = () => {
        let text = ""

        shameList.map((element) => {
            text += '@' + element.nick + "\n"
        })

        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    useEffect(() => {
        getDeclarations()
        getShameList()
    }, [])

    return (
        <div>
            {declarations ? (
                <div>
                    <div className='rday-content-top'>
                        <small onClick={() => copySkipers()}>Złap Skipera</small>
                    </div>
                    {declarations.map((element, index) => {
                        return (
                            <div className={'wrap-element declaration ' + element.Set.type}>
                                <p className='list-element'>{element.Member.nick}</p>
                                <img className='item' src={'https://render.albiononline.com/v1/item/' + element.Set.Weapon.item_name + '.png'} />
                                {element.Set.Offhand ? <img className='item' src={'https://render.albiononline.com/v1/item/' + element.Set.Offhand.item_name + '.png'} /> : ''}
                                <img className='item' src={'https://render.albiononline.com/v1/item/' + element.Set.Helmet.item_name + '.png'} />
                                <img className='item' src={'https://render.albiononline.com/v1/item/' + element.Set.Armor.item_name + '.png'} />
                                <img className='item' src={'https://render.albiononline.com/v1/item/' + element.Set.Boots.item_name + '.png'} />
                                <img className='item' src={'https://render.albiononline.com/v1/item/' + element.Set.Cape.item_name + '.png'} />
                                <p className='list-element'>{element.Set.type}</p>
                                <p className='list-element'>{element.created_at}</p>
                                <p className='list-element list-btn'><CgClose size="1.5em" className='btn-delete' title="Delete" onClick={() => removeDeclaration(element, index)} /></p>
                            </div>
                        )
                    })}
                    {count ? (
                        <div className='list-footer'>
                            <p className='list-element'>Tanks: {count.tank} </p>
                            <p className='list-element'>Rdps: {count.rdps}</p>
                            <p className='list-element'>Mdps: {count.mdps} </p>
                            <p className='list-element'>Healers: {count.healer}</p>
                            <p className='list-element'>Supports: {count.support} </p>
                            <p className='list-element'>Total: {count.total} </p>
                        </div>
                    ) : 'Loading'}
                </div>
            ) : 'Loading...'}
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    getDeclarations: () => dispatch(getDeclarations()),
    removeDeclaration: (declaration, index) => dispatch(removeDeclaration(declaration, index)),
    getShameList: () => dispatch(getShameList())
})

const mapStateToProps = (state) => ({
    declarations: state.sets.declarations,
    count: state.sets.count,
    shameList: state.sets.shameList
})


export default connect(mapStateToProps, mapDispatchToProps)(DeclarationsContainer)