import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import userApi from '../../../apis/userApi';
import { Modal } from 'react-bootstrap';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Role from '../../../util/users/Roles';
import columns from '../../../util/users/columnTable';


export default function Users() {
    const [usersStates, setUsersStates] = useState({ users: [], page: 0, size: 1000 });
    const [cellEdits, setCellEdits] = useState([])
    const [show, setShow] = useState(false);
    const [newUser, setNewUser] = useState({ user_name: '', password: '', email:"",role: Role.CUSTOMER });
    const [ErrorInput, setErrorInput] = useState({ user_name: false, password: false,email:false })
    const [listCellDelete, setListCellDelete] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = async () => {
        const { users, page, size } = usersStates;
        userApi.getUsersInAdmin({ page: page, size: size }).then(res => {
            setUsersStates({
                users: res.map(user => ({ ...user, id: user.user_id })),
                page: page + 1,
                size: size
            })
        }).catch(e => console.log(e))
    }
    const editUser = (event) => {
        if (event.formattedValue !== event.value) {

            setCellEdits((old) => {
                const index = old.length < 0 ? -1 : old.findIndex(element => element.id === event.id);
                console.log(index)
                event.row[event.field] = event.value;
                if (index === -1) {
                    return [...old, event.row]
                }
                old[index] = event.row;
                return [...old]
            })
            console.log(cellEdits)
        }
    }
    const onUpdate = () => {
        cellEdits.forEach(user => {
            try {
                delete user.id;
                delete user.role_name;
                delete user.password;
                userApi.updateUserInAdmin(user);
            } catch (e) {
                console.log(e);
            }

        });
        setCellEdits([]);
    }
    const onOpensCreateUser = () => {
        setShow(true);
    }
    const onCreateUser = async () => {
        if (newUser.user_name.length <= 0)
            setErrorInput((old) => {
                return { ...old,user_name:true };
            })
        if (newUser.password.length < 3)
            setErrorInput((old) => {
               
                return { ...old,password:true };
            })
        if (newUser.email.length < 3)
            setErrorInput((old) => {
                return { ...old,email:true };
            })
        if (newUser.user_name.length > 0 && newUser.password.length > -5) {
            try {

                const res = await userApi.createUserAdmin(newUser);
                res['id'] = res['user_id']
                setUsersStates((old) => ({
                    ...old,
                    users: [...old.users, res]
                }))
                console.log(res)
                setNewUser({ user_name: '', password: '',email:"", role: Role.CUSTOMER });
                setErrorInput({ user_name: false, password: false,email:false });
                setShow(false);
            } catch (e) {
                console.log(e);
            }

        }
    }
    const onChangeNewUser = (field, value) => {

        console.log(ErrorInput)
        setNewUser(old => {
            old[field] = value;
            return { ...old };
        });
    }
    const onSelect = (ListCell) => {
        console.log(ListCell);
        setListCellDelete(old => [...ListCell])
    }
    const onDelete = async () => {
        try {
            await userApi.deleteUser({ user_ids: listCellDelete });
            setUsersStates(old => ({
                ...old,
                users: [...old.users.filter(user => !listCellDelete.includes(user.id))]
            }))
            setListCellDelete([]);
            console.log(usersStates)
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div style={{ height: 650, width: '100%' }}>
            <DataGrid
                rows={usersStates.users}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
                onCellEditCommit={editUser}
                onSelectionModelChange={(a, b) => onSelect(a)}

            />
            <Stack marginTop={5} justifyContent="flex-end" direction="row" spacing={5}>
                <Button
                    hidden={listCellDelete.length <= 0}
                    variant="outlined"
                    startIcon={<DeleteIcon
                    />}
                    onClick={onDelete}
                >
                    Xoá
                </Button>
                <Button hidden={cellEdits.length <= 0} variant="contained" onClick={onUpdate} >
                    Lưu
                </Button>
                <Button variant="contained"
                    onClick={onOpensCreateUser}>
                    Tạo tài khoản mới
                </Button>

            </Stack>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo tài khoản mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Typography variant="h6" gutterBottom>
                        Thông tin cá nhân
                    </Typography>

                    <Grid item xs={12}>
                        <TextField
                            required
                            id="username"
                            name="username"
                            label="Tên đăng nhập"
                            value={newUser.user_name}
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            error={ErrorInput.user_name}
                            helperText={ErrorInput.user_name && newUser.user_name === "" ? 'Empty field!' : ' '}
                            onChange={(event) => onChangeNewUser('user_name', event.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            id="password"
                            label="Mật khẩu"
                            type="password"
                            fullWidth
                            value={newUser.password}
                            variant="standard"
                            autoComplete="current-password"
                            error={ErrorInput.password}
                            helperText={ErrorInput.password && newUser.password === "" ? 'Empty field!' : ' '}
                            onChange={(event) => onChangeNewUser('password', event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            value={newUser.email}
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            error={ErrorInput.email}
                            helperText={ErrorInput.email && newUser.email === "" ? 'Empty field!' : ' '}
                            onChange={(event) => onChangeNewUser('email', event.target.value)}
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <FormLabel component="legend">Vai trò</FormLabel>
                        <RadioGroup
                            aria-label="gender"
                            defaultValue="female"
                            name="radio-buttons-group"
                            value={newUser.role}
                            onChange={(event) => onChangeNewUser('role', event.target.value)}

                        >
                            <FormControlLabel value={Role.ADMIN} control={<Radio />} label="Quản trị viên" />
                            <FormControlLabel value={Role.CUSTOMER} control={<Radio />} label="Khách hàng" />
                        </RadioGroup>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="contained" onClick={onCreateUser} >
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}