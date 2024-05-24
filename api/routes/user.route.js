import express from 'express';

const router=express.Router();

router.get('/test', (req,res)=>{
    res.json({
        message:'API Route is working',
    }
    )
}
);

export default router;