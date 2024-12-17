/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('lesson_students', table => {
    table.increments('id').primary()
    table.integer('student_id').notNullable()
    table.integer('lesson_id').notNullable()

    table.foreign('student_id').references('id').inTable('students').onDelete('CASCADE')
    table.foreign('lesson_id').references('id').inTable('lessons').onDelete('CASCADE')

    table.boolean('visit').defaultTo(false)

    table.unique(['student_id', 'lesson_id'])
  })
}

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('lesson_students')
}
