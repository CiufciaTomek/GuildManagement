import React, { useEffect } from 'react'
import PlayerListContainer from '../../redux/playerlist/containers/PlayerListContainer'

const PlayerList = () => {
    return (
        <div className='container-list'>
            <PlayerListContainer />
        </div>
    )
}

export default PlayerList