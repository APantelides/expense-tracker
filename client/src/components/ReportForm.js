import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const ReportForm = ({
  onSubmit,
  onChange,
  query,
  report
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Expense Report</h2>

      <h3>{report > 0 ? '$ ' + report + ' spent per week' : ''}</h3>

      <div className="field-line">
        <TextField
          floatingLabelText="Start Date"
          floatingLabelFixed={true}
          name="startDate"
          type="date"
          onChange={onChange}
          value={query.startDate}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="End Date"
          floatingLabelFixed={true}
          name="endDate"
          type="date"
          onChange={onChange}
          value={query.endDate}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Generate Report" primary />
        <RaisedButton label="Cancel" primary onTouchTap={() => {
          browserHistory.push('/');
        }} />
      </div>

    </form>
  </Card>
);

ReportForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  report: PropTypes.string.isRequired
};

export default ReportForm;