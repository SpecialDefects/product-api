import prisma from "../db"

// Get all Products
export const getProducts = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
            include: {
                products: true
            }
        });

        res.json({data: user?.products });
    } catch (e) {
        e.type === "auth";
        next(e);
    }
}

// Get one Product
export const getOneProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;

        const product = await prisma.product.findFirst({
            where: {
                id: productId,
                belongsToId: req.user.id
            }
        });

        res.json({ data: product });
    } catch (e) {
        e.type === "auth";
        next(e);
    }

}

// Create Product
export const createProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id
            }
        });

        res.json({ data: product });
    } catch (e) {
        next(e);
    }
}

// update Product
export const updateProduct = async (req, res, next) => {
    try {
        const updated = await prisma.product.update({
            where: {
                id_belongsToId: {
                    id: req.params.id,
                    belongsToId: req.user.id
                }
            },
            data: {
                name: req.body.name
            }
        });

        res.json({ data: updated });
    } catch (e) {
        e.type === "auth";
        next(e);
    }
}

// delete product
export const deleteProduct = async (req, res, next) => {
    try {
        const deleted = await prisma.product.delete({
            where: {
                id_belongsToId: {
                    id: req.params.id,
                    belongsToId: req.user.id
                }
            }
        });

        res.json({ data: deleted });
    } catch (e) {
        e.type === "auth";
        next(e);
    }
}