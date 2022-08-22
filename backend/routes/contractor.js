const express = require('express');
const router = express.Router();

const Contractor = require('../models/contractor');
const Project = require('../models/project');
const Task = require('../models/task');
const Activity = require('../models/activity');
const Categories = require('../models/categories');
const task = require('../models/task');

//Create Activity with his Categories
router.post('/activity', async (req, res) => {

    const categorieName = req.body.categories;
    const categorieArray = [];
    let isArray = Array.isArray(categorieName);

    //if they are multiple Categories
    if(isArray) {

        categorieName.forEach(async (element, index) => {
            
            const isExist = await Categories.findOne({categorie: categorieName[index]})

            //if Categorie Exist
            if(isExist) {
                categorieArray.push(isExist._id)

            //If categorie Dosent Exist
            } else {

            const newCategorie = new Categories({
                categorie: req.body.categories[index],
            })
            categorieArray.push(newCategorie._id);
            newCategorie.save()
            .catch((err) => {
                return res.status(500).json({msg: `DB Error with Product: ${err}`})
            })

            }

        });

    //if theres only 1 categorie
    } else {

        const isExist = await Categories.findOne({categorie: categorieName})

        if(isExist) {

            categorieArray.push(isExist._id)

        } else {

            const newCategorie = new Categories({
                categorie: req.body.categories,
            })
    
            categorieArray.push(newCategorie._id);
    
            await newCategorie.save()
            .catch((err) => {
                return res.status(500).json({msg: `DB Error with 1 categorie: ${err}`})
            })

        }

    } 

    const newActivity = new Activity({
        activity: req.body.activity,
        categorie: categorieArray,
    })

    newActivity.save()
    .then(() => {
        return res.status(200).json({msg: 'Activity was Created Successfully'});
    }).catch((err) => {
        return res.status(500).json({msg: `DB Error: ${err}`})
    })

})

//Get Contractor Data
router.get('/:id', async (req, res) => {

    try {
        
        const id = req.params.id;
        const contractor = await Contractor.findById(id)

        if(!contractor) {
            return res.status(400).json({msg: 'Requested user does not exist.'})
        }
            
        return res.json({contractor});

    } catch(err) {
        return res.status(500).json({msg: err.message});
    }

})

//Create Task
router.post('/:id/tasks', async (req, res) => {

    const contractorId = req.params.id;
    const projectId = req.body.projectId

    //Getting Client and Product IDs
    const projectData = await Project.findById(projectId)
    .catch((err) => {
        return res.status(500).json({msg: `DB Error: ${err}`});
    });

    //Getting New Entry Number
    const maxNum = await Task.find().sort({entryNumber: -1}).limit(1)
    const entryNumber = maxNum[0].entryNumber + 1; 

    const task = new Task({
        entryNumber: entryNumber,
        contractorId: contractorId,
        date: req.body.date,
        duration: req.body.duration,
        bilable: req.body.bilable,
        description: req.body.description,
        projectId: projectId,
        clientId: projectData.clientId,
        productId: projectData.products,
        activity: req.body.activity,
        categories: req.body.categories,
    })

    task.save()
    .then(() => {
        
        //Push Task Id on Project
        projectData.tasks.push(task._id);
        projectData.save()
        .catch((err) => {return res.status(500).json({msg: `DB Error: ${err}`})});

        return res.status(200).json({msg: 'Task was Created Successfully'});

    }).catch((err) => {
        return res.status(500).json({msg: `DB Error: ${err}`})
    })

})

//Get All Tasks
router.get('/:id/tasks', async (req, res) => {

    const id = req.params.id;

    try {
        
        const tasks = await Task.find({contractorId: id}).populate('projectId',['name']).populate('productId').populate('activity',['activity']).populate('categories',['categorie'])
        return res.json(tasks)

    } catch(err) {
        return res.status(500).json({msg: `Server Error: ${err}`})
    }

})

//Get Specific Task
router.get('/:id/tasks/:taskId', async (req, res) => {

    const taskId = req.params.taskId;

    try {
        
        const tasks = await Task.findOne({_id: taskId}).populate('productId')
        return res.json(tasks)

    } catch(err) {
        return res.status(500).json({msg: `Server Error: ${err}`})
    }

})

//Modify a Specific Task
router.put('/:id/tasks/:taskId', async (req, res) => {

    const description = req.body.description;
    const date = req.body.date;
    const bilable = req.body.bilable;
    const duration = req.body.duration;


    const taskId = req.params.taskId;

    try {
        
        await Task.findByIdAndUpdate(taskId, { description: description, date: date, bilable: bilable, duration: duration })
        return res.status(200).json({msg: 'Task was Modify Successfully'});

    } catch(err) {
        return res.status(500).json({msg: 'Server Error'})
    }

})

//Eiminate Specific Task
router.delete('/:id/tasks/:taskId', async (req, res) => {

    const taskId = req.params.taskId;

    try {

        await Project.findOneAndUpdate({ tasks: taskId }, {
            $pull: {
                tasks: taskId,
            },
        });
        await Task.findByIdAndDelete(taskId);
        return res.status(200).json({msg: 'Task was Deleted Successfully'});

    } catch(err) {
        return res.status(500).json({msg: `BD Error: ${err}`})
    }

})

module.exports = router;