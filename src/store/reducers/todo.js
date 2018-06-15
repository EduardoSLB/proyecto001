import * as actionTypes from '../actions';

const initialState = {
    idComunero: null,
    id_item: null,
    totalComuneros: [],
    hay_cambios: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ID_COMUNERO:
            return {
                ...state,
                idComunero: action.idComunero
            }
        case actionTypes.TOTAL_COMUNEROS:
            return {
                ...state,
                totalComuneros: action.comuneros
            }
        case actionTypes.ID_ITEM:
            return {
                ...state,
                id_item: action.id
            }
        default:
            {
                return state
            }
    }
}

export default reducer;