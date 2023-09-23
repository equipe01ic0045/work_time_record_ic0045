import { Router } from 'express';
import authRoutes from './authRoutes';
import projectRoutes from './projectRoutes';
import timeRecordRoutes from './timeRecordRoutes';
import authorize from '../middlewares/authorize';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', authorize, projectRoutes);
router.use('/projects/time-records', authorize, timeRecordRoutes);

export default router;
