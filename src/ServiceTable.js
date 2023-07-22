import React, {useEffect, useState} from "react";
import style from './ServiceTable.module.css';
import {fetchData, handleDelete, handleSave} from "./ApiCalls";
import dayjs from "dayjs";
const ServiceTable = function() {

    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [customerName, setCustomerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('PENDING');
    const [price, setPrice] = useState(0);


    useEffect(() => {
       loadData().then();
    }, []);
 async function loadData(){
      fetchData()
         .then(data => {
             setPosts(data);
         })

 }
    const handleSaveClick = async () => {
        try {
            await handleSave(customerName, phoneNumber, description, status, price, selectedPost);
            await loadData();
            console.log(customerName);
        } catch (error) {
            console.error('There was a problem:', error);
            // Handle the error
        }
    };



    async function deletePost(id) {
    await handleDelete(id);
        setPosts(posts.filter(post => post.id !== id));
        setSelectedPost(null);
        loadData();
    }

    function getDisplayStatus(status) {
        switch (status) {
            case 'PENDING':
                return 'Pending';
            case 'IN_PROCESS':
                return 'In process';
            case 'FINISHED':
                return 'Finished';
            case 'ON_HOLD':
                return 'On hold ';
            default:
                return status;
        }
    }

    function handlePostSelect(post) {
        setCustomerName(post.customerName)
        setPhoneNumber(post.phoneNumber)
        setDescription(post.description)
        setStatus(post.status)
        setPrice(post.price)
        if (post === selectedPost)
            setSelectedPost(null);
        else setSelectedPost(post);
    }
    const closepanel = event =>{
        setSelectedPost(null)
    }

    return (
        <div>
            <div className={style.center}>
                <h2 className={style.ServiceTable_heading}>All services</h2>
            </div>
            <div className={style.ServiceTable_wrapper}>
                <table className={style.ServiceTable}>
                    <thead>
                    <tr>
                        <th className={style.ServiceTable_idsize}>ID</th>
                        <th className={style.ServiceTable_namesize}>Name</th>
                        <th className={style.ServiceTable_namesize}>Phone number</th>
                        <th className={style.ServiceTable_descsize}>Desc</th>
                        <th className={style.ServiceTable_statussize}>Status</th>
                        <th className={style.ServiceTable_datesize}>Price</th>
                        <th className={style.ServiceTable_datesize}>Date</th>
                        <th className={style.ServiceTable_buttonsize}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.map((post) => (
                        <React.Fragment key={post.id}>
                            <tr>
                                <td>
                                    <post className={style.ServiceTable_id}>{post.id}</post>
                                </td>
                                <td>{post.customerName}</td>
                                <td>{post.phoneNumber}</td>
                                <td>{post.description}</td>
                                <td>{getDisplayStatus(post.status)}</td>
                                <td>{post.price}</td>
                                <td>{dayjs(post.startDate).format("DD-MM-YYYY")}</td>

                                <td>
                                    <button
                                        className={style.ServiceTable_button}
                                        onClick={() => deletePost(post.id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className={style.ServiceTable_button}
                                        onClick={() => handlePostSelect(post)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                            {selectedPost === post && (
                                <tr>
                                    <td>EDIT</td>
                                    <td>
                                        <input
                                            className={style.tabletext}
                                            type="text"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className={style.tabletext}
                                            type="number"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </td>
                                    <td>
                    <textarea
                        className={style.tabletext}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                                    </td>
                                    <td>
                                        <select
                                            className={style.tabletext}
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="PENDING">Pending</option>
                                            <option value="IN_PROCESS">In process</option>
                                            <option value="ON_HOLD">On hold</option>
                                            <option value="FINISHED">Finished</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            className={style.tabletext}
                                            type="number"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </td>
                                    <td>{post.date}</td>
                                    <td>
                                        <button
                                            className={style.ServiceTable_button}
                                            onClick={handleSaveClick}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className={style.ServiceTable_button}
                                            onClick={closepanel}
                                        >
                                            Close
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default ServiceTable;