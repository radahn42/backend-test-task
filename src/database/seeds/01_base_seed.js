import { faker } from '@faker-js/faker'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  console.log('Starting seeding...')

  await knex('lesson_students').del()
  await knex('lesson_teachers').del()
  await knex('lessons').del()
  await knex('students').del()
  await knex('teachers').del()

  console.log('Seeding teachers...')
  const teachers = []
  for (let i = 0; i < 10; i++) {
    teachers.push({
      name: faker.person.fullName()
    })
  }
  const teacherIds = await knex('teachers').insert(teachers).returning('id')

  console.log('Seeding students...')
  const students = []
  for (let i = 0; i < 50; i++) {
    students.push({
      name: faker.person.fullName()
    })
  }
  const studentIds = await knex('students').insert(students).returning('id')

  console.log('Seeding lessons...')
  const lessons = []
  for (let i = 0; i < 20; i++) {
    lessons.push({
      date: faker.date.future(),
      title: faker.word.words(3),
      status: faker.helpers.arrayElement([0, 1])
    })
  }

  const lessonIds = await knex('lessons').insert(lessons).returning('id')

  console.log('Seeding lesson_teachers...')
  const lessonTeachers = []
  lessonIds.forEach(lesson => {
    const randomTeachers = teacherIds.sort(() => 0.5 - Math.random()).slice(0, 2) // До 2 учителей
    randomTeachers.forEach(teacher => {
      lessonTeachers.push({
        lesson_id: lesson.id,
        teacher_id: teacher.id
      })
    })
  })
  await knex('lesson_teachers').insert(lessonTeachers)

  console.log('Seeding lesson_students...')
  const lessonStudents = []
  lessonIds.forEach(lesson => {
    const randomStudents = studentIds.sort(() => 0.5 - Math.random()).slice(0, 10) // До 10 студентов
    randomStudents.forEach(student => {
      lessonStudents.push({
        lesson_id: lesson.id,
        student_id: student.id,
        visit: Math.random() < 0.5
      })
    })
  })
  await knex('lesson_students').insert(lessonStudents)

  console.log('Seeding completed successfully!')
}
