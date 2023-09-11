import { Router } from 'express';
import authRoutes from './authRoutes';
import projectRoutes from './projectRoutes';
import timeRecordRoutes from './timeRecordRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/projects/:project_id/time-record', timeRecordRoutes);

export default router;
