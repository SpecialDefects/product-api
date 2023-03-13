import prisma from "../db"

// Get all update points
export const getUpdatePoints = async (req, res, next) => {
    try {
        const allUpdates = await prisma.update.findMany({
            where : {
                userId: req.user.id
            },
            include: {
                updatePoints: true
            }
        });

        const allUpdatePoints = allUpdates.reduce((allPoints, update) => [...allPoints, ...update.updatePoints], []);

        res.json({ date: allUpdatePoints });
    } catch (e) {
        e.type = "auth";
        next(e);
    }
}

// get one update point
export const getOneUpdatePoint = async (req, res, next) => {
    try {
        const allUpdates = await prisma.update.findMany({
            where : {
                userId: req.user.id
            },
            include: {
                updatePoints: true
            }
        });

        const allUpdatePoints = allUpdates.reduce((allPoints, update) => [...allPoints, ...update.updatePoints], []);

        const updatePointMatch = allUpdatePoints.find((updatePoint) => updatePoint.id === req.params.id);
        if (!updatePointMatch) {
            throw new Error;
        }

        res.json({ data: updatePointMatch });
    } catch (e) {
        e.type = "input";
        next(e);
    }
}

// create update point 
export const createUpdatePoint = async (req, res, next) => {
    try {
        const update = await prisma.update.findUnique({
            where: {
                id: req.body.updateId,
            }
        });

        if (update.userId != req.user.id) {
            throw new Error;
        }

        const createdUpdatePoint = await prisma.updatePoint.create({
            data: req.body
        })

        res.json({ data: createdUpdatePoint });
    } catch (e) {
        e.type = "input";
        next(e);
    }
}


// update update point
export const updateUpdatePoint = async (req, res, next) => {

    try {
        const allUpdates = await prisma.update.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                updatePoints: true
            }
        });

        const allUpdatePoints = allUpdates.reduce((allPoints, update) => [...allPoints, ...update.updatePoints], []);

        const pointMatch = allUpdatePoints.find((updatePoint) => updatePoint.id === req.params.id);

        if (!pointMatch) {
            throw new Error;
        }

        try {
            const updated = await prisma.updatePoint.update({
                where: {
                    id: req.params.id
                },
                data: {
                    name: req.body.name,
                    description: req.body.description
                }
            });
        
            res.json({ data: updated });
        } catch (e) {
            e.type = "input";
            next(e);
        }
    } catch (e) {
        e.type = "input";
        next(e);
    }
}

// delete update point

export const deleteUpdatePoint = async (req, res, next) => {

    try {
        const allUpdates = await prisma.update.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                updatePoints: true
            }
        });

        const allUpdatePoints = allUpdates.reduce((allPoints, update) => [...allPoints, ...update.updatePoints], []);

        const pointMatch = allUpdatePoints.find((updatePoint) => updatePoint.id === req.params.id);

        if (!pointMatch) {
            throw new Error;
        }

        try {
            const deleted = await prisma.updatePoint.delete({
                where: {
                    id: req.params.id
                }
            });
        
            res.json({ data: deleted });
        } catch (e) {
            e.type = "input";
            next(e);
        }
    } catch (e) {
        e.type = "input";
        next(e);
    }
}