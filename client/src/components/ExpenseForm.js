import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const ExpenseForm = ({
  onSubmit,
  onChange,
  expense
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Create Expense</h2>

      <div className="field-line">
        <TextField
          floatingLabelText="Price in dollars"
          name="price"
          onChange={onChange}
          type="number"
          value={expense.price}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Description"
          name="description"
          onChange={onChange}
          value={expense.description}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Create" primary />
      </div>

    </form>
  </Card>
);

ExpenseForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  expense: PropTypes.object.isRequired
};

export default ExpenseForm;