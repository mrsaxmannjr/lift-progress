class Lift extends React.Component {
  render() {
    const {lift} = this.props
            return (
              <tr key={lift.id} >
                <td>{lift.date}</td>
                <td>{lift.liftname}</td>
                <td>{lift.weightlifted}</td>
                <td>{lift.ismetric.toString()}</td>
                <td>{lift.repsperformed}</td>
                <td>{lift.onerm}</td>
              </tr>
          )}
}


