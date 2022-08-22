import classes from './ProductCreate.module.css'

const CreateProduct = (props, func) => {
    return(
        <div className={classes.container}>
            <div className={classes.singleDiv}>
                <label htmlFor='productName'>Product Name</label>
                <input type='text' id='productName' value={props.formValue.productName} onChange={func.handleChange}/>
            </div>
            <div className={classes.singleDiv}>
                <label htmlFor='projectDescription'>Product Description</label>
                <textarea type='text' id='projectDescription' value={props.formValue.productDescription} onChange={func.handleChange}/>
            </div>
        </div>
    )
}

export default CreateProduct;