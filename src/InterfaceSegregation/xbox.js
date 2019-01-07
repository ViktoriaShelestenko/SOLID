// WRONG
function xboxAbstract() {
    /* just define empty functions */
    function getKinect() {  }
    function getJoystickCount() {  }
    function getDefaultDiskCount() {  }
}

function xbox() {
    function getKinect() {
        // create stub BAD,not every xbox has kinect
        return null;
    }
    function getJoystickCount() {
        return 1;
    }
    function getDefaultDiskCount() {
        return 3;
    }
}

xbox.prototype = Object.create(xboxAbstract);

function xbox360() {
    function getKinect() {
        // create stub BAD,not every xbox has kinect
        return this.db.getOne({kinectType});
    }
    function getJoystickCount() {
        return 3;
    }
    function getDefaultDiskCount() {
        return 5;
    }
}

xbox360.prototype = Object.create(xboxAbstract);

// RIGHT
function xboxAbstract() {
    /* just define empty functions */
    function getJoystickCount() {  }
    function getDefaultDiskCount() {  }
}

function xbox() {
    function getKinect() { /*a condition can be created. It i also right*/}
    function getJoystickCount() {
        return 1;
    }
    function getDefaultDiskCount() {
        return 3;
    }
}

xbox.prototype = Object.create(xboxAbstract);

function xbox360() {
    function getKinect() {
        // create stub BAD,not every xbox has kinect
        return this.db.getOne({kinectType});
    }
    function getJoystickCount() {
        return 3;
    }
    function getDefaultDiskCount() {
        return 5;
    }
}

xbox360.prototype = Object.create(xboxAbstract);