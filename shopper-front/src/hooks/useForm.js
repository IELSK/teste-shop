import {useState} from 'react';

function useForm(initialValue) {
    const [form, setForm] = useState(initialValue)

    const onChange = (event) => {
        const {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const clearForm = () => {
        setForm(initialValue)
    }
    return [form, onChange, clearForm, setForm]
}

export default useForm;