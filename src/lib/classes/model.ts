abstract class Model {
    static createOne: () => Model | any
    static findOne: () => Model | any
    static dropOne?: () => Model | any
    static updateOne?: () => Model | any
}

abstract class DBModel extends Model {
    static table: string
    static id: string
    static fields: Array<string>
}

export { Model, DBModel }