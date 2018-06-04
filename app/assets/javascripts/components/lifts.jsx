class Lifts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lifts: props.data,
    };
    this.getFormData = this.getFormData.bind(this)
    this.deleteLift = this.deleteLift.bind(this)
    this.updateLift = this.updateLift.bind(this)
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
    const index = lifts.indexOf(lift);
    lifts.splice(index, 1);
    this.setState({
      lifts: lifts
    })
  }

  updateLift(lift, editData) {
    const lifts = this.state.lifts.slice();
    const index = this.state.lifts.indexOf(lift);
    lifts.splice(index, 1, editData)
    this.setState({
      lifts: lifts
    })
  }

  render () {
    return (
      <div className="lifts container">
        <h1 className="title">Weight Lifting Progress Tracker</h1>
        <Form getFormData={this.getFormData} />
        <table className="table table-bordered table-hover table-striped">
          <thead className="thead-dark ">
            <th className="text-nowrap">Date</th>
            <th className="text-nowrap">Lift Name</th>
            <th className="text-nowrap">Weight Lifted</th>
            <th className="text-nowrap">Reps Performed</th>
            <th className="text-nowrap">1 Rep Max</th>
            <th className="text-nowrap">Metric ?</th>
            <th className="text-nowrap">Actions</th>
          </thead>
          <tbody>
            {this.state.lifts.map(lift => <Lift key={lift.id} lift={lift} deleteLift={this.deleteLift} updateLift={this.updateLift} />)}
          </tbody>
        </table>
      </div>
    )
  }
};
