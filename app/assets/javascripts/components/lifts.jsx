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
            <input type="date" className="form-control" placeholder="date" name="date" value={this.state.value} onChange={this.handleChange} />
            <input type="date" className="form-control" placeholder="date" name="date" value={this.state.value} onChange={this.handleChange} />
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
