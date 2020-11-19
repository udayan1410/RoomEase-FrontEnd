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


//split money
export const SPLIT_EASE_URL = "/splitease"
export const SPLIT_EASE_EXPENSE = "/expenses"
export const SPLIT_EASE_FEED = "/feed"