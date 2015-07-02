const React = require('react')
const ReactPivot = require('react-pivot')
const jsonist = require('jsonist')


class Main extends React.Component{
  constructor(...args) {
    super(...args);
    this.state =  { rows: [], updatedAt: Date.now() };
    this.reduce = this.reduce.bind(this);
  }

  componentWillMount() {
    var url = `${window.location.origin}/data/data.json`
    jsonist.get(url, (err, data) => {
      this.setState({rows: data, updatedAt: Date.now()})
    })
  }

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
  }

  dimensions = [
    {title: 'First Name', value: 'firstName'}
  ];

  calculations = [
    {title: 'Amount', value: 'amountTotal'}
  ];

  reduce(row, memo) {
    memo.amountTotal = memo.amountTotal || 0;
    memo.amountTotal += parseFloat(row.transaction.amount);
  }
}

React.render(
  <Main />,
  document.body
);
