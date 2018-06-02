class Lift extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this)
  };

  handleDelete(event) {
    event.preventDefault();
    const { lift } = this.props;
    fetch(`/lifts/${lift.id}`, { method: 'DELETE' })
      .catch(err => console.error(err));
    this.props.deleteLift(lift);
  }

  render() {
    const { lift } = this.props;
            return (
              <tr key={lift.id} >
                <td>{lift.date}</td>
                <td>{lift.liftname}</td>
                <td>{lift.weightlifted}</td>
                <td>{lift.ismetric.toString()}</td>
                <td>{lift.repsperformed}</td>
                <td>{lift.onerm}</td>
                <td>
                  <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                </td>
              </tr>
          )}
}


