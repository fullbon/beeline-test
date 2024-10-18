import * as React from 'react';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export type TableColumnProps = {
    name: string,
    renderCell: (row: any) => React.JSX.Element
}

type TableProps = {
    columns: TableColumnProps[],
    rows: any[]
}

export default function Table(props: TableProps) {
    return (
        <TableContainer>
            <MuiTable sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        {props.columns.map(({name}, index) => (
                            <TableCell key={index}>{name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {props.columns.map(({renderCell}, colIndex) => (
                                <TableCell key={colIndex}>
                                    {renderCell(row)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
}
