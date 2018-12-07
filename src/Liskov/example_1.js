//RIGHT

class InputController extends React.Component {
    constructor() {
        this.element = super.element;
    }

    componentDidMount() {
        this.element.addEventListener("focus", this.onElementFocused());
        this.element.addEventListener("blur", this.onElementFocused(false));
    }

    onElementFocused = (focused = true) => {
        if (focused) {
            this.element.style.borderBottomColor = "green";
        }
        this.element.style.borderBottomColor = "";
    };

    componentWillUnMount() {
        this.element.removeEventListener("focus", this.onElementFocused());
        this.element.removeEventListener("blur", this.onElementFocused());
    }
}

class SearchPanel extends InputController {
    render() {
        return (
            <input onClick="" ref={this.element}>
        )
    }
}

class TextArea extends InputController {
    render() {
        return (
            <input onClick="" ref={this.element}>
        )
    }
}

class SearchableDropdown extends InputController {
    render() {
        return (
            <input onClick="" ref={this.element}>
    )
    }
}

// WRONG
class SearchPanel extends React.Component {
    constructor() {
        this.element = super.element;
    }

    componentDidMount() {
        this.element.addEventListener("focus", this.onElementFocused());
        this.element.addEventListener("blur", this.onElementFocused(false));
    }

    onElementFocused = (focused = true) => {
        if (focused) {
            this.element.style.borderBottomColor = "green";
        }
        this.element.style.borderBottomColor = "";
    };

    componentWillUnMount() {
        this.element.removeEventListener("focus", this.onElementFocused());
        this.element.removeEventListener("blur", this.onElementFocused());
    }
    render() {
        return (
            <input onClick="" ref={this.element}>
    )
    }
}

class TextArea extends SearchPanel {
    render() {
        return (
            <input onClick="" ref={this.element}>
    )
    }
}

class SearchableDropdown extends SearchPanel {
    render() {
        return (
            <input onClick="" ref={this.element}>
        )
    }
}