// RIGHT

class UserList extends React.Component {
    static propTypes = {
        userList: PropTypes.array.isRequired,
        error: PropTypes.object
    }

    componentDidMount() { // react lifecycle is also Open-Closed principle. We use it but don`t modify
        this.props.loadUserList();
    }

    render() {
        const { userList } = this.props;
        if (!userList.length) {
            return;
        }
        return {
            <div>
                {userList.map(user => <span>user.name</span>)}
            </div>
        }
    }
}
}

export default checkErrors(UserList);

const checkErrors = Class => {
    return class extends Class { // my new class extends UserList
        componentWillReceiveProps(prevProps, nextProps) {
            if (prevProps.error !== nextProps.error && nextProps.error) {
                console.error("Something was failed", nextProps.error.message);
            }
        }
    }
};

// WRONG

const checkErrors = Class => {
    return class extends Class { // my new class extends UserList
        componentWillReceiveProps(prevProps, nextProps) {
            if (prevProps.error !== nextProps.error && nextProps.error) {
                console.error("Something was failed", nextProps.error.message);
            }
            if (!nextProps.userList.length) {
                console.error("User list is empty");
            }
        }
    }
};