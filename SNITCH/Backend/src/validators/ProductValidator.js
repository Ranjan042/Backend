import { body, validationResult } from "express-validator";

function validate(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }

    next();
}

export const ProductValidator = [

    // 🔹 Title
    body("title")
        .trim()
        .notEmpty().withMessage("Title is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be between 3 and 100 characters"),

    // 🔹 Description
    body("description")
        .trim()
        .notEmpty().withMessage("Description is required")
        .isLength({ min: 10, max: 1000 })
        .withMessage("Description must be 10–1000 characters"),

    // 🔹 Price Amount
    body("priceAmount")
        .notEmpty().withMessage("Price is required")
        .isFloat({ gt: 0 })
        .withMessage("Price must be a number greater than 0"),

    // 🔹 Currency
    body("priceCurrency")
        .notEmpty().withMessage("Currency is required")
        .isIn(["INR", "USD", "EUR"])
        .withMessage("Currency must be INR, USD, or EUR"),

    validate
];