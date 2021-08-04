import actions from './actions'
import axios from 'axios'

const fetchSets = async () => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/rday/sets')

    return response
}

export const getAllSets = () =>
    async (dispatch) => {
        const sets = await fetchSets()

        dispatch(actions.fetch(sets.data))
    }

const fetchItems = async () => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/rday/sets/items')

    return response
}

export const getItems = () =>
    async (dispatch) => {
        const items = await fetchItems()

        dispatch(actions.items(items.data))
    }

const addSetRequest = async (setData) => {
    const response = await axios.post('http://51.83.129.240:3333/api/auth/rday/sets/add', {
        weapon: setData.weapon,
        offhand: setData.offhand,
        helmet: setData.helmet,
        armor: setData.armor,
        boots: setData.boots,
        cape: setData.cape,
        type: setData.type,
        slug: setData.discordCommand,
        permission_rank_id: setData.discordRank
    })

    return response
}

export const addSet = (setData) =>
    async (dispatch) => {
        const set = await addSetRequest(setData)

        dispatch(actions.add(set.data))
    }

const fetchDeclarations = async () => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/rday/declarations')

    return response
}

export const getDeclarations = () =>
    async (dispatch) => {
        const declarations = await fetchDeclarations()

        dispatch(actions.addDeclarations(declarations.data))
    }

const removeDeclarationRequest = async (declaration) => {
    const response = await axios.delete('http://51.83.129.240:3333/api/auth/rday/declaration', {
        data: {
            declarationId: declaration.id
        }
    })

    return response
}

export const removeDeclaration = (declaration, index) =>
    async (dispatch) => {
        const remove = await removeDeclarationRequest(declaration)

        dispatch(actions.removeDec(index))
    }

const removeSetRequest = async (set) => {
    const response = await axios.delete('http://51.83.129.240:3333/api/auth/rday/set', {
        data: {
            setId: set.id
        }
    })

    return response
}

export const removeSet = (set, index) =>
    async (dispatch) => {
        const remove = await removeSetRequest(set)

        dispatch(actions.removeSet(index))
    }

const editSetRequest = async (set) => {
    const response = await axios.patch('http://51.83.129.240:3333/api/auth/rday/set/edit', {
        id: set.id,
        weapon: set.weapon,
        offhand: set.offhand,
        helmet: set.helmet,
        armor: set.armor,
        boots: set.boots,
        cape: set.cape,
        type: set.type,
        slug: set.discordCommand,
        permission_rank_id: set.discordRank
    })

    return response
}

export const editSet = (set, index) =>
    async (dispatch) => {
        const edit = await editSetRequest(set)

        dispatch(actions.editSet(edit.data, index))
    }

const fetchShameList = async () => {
    const response = await axios.get('http://51.83.129.240:3333/api/auth/rday/shamelist')

    return response
}

export const getShameList = () =>
    async (dispatch) => {
        const getList = await fetchShameList()

        dispatch(actions.addShameList(getList.data))
    }
