import prisma from "../db"

// Get all Products
export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id,
        },
        include: {
            products: true
        }
    });

    res.json({data: user?.products });
}

// Get one Product
export const getOneProduct = async (req, res) => {
    const productId = req.params.id;

    const product = await prisma.product.findFirst({
        where: {
            id: productId,
            belongsToId: req.user.id
        }
    });

    res.json({ data: product });
}

// Create Product
export const createProduct = async (req, res) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            belongsToId: req.user.id
        }
    });

    res.json({ data: product });
}

// update Product
export const updateProduct = async (req, res) => {
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
}

// delete product
export const deleteProduct = async (req, res) => {
    const deleted = await prisma.product.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        }
    });

    res.json({ data: deleted });
}