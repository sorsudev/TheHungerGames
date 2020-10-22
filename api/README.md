```bash
  knex init
  knex migrate:make migration_name
  knex migrate:latest --env production
  knex migrate:rollback
  knex migrate:rollback --all
  knex migrate:up
  knex migrate:down
  knex migrate:list

  sudo vim /etc/postgresql/10/main/pg_hba.conf trust
```