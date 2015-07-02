const React = require('react')
const ReactPivot = require('react-pivot')
const jsonist = require('jsonist')


const Main = React.createClass({

  getInitialState() {
    return { rows: [], updatedAt: Date.now() }
  },

  componentWillMount() {
    var url = `${window.location.origin}/data/data.json`
    jsonist.get(url, (err, data) => {
      this.setState({rows: data, updatedAt: Date.now()})
    })
  },

  render() {
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

  reduce(row, memo) {
    memo.amountTotal = memo.amountTotal || 0
    memo.amountTotal += parseFloat(row.transaction.amount)
  }
})

React.render(
  <Main />,
  document.body
)
