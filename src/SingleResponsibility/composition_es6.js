const roles = {
    plainUser: "user",
    manager: "manager",
    admin: "admin",
};

const userTable = [];

// GOOD WAY
class UserPermission {
    constructor(role) {
        this.role = role;
    }

    canUpdate() {
        return this.role === roles.manager;
    }

    canManageUsers() {
        return this.role === roles.admin;
    }
}

class UserConstructor {

    constructor(user) {
        this.UID = Math.round(Math.random() * (999 - 111) + 111);
        this.name = user.name;
        this.surname = user.surname;
        this.age = user.age;
        this.permission = new UserPermission(user.role);
        userTable.push(this);
    }

    addUser(newUser) {
        if (this.permission.canManageUsers()) {
            return new UserConstructor(newUser)
        } else {
            console.log("You don`t have permissions to add user");
            return null;
        }
    }

    removeUser(UID) {
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
    }

    updateUser(UID, fieldToUpdate, value) {
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
    }

    getUserById(UID) {
        let searchedUser = null;
        for (let obj of userTable) {
            if (obj.UID === UID) {
                searchedUser = obj;
                break;
            }
        }
        return searchedUser;
    }
}


console.log("S - CREATION COMPOSITION");
console.groupCollapsed("users creation");
const vika = { name: "Vika", surname: "Shelestenko", age: 20, role: roles.admin };
const bob = { name: "Bob", surname: "Manager", age: 30, role: roles.manager };
const vikaUser = new UserConstructor(vika);
console.log("new user created with constructor", vikaUser);
console.groupEnd();

console.groupCollapsed("check user permissions for create new user");
const bobUser = vikaUser.addUser(bob);
console.log("bob user created by vika admin", bobUser);
const newUser = bobUser.addUser(bob);
console.log("another user created by bob manager", newUser);
console.groupEnd();

console.groupCollapsed("check user permissions for update user");
console.log("bob user updated by vika admin", vikaUser.updateUser(bobUser.UID, "name", "BigBob"));
console.log("vika admin updated by BigBob user", bobUser.updateUser(vikaUser.UID, "name", "Viktoria"));
console.groupEnd();

console.groupCollapsed("getUser by another user");
console.log("getById - bob", vikaUser.getUserById(bobUser.UID));
console.log("getById - vika", bobUser.getUserById(vikaUser.UID));
console.groupEnd();

console.groupCollapsed("check user permissions for remove user");
console.log("vika admin removed by BigBob user", bobUser.removeUser(vikaUser.UID));
console.log("bob user removed by vika admin", vikaUser.removeUser(bobUser.UID));
console.groupEnd();

const description = document.createElement('p');
description.innerHTML = "User constructor has 4 usual methods - get, put, post, delete. Each method can be realized if " +
    "user has appropriate permissions. Permissions described in permissions constructor. User constructor apart of permissions " +
    "constructor. So single responsibility principle works";

const parentElem = document.getElementById("s-comments");
parentElem.appendChild(description);

// BAD WAY
class UserConstructorBADWAY {

    constructor(user) {
        this.UID = Math.round(Math.random() * (999 - 111) + 111);
        this.name = user.name;
        this.surname = user.surname;
        this.age = user.age;
        this.role = user.role;
        userTable.push(this);
    }

    addUser(newUser) {
        if (this.canManageUsers()) {
            return new UserConstructor(newUser)
        } else {
            console.log("You don`t have permissions to add user");
            return null;
        }
    }

    removeUser(UID) {
        if (this.canManageUsers()) {
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
    }

    updateUser(UID, fieldToUpdate, value) {
        let updatedUser = null;
        if (this.canManageUsers() || this.canUpdate()) {
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
    }

    getUserById(UID) {
        let searchedUser = null;
        for (let obj of userTable) {
            if (obj.UID === UID) {
                searchedUser = obj;
                break;
            }
        }
        return searchedUser;
    }

    canUpdate() {
        return this.role === roles.manager;
    }

    canManageUsers() {
        return this.role === roles.admin;
    }
}