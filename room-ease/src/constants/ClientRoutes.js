//Login and Authentication
export const BASE_URL = "/";
export const LOGIN_URL = "/login";
export const SIGNUP_URL = "/signup";


//Room URLS
export const ROOM_URL = "/room";
export const ROOM_JOIN_URL = ROOM_URL + "/join";
export const ROOM_CREATE_URL = ROOM_URL + "/create";
export const ROOM_HOMEPAGE = "/room/:roomName"

//TASKS URLS
export const TASK_URL = "/task";
export const TASK_CREATE_URL = TASK_URL + "/create";

//Homepage URLS
export const ROOM_TASKS = "/tasks";
export const ROOM_ALL_TASKS_URL = "/tasks/";
export const ROOM_ONE_TASK_URL = ROOM_HOMEPAGE + "/tasks/:taskid"

//Activity
export const ACTIVITY_URL = "/activity";

//Chats
export const CHAT_URL = "/chat";

//profile
export const USER_PROFILE_URL = "/profile";

//room
export const ROOM_MYROOM = "/room";

//notes
export const CREATE_NOTES_URL ="/notes/create";
export const SINGLE_NOTE_URL ="/notes/:noteid";
export const NOTES_URL ="/notes";

export const VIEW_ROOM_NOTES_URL="/notes/room";
export const VIEW_SELF_NOTES_URL="notes/selfnotes";
export const VIEW_SINGLE_NOTE_URL="notes/:noteid";