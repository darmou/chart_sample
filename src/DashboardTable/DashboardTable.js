import React from "react";
import "./DashboardTable.css";

const tableType = Object.freeze({HEADER:"h", LINE_ITEM:"d"});

const createTablePart = (type, rows) => {
    const TableElementTag = `t${type}`;

    return rows.map((row, row_index) => {
        const row_items = row.map((item, item_index) => {
                return(
                    <TableElementTag key={item_index}>{item}</TableElementTag>
                )
        });
        return (
            <tr key={row_index}>
                {row_items}
            </tr>
        );
    });
};

const dashboardTable = (props) => {

    //Note in theory we can combine head items and line items but I want to keep it
    const head_jsx = createTablePart(tableType.HEADER, props.header);
    const line_items_jsx = createTablePart(tableType.LINE_ITEM, props.lineItems);

    return (
        <div className="DashboardTable">
            <table>
                <thead>
                {head_jsx}
                </thead>
                <tbody>
                {line_items_jsx}
                </tbody>
            </table>
        </div>

    );
};

export default dashboardTable;