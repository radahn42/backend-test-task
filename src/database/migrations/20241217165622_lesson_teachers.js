/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('lesson_teachers', table => {
    table.increments('id').primary()
    table.integer('teacher_id').notNullable()
    table.integer('lesson_id').notNullable()

    table.foreign('teacher_id').references('id').inTable('teachers').onDelete('CASCADE')
    table.foreign('lesson_id').references('id').inTable('lessons').onDelete('CASCADE')

    table.unique(['teacher_id', 'lesson_id'])
  })
}

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('lessons')
}
