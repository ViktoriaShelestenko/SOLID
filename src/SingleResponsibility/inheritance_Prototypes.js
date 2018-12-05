(function(){
const roles = {
    plainUser: "user",
    manager: "manager",
    admin: "admin",
};

const phrasesStatus = {
    created: "created",
    updated: "updated", // content manager update phrase
    inprocess: "inprocess", // admin view phrase right now
    refused: "refused", // admin returned phrase to content manager
    success: "success" // phrase was added
};

let userTable = [];
const phrasesTable = [];

// GOOD WAY
function ContentController() {
    return this;
}

ContentController.create = function(createdBy, phraseContent) {
    const phrase = {
        id: Math.round(Math.random() * (999 - 111) + 111),
        phrase: phraseContent,
        createdBy: createdBy,
        checkedBy: null,
        status: phrasesStatus.created
    };
    phrasesTable.push(phrase);
    return phrase;
};

ContentController.updateStatus = function(phraseId, status, checkedBy) {
    let updatedPhrase = null;
    for (let obj of phrasesTable) {
        if (obj.id === phraseId) {
            obj.status = status;
            obj.checkedBy = checkedBy;
            updatedPhrase = obj;
            break;
        }
    }
    return updatedPhrase;
};

ContentController.updatePhrase = function(phraseId, phraseContent) {
    let updatedPhrase = null;
    for (let obj of phrasesTable) {
        if (obj.id === phraseId) {
            obj.phrase = phraseContent;
            obj.checkedBy = null;
            obj.status = phrasesStatus.updated;
            updatedPhrase = obj;
            break;
        }
    }
    return updatedPhrase;
};

ContentController.delete = function(phraseId = null) {
    if (!phraseId) {
        return;
    }
    for (let obj in phrasesTable) {
        if (phrasesTable[obj].id === phraseId) {
            phrasesTable.splice(obj, 1);
            break;
        }
    }

};

function UserController() {
    return this;
}

UserController.create = function(name, surname, age, role = roles.plainUser) {
    const user = {
        UID: Math.round(Math.random() * (999 - 111) + 111),
        role: role,
        name: name,
        surname: surname,
        age: age
    };
    userTable.push(user);
    return user;
};

UserController.getUserById = function(UID) {
    let user = null;
    for (let obj of userTable) {
        if (obj.UID === UID) {
            user = obj;
            break;
        }
    }
    return user;
};

UserController.updateUser = function(user, fieldToUpdate, valueToUpdate) {
    for (let obj of userTable) {
        if (obj.UID === user.UID) {
            obj[fieldToUpdate] = valueToUpdate;
            break;
        }
    }
    return user;
};

UserController.delete = function(UID = null) {
    if (!UID) {
        return;
    }
    for (let obj in userTable) {
        if (userTable[obj].UID === UID) {
            userTable.splice(obj, 1);
            break;
        }
    }

};

function AdminController() {
    return this;
}

AdminController.create = function(name, surname, age) {
    return UserController.create(name, surname, age, roles.admin);
};

AdminController.updateUser = function() {
    return UserController.updateUser.apply(this, arguments);
};

AdminController.getUserById = function() {
    return UserController.getUserById.apply(this, arguments);
};

AdminController.markPhraseAsTaken = function(phraseId, UID) {
    return ContentController.updateStatus(phraseId, phrasesStatus.inprocess, UID);
};

AdminController.markPhraseAsRefused = function(phraseId, UID) {
    return ContentController.updateStatus(phraseId, phrasesStatus.refused, UID);
};

AdminController.markPhraseAsSuccess = function(phraseId, UID) {
    return ContentController.updateStatus(phraseId, phrasesStatus.success, UID);
};

function ContentManagerController() {
    return this;
}

ContentManagerController.create = function(name, surname, age) {
    return UserController.create(name, surname, age, roles.manager);
};

ContentManagerController.searchAllPhrasesByUser = function(UID) {
    const phrases = [];
    for (let obj of phrasesTable) {
        if (obj.createdBy === UID) {
            phrases.push(obj);
        }
    }
    return phrases;
};

ContentManagerController.createPhrase = function(UID, phrase) {
    return ContentController.create(UID, phrase);
};

ContentManagerController.updatePhrase = function(phraseId, phraseContent) {
    return ContentController.updatePhrase(phraseId, phraseContent);
};

console.log("S - CREATION INHERITANCE");

console.groupCollapsed("Plain user creation (UserController)");
const vika = UserController.create("Viktoria", "Shelestenko", 23);
console.log("created user", userTable);
console.log(UserController.updateUser(vika, "name", "Vika"));
console.log("updated user", userTable);
console.log("getUserById", UserController.getUserById(vika.UID));
console.log("delete", UserController.delete(vika.UID));
console.log("deleted user", userTable);
console.groupEnd();

console.groupCollapsed("Admin user creation (AdminController)");
const bob = AdminController.create("Admin", "Bob", 40);
console.log("created admin", userTable);
console.log(AdminController.updateUser(bob, "name", "admin-chief"));
console.log("updated admin", userTable);
console.log("getUserById", AdminController.getUserById(bob.UID));
console.groupEnd();

console.groupCollapsed("Content manager creation (ContentManagerController)");
const vasya = ContentManagerController.create("Vasya", "Pupkin", 20);
console.log("created content manager", userTable);
console.groupEnd();

console.groupCollapsed("Phrase creation (ContentController)");
const phrase = "Do you feel like going to cinema tonight?";
const phrase2 = "Internet explorer browsers are not the best in life";
const phraseObj = ContentManagerController.createPhrase(vasya.UID, phrase);
const phrase2Obj = ContentManagerController.createPhrase(vasya.UID, phrase2);
console.log(phraseObj);
console.log(phrase2Obj);
console.log("phrase created", phrasesTable);
console.groupEnd();

console.groupCollapsed("Admin-chief reviews phrases");
AdminController.markPhraseAsTaken(phraseObj.id, bob.UID);
AdminController.markPhraseAsTaken(phrase2Obj.id, bob.UID);
AdminController.markPhraseAsRefused(phraseObj.id, bob.UID);
AdminController.markPhraseAsSuccess(phrase2Obj.id, bob.UID);
console.log("phrase created", phrasesTable);
console.groupEnd();

console.groupCollapsed("Content manager updates phrases");
ContentManagerController.updatePhrase(phraseObj.id, phrase + " Or maybe tomorrow");
console.log("phrase created", phrasesTable);
console.groupEnd();

console.groupCollapsed("Admin-chief reviews phrases after updates");
AdminController.markPhraseAsTaken(phraseObj.id, bob.UID);
AdminController.markPhraseAsSuccess(phraseObj.id, bob.UID);
console.log("phrase success", phrasesTable);
console.groupEnd();

const description = document.createElement('p');
description.innerHTML = "Two tables exists - users and phrases. Users have different roles - " +
    "plain user, admin, content manager. Plain user was created and deleted from table. Content manager creates 2 phrases. One of it admin mark as success, another - as refused. " +
    "Content manager updates refused phrase and send to review to admin. Admin mark last phrase as success. Admin can review phrases and mark it as taken, refused, success. Content " +
    "manager can create and update phrases. All users has own roles and their actions are not mixed. That`s why single responsibility principle works";

const parentElem = document.getElementById("s-comments");
parentElem.appendChild(description);

// BAD WAY
function AdminControllerBADWAY() {
    function create(name, surname, age, role = roles.plainUser) {
        const user = {
            UID: Math.round(Math.random() * (999 - 111) + 111),
            role: role,
            name: name,
            surname: surname,
            age: age
        };
        userTable.push(user);
        return user;
    }

    function getUserById(UID) {
        let user = null;
        for (let obj of userTable) {
            if (obj.UID === UID) {
                user = obj;
                break;
            }
        }
        return user;
    }

    function updateUser(user, fieldToUpdate, valueToUpdate) {
        for (let obj of userTable) {
            if (obj.UID === user.UID) {
                obj[fieldToUpdate] = valueToUpdate;
                break;
            }
        }
        return user;
    }

    function deletE(UID = null) {
        if (!UID) {
            return;
        }
        for (let obj in userTable) {
            if (userTable[obj].UID === UID) {
                userTable.splice(obj, 1);
                break;
            }
        }

    }

    function markPhraseAsTaken(phraseId, UID) {
        return ContentController.updateStatus(phraseId, phrasesStatus.inprocess, UID);
    }

    function markPhraseAsRefused(phraseId, UID) {
        return ContentController.updateStatus(phraseId, phrasesStatus.refused, UID);
    }

    function markPhraseAsSuccess(phraseId, UID) {
        return ContentController.updateStatus(phraseId, phrasesStatus.success, UID);
    }
}
})();