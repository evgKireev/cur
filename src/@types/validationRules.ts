export const validationRules = {
  firstName: {
    required: '* This field is required',
    pattern: {
      value: /^([a-zA-Zа-яА-ЯёЁ\-])+([- ]?[a-zA-Zа-яА-ЯёЁ\-])*$/gm,
      message: '* The name must contain only letters, no numbers.',
    },
  },

  lastName: {
    required: '* This field is required',
    pattern: {
      value: /^([a-zA-Zа-яА-ЯёЁ\-])+([- ]?[a-zA-Zа-яА-ЯёЁ\-])*$/gm,
      message: '* The surname must contain only letters, no numbers.',
    },
  },

  cartNumber: {
    required: '* This field is required',
  },

  currency: {
    required: '* This field is required',
  },

  sum: {
    required: '* This field is required',
    pattern: {
      value: /^([0-9])*$/gm,
      message: '* Entering a negative value is prohibited.',
    },
  },
}
