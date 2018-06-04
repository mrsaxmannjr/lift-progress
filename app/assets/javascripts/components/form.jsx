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
      <React.Fragment>
        <form className="form-inline" onSubmit={this.handleSubmit}>
          
            <div className="form-group">
              <input type="date" className="form-control" placeholder="date" name="date" value={this.state.date} onChange={this.handleChange} />
            </div>

            <div className="form-group">
              <input type="text" className="form-control" placeholder="Liftname" name="liftname" value={this.state.liftname} onChange={this.handleChange} />
            </div>

            <div className="form-group">
              <button className="btn btn-primary" onClick={this.toggleUnit} >Metric = {this.state.ismetric.toString()}</button>
            </div>

            <div className="form-group">
              <input type="number" className="form-control" placeholder="Weightlifted" name="weightlifted" value={this.state.weightlifted} onChange={this.handleChange} />
            </div>

            <div className="form-group">
              <input id="repsPerformed" type="number" className="form-control" placeholder="Repititions Performed" name="repsperformed" min="1" max="10" value={this.state.repsperformed} onChange={this.handleChange} />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary" disabled={!this.isValidEntry()} >Create a New Lift</button>
            </div>

        </form>
        <div className="card text-center col-xs-4 offset-xs-1">
          <div className="card-block">
            <h2 className="card-title text-xs-center">Your 1 Rep Max Estimate is {isNaN(this.state.onerm ) ? 0 : Math.ceil(this.state.onerm) }</h2>
          </div>
        </div>
      </React.Fragment>
    )
  }
};
