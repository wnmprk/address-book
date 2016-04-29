// React is a tool for rendering HTML with JavaScript.
var contacts = [
    { key: 1, name: "Jess Park", email: "jessjess@jesspark.com", description: "Software Engineer" },
    { key: 2, name: "Dan Park", email: "dandan@example.com" },
    { key: 3, name: "Joan Park" },
]

var newContact = { name: "", email: "", description: "" }

var ContactForm = React.createClass({
    propTypes: {
        contact: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    render: function() {
        return (
            React.createElement('form', { className: 'ContactForm' },
                React.createElement('input', {
                    className: 'ContactForm-name',
                    type: 'text',
                    placeholder: 'Name (required)',
                    value: this.props.contact.name
                }),
                React.createElement('input', {
                	className: 'ContactForm-email',
                    type: 'text',
                    placeholder: 'Email (required)',
                    value: this.props.contact.email
                }),
                React.createElement('textarea', {
                	className: 'ContactForm-description',
                    type: 'text',
                    placeholder: 'Description',
                    value: this.props.contact.description
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
        newContact: React.PropTypes.object.isRequired
    },
    render: function() {
        var contactItemElements = this.props.contacts
            .filter(function(contact) {
                return contact.email;
            })
            .map(function(contact) {
                return React.createElement(ContactItem, contact);
            })
        return (
            React.createElement('div', { className: 'ContactView' },
                React.createElement('h1', { className: 'ContactView-title' }, "My Contacts"),
                React.createElement('ul', { className: 'ContactView-list' }, contactItemElements),
                React.createElement(ContactForm, {
                	contact: this.props.newContact,
                	onChange: function(contact) {
                		console.log(contact)
                	}
                })
            )
        )
    }
})

ReactDOM.render(
    React.createElement(ContactView, {
        contacts: contacts,
        newContact: newContact
    }),
    document.getElementById('react-app')
)
