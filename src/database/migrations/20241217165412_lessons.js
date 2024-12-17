/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('lessons', table => {
    table.increments('id').primary()
    table.string('title')
    table.date('date')
    table.integer('status').defaultTo(0)
  })
}

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('lessons')
}
