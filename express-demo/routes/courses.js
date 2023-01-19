const express = require('express');
const router = express.Router();

//Object course
const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

//GET request show all courses when the route is called
router.get('/', (req, res) => {
    res.send(courses);
});

//POST request where you add a new course
router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);
    
    //Add a course using the input name and increasing the id
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//PUT request is to modify an element 
router.put('/:id', (req, res) => {
    // Look up the course
    //If not existing, return 404
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');

    //Validate
    //If invalid, return 400 - Bad request
    const { error } = validateCourse(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);

    //Update course
    course.name = req.body.name;
    //Return to update
    res.send(course);
});

//DELETE request is to remove an object
router.delete('/:id', (req, res) => {
    //Look up the course
    //Not existing, return 404
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //Return the response to the client
    res.send(course);

})

//GET request for a single course
router.get('/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});


//Validate the name of a course
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

module.exports = router;