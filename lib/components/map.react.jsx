var React = require('react/addons');
var PureRenderMixin = require("react/lib/ReactComponentWithPureRenderMixin");
var DraggableMixin = require("./DraggableMixin");


var Map = React.createClass({

  mixins : [DraggableMixin, PureRenderMixin],

  propTypes: {
    x : React.PropTypes.number,
    y : React.PropTypes.number,
    backgroundColor : React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      x : 0,
      y : 0,
      backgroundColor : "transparent"
    };
  },

  updatePosition : function(clientX, clientY) {
    var rect = this.getDOMNode().getBoundingClientRect();
    var x = (clientX - rect.left) / rect.width;
    var y = (rect.bottom - clientY) / rect.height;

    x = this.getScaledValue(x);
    y = this.getScaledValue(y);

    this.props.onChange(x, y);
  },

  render: function () {
    var classes = React.addons.classSet({
      map: true,
      active: this.state.active
    });

    return (
      <div
        className={this.props.className + " " + classes}
        onMouseDown={this.startUpdates}
        onTouchStart={this.startUpdates}
      >
        <div className="background" style={{
          backgroundColor: this.props.backgroundColor
        }} />
        <div className="pointer" style={{
          left: this.getPercentageValue(this.props.x),
          bottom: this.getPercentageValue(this.props.y)
        }} />
      </div>
    );
  }

});

module.exports = Map;
