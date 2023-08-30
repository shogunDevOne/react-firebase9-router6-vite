import { useEffect, useState } from 'react';
import Title from '../components/Title'
import { useFirestore } from '../hooks/useFirestore';
import { formValidate } from '../utils/formValidate';
import { useForm } from 'react-hook-form';
import ButtonForm from '../components/ButtonForm';
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import { erroresFirebase } from "../utils/erroresFirebase";

const Home  = () => { 
    const [copy, setCopy] = useState({})

    const { required, patternURL } = formValidate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField,
        setValue,
        setError,
    } = useForm();

    const {data, error, loading, getData, addData, deleteData, updateData} = useFirestore()
    const [text, setText] = useState('')
    const [newOriginID, setNewOriginID] = useState()

    useEffect(() => {
        console.log('getData')
        getData()
    }, [])

    

    if(loading.getData) return <p>loading data getData...</p>
    if(error) return <p>{error}</p>

    const onSubmit = async({url}) => {
        try {
            if(newOriginID){
                await updateData(newOriginID, url)
                setNewOriginID("")
            } else {
                await addData(url)
            }
            resetField('url')
            const {code, message} = erroresFirebase(error.code)
            setError(code, {message})
        } catch (error) {
            
        }

        
    }

    const handleClickDelete = async(nanoid) => {
        await deleteData(nanoid)

    }

    const handleClickEdit = (item) => {
        setValue("url", item.origin)
        setNewOriginID(item.nanoid)
    };

    const pathURL = window.location.href

    const handleClickCopy = async(nanoid) => {
        await navigator.clipboard.writeText(window.location.href + nanoid)  
        setCopy({[nanoid]: true})
    }

    return (
        <>
            <Title text="Home" />

            <form onSubmit={handleSubmit(onSubmit)}>

                <FormInput
                    type="text"
                    placeholder="https://bluuweb.org"
                    {...register("url", {
                        required,
                        pattern: patternURL,
                    })}
                    label="Ingresa tu url"
                    error={errors.url}
                >
                    <FormError error={errors.url} />
                </FormInput>
                {
                    newOriginID ? (
                        <ButtonForm
                        type="submit"
                        text="Editar URL"
                        loading={loading.updateData}
                        color='green'
                    />
                    ) : (
                        <ButtonForm
                        type="submit"
                        text="Add Url"
                        color='blue'
                        loading={loading.updateData}
                    
                    />
                    )                   
                }  
            </form>


            {
                data.map(item => (
                    <div key={item.nanoid} className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-2" >
                        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                            {pathURL}{item.nanoid}</h5>
                        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{item.origin}</p>
                        <ButtonForm
                            type="submit"
                            text="Borrar"
                            loading={loading[item.nanoid]}
                            color='red'
                            onClick={() => handleClickDelete(item.nanoid)}
                        />
                        <ButtonForm
                            type="button"
                            text="Editar"
                            color='green'
                            onClick={() => handleClickEdit(item)}
                        />

                        <ButtonForm
                            type="button"
                            text={copy[item.nanoid] ? 'copiado' : 'copiar'}
                            color='blue'
                            onClick={() => handleClickCopy(item.nanoid)}
                        />
                    </div>
                        
                ))
            }
        </>
    )
};


 export default Home;