
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { createUser } from "../../reducers/user-create-reducer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch, RootState, useAppDispatch } from "../../store/store"
import { userUpdate } from "../../reducers/user-update.reducer";

const EditUser = () => {
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


    let userDetails: any = useSelector((state: RootState) => state.getUserDetails.details)
    const { register, handleSubmit,
        formState: { errors },setValue }: any = useForm({
            resolver: yupResolver(validationSchema),
            defaultValues: {
                firstName: userDetails?.data?.firstName || '',
                lastName: userDetails?.data?.lastName || '',
                phone: userDetails?.data?.phone || 1,
            }
        });

        const dispatch: AppDispatch = useAppDispatch();


    async function onSubmit(data: any) {
        let payload = { ...data, id: userDetails?.data?._id }
        dispatch(userUpdate(payload)).then((resp: any) => {
            if (resp.payload.statusCode == 200) {
                toast.success(resp.payload.message, { autoClose: 3000 });
                navigate('/list')
            }else if (resp.payload.statusCode == 400) {
                toast.error(resp.payload.message, { autoClose: 3000 ,});
            }
        })
    }
    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '40px',

            }} >
                <Card style={{ width: '40rem', height: '25rem', padding: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}> <h4>Edit User</h4> </div>
                    <Form key={userDetails?.data?._id} >
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter First Name"
                                required
                                name="firstName"
                                {...register('firstName')}
                                error={errors.firstName ? 'true' : 'false'}
                            />

                            <Form.Control.Feedback style={{ display: 'block' }} type="invalid">
                                {errors.firstName?.message}
                            </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Last Name"
                                //  required
                                name="lastName"
                                {...register('lastName')}
                                error={errors.lastName ? 'true' : 'false'}
                            />
                            <Form.Control.Feedback style={{ display: 'block' }} type="invalid">
                                {errors.lastName?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Phone"
                                //   required
                                name="phone"
                                {...register('phone')}
                                error={errors.phone ? 'true' : 'false'}
                            />
                            <Form.Control.Feedback style={{ display: 'block' }} type="invalid">
                                {errors.phone?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="button" onClick={handleSubmit(onSubmit)}>
                            Update
                        </Button>
                    </Form>
                </Card>
            </div >


        </>
    )
}
export default EditUser