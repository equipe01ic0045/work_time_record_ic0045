import { Router } from 'express';

export class TimeRecordsWrapper { 
    constructor(
        private readonly timeRecordsController: TimeRecordsController,
    ) {}
    
    public init = () => {
        const router = Router();
        router.get('/', this.timeRecordsController.getAll);
        router.get('/:id', this.timeRecordsController.getById);
        router.post('/', this.timeRecordsController.create);
        router.put('/:id', this.timeRecordsController.update);
        router.delete('/:id', this.timeRecordsController.delete);
        return router;
    }

}