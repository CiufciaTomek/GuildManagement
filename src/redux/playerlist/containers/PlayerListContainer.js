import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllPlayers, removeMember, getPlayerZvzs, getPlayerLastZvz, getSummaryZvzs, getPlayerLastWeeksZvzs, getSummaryBetweenDates } from './../duck/operations'
import { CgClose } from 'react-icons/cg'
import ModalContainer from './Modals/ModalContainer'
import Modal from './../../../components/Modal'

const PlayerListContainer = ({ players, getAllPlayers, removeMember, getPlayerZvzs, memberInfo, getPlayerLastZvz, getSummaryZvzs, summaryZvzs, getPlayerLastWeeksZvzs, getSummaryBetweenDates, summaryBetweenDates }) => {

    const dateFrom = React.createRef()
    const dateTo = React.createRef()

    const onSubmitSummaryByDate = async () => {

        let fromDate = dateFrom.current.value
        let toDate = dateTo.current.value

        if (fromDate.length <= 0) return
        if (toDate.length <= 0 || toDate < fromDate) return

        await getSummaryBetweenDates(fromDate, toDate)
    }

    const copySummaryBetweenDates = () => {
        let text = ""

        summaryBetweenDates.map((element) => {
            text += '@' + element.nick + ": " + element.__meta__.zvzPlayer_count + "\n"
        })

        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }


    const copySummary = () => {
        let text = ""

        summaryZvzs.map((element) => {
            text += '@' + element.nick + ": " + element.__meta__.zvzPlayer_count + "\n"
        })

        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    const copyNicknames = () => {
        let text = ""

        players.list.map((element) => {
            text += element.nick + "\n"
        })

        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    const toggleShowModal = () => {
        setModalStatus(!modalStatus)
    }

    const getPlayerInfo = (id) => {
        getPlayerZvzs(id)
        getPlayerLastZvz(id)
    }



    const [modalStatus, setModalStatus] = useState(false)

    useEffect(() => {
        getAllPlayers()
        getSummaryZvzs()
    }, [])

    const style = {
        background: '#ffffff17'
    }

    return (
        <div>
            {players.list.map((element, index) => {
                return (<div className='wrap-element' style={index % 2 ? style : { background: 'transparent' }} onClick={() => {
                    getPlayerInfo(element.id)
                    getPlayerLastWeeksZvzs(element.id)
                    toggleShowModal()
                }}>
                    <p className='list-element element-name'>{element.nick}</p>
                    <p className='list-element' title='Ing key'>{element.ing_key}</p>
                    <p className='list-element element-discordid' title='DiscordId'>{element.discord_id}</p>
                    <p className='list-element element-date' title='Register Time'>{element.created_at}</p>
                    <p className='list-element list-btn'><CgClose size="1.5em" className='btn-delete' title="Delete" onClick={() => { removeMember(element.discord_id, index) }} /></p>
                </div>)
            })}
            <div className='list-footer'>
                <p className='list-element '>Total: {players.list.length}</p>
                <p className='list-element element-btn ' onClick={() => copySummary()}>Total</p>
                <input type='date' ref={dateFrom} />
                <input type='date' ref={dateTo} />
                <p className='list-element element-btn ' onClick={() => onSubmitSummaryByDate()}>Date</p>
                <p className='list-element element-btn ' onClick={() => copySummaryBetweenDates()}>Podsumowanie</p>
                <p className='list-element element-btn ' onClick={() => copyNicknames()}>Nicknames</p>
            </div>
            <Modal open={modalStatus} toggle={() => toggleShowModal()}>
                <ModalContainer />
            </Modal>

        </div>
    )
}

const mapStateToProps = (state) => ({
    players: state.playerlist,
    memberInfo: state.playerlist.memberInfo,
    summaryZvzs: state.playerlist.summary,
    summaryBetweenDates: state.playerlist.summaryBetweenDates
})

const mapDispatchToProps = dispatch => ({
    getAllPlayers: () => dispatch(getAllPlayers()),
    removeMember: (playerId, playerIndex) => dispatch(removeMember(playerId, playerIndex)),
    getPlayerZvzs: (playerId) => dispatch(getPlayerZvzs(playerId)),
    getPlayerLastZvz: (playerId) => dispatch(getPlayerLastZvz(playerId)),
    getSummaryZvzs: () => dispatch(getSummaryZvzs()),
    getPlayerLastWeeksZvzs: (playerId) => dispatch(getPlayerLastWeeksZvzs(playerId)),
    getSummaryBetweenDates: (from, to) => dispatch(getSummaryBetweenDates(from, to))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerListContainer)