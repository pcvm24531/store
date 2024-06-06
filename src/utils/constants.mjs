export const mockUsers = [
    {
        "id":1, 
        "name":"Pablo", 
        "lastName":"Vargas", 
        "ci":0,
        "userName":"pcvm", 
        "password":"Abcde123", 
        "phone":7597910, 
        "address":"Sacaba c/Colombia",
        "email":"", 
        "position":"Administrador",
        "dateOfContract":"",
        "workingHours":"8-20",
        "supervisor":1,
        "emergencyContactName":"",
        "emergencyContactPhone":0
    },
    {
        "id":2, 
        "name":"César", 
        "lastName":"Morales", 
        "ci":0,
        "userName":"csr", 
        "password":"Abcde123", 
        "phone":0, 
        "address":"Sacaba c/Coronel Sanchez",
        "email":"", 
        "position":"vendedor",
        "dateOfHire":"",
        "workingHours":"8-22",
        "supervisor":1,
        "emergencyContactName":"",
        "emergencyContactPhone":0
    },
];

export const mockProducts = [
    {
        'id':1, 
        "comercialName":"Paracetamol", 
        "genericName":"Acetaminofén", 
        "productCode":"PARA123",
        "description":"Medicamento para el alivio del dolor de la fiebre.",
        "activeIngredients":Array(),
        "producer":Array(),
        "lotNumber":"LOT20230601",
        "manufacturinDate":"",
        "expirationDate":"",
        "sanitaryRegistrationNumber":"",
        "certifications":Array(),
        "provider":"Distribuidora ABC",
        "storageConditions":"Almacenar a temperatura ambiente, entre 15 y 25 grados",
        "stock":100,
        "locationStore":"Estante 5, Sección B",
        "contraindications": "No usar en personas con alergia al paracetamol.",
        "dosage": "Adultos: 500mg cada 6-8 horas.",
        "instruccionsForUse": "Tomar con agua.",
        "precautions": "No exceder la dosis recomendada.",
        "purchasePrice": 0.50,
        "salePrice": 1.00,
        "secundaryProvider": "Distribuidora DEF",
        "aditionalNotes": "Mantener fuera del alcance de los niños.",
        "productImage": "http://example.com/imagenes/paracetamol.jpg",
        "informationManual": "http://example.com/manuales/paracetamol.pdf"
    },
];