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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import styles from './index.module.css';
import {format} from 'date-fns';

function createData(name, date, service, features, complexity, platform, users, total) {
    return {name, date, service, features, complexity, platform, users, total}
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const platformOptions = ['Web', 'iOS', 'Android'];
const featureOptions = ['Photo/Video', 'GPS', 'File Transfer', 'Users/Authentication', 'Biometrics', 'Push Notification'];

export default function Index() {

    const theme = useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));

    const [iosChecked, setIOSChecked] = useState(false);
    const [androidChecked, setAndroidChecked] = useState(false);
    const [websiteChecked, setWebsiteChecked] = useState(false);
    const [softwareChecked, setSoftwareChecked] = useState(false);

    const [rows, setRows] = useState([]);

    const [dialogOpen, setDialogOpen] = useState(false);

    const [name, setName] = useState();

    const [total, setTotal] = useState();

    const [dateValue, setDateValue] = useState(new Date());

    const [selectedService, setSelectedService] = useState();

    const [selectedComplexity, setSelectedComplexity] = useState();

    const [usersGroup, setUsersGroup] = useState();

    const [platforms, setPlatforms] = useState([]);
    const [features, setFeatures] = useState([]);

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

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleTotalChange(event) {
        setTotal(event.target.value)
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

    const handlePlatformsChange = (event) => {
        const {
            target: { value },
        } = event;
        setPlatforms(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleFeaturesChange = (event) => {
        const {
            target: { value },
        } = event;
        setFeatures(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const addProject = () => {
        const newRow = createData(
            name,
            format(dateValue, 'dd/MM/yy'),
            selectedService,
            features.join(','),
            selectedComplexity,
            platforms.join(','),
            usersGroup,
            total
        );

        setRows([
            ...rows,
            newRow
        ])
        handleDialogClose();
        resetFormsState()
    }

    function resetFormsState() {
        setName('');
        setDateValue(new Date());
        setSelectedService('');
        setFeatures([]);
        setSelectedComplexity('');
        setPlatforms([]);
        setUsersGroup('');
        setTotal('');
    }

    function disableAdd() {
        return (
            !name
            || !dateValue
            || !selectedService
            || !features.length
            || !selectedComplexity
            || !platforms.length
            || !usersGroup
            || !total
        )
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
                                        onChange={handleNameChange}
                                    />
                                </Grid>
                                <Grid item style={{marginBottom: '2em'}}>
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
                                <Grid item>
                                    <FormControl fullWidth>
                                        <InputLabel id="platform">Platform</InputLabel>
                                        <Select
                                            labelId="platform"
                                            id="demo-multiple-name"
                                            multiple
                                            value={platforms}
                                            onChange={handlePlatformsChange}
                                            input={<OutlinedInput label="Platform"/>}
                                            MenuProps={MenuProps}
                                        >
                                            {platformOptions.map((platform) => (
                                                <MenuItem
                                                    key={platform}
                                                    value={platform}
                                                >
                                                    {platform}
                                                </MenuItem>
                                            ))}
                                        </Select>
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
                                            onChange={(newValue) => setDateValue(newValue)}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item style={{marginBottom: '2em'}}>
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
                                <Grid item>
                                    <FormControl sx={{width: 250}}>
                                        <InputLabel id="platform">Features</InputLabel>
                                        <Select
                                            labelId="features"
                                            id="demo-multiple-name"
                                            multiple
                                            value={features}
                                            onChange={handleFeaturesChange}
                                            input={<OutlinedInput label="Features"/>}
                                            MenuProps={MenuProps}
                                        >
                                            {featureOptions.map((feature) => (
                                                <MenuItem
                                                    key={feature}
                                                    value={feature}
                                                >
                                                    {feature}
                                                </MenuItem>
                                            ))}
                                        </Select>
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
                                        onChange={handleTotalChange}
                                        InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                                    />
                                </Grid>
                                <Grid item style={{marginBottom: '2em'}}>
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
                        <Grid item container alignItems={'flex-end'} justifyContent={'flex-end'}>
                            <Grid item>
                                <Button color={'primary'} style={{fontWeight: 300}} onClick={handleDialogClose}>Cancel</Button>
                            </Grid>
                            <Grid item>
                                <Button variant={'contained'} color={'secondary'} className={styles.addButton} onClick={addProject} disabled={disableAdd()}>Add Project</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}
