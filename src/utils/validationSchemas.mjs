export const createUserValidationSchema = {
    name:{
        isLength:{
            options:{min:3, max:25},
            errorMessage:"Este campo debe contener entre 3 - 25 caracteres."
        },
        notEmpty:{
            errorMessage:"Este campo no puede estar vacío."
        },
        isString:{
            errorMessage:"El nombre solo puede contener letras."
        }
    },
    lastName:{
        isLength:{
            options:{min:3, max:25},
            errorMessage:"Este campo debe contener entre 3 - 25 caracteres.",
        },
        notEmpty:{
            errorMessage:"Este campo no puede estar vacío."
        },
        isString:{
            errorMessage:"El apellido solo puede conter letras."
        },
    },
    ci:{
        isLength:{
            options:{min:5, max:15},
            errorMessage:"Este campo debe contener entre 5 - 15 caracteres."
        },
    },
    username:{
        isLength:{
            options:{min:5, max:15},
            errorMessage:"Este campo debe contener entre 5 - 15 caracteres.",
        },
        notEmpty:{
            errorMessage:"Este campo no puede estar vacío.",
        },
    },
    password:{
        isLength:{
            options:{min:5, max:15},
            errorMessage:"Este campo de contener entre 5 - 25 caracateres."
        },
        notEmpty:{
            errorMessage:"Este campo no puede estar vácio."
        }
    },
    phone:{
        isLength:{
            options:{min:7, max:8},
            errorMessage:"Ingrese un número válido."
        },
    },
    position:{
        notEmpty:{
            errorMessage:"Este campo no puede estar vacío."
        },
    },
    dateOfContract:{
        notEmpty:{
            errorMessage:"Este campo no puede estar vacío."
        }
    },
    workingHours:{
        notEmpty:{
            errorMessage:"Este campo puede estar vacío."
        }
    },
    supervisor:{
        notEmpty:{
            errorMessage:"Este campo no puede estar vacío."
        }
    }
}

export const createProductsValidationSchema = {
    comercialName:{
        notEmpty:{
            errorMessage:"Este campo no puede estar vacío."
        },
        isLength:{
            options:{min:5, max:50},
            errorMessage:"Este campo debe contener entre 5 - 50 caracteres."
        }
    },
    genericName:{
        notEmpty:{
            errorMessage:"Este campo no puede estar vacío."
        },
        isLength:{
            options:{min:5, max:50},
            errorMessage:"Este campo debe contener entre 5 - 50 caracteres."
        }
    },
    productCode:{
        notEmpty:{
            errorMessage:"Este campo no puede estar vacío."
        },
        isLength:{
            options:{min:5, max:20},
            errorMessage:"Este campo debe contener entre 5 - 20 caracteres."
        }
    },
    description:{
        notEmpty:{
            errorMessage:"Este campo no puede estar vacío."
        },
        isLength:{
            options:{min:5, max:250},
            errorMessage:"Este campo debe contener entre 5 - 250 caracteres."
        }
    },
    provider:{
        notEmpty:{
            errorMessage:"Este campo no puede estar vacío."
        },
        isLength:{
            options:{min:3, max:100},
            errorMessage:"Este campo debe contener entre 5 - 100 caracteres."
        }
    },
    storageConditions:{
        notEmpty:{
            errorMessage:"Este campo no puede estar vacío."
        },
        isLength:{
            options:{min:5, max:100},
            errorMessage:"Este campo debe contener entre 5 - 100 caracteres."
        }
    },
    stock:{
        notEmpty:{
            errorMessage:"Este campo no puede estar vacío."
        }
    },
    locationStore:{
        notEmpty:{
            errorMessage:"Este campo no puede estar vacío."
        }
    },
    purchasePrice:{
        notEmpty:{
            errorMessage:"Este campo no puede estar vacío."
        }
    },
    salePrice:{
        notEmpty:{
            errorMessage:"Este campo no puede estar vacío."
        }
    },
}