class Lifts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lifts: props.data,
    };
    this.getFormData = this.getFormData.bind(this)
    this.deleteLift = this.deleteLift.bind(this)
  }

  getFormData (formData) {
    const newFormData = this.state.lifts;
    newFormData.push(formData)
    this.setState({
      lifts: newFormData,
    })
  }

  deleteLift(lift) {
    const lifts = this.state.lifts.slice();
    const index = lifts.indexOf(lift)
    lifts.splice(index, 1);
    this.setState({
      lifts: lifts
    })
  }

  render () {
    return (
      <div className="lifts">
        <h1 className="title">Lifts</h1>
        <Form getFormData={this.getFormData} />
        <table className="table table-bordered">
          <thead></thead>
          <th>Date</th>
          <th>Lift Name</th>
          <th>Weight Lifted</th>
          <th>Metric ?</th>
          <th>Reps Performed</th>
          <th>1 Rep Max</th>
          <th>Actions</th>
          <tbody>
            {this.state.lifts.map(lift => <Lift key={lift.id} lift={lift} deleteLift={this.deleteLift}/>)}
          </tbody>
        </table>
      </div>
    )
  }
};
