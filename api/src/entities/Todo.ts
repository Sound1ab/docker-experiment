import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  public id: number

  @Column('text')
  public description: string

  @Column('boolean')
  public isDone: boolean
}
