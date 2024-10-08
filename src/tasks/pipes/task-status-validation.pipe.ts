import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN
    ];


    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is not a valid status.`);
        }

        return value;
    }

    private isStatusValid(status:any){
        const idx = this.allowedStatuses.indexOf(status);

        return idx !== -1;
    }
}