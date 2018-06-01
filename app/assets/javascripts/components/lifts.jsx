class Lifts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lifts: props.data,
      date: "",
      liftname: "",
      ismetric: "",
      weightlifted: "",
      repsperformed: "",
      onerm: ""
    };
    console.log(this.state.lifts);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getFormData = this.getFormData.bind(this)
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
    console.log("form: ", formData);

    fetch("", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then(res => res.json())
      .then(liftData => console.log("liftData: ", liftData))
  }

  getFormData (formData) {
    const newFormData = this.state.lifts
    newFormData.push(formData)
    this.setState({
      lifts: newFormData,
      date: "",
      liftname: "",
      ismetric: "",
      weightlifted: "",
      repsperformed: "",
      onerm: ""
    })
  }
  render () {
    return (
      <div className="lifts">
        <h1 className="title">Lifts</h1>
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="date" className="form-control" placeholder="date" name="date" value={this.state.value} onChange={this.handleChange} />
            <input type="text" className="form-control" placeholder="liftname" name="liftname" value={this.state.value} onChange={this.handleChange} />
            <input type="boolean" className="form-control" placeholder="ismetric" name="ismetric" value={this.state.value} onChange={this.handleChange} />
            <input type="number" className="form-control" placeholder="weightlifted" name="weightlifted" value={this.state.value} onChange={this.handleChange} />
            <input type="number" className="form-control" placeholder="repsperformed" name="repsperformed" value={this.state.value} onChange={this.handleChange} />
            <input type="number" className="form-control" placeholder="onerm" name="onerm" value={this.state.value} onChange={this.handleChange} />
            <button type="submit" className="btm btn-primary">Create Lift</button>
          </div>
        </form>
        <table className="table table-bordered">
          <thead></thead>
          <th>Date</th>
          <th>Lift Name</th>
          <th>Weight Lifted</th>
          <th>Reps Performed</th>
          <th>1 Rep Max</th>
          <tbody>{this.state.lifts.map(lift => {
            return (
              <tr key={lift.id} >
                <td>{lift.date}</td>
                <td>{lift.liftname}</td>
                <td>{lift.weightlifted}</td>
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
