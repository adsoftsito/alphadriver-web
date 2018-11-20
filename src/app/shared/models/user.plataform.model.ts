import { PlataformRole } from './user.plataform.role.model';
export class userPlataform {
  public id: number;
  public plataform: string;
  public permissions: Array<PlataformRole>;
}
