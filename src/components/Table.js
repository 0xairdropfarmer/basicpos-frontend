import React, { useState } from "react";
import { useTable, useFilters, useGroupBy, useExpanded, usePagination, useSortBy, useRowSelect } from "react-table";
import {
    useExportData
} from 'react-table-plugins'
import { useSelector, useDispatch } from "react-redux";
import Papa from "papaparse";
import XLSX from "xlsx";
import JsPDF from "jspdf";
import "jspdf-autotable";
import "./Table.css"
import swal from "sweetalert";
import styled from 'styled-components'
const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        )
    }
)
export default function Table({ columns, data, parent_action, updateMyData, skipPageReset }) {
    const dispatch = useDispatch();
    const [filterInput, setFilterInput] = useState("");
    // Create an editable cell renderer
    const Styles = styled.div`
    padding: 1rem;
  
    table {
      border-spacing: 0;
      border: 1px solid black;
  
      tr {
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }
  
      th,
      td {
        margin: 0;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
  
        :last-child {
          border-right: 0;
        }
  
        input {
          font-size: 1rem;
          padding: 0;
          margin: 0;
          border: 0;
        }
      }
    }
  
    .pagination {
      padding: 0.5rem;
    }
  `

    const EditableCell = ({
        value: initialValue,
        row: { values },
        column: { id },
        updateMyData, // This is a custom function that we supplied to our table instance
    }) => {
        // We need to keep and update the state of the cell normally
        const [value, setValue] = React.useState(initialValue)

        const onChange = e => {
            setValue(e.target.value)
        }

        // We'll only update the external data when the input is blurred
        const onBlur = () => {
            updateMyData(values._id, id, value)
        }

        // If the initialValue is changed external, sync it up with our state
        React.useEffect(() => {
            setValue(initialValue)
        }, [initialValue])

        return <input value={value} onChange={onChange} onBlur={onBlur} />
    }
    const defaultColumn = {
        Cell: EditableCell,
    }

    function getExportFileBlob({ columns, data, fileType, fileName }) {
        if (fileType === "csv") {
            // CSV example
            const headerNames = columns.filter((c) => c.Header != 'Action').map((col) => col.exportValue);
            const csvString = Papa.unparse({ fields: headerNames, data });
            return new Blob([csvString], { type: "text/csv" });
        } else if (fileType === "xlsx") {
            // XLSX example

            const header = columns.filter((c) => c.Header != 'Action').map((c) => c.exportValue);
            const compatibleData = data.map((row) => {
                const obj = {};
                header.forEach((col, index) => {
                    obj[col] = row[index];
                });
                return obj;
            });

            let wb = XLSX.utils.book_new();
            let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
                header,
            });
            XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
            XLSX.writeFile(wb, `${fileName}.xlsx`);

            // Returning false as downloading of file is already taken care of
            return false;
        }
        //PDF example
        if (fileType === "pdf") {
            const headerNames = columns.filter((c) => c.Header != 'Action').map((column) => column.exportValue);
            const doc = new JsPDF();
            doc.autoTable({
                head: [headerNames],
                body: data,
                styles: {
                    minCellHeight: 9,
                    halign: "left",
                    valign: "center",
                    fontSize: 11,
                },
            });
            doc.save(`${fileName}.pdf`);

            return false;
        }

        // Other formats goes here
        return false;
    }
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        setFilter,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page
        exportData,
        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        selectedFlatRows,
        state: { pageIndex, pageSize, selectedRowIds },
    } = useTable(

        {
            columns,
            data,
            defaultColumn,
            updateMyData, skipPageReset,
            initialState: { pageIndex: 2 },
            getExportFileBlob,
        }, useFilters, useGroupBy, useSortBy, useExpanded, usePagination, useExportData, useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    // accessor: '_id',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    // The   cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    )

                },
                ...columns,
            ])
        }
    );
    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        //setFilter("name", value);
        setFilter("alias", value);
        setFilterInput(value);
    };

    const BulkDelete = (selectedFlatRows, parent_action) => {
        let selected_id = selectedFlatRows.map(data => {
            return data.values._id
        })
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(parent_action.bulk_delete(selected_id))
                swal("Poof! Your POS Machine data has been deleted!", {
                    icon: "success",
                });
            }
        });
    }
    // Render the UI for your table
    return (
        <Styles>
            <div className="form-group input-group">
                <button class="btn btnexport mr-1"
                    onClick={() => {
                        exportData("csv", true);
                    }}
                ><i class="fa fa-file-csv"></i>{' '}
                  Export  as CSV
      </button>{' '}
                <button class="btn btnexport mr-1"
                    onClick={() => {
                        exportData("xlsx", true);
                    }}
                ><i class="fa fa-file-excel"></i>{' '}
                Export  as xlsx
      </button>{' '}
                <button class="btn btnexport mr-1"
                    onClick={() => {
                        exportData("pdf", true);
                    }}
                ><i class="fa fa-file-pdf"></i>
                  Export as PDF
      </button>

                {(Object.keys(selectedRowIds).length != 0) ?
                    <button class="btn btn-danger"
                        onClick={() => {
                            BulkDelete(selectedFlatRows, parent_action);
                        }}
                    ><i class="fa fa-trash"></i>
                  Delete {Object.keys(selectedRowIds).length} row
      </button> : ''}
            </div>
            <div className="form-group input-group">
                <input
                    className="form-control"
                    value={filterInput}
                    onChange={handleFilterChange}
                    placeholder={"Search name"}
                />
            </div>
            <table {...getTableProps()} className="table table-bordered table-condensed table-responsive" style={{ 'display': 'table' }} >
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.canGroupBy ? (
                                        // If the column can be grouped, let's add a toggle
                                        <span {...column.getGroupByToggleProps()}>
                                            {column.isGrouped ? '🛑 ' : '👊 '}
                                        </span>
                                    ) : null}
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}> {cell.isGrouped ? (
                                            // If it's a grouped cell, add an expander and row count
                                            <>
                                                <span {...row.getToggleRowExpandedProps()}>
                                                    {row.isExpanded ? '👇' : '👉'}
                                                </span>{' '}
                                                {cell.render('Cell')} ({row.subRows.length})
                                            </>
                                        ) : cell.isAggregated ? (
                                            // If the cell is aggregated, use the Aggregated
                                            // renderer for cell
                                            cell.render('Aggregated')
                                        ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                                            // Otherwise, just render the regular cell
                                            cell.render('Cell')
                                        )}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <form className="inline">
                <div className="form-row">
                    <div className="form-group input-group col-md-2">
                        <ul className="pagination">
                            <li class={!canPreviousPage ? "page-item disabled" : "page-item "} >
                                <a className="page-link" onClick={() => gotoPage(0)} >{'<<'}</a>
                            </li>
                            <li class={!canPreviousPage ? "page-item disabled" : "page-item "}>
                                <a className="page-link" onClick={() => previousPage()} >{'<'}</a>
                            </li>
                            <li class={!canNextPage ? "page-item disabled" : "page-item "}>
                                <a className="page-link" onClick={() => nextPage()} >{'>'}</a>
                            </li>
                            <li class={!canNextPage ? "page-item disabled" : "page-item "}>
                                <a className="page-link" onClick={() => gotoPage(pageCount - 1)} >{'>>'}</a>
                            </li>
                        </ul>
                    </div>
                    <div className="form-group input-group col-md-2">
                        <input
                            className="form-control"
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px' }}
                        />
                    </div>
                    <div className="form-group input-group col-md-2">
                        <select
                            className="custom-select"
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}
                        >
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    | Go to page:{' '}
                    </span>

                </div>
            </form>
        </Styles>
    );

}
