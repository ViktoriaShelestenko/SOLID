// RIGHT
function AuthHandler() {
    function authProcess(data) {
        const user = {
            firstName: data.firstName,
            lastName: data.lastName,
            lang: data.language,
            email: data.email
        };
        return userAuth.process(user);
    }
}

function GoogleAuth() {
    function getUser(email) {
        return AuthHandler.authProcess(GoogleApi.get(email));
    }
}

function FacebookAuth() {
    function getUser(email) {
        return AuthHandler.authProcess(FacebookApi.get(email));
    }
}

function TwitterAuth() {
    function getUser(email) {
        return AuthHandler.authProcess(FacebookApi.get(email));
    }
}

// WRONG
function GoogleAuth() {
    function authProcess(data) {
        const user = {
            firstName: data.firstName,
            lastName: data.lastName,
            lang: data.language,
            email: data.email
        };
        return userAuth.process(user);
    }

    function getUser(email) {
        return this.authProcess(GoogleApi.get(email));
    }
}

function FacebookAuth() {
    function getUser(email) {
        return GoogleAuth.authProcess(FacebookApi.get(email));
    }
}

function TwitterAuth() {
    function getUser(email) {
        return GoogleAuth.authProcess(FacebookApi.get(email));
    }
}

