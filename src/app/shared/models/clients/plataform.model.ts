import { PlataformRole } from './plataform.role.model';
export class PlataformModel {
  public id: number;
  public plataform: string;
  public permissions: Array<PlataformRole>;
}
