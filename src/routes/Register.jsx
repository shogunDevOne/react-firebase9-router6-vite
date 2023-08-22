import { useContext} from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import { formValidate } from "../utils/formValidate";

import FormInput from "../components/FormInput";
import Title from "../components/Title";
import ButtonForm from "../components/ButtonForm";

const Register = () => {

    const navigate =useNavigate()
    const {registerUser} = useContext(UserContext)
    const {required, patternEmail, minLength, validateTrim, validateEquals} = formValidate()

    const {register, handleSubmit, formState: {errors}, getValues, setError} = useForm() 
    
    const onSubmit = async({email, password}) => {
        try {
            await registerUser(email,password)
            navigate("/")
        } catch (error) {    
            console.log(error.code)
            const {code, message} = erroresFirebase(error.code)
            setError(code, {message,})
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
                <ButtonForm text="Registrarse" type="submit" />
            </form>
        </>
    )
}

export default Register;