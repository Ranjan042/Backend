import { body,validationResult } from "express-validator";

function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const RegisterValidator = [
    body("FullName")
        .notEmpty()
        .withMessage("Full name is required")
        .matches(/^[A-Za-z\s]{3,50}$/)
        .withMessage("Full name must contain only letters and spaces (3-50 chars)").bail(),

    body("Email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format").bail(),

    body("PhoneNumber")
        .notEmpty()
        .withMessage("Phone number is required")
        .matches(/^[6-9]\d{9}$/)
        .withMessage("Phone number must be 10 digits and start with 6-9").bail(),

    body("Password")
        .notEmpty()
        .withMessage("Password is required")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,20}$/)
        .withMessage(
            "Password must be 6-20 characters and include at least one letter and one number"
        ).bail(),

    body("Role")
        .optional()
        .isIn(["buyer", "seller"])
        .withMessage("Role must be either buyer or seller"),

    validate
];

export const LoginValidator = [
    body("Email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format").bail(),
    body("Password").notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long").bail(),
    validate
]