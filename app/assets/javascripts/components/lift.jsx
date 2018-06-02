class Lift extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      onerm: this.props.lift.onerm,
      ismetric: this.props.lift.ismetric,
      date: this.props.lift.date,
      liftname: this.props.lift.liftname,
      weightlifted: this.props.lift.weightlifted,
      repsperformed: this.props.lift.repsperformed,
    }
    // console.log("state from props", this.state);
    this.handleDelete = this.handleDelete.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.toggleUnit = this.toggleUnit.bind(this)
    this.liftForm = this.liftForm.bind(this)
    this.liftRow = this.liftRow.bind(this)
    this.calculateOneRM = this.calculateOneRM.bind(this)
    this.editLift = this.editLift.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  };

  handleChange(event) {
    const value = event.target.value
    const name = event.target.name
    this.calculateOneRM(value)
    this.setState({
      [name]: value
    })
  }

  handleToggle(event) {
    event.preventDefault();
    this.setState({
      edit: !this.state.edit
    })
  }

  toggleUnit(event) {
    event.preventDefault()
    this.setState({
      ismetric: !this.state.ismetric
    })
  }

  calculateOneRM(repsperformed) {
    const { weightlifted } = this.state;
    const coefficients = {
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
    this.setState({
      onerm: weightlifted && repsperformed ? weightlifted / coefficients[repsperformed] : 0
    })
  }

  handleEdit(event) {
    event.preventDefault();
    const editData = {
      date: this.state.date,
      liftname: this.state.liftname,
      weightlifted: this.state.weightlifted,
      ismetric: this.state.ismetric,
      repsperformed: this.state.repsperformed,
      onerm: this.state.onerm
    }
    this.editLift(editData)
  }

  editLift(editData) {
    const { lift } = this.props;
    fetch(`/lifts/${lift.id}`, {
      method: "PUT",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(editData),
    })
      .then(response => response.json())
      .then(response => this.setState({
        edit: false
      }))
      .catch(err => console.log(err));
    this.props.updateLift(lift, editData);
  }

  handleDelete(event) {
    event.preventDefault();
    const { lift } = this.props;
    fetch(`/lifts/${lift.id}`, { method: 'DELETE' })
      .catch(err => console.error(err));
    this.props.deleteLift(lift);
  }

  liftRow() {
    const { lift } = this.props;
      return (
        <tr key={lift.id} >
          <td>{lift.date}</td>
          <td>{lift.liftname}</td>
          <td>{lift.weightlifted}</td>
          <td>{lift.repsperformed}</td>
          <td>{Math.ceil(lift.onerm)}</td>
          <td>{lift.ismetric.toString()}</td>
          <td>
            <button className="btn btn-primary" onClick={this.handleToggle}>Edit</button>
            <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
          </td>
        </tr>
      )
  }

  liftForm() {
    const { lift } = this.state;
    return (
        <tr>
          <td>
            <input className="form-control" type="date" name="date" value={lift.date} onChange={this.handleChange} />
          </td>
          <td>
            <input className="form-control" type="text" name="liftname" value={lift.liftname} onChange={this.handleChange} />
          </td>
          <td>
            <input className="form-control" type="number" name="weightlifted" value={lift.weightlifted} onChange={this.handleChange}/>
          </td>
          <td>
            <input className="form-control" type="number" name="repsperformed" value={lift.repsperformed} onChange={this.handleChange} min="1" max="10"/>
          </td>
          <td>{Math.ceil(lift.onerm)}</td>
          <td>
            <button className="btn btn-primary" onClick={this.toggleUnit} >Metric = {this.state.ismetric.toString()}  </button>
          </td>
          <td>
            <button className="btn btn-primary" onClick={this.handleEdit}>Update</button>
            <button className="btn btn-danger" onClick={this.handleToggle} >Cancel</button>
          </td>
        </tr>
    )
  }

  render() {
    return (
      this.state.edit ? this.liftForm() : this.liftRow()
    )
  }
}
