// React is a tool for rendering HTML with JavaScript.

// Components of app
var ContactForm = React.createClass({
    propTypes: {
        contact: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    onNameChange: function (e) {
        this.props.onChange(Object.assign({}, this.props.contact, { name: e.target.value }));
    },

    onEmailChange: function (e) {
        this.props.onChange(Object.assign({}, this.props.contact, { email: e.target.value }));
    },
    onDescriptionChange: function (e) {
        this.props.onChange(Object.assign({}, this.props.contact, { description: e.target.value }));
    },
    onSubmit: function (e) {
    	e.preventDefault();
    	this.props.onSubmit();
    },
    render: function() {

        return (
            React.createElement('form', { className: 'ContactForm', onSubmit: this.onSubmit },
                React.createElement('input', {
                    className: 'ContactForm-name',
                    type: 'text',
                    placeholder: 'Name (required)',
                    value: this.props.contact.name,
                    onChange: this.onNameChange
                }),
                React.createElement('input', {
                    className: 'ContactForm-email',
                    type: 'text',
                    placeholder: 'Email (required)',
                    value: this.props.contact.email,
                    onChange: this.onEmailChange
                }),
                React.createElement('textarea', {
                    className: 'ContactForm-description',
                    type: 'text',
                    placeholder: 'Description',
                    value: this.props.contact.description,
                    onChange: this.onDescriptionChange
                }),
                React.createElement('button', { type: 'submit' }, 'Add Contact')
            )
        )
    }
})

var ContactItem = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        email: React.PropTypes.string.isRequired,
        description: React.PropTypes.string
    },
    render: function() {
        return (
            React.createElement('li', { className: 'ContactItem' },
                React.createElement('h2', { className: 'ContactItem-name' }, this.props.name),
                React.createElement('a', { className: 'ContactItem-email', href: 'mailto:' + this.props.email }, this.props.email),
                React.createElement('p', { className: 'ContactItem-description' }, this.props.description)
            )
        )
    }
})

var ContactView = React.createClass({
    propTypes: {
        contacts: React.PropTypes.array.isRequired,
        newContact: React.PropTypes.object.isRequired,
        onNewContactChange: React.PropTypes.func.isRequired,
        onNewContactSubmit: React.PropTypes.func.isRequired
    },
    render: function() {

        var contactItemElements = this.props.contacts
            .filter(function(contact) {
                return contact.email; })
            .map(function(contact) {
                return React.createElement(ContactItem, contact); 
            })

        return (
            React.createElement('div', { className: 'ContactView' },
                React.createElement('h1', { className: 'ContactView-title' }, "My Contacts"),
                React.createElement('ul', { className: 'ContactView-list' }, contactItemElements),
                React.createElement(ContactForm, {
                    contact: this.props.newContact,
                    onChange: this.props.onNewContactChange,
                    onSubmit: this.props.onNewContactSubmit
                })
            )
        )
    }
})

var contactDefault = { name: "", email: "", description: "", errors: null };

function updateNewContact(contact) {
    setState({ newContact: contact });
}

function submitNewContact() {
    var contact = Object.assign({}, state.newContact, { key: state.contacts.length + 1, errors: {} });

    if (contact.name && contact.email) {
    	
        setState(
            Object.keys(contact.errors).length === 0 ? {
                newContact: Object.assign({}, contactDefault),
                contacts: state.contacts.slice(0).concat(contact),
            } : { newContact: contact }
        );
    }
}

// The app's complete current state
var state = {};

// Make the given changes to the state and perform any required housekeeping
function setState(changes) {
    Object.assign(state, changes);
    ReactDOM.render(
        React.createElement(ContactView, Object.assign({}, state, {
            onNewContactChange: updateNewContact,
            onNewContactSubmit: submitNewContact
        })),
        document.getElementById('react-app')
    );
}

// Set initial data
setState({
    contacts: [
        { key: 1, name: "Jess Park", email: "jess@example.com", description: "Software Engineer" },
        { key: 2, name: "Dan", email: "dan@example.com" },
        { key: 3, name: "Joan", email: "joan@example.com", description: "Student" }
    ],
    newContact: contactDefault
});
