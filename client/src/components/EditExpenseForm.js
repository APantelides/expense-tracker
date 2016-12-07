import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const EditExpenseForm = ({
  onSubmit,
  onChange,
  expense
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Edit Expense</h2>

      <div className="field-line">
        <TextField
          floatingLabelText="Edit Price (in US Dollars)"
          name="price"
          onChange={onChange}
          type="number"
          value={expense.price}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText=" Edit Description"
          name="description"
          onChange={onChange}
          value={expense.description}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Update" primary />
        <RaisedButton label="Cancel" primary onTouchTap={() => {
          browserHistory.push('/');
        }} />
      </div>

    </form>
  </Card>
);

EditExpenseForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  expense: PropTypes.object.isRequired
};

export default EditExpenseForm;