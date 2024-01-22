
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
    Paper,
    Box,
    Grid,
    TextField,
    Typography,
    Button
} from '@material-ui/core';
import { addUser } from "../../actions/user-action";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../../store/store"
import { createUser } from "../../reducers/user-create-reducer";

const CreateUser = () => {
    // form validation rules 
    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('firstName is required'),
        lastName: Yup.string()
            .required('lastName is required')
            .min(6, 'lastName must be at least 6 characters')
            .max(20, 'lastName must not exceed 20 characters'),
        phone: Yup.string()
            .required('phone is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit,
        formState: { errors } }: any = useForm({
            resolver: yupResolver(validationSchema)
        });
    const dispatch: AppDispatch = useAppDispatch();

    async function onSubmit(data: any) {
        dispatch(createUser(data)).then((resp: any) => {
            if (resp.statusCode = 200) {
                navigate('/list')
            }
        })
    }
    return (
        <>
            <div>
                <Typography align="center" gutterBottom>
                    Nexxt App
                </Typography>
                <Paper>
                    <Box px={3} py={2}>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    id="firstName"
                                    name="firstName"
                                    label="Full Name"
                                    fullWidth
                                    margin="dense"
                                    {...register('firstName')}
                                    error={errors.firstName ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.firstName?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="lastName"
                                    name="lastName"
                                    label="lastName"
                                    fullWidth
                                    margin="dense"
                                    {...register('lastName')}
                                    error={errors.lastName ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.lastName?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="phone"
                                    name="phone"
                                    label="phone"
                                    fullWidth
                                    margin="dense"
                                    {...register('phone')}
                                    error={errors.phone ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.phone?.message}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Box mt={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit(onSubmit)}
                            >
                                Register
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </div>
        </>
    )
}
export default CreateUser