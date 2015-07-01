var React = require('react')
var ReactPivot = require('react-pivot')
var jsonist = require('jsonist')


var Main = React.createClass({
  getInitialState: function () {
    return { rows: [], updatedAt: Date.now() }
  },

  componentWillMount: function () {
    var self = this
    var url = window.location.origin + '/data/data.json'
    jsonist.get(url, function(err, data) {
      self.setState({rows: data, updatedAt: Date.now()})
    })
  },

  render: function() {
    return (
      <div>
        <ReactPivot key={this.state.updatedAt}
          rows={this.state.rows}
          dimensions={this.dimensions}
          activeDimensions={['First Name']}
          sortBy={'First Name'}
          sortDir={'desc'}
          reduce={this.reduce}
          calculations={this.calculations} />
      </div>
    )
  },

  dimensions: [
    {title: 'First Name', value: 'firstName'}
  ],

  calculations: [
    {title: 'Amount', value: 'amountTotal'}
  ],

  reduce: function (row, memo) {
    memo.amountTotal = memo.amountTotal || 0
    memo.amountTotal += parseFloat(row.transaction.amount)
  }
})

React.render(
  <Main />,
  document.body
)
