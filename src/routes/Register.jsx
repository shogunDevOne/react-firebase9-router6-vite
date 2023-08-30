import { useContext, useState} from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import { formValidate } from "../utils/formValidate";

import FormInput from "../components/FormInput";
import Title from "../components/Title";
import ButtonForm from "../components/ButtonForm";
import ButtonLoading from "../components/ButtonLoading";

const Register = () => {

    const navigate =useNavigate()
    const [loading, setLoading] = useState(false)
    const {registerUser} = useContext(UserContext)
    const {required, patternEmail, minLength, validateTrim, validateEquals} = formValidate()

    const {register, handleSubmit, formState: {errors}, getValues, setError} = useForm() 
    
    const onSubmit = async({email, password}) => {
        try {
            setLoading(true)
            await registerUser(email,password)
            navigate("/")
        } catch (error) {    
            console.log(error.code)
            const {code, message} = erroresFirebase(error.code)
            setError(code, {message,})
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <Title text="Crea una Cuenta" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email"
                    placeholder="Ingrese email"
                    {...register("email", {
                        required,
                        pattern: patternEmail,
                    })}
                    label="Ingresa tu correo"
                    error={errors.email}
                >
                    <FormError error={errors.email} />
                </FormInput>

                <FormInput
                    type="password"
                    placeholder="Ingrese Password"
                    {...register("password", {
                        minLength,
                        validate: validateTrim,
                    })}
                    label="Ingresa tu contraseña"
                    error={errors.password}
                    
                >
                    <FormError error={errors.password} />
                </FormInput>

                <FormInput

                    type="password"
                    placeholder="Ingrese Password"
                    {...register("repassword", {
                        validate: validateEquals(getValues("password")),
                    })}
                    label="vuelve a ingresar tu contraseña"
                    error={errors.repassword}
                >
                    <FormError error={errors.repassword} />
                </FormInput>
                <ButtonForm text="Registrarse" type="submit" loading={loading} color="green" /> 
            </form>
        </>
    )
}

export default Register;