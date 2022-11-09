import { Uuid } from "src/shared/domain/Uuid";

type Params = {
  id?: string;
  name: string;
  image: string;
};

export class Food {
  public id: Uuid;
  public name: string;
  public image: string;

  constructor(id: Uuid, name: string, image: string) {
    this.id = id;
    this.name = name;
    this.image = image;
  }

  static create({ id, name, image }: Params) {
    return new Food(Uuid.create(id), name, image);
  }

  public toDto() {
    return {
      id: this.id.toString(),
      name: this.name,
      image: this.image,
    };
  }
}
