export const BASE_URL = "http://localhost:8080";

//AUTHENTICATION URLS
export const LOGIN_URL = BASE_URL + '/login';
export const SIGNUP_URL = BASE_URL + '/signup';

//ROOM URLS
export const CREATE_ROOM_URL = BASE_URL + '/room/create';
export const JOIN_ROOM_URL = BASE_URL + '/room/join';
export const LEAVE_ROOM_URL = BASE_URL + '/room/leave';
export const MEMBERS_OF_ROOM_URL = BASE_URL + '/room/members';
export const TASKS_OF_ROOM_URL = BASE_URL + '/room/tasks';
export const ACTIVITY_URL = BASE_URL + "/room/feed";
export const CHAT_URL = BASE_URL + "/room/chat";
export const ROOM_ADD_URL = BASE_URL + "/room/add";

//TASK URLS
export const TASK_URL = BASE_URL + "/task";
export const TASK_CREATE_URL = BASE_URL + '/task/create';


// Profile url
export const USER_PROFILE_URL =BASE_URL +'/profile';

//Notes url
export const NOTES_CREATION_URL =BASE_URL+'/notes/create';
export const SELF_NOTES_URL =BASE_URL+'/notes/selfnotes';
