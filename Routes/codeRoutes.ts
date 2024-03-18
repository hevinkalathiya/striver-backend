// src/routes/codeRoutes.ts
import express from 'express';
import { createCode, getCode } from '../Controller/codeController';

const router = express.Router();

router.post('/', createCode);
router.get('/', getCode);

export default router;
