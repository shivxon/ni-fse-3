
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import { AppDispatch, useAppDispatch } from "../../store/store"
import { createUser } from "../../reducers/user-create-reducer";

const CreateUser = () => {
     
    const navigate = useNavigate()
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required')
            .min(3, 'First name must be at least 3 characters')
            .max(20, 'First name must not exceed 20 characters'),
        lastName: Yup.string()
            .required('Last name is required')
            .min(3, 'Last name must be at least 3 characters')
            .max(20, 'Last name must not exceed 20 characters'),
        phone: Yup.string()
            .required('Phone is required')
            .min(10, 'Phone must be at least 10 digits')
            .max(10, 'Phone must not exceed 10 digits'),
    });

    const { register, handleSubmit,
        formState: { errors } }: any = useForm({
            resolver: yupResolver(validationSchema)
        });

    const dispatch: AppDispatch = useAppDispatch();
    async function onSubmit(data: any) {
        dispatch(createUser(data)).then((resp: any) => {
            if (resp.payload.statusCode == 200) {
                toast.success(resp.payload.message, { autoClose: 3000 });
                navigate('/list')
            } else if (resp.payload.statusCode == 400) {
                toast.error(resp.payload.message, { autoClose: 3000, });
                navigate('/')
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
                    <div style={{ display: 'flex', justifyContent: 'center' }}> <h4>Add User</h4> </div>
                    <Form >
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

                            <Form.Control.Feedback style={{ display: 'block' }} className="firstNameError" type="invalid">
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

                        <Button variant="primary" type="button" className="submitButton"  onClick={handleSubmit(onSubmit)}>
                            Submit
                        </Button>
                    </Form>
                </Card>
            </div >


        </>
    )
}
export default CreateUser