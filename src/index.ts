import express, { Request, Response } from 'express';
import Habit from './models/Habit';

const app = express();
const port = 3000; 

app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
    try {
        res.json({
            message: 'Habit Tracker API',
            version: '1.0.0',
            endpoints: [
                'GET    /api/habits       - get habit',
                'GET    /api/habits/:id   - get habit ID',
                'POST   /api/habits       - greate new habit',
                'PUT    /api/habits/:id   - update habit',
                'DELETE /api/habits/:id   - delete habit'
            ]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }
});

app.get('/api/habits', async (req: Request, res: Response) => {
    try {
        const habits = await Habit.findAll();
        res.json({
            success: true,
            count: habits.length,
            data: habits
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error Habits"
        })
    }
});

app.get('/api/habits/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        
        const habit = await Habit.findByPk(id);
        
        if (!habit) {
            return res.status(404).json({
                success: false,
                error: 'Habit not found'
            });
        }
        
        res.json({
            success: true,
            data: habit
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error Habits"
        })
    }
});

app.post('/api/habits', async (req: Request, res: Response) => {
    try {
        if (!req.body.title || req.body.title.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Habit name required'
            });
        }
        
        const newHabit = await Habit.create ({
            title: req.body.title.trim(),
            description: req.body.description?.trim(),
            goal: req.body.goal || 1 
        });
        
        res.status(201).json({
            success: true,
            data: newHabit
        });
    } catch (error) {
        console.error('Error create habit' , error)
        res.status(500).json({
            success: false,
            error: 'failed create habit'
        });
    }
});

app.put('/api/habits/:id', async (req: Request, res: Response) => {  
    try {
        const id = parseInt(req.params.id);
        const habit = await Habit.findByPk(id);
        
        if(!habit) {
            return res.status(404).json({
                success: false,
                error: 'Id not found'
            });
        }

        if (!req.body.title || req.body.title.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Habit title requred'
            });
        }
            
        const updateHabit = await habit.update({
            title: req.body.title.trim(),
            description: req.body.description?.trim(),
            goal: req.body.goal || 1 
        })

        res.status(200).json({
            success: true,
            data: updateHabit
        });
    } catch(error) {
        console.error('Error update habit' , error)
        res.status(500).json({
            success: false,
            error: 'failed update habit'
        });
    }
});

app.delete('/api/habits/:id', async (req: Request, res: Response) => {  
    try {
        const id = parseInt(req.params.id);
        const habit = await Habit.findByPk(id);
        
        if(!habit) {
            return res.status(404).json({
                success: false,
                error: 'Id not found'
            });
        }

        await habit.destroy();

        res.status(200).json({
            success: true,
            message: 'Habit delete'
        });
    } catch (error) {
        console.error('Error delete habit' , error)
        res.status(500).json({
            success: false,
            error: 'failed delete habit'
        });
    }
});

app.listen(port, () => {
    console.log(`Server running http://localhost:${port}`);
});














// import express from 'express';
// import { Router } from 'express';

// const app = express();
// const port = 3000;
// const router = Router();

// app.use(express.json());

// interface Habit {
//     id: number;
//     title: string;
//     description?: string;
//     goal?: number;
// }

// let habits: Habit[] = [
//   { id: 1, title: 'Пить воду', description: 'Выпивать 2 литра воды в день', goal: 8 },
//   { id: 2, title: 'Читать', description: 'Читать 30 минут в день', goal: 1 }
// ];

// // GET / - главная описание
// // GET /api/habits - получить все привычки
// // GET /api/habits/:id - получить привычку по ID

//     // Middleware specific to this router
//     router.use((req, res, next) => {
//       console.log('Time:', Date.now());
//       next();
//     });

//     // Routes for this router
//     router.get('/', (req, res) => {
//       res.send('Users home page');
//     });

//     router.get('/:id', (req, res) => {
//       res.send(`User ID: ${req.params.id}`);
//     });

//     app.use('/api/habits', router);

// app.get('/', (req, res) => {
//     res.send("Habit");
// });

// app.get('/', (req, res) => {
//   res.json({
//     success: true,
//     data: habits
//   });
// });

// app.get('/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const habit = habits.find(h => h.id === id);
  
//   if (!habit) {
//     return res.status(404).json({
//       success: false,
//       error: '404 Not Found'
//     });
//   }
  
//   res.json({
//     success: true,
//     data: habit
//   });
// });

// // POST / - добавление привычки

// let habitId = 2;

// router.post('/', (req, res) => {
//     const habit: Habit = {
//         id: habitId++,
//         title: req.body.title,
//         description: req.body.description,
//         goal: req.body.goal
//     }
//     if (!req.body.title) {
//         return res.status(400).json({
//         success: false,
//         error: '400 Bad Request'
//     });
//   }
//     habits.push(habit);
//     res.status(201).json(habit);
// });

// app.listen(port, () => {
//   console.log(`Сервер запущен на http://localhost:${port}`);
// });