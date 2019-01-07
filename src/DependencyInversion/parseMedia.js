// WRONG class Message should not depend on one constant link type
class PlainWebsite {
    constructor() {
        this.linkType = "PLAIN_WEBSITE";
    }

    createLink(link) {
        return createWebsitePreview(link);
    }

}

class Message {
    parseMessage(messageContent) {
        if (messageContent.hasOwnProperty("link")) {
            return this.createMediaMessage({
                text: messageContent.text,
                link: PlainWebsite.createLink(messageContent.link)
            })
        }
    }
    createMediaMessage() {}
}

// RIGHT
class LinkGenerator {

    createLink(link) {
        if (link.domain === 'google_drive') {
            return createGoogleDrivePreview(link);
        } else if (link.domain === 'google_doc') {
            return createWebsitePreview(link);
        }
        return createWebsitePreview(link);
    }

}

class Message {
    parseMessage(messageContent) {
        if (messageContent.hasOwnProperty("link")) {
            return this.createMediaMessage({
                text: messageContent.text,
                link: LinkGenerator.createLink(messageContent.link)
            })
        }
    }
    createMediaMessage() {}
}
