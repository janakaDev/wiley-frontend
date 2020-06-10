const ERROR_MESSAGES = {
  LOGIN_USERNAME_EMPTY: 'Email is required !',
  LOGIN_PASSWORD_EMPTY: 'Password is required !',
  LOGIN_RESPONSE_INVALID_CREDENTIALS: 'Invalid username or password'
};

const BASE_URL = ' http://127.0.0.1:8000/api';
const USER_LOGIN = BASE_URL + '/login';
const USER_REGISTER = BASE_URL + '/register';
const USER_LOGOUT = BASE_URL + '/logout';

export const HOTEL = {
  GET_LIST: BASE_URL + '/hotel/list',
  CHECK_AVAILABILITY: BASE_URL + '/hotel/checkavailabilty',
  CREATE_BOOKING: BASE_URL + '/booking/createbooking',
  CHECK_IN: BASE_URL + '/booking/checkin',
  CHECK_OUT: BASE_URL + '/booking/checkout',
  BOOK_SPA: BASE_URL + '/booking/bookspa',
  BOOK_FOOD: BASE_URL + '/booking/bookfood',
  BOOK_TAXI: BASE_URL + '/booking/booktaxi',
  BOOK_POOL: BASE_URL + '/booking/bookpool',
  DELETE: BASE_URL + '/booking/createbooking',
  GET_BOOKING_LIST: BASE_URL + '/booking/getbookinglist'
};


export default ERROR_MESSAGES;

export {
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER
};
