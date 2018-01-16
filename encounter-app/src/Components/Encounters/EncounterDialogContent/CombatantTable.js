import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';
import {
  SortingState,
  IntegratedSorting,
  FilteringState,
  IntegratedFiltering,
  SelectionState, 
  IntegratedSelection
} from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableFilterRow,
  TableSelection
} from '@devexpress/dx-react-grid-material-ui';


const propTypes = {
  isCharacterTable: PropTypes.bool,
  combatants: PropTypes.array,
  selectedCombatants: PropTypes.array,
  onSelectionChange: PropTypes.func,
};

class CombatantTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { 
          name: (this.props.isCharacterTable ? 'LVL' : 'CR'), 
          title: (this.props.isCharacterTable ? 'Level' : 'CR')
        },
        { 
          name: 'created_date', 
          title: 'Date',
          getCellValue: row => {
            const date = new Date(row.created_date);
            return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
          },
        }
      ],
    };
  }
  
  /**
   * Handles a change in selected table rows
   * @param selection - array of the indices of the newly selected table rows
   */
  handleSelectionChange = (selection) => {
    this.props.onSelectionChange(selection);
  }
  
  render() {
    const { combatants, selectedCombatants } = this.props;
    const { columns } = this.state;
    
    //Catch undefined combatants
    let rows = (combatants === undefined) ? [] : combatants;
       
    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <SortingState />
          <IntegratedSorting />
          <FilteringState defaultFilters={[/* ... */]}/>
          <IntegratedFiltering/>
          <SelectionState
            selection={selectedCombatants}
            onSelectionChange={this.handleSelectionChange}
          />
          <IntegratedSelection />
          <VirtualTable />
          <TableFilterRow />
          <TableHeaderRow showSortingControls/>
          <TableSelection showSelectAll />
        </Grid>
      </Paper>
    );
  }
}

CombatantTable.propTypes = propTypes;

export default CombatantTable;