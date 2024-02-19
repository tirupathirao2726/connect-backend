import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users'})
export class User {

  @PrimaryGeneratedColumn("uuid",{name:'user_id'})
  userId:string;

  @Column({name:'name', type: 'character varying',length:256})
  name:string

  @Column({name:'about',type:'character varying', length:256 })
  about:string;

  @Column({name:'email' , type:'text', nullable: true})
  email:string;

  @Column({name:'profile_image',type: 'bytea', nullable:true})
  profileImg:any;

  @Column({name:'joined_on', type:'timestamptz', default: ()=> "CURRENT_TIMESTAMP"})
  joinedOn:Date;

  @Column({name:'is_email_verified',type:'boolean', default: false})
  isEmailVerified: boolean;
}
