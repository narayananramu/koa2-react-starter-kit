'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App extends _react.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return _react2.default.createElement(
            'div',
            { style: { textAlign: 'center' } },
            'Hello World!'
        );
    }
}

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('container'));