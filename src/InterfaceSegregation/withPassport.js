// WRONG we have ownRealization, that does not have the same props as abstract methods suppose

function authAbstract() {
   this.authStrategy = null;
   this.authParameters = {
       session: null,
       skope: null,
       successMessage: null,
       callback: () => {},
   };
}

function passport(authStrategy, session, skope, successMessage, callback) {
    this.authStrategy = authStrategy;
    this.authParameters = {
        session: session,
        skope: skope,
        successMessage: successMessage,
        callback: callback,
    };
}

passport.prototype = Object.create(authAbstract);

function ownAuthRealization(session, skope, successMessage, isValidateUser, callback) {
    this.authParameters = {
        session: session,
        skope: skope,
        successMessage: successMessage,
        isValidateUser: isValidateUser,
        callback: callback,
    };
}

passport.prototype = Object.create(ownAuthRealization);

// RIGHT

function authAbstract() {
    this.authStrategy = null;
    this.authParameters = { /* any or typescript OR */};
}

function passport(authStrategy, session, skope, successMessage, callback) {
    this.authStrategy = authStrategy;
    this.authParameters = {
        session: session,
        skope: skope,
        successMessage: successMessage,
        callback: callback,
    };
}

passport.prototype = Object.create(authAbstract);

function ownAuthRealization(session, skope, successMessage, isValidateUser, callback) {
    this.authParameters = {
        session: session,
        skope: skope,
        successMessage: successMessage,
        isValidateUser: isValidateUser,
        callback: callback,
    };
}

passport.prototype = Object.create(ownAuthRealization);