const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose')
//const {requireAuth} = require('../middleware/authMiddleware');

const Client = require('../models/client');
const Project = require('../models/project');
const Product = require('../models/product');
const { json } = require('body-parser');

//Get Client Data
router.get('/:id', async (req,res) => {
    
    try {
        
        const id = req.params.id;
        const client = await Client.findById(id)

        if(!client) {
            return res.status(400).json({msg: 'Requested user does not exist.'})
        }
            
        res.json({client});

    } catch(err) {
        return res.status(500).json({msg: err.message});
    }

})

//Create Project
router.post('/:id/projects', async (req,res) => {
        
        const id = req.params.id;
        let isArray = Array.isArray(req.body.productName)
        let projectIdentifier = [];

        //if it has more than 1 project
        if(isArray) {
            
            const productName = req.body.productName;
            const productDescription = req.body.productDescription;
            const products = [];

            const newProject = new Project({
                clientId: id,
                name: req.body.name,
                description: req.body.description,
            });

            const clientId = newProject._id;
            
            productName.forEach((element, index) => {
                
                const newProduct = new Product({
                    projectId: clientId,
                    name: productName[index],
                    description: productDescription[index],
                });
                newProduct.save()
                .catch((err) => {
                    return res.status(500).json({msg: `DB Error with Product: ${err}`})
                })
                let productId = newProduct._id;
                products.push(productId);

            });

            newProject.products = products;
            projectIdentifier.push(newProject._id);
            newProject.save()
            .catch((err) => {
                return res.status(500).json({msg: `DB Error: ${err}`})
            })


        //if it has 1 project
        } else if(req.body.productName) {

            const productName = req.body.productName;
            const productDescription = req.body.productDescription;
            
            const newProject = new Project({
                clientId: id,
                name: req.body.name,
                description: req.body.description,
            });

            const newProduct = new Product({
                projectId: newProject._id,
                name: productName,
                description: productDescription,
            });
            newProduct.save()
            .catch((err) => {
                return res.status(500).json({msg: `DB Error with Product: ${err}`})
            })

            newProject.products = newProduct._id;
            projectIdentifier.push(newProject._id);
            
            newProject
            .save()
            .catch((err) => {
                return res.status(500).json({msg: `DB Error: ${err}`})
            })
        
        //if it has 0 projects
        } else {

            const newProject = new Project({
                clientId: id,
                name: req.body.name,
                description: req.body.description,
            });

            projectIdentifier.push(newProject._id);
    
            newProject
            .save()
            .catch((err) => {
                return res.status(500).json({msg: `DB Error: ${err}`})
            })

        }

    Client.findByIdAndUpdate(id, {$push: {projects: projectIdentifier[0]}})
    .then(() => {
        return res.status(200).json({msg: 'Project was Created Successfully'});
    })
    .catch((err) => {
        return res.status(500).json({msg: `DB Error: ${err}`})
    })

})

//Get all Projects
router.get('/:id/projects', async (req,res) => {

    const id = req.params.id;

    try {
        
        const projects = await Project.find({clientId: id}).populate('products', ['name'])
        return res.json(projects)

    } catch(err) {
        return res.status(500).json({msg: `Server Error: ${err}`})
    }
    
})

//Get an Specific Project
router.get('/:id/projects/:projectId', async (req,res) => {

    const projectId = req.params.projectId;
    const clientId = req.params.id

    try {
        
        const project =  await Project.findOne({_id: projectId, clientId: clientId}).populate('products', ['name','description']).populate('tasks')
        return res.json(project)

    } catch(err) {
        return res.status(500).json({msg: 'Server Error'})
    }

})

//Modify a Project
router.put('/:id/projects/:projectId', async (req,res) => {

    const name = req.body.name;
    const description = req.body.description;

    const projectId = req.params.projectId;

    try {
        
        await Project.findByIdAndUpdate(projectId, { name: name, description: description })
        return res.status(200).json({msg: 'Project was Modify Successfully'});

    } catch(err) {
        return res.status(500).json({msg: 'Server Error'})
    }

})

//Delete a Project
router.delete('/:id/projects/:projectId', async (req,res) => {

    const projectId = req.params.projectId;

    try {
        
        await Client.findOneAndUpdate({ projects: projectId }, {
            $pull: {
                projects: projectId,
            },
        });
        await Product.deleteMany({clientId: projectId});
        await Project.findByIdAndDelete(projectId);
        return res.status(200).json({msg: 'Project was Deleted Successfully'});

    } catch(err) {
        return res.status(500).json({msg: `BD Error: ${err}`})
    }

})

module.exports = router;