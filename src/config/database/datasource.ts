
import entities from "src/entities"
import { DataSource } from "typeorm"
export const dataSource  =  new DataSource({
  type:'postgres',
  username:'postgres',
  password:'postgres',
  database:'connect',
  entityPrefix:'connect_',
  host:'localhost',
  port:5432,
  entities:[...entities],
  // logging:true,
  synchronize:true,
})
