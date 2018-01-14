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
  characters: PropTypes.array,
  selectedCharacters: PropTypes.array,
  onSelectionChange: PropTypes.func,
};

class CharacterTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'LVL', title: 'Level' },
        { name: 'created_date', title: 'Date' }
      ],
    };
  }
  
  handleSelectionChange = (selection) => {
    this.props.onSelectionChange(selection);
  }
  
  render() {
    const { characters, selectedCharacters } = this.props;
    const { columns } = this.state;
    
    //Catch undefined characters
    let rows = (characters === undefined) ? [] : characters;
       
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
            selection={selectedCharacters}
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

CharacterTable.propTypes = propTypes;

export default CharacterTable;