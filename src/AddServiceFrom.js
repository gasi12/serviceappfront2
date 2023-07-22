import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./AddServiceForm.module.css";

const AddServiceForm = function() {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/services");
    }

    const [formValues, setFormValues] = useState({
        customerName: "",
        phoneNumber: "",
        description: "",
        price: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            customerName: formValues.name,
            phoneNumber: formValues.phoneNumber,
            serviceRequestList: [
                {
                    description: formValues.description,
                    price: formValues.price
                }
            ]
        };
        const token =
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZWZhdWx0QGFkbWluIiwiaWF0IjoxNjg5MDk5MjQwLCJleHAiOjE2ODkxMDUyNDB9.NFwZeQboD9HyfTAbXbZwJTDm6ohwrA0qKaN30wEzAXI"; //
        axios
            .post("http://localhost:8080/savecustomerdumb", JSON.stringify(data), {
              headers: {
                   "Content-Type": "application/json",
                     'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response);
                navigate("/services");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(event.target);
    };

    return (
        <div className={styles.AddService_formbody}>
            <div>
                <h2 className={styles.AddService_h2}>FORM</h2>
            </div>
            <div className={styles.AddService_formcontent}>
                <form  onSubmit={handleSubmit}>
                    <table>
                        <tr>
                            <td>
                                <label className={styles.AddService_label}>Name</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleInputChange}
                                    className={styles.AddService_input}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className={styles.AddService_label}>Phone Number</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="number"
                                    name="phoneNumber"
                                    value={formValues.phoneNumber}
                                    onChange={handleInputChange}
                                    className={styles.AddService_input}

                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className={styles.AddService_label}>Description</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                <textarea
                    name="description"
                    value={formValues.description}
                    onChange={handleInputChange}
                    className={styles.AddService_input}
                    // rows={3}

                ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label className={styles.AddService_label}>Price</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="number"
                                    name="price"
                                    value={formValues.price}
                                    onChange={handleInputChange}
                                    className={styles.AddService_input}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit" className={styles.AddService_button}>
                                    Submit
                                </button>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    );
};

export default AddServiceForm;
