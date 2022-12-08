import * as React from 'react';
import {useEffect, useState} from 'react';

import Typography from '@mui/material/Typography';
import {
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    InputAdornment,
    Switch,
    TextField, useMediaQuery,
    useTheme
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FilterListIcon from '@mui/icons-material/FilterList';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import styles from './index.module.css';

function createData(name, date, service, features, complexity, platforms, users, total) {
    return {name, date, service, features, complexity, platforms, users, total}
}

export default function Index() {

    const theme = useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));

    const [iosChecked, setIOSChecked] = useState(false);
    const [androidChecked, setAndroidChecked] = useState(false);
    const [websiteChecked, setWebsiteChecked] = useState(false);
    const [softwareChecked, setSoftwareChecked] = useState(false);

    const [rows, setRows] = useState([]);

    const [dialogOpen, setDialogOpen] = useState(false);

    const [dateValue, setDateValue] = useState();

    const [selectedService, setSelectedService] = useState();

    const [selectedComplexity, setSelectedComplexity] = useState();

    const [usersGroup, setUsersGroup] = useState();

    useEffect(() => {
        const data = [
            createData('Brian Muturi', '11/2/19', 'Website', 'E-Commerce', 'N/A', 'N/A', 'N/A', '51500'),
            createData('Bill Gates', '10/17/19', 'Custom Software', 'GPS, Push Notification, Users/Authentication, File Transfer', 'Medium', 'Web Application', '0-10', '$1600'),
            createData('Elon Musk', '2/13/19', 'Custom Software', 'Photos, Videos, Users/Authentication, File Transfer', 'Medium', 'Web Application', '0-10', '$1600'),
        ];
        setRows(data);
    }, [])

    function search(){

    }

    function handleSwitchChange(type){
        switch (type) {
            case 'ios':
                setIOSChecked(!iosChecked);
                break;
            case 'android':
                setAndroidChecked(!androidChecked);
                break;
            case 'website':
                setWebsiteChecked(!websiteChecked);
                break;
            case 'software':
                setSoftwareChecked(!softwareChecked);
                break;
        }
    }

    function handleDialogClose(){
        setDialogOpen(!dialogOpen);
    }

    function handleDateChange(newValue){
        setDateValue(newValue);
    }

    function handleFormChange(type){
        switch (type) {
            case 'name':
                break;
            case 'total':
                break;
        }
    }

    function handleService(event) {
        setSelectedService(event.target.value);
    }

    function handleComplexity(event) {
        setSelectedComplexity(event.target.value);
    }

    function handleUsers(event) {
        setUsersGroup(event.target.value)
    }

    return (
        <>
            <Grid container direction='column' className={styles.mainContainer}>
                <Grid item>
                    <Typography variant='h1'>Projects</Typography>
                </Grid>
                <Grid item className={styles.rowContainer}>
                    <TextField
                        id="input-with-icon-textfield"
                        label="Search"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" onClick={handleDialogClose}>
                                    <IconButton onClick={search}>
                                        <AddCircleIcon/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                    />
                </Grid>
                <Grid item className={styles.rowContainer}>
                    <FormGroup row>
                        <FormControlLabel className={styles.label}
                                          control={
                                              <Switch checked={iosChecked}
                                                      onChange={handleSwitchChange.bind(this, 'ios')}/>
                                          }
                                          label="iOS"
                                          labelPlacement="start"/>
                        <FormControlLabel className={styles.label}
                                          control={
                                              <Switch checked={androidChecked}
                                                      onChange={handleSwitchChange.bind(this, 'android')}/>
                                          }
                                          label="Android"
                                          labelPlacement="start"/>
                        <FormControlLabel className={styles.label}
                                          control={
                                              <Switch checked={websiteChecked}
                                                      onChange={handleSwitchChange.bind(this, 'website')}/>
                                          }
                                          label="Websites"
                                          labelPlacement="start"/>
                        <FormControlLabel className={styles.label}
                                          control={
                                              <Switch checked={softwareChecked}
                                                      onChange={handleSwitchChange.bind(this, 'software')}/>
                                          }
                                          label="Custom software"
                                          labelPlacement="start"/>
                    </FormGroup>
                </Grid>
                <Grid item container justifyContent={'flex-end'} className={styles.rowContainer}>
                    <Grid item>
                        <FilterListIcon
                            color={'secondary'} style={{fontSize: 50, marginRight: 50}}/>
                    </Grid>
                </Grid>
                <Grid item>
                    <Paper sx={{ width: '100%' }}>
                        <TableContainer>
                            <Table sx={{ minWidth: 500 }} stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Service</TableCell>
                                        <TableCell>Features</TableCell>
                                        <TableCell>Complexity</TableCell>
                                        <TableCell>Platforms</TableCell>
                                        <TableCell>Users</TableCell>
                                        <TableCell>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>{row.service}</TableCell>
                                            <TableCell style={{maxWidth: '5em'}}>{row.features}</TableCell>
                                            <TableCell>{row.complexity}</TableCell>
                                            <TableCell>{row.platform}</TableCell>
                                            <TableCell>{row.users}</TableCell>
                                            <TableCell>{row.total}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
            <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth={'md'} scroll={'paper'}>
                <DialogContent>
                    <Grid container justifyContent={'center'} direction={matchesMd ? 'column' : 'row'}>
                        <Grid item>
                            <Typography variant={'h1'} gutterBottom>
                                Add a new project
                            </Typography>
                        </Grid>
                        <Grid item container>
                            <Grid item container direction={'column'} sm style={{padding: '1em'}}>
                                <Grid item style={{marginBottom: '2em'}}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="outlined-required"
                                        label="Name"
                                        onChange={handleFormChange.bind(this, 'name')}
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControl>
                                        <FormLabel id="service">Service</FormLabel>
                                        <RadioGroup
                                            onChange={handleService}
                                            aria-labelledby="service"
                                            name="service"
                                        >
                                            <FormControlLabel value="custom software" control={<Radio />} label="Custom Software" />
                                            <FormControlLabel value="mobile app" control={<Radio />} label="Mobile App" />
                                            <FormControlLabel value="website" control={<Radio />} label="Website" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item container direction={'column'} style={{marginBottom: '2em', padding: '1em'}} sm >
                                <Grid item style={{marginBottom: '2em'}}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            label="Date"
                                            inputFormat="dd/MM/yyyy"
                                            value={dateValue}
                                            onChange={handleDateChange}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item>
                                    <FormControl>
                                        <FormLabel id="complexity">Complexity</FormLabel>
                                        <RadioGroup
                                            onChange={handleComplexity}
                                            aria-labelledby="complexity"
                                            name="complexity"
                                        >
                                            <FormControlLabel value="low" control={<Radio />} label="Low" />
                                            <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                                            <FormControlLabel value="high" control={<Radio />} label="High" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item container direction={'column'} style={{marginBottom: '2em', padding: '1em'}} sm>
                                <Grid item style={{marginBottom: '2em'}}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="outlined-required"
                                        label="Total"
                                        onChange={handleFormChange.bind(this, 'total')}
                                        InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControl>
                                        <FormLabel id="users">Users</FormLabel>
                                        <RadioGroup
                                            onChange={handleUsers}
                                            aria-labelledby="users"
                                            name="users"
                                        >
                                            <FormControlLabel value="0-10" control={<Radio />} label="0-10" />
                                            <FormControlLabel value="10-100" control={<Radio />} label="10-100" />
                                            <FormControlLabel value="100+" control={<Radio />} label="100+" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}
