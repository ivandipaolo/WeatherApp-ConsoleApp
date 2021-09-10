const inquirer = require('inquirer');
require('colors');

const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: 'Choose an option:',
        choices: [
            {
                value: '1',
                name: `${`1.`.green} Search a city`
            },
            {
                value: '2',
                name: `${`2.`.green} History`
            },
            ]
        }
];


const inquireMenu = async () =>{
    
    console.log('========================='.red);
    console.log('      Console App'.bold );
    console.log('=========================\n'.red);
    
    const {option} = await inquirer.prompt(menuOptions)
    return option;
}

const pause = async () => {
    const ps = [
        {
        type: 'input',
        name: 'question',
        message: `Press ${'ENTER'.red.bold} to continue.`    
        }
    ];  
console.log(`\n`);
    await inquirer.prompt(ps);
    return ps
}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate (value) {
                if (value.length === 0 ) {
                    return 'Please write the task.'; 
                }
                return true
            }
        }
    ]
    const { desc } = await inquirer.prompt(question);
    return desc
}

const listToDelete = async ( tasks = []) => {
    const choices = tasks.map((task, i) => {
        
        const idx = `${i + 1}`.red.bold;
        return{
            value: task.id,
            name: `${idx} ${task.desc}`
        }
    })

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(question);
    return id;
}


const confirmDelete = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok
}

const listOfPlaces = async ( places = []) => {
    const choices = places.map((place, i) => {
        
        const idx = `${i + 1}`.red.bold;
        return{
            value: place.id,
            name: `${idx} ${place.name}`,
        }
    })

    const question = [
        {
            type: 'list',
            name: 'ids',
            message: 'Select place:',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(question);
    return ids;
}

const confirmComplete = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok
}

module.exports = {
    inquireMenu,
    pause,
    readInput,
    listOfPlaces,
    confirmDelete,
    confirmComplete
}