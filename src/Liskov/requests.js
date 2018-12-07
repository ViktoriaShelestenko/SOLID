// RIGHT
class Request {
    const add = function() {
        return query.process("INSERT INTO tbl_name (col1,col2) VALUES(15,col1*2);")
    }

    const update = function() {
        return query.process("UPDATE t1 SET col1 = col1 + 1;")
    }
}

class User extends Request {
    this.addUser = function() {
        Request.add();
    }
    this.updateUser = function() {
        Request.update();
    }
}

class Topic extends Request {
    this.addTopic = function() {
        Request.add();
    }
    this.updateTopic = function() {
        Request.update();
    }
}

// WRONG
class User {
    this.add = function() {
        return query.process("INSERT INTO tbl_name (col1,col2) VALUES(15,col1*2);")
    }

    this.update = function() {
        return query.process("UPDATE t1 SET col1 = col1 + 1;")
    }

    this.addUser = function() {
        this.add();
    }
    this.updateUser = function() {
        this.update();
    }
}

class Topic extends User {
    this.addTopic = function() {
        this.add();
    }
    this.updateTopic = function() {
        this.update();
    }
}