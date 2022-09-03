import React from 'react'
import '../styles/splash.css'

export default function Splash(props) {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
        isSubscribe: true
    })

    function handleChange(event) {
        const { type, name, checked, value } = event.target
        setFormData(prevFormDate => ({
            ...prevFormDate,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        const { name, email, password, confirm } = formData
        if (name != '' && email != '' && password != '' && confirm != '') {
            localStorage.setItem("formData", JSON.stringify(formData))
            props.startThegame()
        }
        else {
            alert("Please fill all fields! ")
        }
    }
    return (
        <div className="form--container">
            <span className='circle'></span>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="name"
                    name="name"
                    value={formData.name}
                    placeholder="Name"
                    className="form--input"
                    onChange={handleChange} />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Email address"
                    className="form--input"
                    onChange={handleChange} />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Password"
                    className="form--input"
                    onChange={handleChange} />
                <input
                    type="password"
                    name="confirm"
                    value={formData.confirm}
                    placeholder="Confirm password"
                    className="form--input"
                    onChange={handleChange} />

                <div className="form--marketing">
                    <input
                        type="checkbox"
                        id="isSubscribe"
                        name="isSubscribe"
                        checked={formData.isSubscribe}
                        onChange={handleChange} />
                    <label htmlFor="isSubscribe">I want to join the newsletter</label>
                </div>
                <button className="form--submit">
                    Sign up
                </button>
            </form>
        </div>
    )
}