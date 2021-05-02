import axios from 'axios';

const loginAction = {
  state: {
    user: {},
    token: localStorage.getItem('access_token'),
  },
  mutations: {
    auth_success(state, authData) {
      state.user = authData.tempUser;
      state.token = authData.tempToken;
    },
    logout_success(state) {
      state.user = {};
      state.token = null;
    },
  },
  actions: {
    registerOrLogin({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios.post(user.url, user)
          .then((resp) => {
            if (user.url === `${process.env.VUE_APP_API_URL}merchant-entry`) {
              resolve(resp);
            } else {
              const tempToken = resp.data.message.message.token;
              const tempUser = resp.data.message.message.user;
              const tempType = resp.data.message.message.user.type;
              const name = tempUser.name ? tempUser.name : tempUser.first_name;
              localStorage.setItem('name', name);
              localStorage.setItem('email', tempUser.email);
              localStorage.setItem('type', tempType);
              localStorage.setItem('access_token', tempToken);

              axios.defaults.headers.common.Authorization = `Bearer ${tempToken}`;
              commit('auth_success', {
                tempToken,
                tempUser,
              });
              resolve(resp);
            }
          })
          .catch((err) => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_id');

            if (err.response !== undefined && Object.prototype.hasOwnProperty.call(err.response, 'status') && err.response.status !== 500) {
              reject(err.response.data);
            } else {
              const message = {
                msg: {
                  msg: 'Some error occurred',
                },
              };
              reject(message);
            }
          });
      });
    },
    logout({
      commit,
      state,
    }) {
      return new Promise((resolve, reject) => {
        const url = `${process.env.VUE_APP_API_URL}logout`;
        const { token } = state;
        let type;
        switch (state.user.type) {
          case 1:
            type = 'admin';
            break;
          case 2:
            type = 'merchant';
            break;
          case 3:
            type = 'user';
            break;
          default:
            type = 'user';
        }

        axios.post(url, {
          token,
          type,
        })
          .then((response) => {
            resolve(response);
            commit('logout_success');
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_id');
          })
          .catch((err) => {
            reject(err.response.data);
          });
      });
    },
  },
  getters: {
    isAdminLoggedIn: (state) => (state.user != null
      && Object.keys(state.user).length > 0
      && state.token != null
      && state.user.type === 1),

    isMerchantLoggedIn: (state) => (state.user != null
      && Object.keys(state.user).length > 0
      && state.token != null
      && state.user.type === 2),

    isGeneralLoggedIn: (state) => (state.user != null
      && Object.keys(state.user).length > 0
      && state.token != null
      && state.user.type === 3),

    isLocalEntrepreneurLoggedIn: (state) => (state.user != null
      && Object.keys(state.user).length > 0
      && state.token != null
      && state.user.type === 4),

    isBookSellerLoggedIn: (state) => (state.user != null
      && Object.keys(state.user).length > 0
      && state.token != null
      && state.user.type === 5),

    isLoggedIn: (state) => (state.user != null
      && Object.keys(state.user).length > 0
      && state.token != null),
  },
};

export default loginAction;
