export const GET_ALL_CONTACTS = 'GET_ALL_CONTACTS';
export const CREATE_NEW_CONTACT = 'CREATE_NEW_CONTACT';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';

export const createContact = (contact) => {
    return {
        type: CREATE_NEW_CONTACT,
        contact: contact
    }
};

export const deleteContact = (id) => {
    return {
        type: REMOVE_CONTACT,
        id: id
    }
};
export default (state = [], action) => {
    switch (action.type){

        case CREATE_NEW_CONTACT:
            return [
                ...state,
                Object.assign({}, action.contact)
            ];

        case REMOVE_CONTACT:
            return state.filter((data, i) => i !== action.id);

        default:
            return state;
    }
};