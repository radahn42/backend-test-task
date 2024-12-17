import db from '../db/db.js'

export const parseRange = param => {
  if (!param) return null

  const parts = param.split(',').map(p => p.trim())

  if (parts.length === 1) {
    return [parseInt(parts[0], 10)]
  }
  return parts.map(p => parseInt(p, 10))
}

export const fetchLessons = async (filters, limit, offset) => {
  const query = db('lessons').select('lessons.id', 'lessons.date', 'lessons.title', 'lessons.status')

  if (filters.date) {
    const [startDate, endDate] = parseRange(filters.date)

    if (startDate && endDate) {
      query.whereBetween('lessons.date', [startDate, endDate])
    } else if (startDate) {
      query.where('lessons.date', startDate)
    }
  }

  if (filters.status !== undefined) {
    query.where('lessons.status', parseInt(filters.status, 10))
  }

  if (filters.teacherIds) {
    const ids = parseRange(filters.teacherIds)
    query.join('lesson_teachers', 'lessons.id', 'lesson_teachers.lesson_id').whereIn('lesson_teachers.teacher_id', ids)
  }

  if (filters.studentsCount) {
    const [minCount, maxCount] = parseRange(filters.studentsCount)

    query
      .join('lesson_students', 'lessons.id', 'lesson_students.lesson_id')
      .groupBy('lessons.id')
      .havingRaw(
        minCount && maxCount
          ? 'COUNT(lesson_students.student_id) BETWEEN ? AND ?'
          : 'COUNT(lesson_students.student_id) = ?',
        minCount && maxCount ? [minCount, maxCount] : [minCount]
      )
  }

  query.limit(limit).offset(offset)

  return query
}

export const fetchLessonStudents = async lessonId =>
  db('lesson_students')
    .join('students', 'lesson_students.student_id', 'students.id')
    .select('students.id', 'students.name', 'lesson_students.visit')
    .where('lesson_students.lesson_id', lessonId)

export const fetchLessonTeachers = async lessonId =>
  db('lesson_teachers')
    .join('teachers', 'lesson_teachers.teacher_id', 'teachers.id')
    .select('teachers.id', 'teachers.name')
    .where('lesson_teachers.lesson_id', lessonId)
