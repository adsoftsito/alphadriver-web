import { userInterface } from './user.interface.model';
import { userPlataform } from './user.plataform.model';
export class User {
  public id: string;
  public name: string;
  public lastname: string;
  public username: string;
  public email: string;
  public rol: string;
  public lastAccess: string;
  public status: number;
  public password: string;
  public accessExpires: string;
  public interface: userInterface;
  public plataforms: Array<userPlataform>;
}
