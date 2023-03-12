import prisma from "../db"

// Get all Updates
export const getUpdates = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            updates: true
        }
    });

    res.json({ date: user?.updates });
}

// Get one Update
export const getOneUpdate = async (req, res) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    });

    res.json({ data: update });
}

// Create Update
export const createUpdate = async (req, res) => {
    const {productId, ...rest} = req.body
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    });

    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }
    })

    const update = await prisma.update.create({
        data: rest
    });

    res.json({ data: update });
}

// update Product
export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });

    const updates = products.reduce((allUpdates, product) =>
        [...allUpdates, ...product.updates], [])!;

    const match = updates.find(update => update.id === req.params.id);

    if (!match) {
        // handle
        return;
    }

    const updated = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    });

    res.json({ data: updated });
}

// delete product
export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });

    const updates = products.reduce((allUpdates, product) =>
        [...allUpdates, ...product.updates], [])!;

    const match = updates.find(update => update.id === req.params.id);

    if (!match) {
        // handle
        return;
    }

    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    });

    res.json({ data: deleted });
}