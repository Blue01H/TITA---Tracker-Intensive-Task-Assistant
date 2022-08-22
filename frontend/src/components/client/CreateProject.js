import React, { Fragment, useState } from 'react';
import classes from '../client/CreateProject.module.css';
//import CreateProduct from './ProductCreate';
import axios from 'axios';
import LoadingSpinner from '../UI/LoadingSpinner';

const CreateProject = () => {

    const userId = '62f7f6d788e7d7fc8caf1558';
    
    const [product, setProduct] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');


    const submitHandler = async (e) => {

        e.preventDefault();

        setIsLoading(true);

        // const loginFormData = new FormData();
        // loginFormData.append('name', name);
        // loginFormData.append('description', description);

        // if(productName && productDescription !== '') {
        //     loginFormData.append('productName', productName);
        //     loginFormData.append('productDescription', productDescription);
        // }

        await axios.post(`http://localhost:8000/api/client/${userId}/projects`,{ name: name, description: description, productName: productName, productDescription: productDescription})
            .catch((err) => {
                console.log(err);
            });
        setIsLoading(false);
    }
    
    const addProduct = (e) => {
        e.preventDefault();
        
        if(product) {
            setProduct(false);
        } else {
            setProduct(true);
        }
    }

    return(
       <Fragment>
        {!isLoading && 
        <div className={classes.container}>
            <h1 className={classes.logo}>Create a New Project</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.singleDiv}>
                    <label htmlFor='name'>Project Name</label>
                    <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className={classes.singleDiv}>
                    <label htmlFor='description'>Project Description</label>
                    <textarea type='text' id='description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <button className={classes.button} onClick={addProduct}>Add a Product</button>
                {product && 
                        <div >
                            <div className={classes.singleDiv}>
                                <label htmlFor='productName'>Product Name</label>
                                <input type='text' id='productName' value={productName} onChange={(e) => setProductName(e.target.value)}/>
                            </div>
                            <div className={classes.singleDiv}>
                                <label htmlFor='productDescription'>Product Description</label>
                                <textarea type='text' id='productDescription' value={productDescription} onChange={(e) => setProductDescription(e.target.value)}/>
                            </div>
                        </div>
                }
                <div className={classes.right}>
                    <button type='submit' className={classes.submitButton}>Submit</button>
                </div>
            </form>
        </div>
        }
        {isLoading && 
            <div className={classes.centered}>
                <LoadingSpinner />
            </div>
        }
        </Fragment>
    )
}

export default CreateProject;