const AuthCodeMap = (authCode) => {
    switch(authCode) {
        case "auth/invalid-email":
            return "Email provided is invalid.";
        case "auth/invalid-password":
            return "Password provided is invalid.";
        case "auth/email-already-in-use":
            return "Email already in use. Please login.";
        case "auth/wrong-password":
            return "The password you have provided is incorrect.";
        case "auth/user-not-found":
            return "The email you have provided is not registered.";
        case "auth/too-many-requests":
            return "You have made too many requests. Please try again later.";
        case "auth/weak-password":
            return "Password provided is too weak. Please use a stronger password over 6 characters.";
    }
}

export default AuthCodeMap;