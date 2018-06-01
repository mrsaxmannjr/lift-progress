class Lifts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lifts: props.data,
      date: "",
      liftname: "",
      ismetric: false,
      weightlifted: "",
      repsperformed: "",
      onerm: 0,
      coefficients: {
        1: 1,
        2: .943,
        3: .906,
        4: .881,
        5: .851,
        6: .831,
        7: .807,
        8: .786,
        9: .765,
        10: .744
      }
    };
    console.log(this.state.lifts);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getFormData = this.getFormData.bind(this)
    this.postNewLift = this.postNewLift.bind(this)
    this.toggleUnit = this.toggleUnit.bind(this)
    this.calculateOneRM = this.calculateOneRM.bind(this)
  }

  toggleUnit(event) {
    event.preventDefault();
    this.setState({
      ismetric: !this.state.ismetric
    })
  }

  calculateOneRM() {
    const weightlifted = this.state.weightlifted
    const repsperformed = this.state.repsperformed

    weightlifted && repsperformed ? this.state.onerm = weightlifted / this.state.coefficients[repsperformed] : 0
  }

  handleChange(event) {
    const value = event.target.value
    const name = event.target.name
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = {
      date: this.state.date,
      liftname: this.state.liftname,
      ismetric: this.state.ismetric,
      weightlifted: this.state.weightlifted,
      repsperformed: this.state.repsperformed,
      onerm: this.state.onerm
    }
    this.getFormData(formData)
    this.postNewLift(formData)
    console.log("form: ", formData);
  }

  getFormData (formData) {
    const newFormData = this.state.lifts
    newFormData.push(formData)
    this.setState({
      lifts: newFormData,
      // date: "",
      // liftname: "",
      // ismetric: "",
      // weightlifted: "",
      // repsperformed: "",
      // onerm: ""
    })
  }

  postNewLift(formData) {
    fetch("", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then(res => res.json())
      .then(liftData => console.log("liftData: ", liftData))
  }

  render () {
    return (
      <div className="lifts">
        <h1 className="title">Lifts</h1>
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="date" className="form-control" placeholder="date" name="date" value={this.state.value} onChange={this.handleChange} />

            <input type="text" className="form-control" placeholder="liftname" name="liftname" value={this.state.value} onChange={this.handleChange} />

            <a className="btn btn-primary" onClick={this.toggleUnit}>Metric = {this.state.ismetric.toString()}</a>

            <input type="number" className="form-control" placeholder="weightlifted" name="weightlifted" value={this.state.value} onChange={this.handleChange} />

            <input type="number" className="form-control" placeholder="repsperformed" name="repsperformed" min="1" max="10" value={this.state.value} onChange={this.handleChange} />

            {/* <input type="number" className="form-control" placeholder="onerm" name="onerm" value={this.state.value} onChange={this.handleChange} /> */}

            <button type="submit" className="btm btn-primary">Create Lift</button>

            <div className="card">
              <div className="card-block">
                <h2 className="card-title text-xs-center">1 RM Estimate</h2>
                <h3 className="card-title text-xs-center">{this.calculateOneRM()}</h3>
              </div>
            </div>
          </div>
        </form>

        <table className="table table-bordered">
          <thead></thead>
          <th>Date</th>
          <th>Lift Name</th>
          <th>Weight Lifted</th>
          <th>Metric ?</th>
          <th>Reps Performed</th>
          <th>1 Rep Max</th>
          <tbody>{this.state.lifts.map(lift => {
            return (
              <tr key={lift.id} >
                <td>{lift.date}</td>
                <td>{lift.liftname}</td>
                <td>{lift.weightlifted}</td>
                <td>{lift.ismetric.toString()}</td>
                <td>{lift.repsperformed}</td>
                <td>{lift.onerm}</td>
              </tr>
          )})}
          </tbody>
        </table>
      </div>
    )
  }
};
