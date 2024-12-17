import express from 'express'
import { fetchLessons, fetchLessonStudents, fetchLessonTeachers } from '../utils/db.utils.js'
import { formatDate } from '../utils/date.utils.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { date, status, teacherIds, studentsCount, page = 1, limit = 5 } = req.query
    const filters = { date, status, teacherIds, studentsCount }
    const offset = (parseInt(page, 10) - 1) * limit

    const lessons = await fetchLessons(filters, limit, offset)

    const enrichedLessons = await Promise.all(
      lessons.map(async lesson => {
        const students = await fetchLessonStudents(lesson.id)
        const teachers = await fetchLessonTeachers(lesson.id)
        const visitCount = students.filter(student => student.visit).length

        return {
          ...lesson,
          date: formatDate(lesson.date),
          visitCount,
          students,
          teachers
        }
      })
    )

    res.status(200).json(enrichedLessons)
  } catch (e) {
    console.error(e)
    res.status(400).json({ error: e.message })
  }
})

export default router
