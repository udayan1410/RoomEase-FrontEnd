const authenticateAndUpdateUserData = (oldState, data) => {
    let state = { ...oldState };
    let { _id, roomName } = data.user;

    localStorage.setItem('userID', _id);
    localStorage.setItem('roomName', roomName);

    state.userID = _id;
    state.roomName = roomName;

    return state;
}

const logoutUserAndDeleteData = (oldState, data) => {
    let state = { ...oldState };

    localStorage.removeItem('userID');
    localStorage.removeItem('roomName');

    oldState.userID = null;
    oldState.roomName = null;

    return state;
}

const checkAuthState = (oldState, data) => {
    let state = { ...oldState };
    let userID = null, roomName = null;


    if (state.userID == null) {
        userID = localStorage.getItem('userID');
        state.userID = userID;
    }
    if (state.roomName == null) {
        roomName = localStorage.getItem('roomName');
        state.roomName = roomName;
    }
    return state;
}

export {
    authenticateAndUpdateUserData,
    logoutUserAndDeleteData,
    checkAuthState
}