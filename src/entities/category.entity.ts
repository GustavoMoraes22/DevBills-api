
//modelagem da categoria


type CategoryProps = {
    _id?: string,
    title: string,
    color: string,
}

export class Category {
    public _id?: string;
    public title: string;
    public color: string

    constructor(props: CategoryProps) {
        this._id = props._id;
        this.title = props.title;
        this.color = props.color.toUpperCase()

    }
}