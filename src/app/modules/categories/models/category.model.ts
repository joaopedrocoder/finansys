import { BaseResource } from "../../../shared/models/base-resource.model";

export class Category extends BaseResource {
  constructor(
    public override id: number,
    public name?: string,
    public description?: string
  ){
    super()
  }

}
