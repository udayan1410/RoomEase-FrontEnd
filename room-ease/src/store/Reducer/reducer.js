import * as ActionConstants from '../Actions/ActionConstants';
import * as ActionDispatchers from '../Actions/ActionDispatchers';

const initialState = {
    userID: null,
    roomName: null,
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case ActionConstants.AUTHENTICATE_USER:
            return ActionDispatchers.authenticateAndUpdateUserData(state, action);

        case ActionConstants.LOGOUT_USER:
            return ActionDispatchers.logoutUserAndDeleteData(state, action);

        case ActionConstants.CHECK_AUTH_STATE:
            return ActionDispatchers.checkAuthState(state, action);

        case ActionConstants.CLEAR_USER_ROOM:
            return ActionDispatchers.clearUserRoom(state, action);

        default:
            return state;

    }
}


export default reducer;

