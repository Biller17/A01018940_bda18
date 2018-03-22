"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyApp = function (_React$Component) {
  _inherits(MyApp, _React$Component);

  function MyApp() {
    _classCallCheck(this, MyApp);

    return _possibleConstructorReturn(this, (MyApp.__proto__ || Object.getPrototypeOf(MyApp)).apply(this, arguments));
  }

  _createClass(MyApp, [{
    key: "render",
    value: function render() {

      var info = {
        title: "titulo",
        subtitle: "subtitle"
      };
      return React.createElement(
        "div",
        null,
        React.createElement(Header, { info: info }),
        React.createElement(Action, null),
        React.createElement(Options, null)
      );
    }
  }]);

  return MyApp;
}(React.Component);

var Options = function (_React$Component2) {
  _inherits(Options, _React$Component2);

  function Options(props) {
    _classCallCheck(this, Options);

    var _this2 = _possibleConstructorReturn(this, (Options.__proto__ || Object.getPrototypeOf(Options)).call(this, props));

    _this2.state = {
      optionArray: []
    };
    return _this2;
  }

  _createClass(Options, [{
    key: "onFormSubmit",
    value: function onFormSubmit() {
      if (document.getElementById('comment').value[0] == " ") {
        alert("Error, no puedes poner solo espacios");
      } else {
        var options = this.state.optionArray;
        options.push(document.getElementById('comment').value);
        document.getElementById('comment').value = "";
        this.setState({
          optionArray: options
        });
      }
    }
  }, {
    key: "deleteComment",
    value: function deleteComment(index) {
      alert("Estas borrando un comentario: ", this.state.optionArray[index]);
      var options = this.state.optionArray;
      options.splice(index, 1);
      this.setState({
        optionArray: options
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      console.log(this.state.optionArray);
      return React.createElement(
        "div",
        null,
        React.createElement("input", { type: "text", name: "comment", id: "comment" }),
        React.createElement(
          "button",
          { className: "addComment", onClick: function onClick() {
              return _this3.onFormSubmit();
            } },
          "Agregar comentario"
        ),
        React.createElement(
          "ul",
          null,
          this.state.optionArray.map(function (option, index) {
            return React.createElement(
              "li",
              null,
              React.createElement(Option, { info: option }),
              React.createElement(
                "button",
                { onClick: function onClick() {
                    return _this3.deleteComment(index);
                  } },
                "Borrar"
              )
            );
          })
        )
      );
    }
  }]);

  return Options;
}(React.Component);

var Option = function (_React$Component3) {
  _inherits(Option, _React$Component3);

  function Option() {
    _classCallCheck(this, Option);

    return _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).apply(this, arguments));
  }

  _createClass(Option, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          this.props.info
        )
      );
    }
  }]);

  return Option;
}(React.Component);

var Header = function (_React$Component4) {
  _inherits(Header, _React$Component4);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          this.props.info.title
        ),
        React.createElement(
          "h2",
          null,
          this.props.info.subtitle
        )
      );
    }
  }]);

  return Header;
}(React.Component);

var Action = function (_React$Component5) {
  _inherits(Action, _React$Component5);

  function Action() {
    _classCallCheck(this, Action);

    return _possibleConstructorReturn(this, (Action.__proto__ || Object.getPrototypeOf(Action)).apply(this, arguments));
  }

  _createClass(Action, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "button",
          null,
          "Accion"
        )
      );
    }
  }]);

  return Action;
}(React.Component);

ReactDOM.render(React.createElement(MyApp, null), document.getElementById('app'));
