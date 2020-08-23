import React, { useState } from "react";
import { useTable, useFilters, useSortBy, useGroupBy, useExpanded, usePagination } from "react-table";

export default function Table({ columns, data }) {
    const [filterInput, setFilterInput] = useState("");
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setFilter,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(

        {
            columns,
            data,
            initialState: { pageIndex: 2 },
        }, useFilters, useGroupBy, useSortBy, useExpanded, usePagination
    );
    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        //setFilter("name", value);
        setFilter("alias", value);
        setFilterInput(value);
    };

    // Render the UI for your table
    return (
        <>
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
        </>
    );
}