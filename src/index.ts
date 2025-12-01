import express, { Request, Response } from 'express';

const app = express();
const port = 3000; 

app.use(express.json());

interface Habit {
    id: number;
    title: string;
    description?: string;  
    goal?: number;       
}

let habits: Habit[] = [
  { id: 1, title: 'Пить воду', description: 'Выпивать 2 литра воды в день', goal: 8 },
  { id: 2, title: 'Читать', description: 'Читать 30 минут в день', goal: 1 }
];

let nextHabitId = 3; 

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Habit Tracker API',
        version: '1.0.0',
        endpoints: [
            'GET    /api/habits       - Получить все привычки',
            'GET    /api/habits/:id   - Получить привычку по ID',
            'POST   /api/habits       - Создать новую привычку',
            'PUT    /api/habits/:id   - Обновить привычку',
            'DELETE /api/habits/:id   - Удалить привычку'
        ]
    });
});

app.get('/api/habits', (req: Request, res: Response) => {
    res.json({
        success: true,
        count: habits.length,
        data: habits
    });
});

app.get('/api/habits/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    const habit = habits.find(h => h.id === id);
    
    if (!habit) {
        return res.status(404).json({
            success: false,
            error: 'Привычка не найдена'
        });
    }
    
    res.json({
        success: true,
        data: habit
    });
});

app.post('/api/habits', (req: Request, res: Response) => {
    if (!req.body.title || req.body.title.trim() === '') {
        return res.status(400).json({
            success: false,
            error: 'Название привычки обязательно'
        });
    }
    
    const newHabit: Habit = {
        id: nextHabitId++,
        title: req.body.title.trim(),
        description: req.body.description?.trim(),
        goal: req.body.goal || 1 
    };
    
    habits.push(newHabit);
    
    res.status(201).json({
        success: true,
        data: newHabit
    });
});

app.put('/api/habits/:id', (req: Request, res: Response) => {  
    const id = parseInt(req.params.id);
    const habit = habits.find(h => h.id === id);
    
    if(!habit) {
        return res.status(404).json({
            success: false,
            error: 'Id не найден'
        });
    }

    if (!req.body.title || req.body.title.trim() === '') {
        return res.status(400).json({
            success: false,
            error: 'Название привычки обязательно'
        });
    }
        
    const updateHabit: Habit = {
        id: id,
        title: req.body.title.trim(),
        description: req.body.description?.trim(),
        goal: req.body.goal || 1 
    };

    habits.splice(habits.indexOf(habit), 1, updateHabit)

    res.status(200).json({
        success: true,
        data: updateHabit
    });
});

app.delete('/api/habits/:id', (req: Request, res: Response) => {  
    const id = parseInt(req.params.id);
    const habit = habits.find(h => h.id === id);
    
    if(!habit) {
        return res.status(404).json({
            success: false,
            error: 'Id не найден'
        });
    }

    habits.splice(habits.indexOf(habit), 1);

    res.status(200).json({
        success: true,
        message: 'Привычка удалена'
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
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