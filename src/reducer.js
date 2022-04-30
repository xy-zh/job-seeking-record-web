export const initialState = {};

export function reducer(state, action) {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                isLoggedIn: true,
                username: action.username,
                applications: action.applications,
            };
        case 'logout':
            return {
                ...state,
                isLoggedIn: false,
                username: initialState.username,
                applications: {},
            };
        case 'addApplication':
            return {
                ...state,
                applications: {
                    ...state.applications,
                    inProgressCollection: {
                        ...state.applications.inProgressCollection,
                        [action.id]: action.newApplication,
                    },
                    idCollection: {
                        ...state.applications.idCollection,
                        [action.id]: 'inProcessCollection',
                    }
                }
            }
        case 'updateHistory':
            const collectionByStatus = getCollectionByStatus(action.status);
            return {
                ...state,
                applications: {
                    ...state.applications,
                    [collectionByStatus]: {
                        ...state.applications[collectionByStatus],
                        [action.id]: action.application,
                    }
                },
            };
        case 'updateCollection' :
            const formerCollection = state.applications.idCollection[action.id];
            const targetCollection = getCollectionByStatus(action.status);
            return {
                ...state,
                applications: {
                    ...state.application,
                    [formerCollection]: {
                        ...state.applications[formerCollection],
                        delete: [action.id],
                    },
                    [targetCollection]: {
                        ...state.applications[targetCollection],
                        [action.id]: action.application,
                    }
                }
            };
        case 'deleteApplication':
            const collection = state.applications.idCollection[action.id];
            return {
                ...state,
                applications: {
                    ...state.applications,
                    [collection]: {
                        ...state.applications[collection],
                        delete: [action.id],
                    },
                    idCollection: {
                        ...state.applications.idCollection,
                        delete: [action.id],
                    }
                }
            };
        case 'updateSessions':
            return {
                ...state,
                applications: action.applications,
                isLoggedIn: true,
            };
        default:
            return state;
    }
}

function getCollectionByStatus(status) {
    switch (status.toLowerCase()) {
        case 'withdraw':
            return 'notSelectedCollection';
        case 'rejected':
            return 'notSelectedCollection';
        case 'got offer':
            return 'offeredCollection';
        default:
            return 'inProgressCollection';
    }
}