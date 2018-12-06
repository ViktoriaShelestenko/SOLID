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

function UserController(user) {
    const transaction = new Transaction();
    return transaction.start()
        .then(() => {
            service.addUser(user);
        })
        .then((res) => {
            transaction.commit();
            return res;
        })
        .catch((err) => {
            transaction.rollback();
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