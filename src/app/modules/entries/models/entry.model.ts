import { BaseResource } from "../../../shared/models/base-resource.model";
import { Category } from "../../categories/models/category.model";

export class Entry extends BaseResource {
  static types = {
    expense: 'Despesa',
    revenue: 'Receita'
  }

  constructor(
    public override id?: number,
    public name?: string,
    public description?: string,
    public type?: string,
    public amount?: string,
    public date?: string,
    public paid?: boolean,
    public categoryId?: number,
    public category?: Category 
  ){
    super()
  }

  get paidText(): string {
    return this.paid ? 'Pago':'Pendente'
  }
}