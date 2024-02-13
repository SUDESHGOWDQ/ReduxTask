const isRequiredErrorMessage = 'is required.';

export const firstNameSchema = {
    presence: { allowEmpty: false, message: isRequiredErrorMessage },
};

export const lastNameSchema = {
    presence: { allowEmpty: false, message: isRequiredErrorMessage },
};

export const emailSchema = {
    presence: { allowEmpty: false, message: isRequiredErrorMessage },
    email: { message: "Doesn't look like email." },
};

export const passwordSchema = {
    presence: { allowEmpty: false, message: isRequiredErrorMessage },
    format: {
        pattern: '^[A-Za-z0-9_@$]{7,29}$',
        message: 'must be between 7 to 30 characters and can only contain letters, numbers, and the special characters',
    },
};
