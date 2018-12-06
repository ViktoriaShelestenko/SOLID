// RIGHT

let mysqlQuery = "";

class Transaction {
    start = function() {
        mysqlQuery += "START TRANSACTION;"
    };

    commit = function() {
        mysqlQuery += "COMMIT;"
    };

    rollback = function() {
        mysqlQuery += "ROLLBACK;"
    };
}

class Request extends Transaction {
    repeat = function() {
        mysqlQuery = this.rollback() + this.start();
    };
}

function UserController(user) {
    const request = new Request();
    return request.start()
        .then(() => {
            Service.addUser(user, request.repeat());
        })
        .then((res) => {
            request.commit();
            return res;
        })
        .catch((err) => {
            request.rollback();
            return {
                success: false,
                err: {
                    status: 500,
                    message: "UserController add user failed"
                }
            };
        })
        .then((res) => {
            Promise.resolve(res);
        })
}

// WRONG
class Transaction {
    start = function() {
        mysqlQuery += "START TRANSACTION;"
    };

    commit = function() {
        mysqlQuery += "COMMIT;"
    };

    rollback = function() {
        mysqlQuery += "ROLLBACK;"
    };

    repeat = function() {
        mysqlQuery = this.rollback() + this.start();
    };
};