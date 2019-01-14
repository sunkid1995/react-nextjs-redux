export const blankRequest = { error: undefined, loading: false };
// export const paginatedDataRequest = { dataPages: {}, totalPages: 1, ...blankRequest };
export const plainDataRequest = { data: undefined, ...blankRequest };

export default {
  emailAuth: plainDataRequest,
  passwordForgotten: plainDataRequest,
  passwordReset: plainDataRequest,
};
