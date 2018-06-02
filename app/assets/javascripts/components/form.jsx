class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      liftname: "",
      ismetric: false,
      weightlifted: "",
      repsperformed: "",
      onerm: 0,
    };
    this.handleChange = this.handleChange.bind(this)
    this.isValidEntry =this.isValidEntry.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.postNewLift = this.postNewLift.bind(this)
    this.toggleUnit = this.toggleUnit.bind(this)
    this.calculateOneRM = this.calculateOneRM.bind(this)
  }

  isValidEntry() {
    const { date, liftname, weightlifted, repsperformed, onerm } = this.state
    return date && liftname && weightlifted && repsperformed && onerm
  }

  toggleUnit(event) {
    event.preventDefault();
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

  handleChange(event) {
    const value = event.target.value
    const name = event.target.name
    this.calculateOneRM(value)
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
    this.props.getFormData(formData)
    this.postNewLift(formData)
    this.setState({
      date: "",
      liftname: "",
      ismetric: false,
      weightlifted: "",
      repsperformed: "",
      onerm: 0
    })
  }

  postNewLift(formData) {
    fetch("", {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(formData)
    })
      .catch(err => console.error(err))
  }

  render() {
    return (
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="form-group">
              <input type="date" className="form-control" placeholder="date" name="date" value={this.state.date} onChange={this.handleChange} />
            </div>

            <div className="form-group">
              <input type="text" className="form-control" placeholder="liftname" name="liftname" value={this.state.liftname} onChange={this.handleChange} />
            </div>

            <button className="btn btn-primary" onClick={this.toggleUnit} >Metric = {this.state.ismetric.toString()}</button>

            <div className="form-group">
              <input type="number" className="form-control" placeholder="weightlifted" name="weightlifted" value={this.state.weightlifted} onChange={this.handleChange} />
            </div>

            <div className="form-group">
              <input type="number" className="form-control" placeholder="repsperformed" name="repsperformed" min="1" max="10" value={this.state.repsperformed} onChange={this.handleChange} />
            </div>

            <button type="submit" className="btn btn-primary" disabled={!this.isValidEntry()} >Create Lift</button>

            <div className="card">
              <div className="card-block">
                <h2 className="card-title text-xs-center">1 RM Estimate</h2>
                <h3 className="card-text text-xs-center">{Math.ceil(this.state.onerm)}</h3>
              </div>
            </div>
          </div>
        </form>
    )
  }
};
