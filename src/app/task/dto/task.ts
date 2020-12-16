import { TaskStatusEnum } from './taskStatusEnum';
export class Task {

    constructor(
        public id?: number,
        public initialDate?: Date,
        public finalDate?: Date,
        public status?: TaskStatusEnum,
        public title?: string,
        public description?: string,
        public taskSpendTime?: string
    ){}
}