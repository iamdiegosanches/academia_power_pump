const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const path = require('path');

// Carrega todas as aulas do banco de dados
router.get('/', async (req, res) => {
    try {
      const lessons = await Lesson.getAll();
      // Extrair somente os campos que queremos (title, description, and personal)
      const simplifiedLessons = lessons.map(lesson => {
        return {
          title: lesson.title,
          description: lesson.description,
          personal: lesson.personal,
        };
      });
      res.render('main_page', { data: simplifiedLessons });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

// Carrega uma aula a partir do id
router.get('/lessons/:id', async (req, res) => {
  const lessonId = req.params.id;
  try {
    const lesson = await Lesson.getById(lessonId);
    if (!lesson) {
      res.status(404).json({ error: 'Lesson not found' });
    } else {
      res.json(lesson);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;