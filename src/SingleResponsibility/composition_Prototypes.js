const roles = {
    plainUser: "user",
    manager: "manager",
    admin: "admin",
};

const userTable = [];

// GOOD WAY
function UserPermission(role) {
    this.role = role;
}

UserPermission.prototype.canUpdate = function() {
    return this.role === roles.manager;
};

UserPermission.prototype.canManageUsers = function() {
    return this.role === roles.admin;
};

function UserConstructor(user) {

    this.UID = Math.round(Math.random() * (999 - 111) + 111);
    this.name = user.name;
    this.surname = user.surname;
    this.age = user.age;
    this.permission = new UserPermission(user.role);
    userTable.push(this);
}

UserConstructor.prototype.addUser = function(newUser) {
    if (this.permission.canManageUsers()) {
        return new UserConstructor(newUser)
    } else {
        console.log("You don`t have permissions to add user");
        return null;
    }
};

UserConstructor.prototype.removeUser = function(UID) {
    if (this.permission.canManageUsers()) {
        for (let obj in userTable) {
            if (userTable[obj].UID === UID) {
                userTable.splice(obj, 1);
                break;
            }
        }
        return userTable;
    } else {
        console.log("You don`t have permissions to remove user");
        return null;
    }
};

UserConstructor.prototype.updateUser = function(UID, fieldToUpdate, value) {
    let updatedUser = null;
    if (this.permission.canManageUsers() || this.permission.canUpdate()) {
        for (let obj of userTable) {
            if (obj.UID === UID) {
                obj[fieldToUpdate] = value;
                updatedUser = obj[fieldToUpdate];
                break;
            }
        }
        return updatedUser;
    } else {
        console.log("You don`t have permissions to update user");
        return null;
    }
};

UserConstructor.prototype.getUserById = function(UID) {
    let searchedUser = null;
    for (let obj of userTable) {
        if (obj.UID === UID) {
            searchedUser = obj;
            break;
        }
    }
    return searchedUser;
};


const vika = { name: "Vika", surname: "Shelestenko", age: 20, role: roles.admin };
const bob = { name: "Bob", surname: "Manager", age: 30, role: roles.manager };
const vikaUser = new UserConstructor(vika);
console.log("new user created with constructor", vikaUser);

// check user permissions for create new user
const bobUser = vikaUser.addUser(bob);
console.log("bob user created by vika admin", bobUser);
const newUser = bobUser.addUser(bob);
console.log("another user created by bob manager", newUser);

// check user permissions for update user
console.log("bob user updated by vika admin", vikaUser.updateUser(bobUser.UID, "name", "BigBob"));
console.log("vika admin updated by BigBob user", bobUser.updateUser(vikaUser.UID, "name", "Viktoria"));

// getUser by another user
console.log("getById - bob", vikaUser.getUserById(bobUser.UID));
console.log("getById - vika", bobUser.getUserById(vikaUser.UID));

// check user permissions for remove user
console.log("vika admin removed by BigBob user", bobUser.removeUser(vikaUser.UID));
console.log("bob user removed by vika admin", vikaUser.removeUser(bobUser.UID));

// BAD WAY
function UserConstructorBADWAY(user) {
    this.UID = Math.round(Math.random() * (999 - 111) + 111);
    this.name = user.name;
    this.surname = user.surname;
    this.age = user.age;
    userTable.push(this);
}

UserConstructorBADWAY.prototype.addUser = function(newUser) {};

UserConstructorBADWAY.prototype.removeUser = function(UID) {};

UserConstructorBADWAY.prototype.updateUser = function(UID, fieldToUpdate, value) {};

UserConstructorBADWAY.prototype.getUserById = function(UID) {};

UserConstructorBADWAY.prototype.canUpdate = function(UID) {};

UserConstructorBADWAY.prototype.canManageUsers = function(UID) {};