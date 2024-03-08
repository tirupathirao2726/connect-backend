import { Injectable } from '@nestjs/common';
import { dataSource } from 'src/config/database/datasource';
import { ResponseDTO } from 'src/dtos/response.dto';
import { UpdateUserDTO } from 'src/dtos/user.dto';
import { User } from 'src/entities/user.entity';
@Injectable()
export class UserService {
  async getAllUsers(): Promise<ResponseDTO> {
    const queryRunner = dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      const users = await queryRunner.manager.find(User);
      return new ResponseDTO('success', users);
    } catch (error) {
      return new ResponseDTO('failure', null, error);
    } finally {
      await queryRunner.release();
    }
  }

  async getUserById(userId: string): Promise<ResponseDTO> {
    const queryRunner = dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      const user = await queryRunner.manager.findOneBy(User, {
        userId: userId,
      });
      return new ResponseDTO('success', user);
    } catch (error) {
      return new ResponseDTO(
        'failure',
        null,
        `Unable to fetch user with id ${userId}`,
      );
    } finally {
      await queryRunner.release();
    }
  }
  async updateUserDetailsById(
    userId: string,
    payload: UpdateUserDTO,
  ): Promise<ResponseDTO> {
    const queryRunner = dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const updateObj = await queryRunner.manager.update(
        User,
        { userId },
        payload,
      );
      if (updateObj?.affected > 0) {
        await queryRunner.commitTransaction();
        return new ResponseDTO('success', 'updated successfully');
      }
      await queryRunner.rollbackTransaction();
      return new ResponseDTO('failure', null, `Unable to update ${userId}`);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return new ResponseDTO('failure', null, `Unable to update ${userId}`);
    } finally {
      await queryRunner.release();
    }
  }

  async deleteUser(userId: string): Promise<ResponseDTO> {
    const queryRunner = dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const delObj = await queryRunner.manager.delete(User, { userId });
      if (delObj?.affected > 0) {
        await queryRunner.commitTransaction();
        return new ResponseDTO('success', 'Deleted successfully');
      }
      await queryRunner.rollbackTransaction();
      return new ResponseDTO(
        'failure',
        null,
        `Unable to delete user ${userId}`,
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return new ResponseDTO(
        'failure',
        null,
        `Unable to delete user ${userId}`,
      );
    } finally {
      await queryRunner.release();
    }
  }
}
