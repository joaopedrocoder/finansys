import { Category } from "../../categories/models/category.model";

export class Entry {
  static types = {
    expense: 'Despesa',
    revenue: 'Receita'
  }

  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public type?: string,
    public amount?: string,
    public date?: string,
    public paid?: boolean,
    public categoryId?: number,
    public category?: Category 
  ){}

  get paidText(): string {
    return this.paid ? 'Pago':'Pendente'
  }
}