import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import {useEffect, useState} from 'react';
import {Chip, Grid, InputAdornment, Menu, MenuItem, Snackbar, TextField, useMediaQuery, useTheme} from '@mui/material';
import Button from '@mui/material/Button';
import styles from './EnhancedTable.module.css';

function createData(name, calories, fat, carbs, protein) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        label: 'Name',
    },
    {
        id: 'date',
        label: 'Date',
    },
    {
        id: 'service',
        label: 'Service',
    },
    {
        id: 'features',
        label: 'Features',
    },
    {
        id: 'complexity',
        label: 'Complexity',
    },
    {
        id: 'platforms',
        label: 'Platforms',
    },
    {
        id: 'users',
        label: 'Users',
    },
    {
        id: 'total',
        label: 'Total',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    const [alert, setAlert] = useState(
        {
            open: false,
            backgroundColor: '#ff3232',
            message: 'Row deleted!'
        });
    const [undo, setUndo] = useState([]);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [totalFilter, setTotalFilter] = useState('>');
    const {filterPrice, setFilterPrice, setFilterExp} = props;

    const menuOpen = Boolean(menuAnchorEl);

    useEffect(() => {
        setFilterExp('greater than');
    }, [])

    function handleDelete() {
        const newRows = [...props.rows];
        const selectedRows = newRows.filter(row => props.selected.includes(row.name));
        selectedRows.map(row => row.search = false);
        props.setRows(newRows);

        setUndo(selectedRows);
        props.setSelected([]);
        setAlert(prevState => ({...prevState, open: true}))
    }

    function handleUndo() {
        setAlert(prevState => ({...prevState, open: false}))

        const newRows = [...props.rows];
        const redo = [...undo];
        redo.map(row => row.search = true);
        Array.prototype.push.apply(newRows, ...redo);
        props.setRows(newRows);
    }

    function handleCloseSnack(event, reason) {
        console.log('event & reason', event, reason);
        if (reason === 'clickaway') {
            setAlert(prevState => ({...prevState, open: false}));
            const newRows = [...props.rows];
            const names = [...undo.map(row => row.name)];
            props.setRows(newRows.filter(row => !names.includes(row.name)));
        }
    }

    const handleMenuClick = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleMenuItemClick = (i) => {
        setMenuAnchorEl(null);
        handleMenuClose();
    }

    function handleSetFilter() {
        let filterExpression = '';
        if (totalFilter === '>') {
            filterExpression = '<';
            setTotalFilter(filterExpression);
            setFilterExp('less than');
        } else if (totalFilter === '<') {
            filterExpression = '=';
            setTotalFilter(filterExpression);
            setFilterExp('equal to');
        } else {
            filterExpression = '>';
            setTotalFilter(filterExpression);
            setFilterExp('greater than');
        }
        if (filterPrice) {
            filterRows(filterPrice, filterExpression);
        }
    }

    function handleTotalFilter(event){
        setFilterPrice(event.target.value);

        if (event.target.value !== '') {
            filterRows(event.target.value, totalFilter)
        }
    }

    function filterRows(filterVal, filterExp) {
        const filter = filterExp === '=' ? '===' : filterExp;

        const newRows = [...props.rows];
        newRows.map(row => eval(`${filterVal} ${filter} ${row.total.slice(1, row.total.length)}`) ? row.search = true : row.search = false);
        props.setRows(newRows);
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : <Typography>{null}</Typography>}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton onClick={handleMenuClick}>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
            <Snackbar
                open={alert.open}
                ContentProps={{
                    style: {
                        backgroundColor: alert.backgroundColor
                    }
                }}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                onClose={handleCloseSnack}
                message={alert.message}
                action={<Button style={{color: '#fff'}} onClick={handleUndo}>UNDO</Button>}
            />
            <Menu
                id="services-menu"
                anchorEl={menuAnchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem classes={{root: styles.menu}}>
                    <TextField
                        value={filterPrice}
                        onChange={handleTotalFilter}
                        placeholder={'Enter a price to filter'}
                        type={'number'}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position={'start'}>$</InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment
                                    position={'end'}
                                     onClick={handleSetFilter}>
                                    <span className={styles.totalFilter}>{totalFilter}</span>
                                </InputAdornment>
                            )
                        }}/>
                </MenuItem>
            </Menu>
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({rows, page, setPage, setRows, websiteChecked, androidChecked, iosChecked, softwareChecked}) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name ');
    const [selected, setSelected] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [filterPrice, setFilterPrice] = useState('');
    const [filterExp, setFilterExp] = useState('');

    const theme = useTheme();
    const matchesLg = useMediaQuery(theme.breakpoints.down('lg'));

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    function switchFilters() {
        const websites = rows.filter(row => websiteChecked ? (row.service === 'Website' || row.service === 'website') : null);
        const iosApps = rows.filter(row => iosChecked ? row.platform.includes('iOS') : null);
        const androidApps = rows.filter(row => androidChecked ? row.platform.includes('Android') : null);
        const softwareApps = rows.filter(row => softwareChecked ? (row.service === 'custom software' || row.service === 'Custom Software') : null);

        if (!websiteChecked && !iosChecked && !androidChecked && !softwareChecked) {
            return rows;
        } else {
            let newRows = websites.concat(iosApps.filter(item => websites.indexOf(item) < 0));
            let newRows2 = newRows.concat(androidApps.filter(item => newRows.indexOf(item) < 0));
            return newRows2.concat(softwareApps.filter(item => newRows2.indexOf(item) < 0));
        }
    }

    function handleClearChip() {
        setFilterPrice('')

        const newRows = [...rows];
        newRows.map(row => row.search = true);
        setRows(newRows);
    }

    function priceFilters(rows) {
        if (filterPrice !== ''){
            const filter = filterExp === 'equal to' ? '===' : filterExp === 'less than' ? '<' : '>';

            const newRows = [...rows];
            newRows.map(row => eval(`${filterPrice} ${filter} ${row.total.slice(1, row.total.length)}`) ? !row.search ? null : row.search = true : row.search = false);
            return newRows;
        } return rows;
    }

    return (
        <>
            <Box sx={{ width: '100%'}}>
                <Paper sx={{width: matchesLg ? '90vw' : '100%', mb: 2, overflowX: 'auto' }}>
                    <EnhancedTableToolbar setRows={setRows} rows={rows} selected={selected} setSelected={setSelected} numSelected={selected.length} filterPrice={filterPrice} setFilterPrice={setFilterPrice} setFilterExp={setFilterExp}/>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
                                {stableSort(priceFilters(switchFilters()).filter(row => row.search), getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.name);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.name)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.name}
                                                selected={isItemSelected}
                                            >
                                                <TableCell>
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    align={'left'}
                                                >
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="left">{row.date}</TableCell>
                                                <TableCell align="left">{row.service}</TableCell>
                                                <TableCell align="left" style={{width: '5em'}}>{row.features}</TableCell>
                                                <TableCell align="left">{row.complexity}</TableCell>
                                                <TableCell align="left">{row.platform}</TableCell>
                                                <TableCell align="left">{row.users}</TableCell>
                                                <TableCell align="left">{row.total}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={priceFilters(switchFilters()).filter(row => row.search).length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <Grid container justifyContent={'flex-end'} className={styles.chipContainer}>
                        <Grid item>
                            {filterPrice !== '' ? (
                                <Chip onDelete={handleClearChip}
                                    label={`Price is ${filterExp} ${filterPrice}`}/>
                            ) : null}
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </>
    );
}
