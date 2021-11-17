import {Component} from 'react'

import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import ActionCellRender from '../ActionCellRenderer'

import './index.css'

class Admin extends Component {
  state = {
    searchInput: '',
    columnDefs: [
      {
        headerName: 'ID',
        field: 'id',
        width: 110,
        checkboxSelection: true,
        headerCheckboxSelection: true,
      },
      {
        headerName: 'Name',
        field: 'name',
        width: 180,
        sortable: true,
      },
      {headerName: 'Email', field: 'email', width: 250, sortable: true},
      {headerName: 'Role', field: 'role', width: 130, sortable: true},
      {
        headerName: 'Actions',
        field: 'actions',
        cellRenderer: 'actionCellRenderer',
        width: 130,
      },
    ],
    rowData: [],
    rowSelection: 'multiple',
    selectedRows: [],
  }

  componentDidMount() {
    this.getRowsData()
  }

  getRowsData = async () => {
    const apiUrl =
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'

    const response = await fetch(apiUrl)
    const data = await response.json()

    this.setState({rowData: data})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSelectionChanged = event => {
    this.setState({selectedRows: event.api.getSelectedRows()})
  }

  onClickDeleteSelected = () => {
    const {selectedRows, rowData} = this.state
    const selectedRowsIds = selectedRows.map(each => each.id)
    const filteredSelectedRows = rowData.filter(
      eachRow => !selectedRowsIds.includes(eachRow.id),
    )

    this.setState({rowData: filteredSelectedRows})
  }

  handleDelete = data => {
    const {rowData} = this.state
    const filteredRows = rowData.filter(item => item.id !== data.id)

    this.setState({rowData: filteredRows})
  }

  render() {
    const {searchInput, columnDefs, rowData, rowSelection} = this.state
    const filteredData = rowData.filter(
      eachRow =>
        eachRow.name.includes(searchInput) ||
        eachRow.email.includes(searchInput) ||
        eachRow.role.includes(searchInput),
    )

    return (
      <div className="bg-container ag-theme-alpine">
        <button
          type="button"
          className="delete-selected-button"
          onClick={this.onClickDeleteSelected}
        >
          Delete Selected
        </button>
        <input
          placeholder="Search by name, email or role"
          value={searchInput}
          type="text"
          onChange={this.onChangeSearchInput}
          className="input"
        />

        <AgGridReact
          columnDefs={columnDefs}
          rowData={filteredData}
          editType="fullRow"
          rowSelection={rowSelection}
          suppressRowClickSelection
          onSelectionChanged={this.onSelectionChanged}
          context={this.handleDelete}
          pagination
          paginationPageSize={10}
          frameworkComponents={{
            actionCellRenderer: ActionCellRender,
          }}
        />
      </div>
    )
  }
}

export default Admin
