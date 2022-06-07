import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import LaptopIcon from '@mui/icons-material/Laptop';
import Orders from './component/Orders';
import Users from './component/Users';
import Products from './component/Products'
import ProductsDetail from './component/ProductDetail'
import RateReviewIcon from '@mui/icons-material/RateReview';

import {
    Route,
    useRouteMatch,
    Redirect,
    useLocation,
    Link
} from "react-router-dom";
import Review from './component/Review';
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

function DashboardContent() {
    const [open, setOpen] = React.useState(true);
    const { path, url } = useRouteMatch();
    const location = useLocation();
    console.log(url);
    console.log(location.pathname);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{
                                flexGrow: 1,
                            }}
                        >
                            Trang Admin
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',

                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List>
                        <Link to={`${url}/orders`}>
                            <ListItem button
                                sx={{
                                    backgroundColor: location.pathname === `${url}/orders` ? "#E5D9D9" : "#FFFFFF"
                                }
                                }>
                                <ListItemIcon>
                                    <ShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText primary="Đơn hàng" />
                            </ListItem>
                        </Link>
                        <Link to={`${url}/users`}>
                            <ListItem button
                                sx={{
                                    backgroundColor: location.pathname === `${url}/users` ? "#E5D9D9" : "#FFFFFF"
                                }
                                }>
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Người dùng" />
                            </ListItem>
                        </Link>

                        <Link to={`${url}/products`}
                        >
                            <ListItem button
                                sx={{
                                    backgroundColor: location.pathname === `${url}/products` ? "#E5D9D9" : "#FFFFFF"
                                }
                                }>
                                <ListItemIcon>
                                    <LaptopIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sản Phẩm" />
                            </ListItem>
                        </Link>
                        <Link to={`${url}/reviews`}
                        >
                            <ListItem button
                                sx={{
                                    backgroundColor: location.pathname === `${url}/reviews` ? "#E5D9D9" : "#FFFFFF"
                                }
                                }>
                                <ListItemIcon>
                                    <RateReviewIcon />
                                </ListItemIcon>
                                <ListItemText primary="Đánh giá" />
                            </ListItem>
                        </Link>

                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '200vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Route exact path={`${path}`}>
                                <Redirect to={`${path}/orders`} />
                            </Route>
                            <Route path={`${path}/orders`}>
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <Orders />
                                    </Paper>
                                </Grid>
                            </Route>

                            <Route path={`${path}/users`}>
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <Users />
                                    </Paper>
                                </Grid>
                            </Route>
                            <Route exact path={`${path}`}>
                                <Redirect to={`${path}/products`} />
                            </Route>
                            <Route exact path={`${path}/products`}>
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <Products />
                                    </Paper>
                                </Grid>
                            </Route>
                            <Route path={`${path}/products/product-detail`}>
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <ProductsDetail />
                                    </Paper>
                                </Grid>
                            </Route>
                            <Route path={`${path}/reviews`}>
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <Review />
                                    </Paper>
                                </Grid>
                            </Route>

                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}