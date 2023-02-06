const AuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user && user.token) {
        // set header to send token into the protectedRoute
        // return { "Authorization": user.token }
        return { Authorization: `Bearer ${user.token}` }
    }
    else {
        return {};
    }
}

export default AuthHeader;

