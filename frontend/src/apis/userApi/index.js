import API from "..";

const userApi = {
    getUser: () => {
        const url = '/users';
        return API.get(url);
    },
    register: ({ user_name, password, email }) => {
        const url = '/users';
        return API.post(url, { user_name, password, email });
    },
    login: ({ user_name, password }) => {
        const url = '/users/login';
        return API.post(url, { user_name, password });
    },
    refreshToken: ({ refreshToken }) => {
        const url = '/users/refresh-token';
        return API.post(url, { refreshToken });
    },
    changePassword: ({ old_password, new_password }) => {
        const url = '/users/change-password';
        return API.post(url, { old_password, new_password });
    },
    updateUser: ({email,phone_number, address, last_name,first_name,avatar_url  }) => {
        const url = '/users';
        return API.put(url, {email,phone_number, address, last_name,first_name,avatar_url  });
    },

    /// for admin
    createUserAdmin: ({ user_name, password,email, role }) => {
        const url = '/users/admin';
        return API.post(url, { user_name, password,email, role });
    },
    deleteUser: ({ user_ids }) => {
        const url = '/users/admin';
        return API.delete(url, { data: { user_ids } });
    },
    getUsersInAdmin: ({ page, size }) => {
        const url = '/users/admin';
        return API.get(url, { params: { page, size } });
    },
    updateUserInAdmin: ({user_id, email,phone_number, address, last_name,first_name,avatar_url  }) => {
        const url = '/users/admin';
        return API.put(url, {user_id, email,phone_number, address, last_name,first_name,avatar_url  });
    },



}
export default userApi;
