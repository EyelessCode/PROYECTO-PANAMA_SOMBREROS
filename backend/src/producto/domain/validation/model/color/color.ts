import { IdColor } from "./idColor"
import { NombreColor } from "./nombreColor"

export class Color{
    id:IdColor
    color:NombreColor

    constructor(id:IdColor,color:NombreColor) {
        this.id=id
        this.color=color
    }

    toPrimitives() {
        return {
            id: this.id.id,
            color: this.color
        }
    }

    static fromPrimitives(data: any): Color {
        return new Color(
            new IdColor(data.id),
            new NombreColor(data.color)
        )
    }

}
